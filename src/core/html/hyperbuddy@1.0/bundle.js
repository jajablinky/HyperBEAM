
/* **********************************************
     Begin prism-core.js
********************************************** */

/// <reference lib="WebWorker"/>

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
			? self // if in worker
			: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
var Prism = (function (_self) {

	// Private helper vars
	var lang = /(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i;
	var uniqueId = 0;

	// The grammar object for plaintext
	var plainTextGrammar = {};


	var _ = {
		/**
		 * By default, Prism will attempt to highlight all code elements (by calling {@link Prism.highlightAll}) on the
		 * current page after the page finished loading. This might be a problem if e.g. you wanted to asynchronously load
		 * additional languages or plugins yourself.
		 *
		 * By setting this value to `true`, Prism will not automatically highlight all code elements on the page.
		 *
		 * You obviously have to change this value before the automatic highlighting started. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.manual = true;
		 * // add a new <script> to load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		manual: _self.Prism && _self.Prism.manual,
		/**
		 * By default, if Prism is in a web worker, it assumes that it is in a worker it created itself, so it uses
		 * `addEventListener` to communicate with its parent instance. However, if you're using Prism manually in your
		 * own worker, you don't want it to do this.
		 *
		 * By setting this value to `true`, Prism will not add its own listeners to the worker.
		 *
		 * You obviously have to change this value before Prism executes. To do this, you can add an
		 * empty Prism object into the global scope before loading the Prism script like this:
		 *
		 * ```js
		 * window.Prism = window.Prism || {};
		 * Prism.disableWorkerMessageHandler = true;
		 * // Load Prism's script
		 * ```
		 *
		 * @default false
		 * @type {boolean}
		 * @memberof Prism
		 * @public
		 */
		disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,

		/**
		 * A namespace for utility methods.
		 *
		 * All function in this namespace that are not explicitly marked as _public_ are for __internal use only__ and may
		 * change or disappear at any time.
		 *
		 * @namespace
		 * @memberof Prism
		 */
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, encode(tokens.content), tokens.alias);
				} else if (Array.isArray(tokens)) {
					return tokens.map(encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			/**
			 * Returns the name of the type of the given value.
			 *
			 * @param {any} o
			 * @returns {string}
			 * @example
			 * type(null)      === 'Null'
			 * type(undefined) === 'Undefined'
			 * type(123)       === 'Number'
			 * type('foo')     === 'String'
			 * type(true)      === 'Boolean'
			 * type([1, 2])    === 'Array'
			 * type({})        === 'Object'
			 * type(String)    === 'Function'
			 * type(/abc+/)    === 'RegExp'
			 */
			type: function (o) {
				return Object.prototype.toString.call(o).slice(8, -1);
			},

			/**
			 * Returns a unique number for the given object. Later calls will still return the same number.
			 *
			 * @param {Object} obj
			 * @returns {number}
			 */
			objId: function (obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			/**
			 * Creates a deep clone of the given object.
			 *
			 * The main intended use of this function is to clone language definitions.
			 *
			 * @param {T} o
			 * @param {Record<number, any>} [visited]
			 * @returns {T}
			 * @template T
			 */
			clone: function deepClone(o, visited) {
				visited = visited || {};

				var clone; var id;
				switch (_.util.type(o)) {
					case 'Object':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = /** @type {Record<string, any>} */ ({});
						visited[id] = clone;

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = deepClone(o[key], visited);
							}
						}

						return /** @type {any} */ (clone);

					case 'Array':
						id = _.util.objId(o);
						if (visited[id]) {
							return visited[id];
						}
						clone = [];
						visited[id] = clone;

						(/** @type {Array} */(/** @type {any} */(o))).forEach(function (v, i) {
							clone[i] = deepClone(v, visited);
						});

						return /** @type {any} */ (clone);

					default:
						return o;
				}
			},

			/**
			 * Returns the Prism language of the given element set by a `language-xxxx` or `lang-xxxx` class.
			 *
			 * If no language is set for the element or the element is `null` or `undefined`, `none` will be returned.
			 *
			 * @param {Element} element
			 * @returns {string}
			 */
			getLanguage: function (element) {
				while (element) {
					var m = lang.exec(element.className);
					if (m) {
						return m[1].toLowerCase();
					}
					element = element.parentElement;
				}
				return 'none';
			},

			/**
			 * Sets the Prism `language-xxxx` class of the given element.
			 *
			 * @param {Element} element
			 * @param {string} language
			 * @returns {void}
			 */
			setLanguage: function (element, language) {
				// remove all `language-xxxx` classes
				// (this might leave behind a leading space)
				element.className = element.className.replace(RegExp(lang, 'gi'), '');

				// add the new `language-xxxx` class
				// (using `classList` will automatically clean up spaces for us)
				element.classList.add('language-' + language);
			},

			/**
			 * Returns the script element that is currently executing.
			 *
			 * This does __not__ work for line script element.
			 *
			 * @returns {HTMLScriptElement | null}
			 */
			currentScript: function () {
				if (typeof document === 'undefined') {
					return null;
				}
				if (document.currentScript && document.currentScript.tagName === 'SCRIPT' && 1 < 2 /* hack to trip TS' flow analysis */) {
					return /** @type {any} */ (document.currentScript);
				}

				// IE11 workaround
				// we'll get the src of the current script by parsing IE11's error stack trace
				// this will not work for inline scripts

				try {
					throw new Error();
				} catch (err) {
					// Get file src url from stack. Specifically works with the format of stack traces in IE.
					// A stack will look like this:
					//
					// Error
					//    at _.util.currentScript (http://localhost/components/prism-core.js:119:5)
					//    at Global code (http://localhost/components/prism-core.js:606:1)

					var src = (/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(err.stack) || [])[1];
					if (src) {
						var scripts = document.getElementsByTagName('script');
						for (var i in scripts) {
							if (scripts[i].src == src) {
								return scripts[i];
							}
						}
					}
					return null;
				}
			},

			/**
			 * Returns whether a given class is active for `element`.
			 *
			 * The class can be activated if `element` or one of its ancestors has the given class and it can be deactivated
			 * if `element` or one of its ancestors has the negated version of the given class. The _negated version_ of the
			 * given class is just the given class with a `no-` prefix.
			 *
			 * Whether the class is active is determined by the closest ancestor of `element` (where `element` itself is
			 * closest ancestor) that has the given class or the negated version of it. If neither `element` nor any of its
			 * ancestors have the given class or the negated version of it, then the default activation will be returned.
			 *
			 * In the paradoxical situation where the closest ancestor contains __both__ the given class and the negated
			 * version of it, the class is considered active.
			 *
			 * @param {Element} element
			 * @param {string} className
			 * @param {boolean} [defaultActivation=false]
			 * @returns {boolean}
			 */
			isActive: function (element, className, defaultActivation) {
				var no = 'no-' + className;

				while (element) {
					var classList = element.classList;
					if (classList.contains(className)) {
						return true;
					}
					if (classList.contains(no)) {
						return false;
					}
					element = element.parentElement;
				}
				return !!defaultActivation;
			}
		},

		/**
		 * This namespace contains all currently loaded languages and the some helper functions to create and modify languages.
		 *
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		languages: {
			/**
			 * The grammar for plain, unformatted text.
			 */
			plain: plainTextGrammar,
			plaintext: plainTextGrammar,
			text: plainTextGrammar,
			txt: plainTextGrammar,

			/**
			 * Creates a deep copy of the language with the given id and appends the given tokens.
			 *
			 * If a token in `redef` also appears in the copied language, then the existing token in the copied language
			 * will be overwritten at its original position.
			 *
			 * ## Best practices
			 *
			 * Since the position of overwriting tokens (token in `redef` that overwrite tokens in the copied language)
			 * doesn't matter, they can technically be in any order. However, this can be confusing to others that trying to
			 * understand the language definition because, normally, the order of tokens matters in Prism grammars.
			 *
			 * Therefore, it is encouraged to order overwriting tokens according to the positions of the overwritten tokens.
			 * Furthermore, all non-overwriting tokens should be placed after the overwriting ones.
			 *
			 * @param {string} id The id of the language to extend. This has to be a key in `Prism.languages`.
			 * @param {Grammar} redef The new tokens to append.
			 * @returns {Grammar} The new language created.
			 * @public
			 * @example
			 * Prism.languages['css-with-colors'] = Prism.languages.extend('css', {
			 *     // Prism.languages.css already has a 'comment' token, so this token will overwrite CSS' 'comment' token
			 *     // at its original position
			 *     'comment': { ... },
			 *     // CSS doesn't have a 'color' token, so this token will be appended
			 *     'color': /\b(?:red|green|blue)\b/
			 * });
			 */
			extend: function (id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
			 * Inserts tokens _before_ another token in a language definition or any other grammar.
			 *
			 * ## Usage
			 *
			 * This helper method makes it easy to modify existing languages. For example, the CSS language definition
			 * not only defines CSS highlighting for CSS documents, but also needs to define highlighting for CSS embedded
			 * in HTML through `<style>` elements. To do this, it needs to modify `Prism.languages.markup` and add the
			 * appropriate tokens. However, `Prism.languages.markup` is a regular JavaScript object literal, so if you do
			 * this:
			 *
			 * ```js
			 * Prism.languages.markup.style = {
			 *     // token
			 * };
			 * ```
			 *
			 * then the `style` token will be added (and processed) at the end. `insertBefore` allows you to insert tokens
			 * before existing tokens. For the CSS example above, you would use it like this:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'cdata', {
			 *     'style': {
			 *         // token
			 *     }
			 * });
			 * ```
			 *
			 * ## Special cases
			 *
			 * If the grammars of `inside` and `insert` have tokens with the same name, the tokens in `inside`'s grammar
			 * will be ignored.
			 *
			 * This behavior can be used to insert tokens after `before`:
			 *
			 * ```js
			 * Prism.languages.insertBefore('markup', 'comment', {
			 *     'comment': Prism.languages.markup.comment,
			 *     // tokens after 'comment'
			 * });
			 * ```
			 *
			 * ## Limitations
			 *
			 * The main problem `insertBefore` has to solve is iteration order. Since ES2015, the iteration order for object
			 * properties is guaranteed to be the insertion order (except for integer keys) but some browsers behave
			 * differently when keys are deleted and re-inserted. So `insertBefore` can't be implemented by temporarily
			 * deleting properties which is necessary to insert at arbitrary positions.
			 *
			 * To solve this problem, `insertBefore` doesn't actually insert the given tokens into the target object.
			 * Instead, it will create a new object and replace all references to the target object with the new one. This
			 * can be done without temporarily deleting properties, so the iteration order is well-defined.
			 *
			 * However, only references that can be reached from `Prism.languages` or `insert` will be replaced. I.e. if
			 * you hold the target object in a variable, then the value of the variable will not change.
			 *
			 * ```js
			 * var oldMarkup = Prism.languages.markup;
			 * var newMarkup = Prism.languages.insertBefore('markup', 'comment', { ... });
			 *
			 * assert(oldMarkup !== Prism.languages.markup);
			 * assert(newMarkup === Prism.languages.markup);
			 * ```
			 *
			 * @param {string} inside The property of `root` (e.g. a language id in `Prism.languages`) that contains the
			 * object to be modified.
			 * @param {string} before The key to insert before.
			 * @param {Grammar} insert An object containing the key-value pairs to be inserted.
			 * @param {Object<string, any>} [root] The object containing `inside`, i.e. the object that contains the
			 * object to be modified.
			 *
			 * Defaults to `Prism.languages`.
			 * @returns {Grammar} The new grammar object.
			 * @public
			 */
			insertBefore: function (inside, before, insert, root) {
				root = root || /** @type {any} */ (_.languages);
				var grammar = root[inside];
				/** @type {Grammar} */
				var ret = {};

				for (var token in grammar) {
					if (grammar.hasOwnProperty(token)) {

						if (token == before) {
							for (var newToken in insert) {
								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						// Do not insert token which also occur in insert. See #1525
						if (!insert.hasOwnProperty(token)) {
							ret[token] = grammar[token];
						}
					}
				}

				var old = root[inside];
				root[inside] = ret;

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === old && key != inside) {
						this[key] = ret;
					}
				});

				return ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};

				var objId = _.util.objId;

				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						var property = o[i];
						var propertyType = _.util.type(property);

						if (propertyType === 'Object' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, null, visited);
						} else if (propertyType === 'Array' && !visited[objId(property)]) {
							visited[objId(property)] = true;
							DFS(property, callback, i, visited);
						}
					}
				}
			}
		},

		plugins: {},

		/**
		 * This is the most high-level function in Prism’s API.
		 * It fetches all the elements that have a `.language-xxxx` class and then calls {@link Prism.highlightElement} on
		 * each one of them.
		 *
		 * This is equivalent to `Prism.highlightAllUnder(document, async, callback)`.
		 *
		 * @param {boolean} [async=false] Same as in {@link Prism.highlightAllUnder}.
		 * @param {HighlightCallback} [callback] Same as in {@link Prism.highlightAllUnder}.
		 * @memberof Prism
		 * @public
		 */
		highlightAll: function (async, callback) {
			_.highlightAllUnder(document, async, callback);
		},

		/**
		 * Fetches all the descendants of `container` that have a `.language-xxxx` class and then calls
		 * {@link Prism.highlightElement} on each one of them.
		 *
		 * The following hooks will be run:
		 * 1. `before-highlightall`
		 * 2. `before-all-elements-highlight`
		 * 3. All hooks of {@link Prism.highlightElement} for each element.
		 *
		 * @param {ParentNode} container The root element, whose descendants that have a `.language-xxxx` class will be highlighted.
		 * @param {boolean} [async=false] Whether each element is to be highlighted asynchronously using Web Workers.
		 * @param {HighlightCallback} [callback] An optional callback to be invoked on each element after its highlighting is done.
		 * @memberof Prism
		 * @public
		 */
		highlightAllUnder: function (container, async, callback) {
			var env = {
				callback: callback,
				container: container,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run('before-highlightall', env);

			env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));

			_.hooks.run('before-all-elements-highlight', env);

			for (var i = 0, element; (element = env.elements[i++]);) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		/**
		 * Highlights the code inside a single element.
		 *
		 * The following hooks will be run:
		 * 1. `before-sanity-check`
		 * 2. `before-highlight`
		 * 3. All hooks of {@link Prism.highlight}. These hooks will be run by an asynchronous worker if `async` is `true`.
		 * 4. `before-insert`
		 * 5. `after-highlight`
		 * 6. `complete`
		 *
		 * Some the above hooks will be skipped if the element doesn't contain any text or there is no grammar loaded for
		 * the element's language.
		 *
		 * @param {Element} element The element containing the code.
		 * It must have a class of `language-xxxx` to be processed, where `xxxx` is a valid language identifier.
		 * @param {boolean} [async=false] Whether the element is to be highlighted asynchronously using Web Workers
		 * to improve performance and avoid blocking the UI when highlighting very large chunks of code. This option is
		 * [disabled by default](https://prismjs.com/faq.html#why-is-asynchronous-highlighting-disabled-by-default).
		 *
		 * Note: All language definitions required to highlight the code must be included in the main `prism.js` file for
		 * asynchronous highlighting to work. You can build your own bundle on the
		 * [Download page](https://prismjs.com/download.html).
		 * @param {HighlightCallback} [callback] An optional callback to be invoked after the highlighting is done.
		 * Mostly useful when `async` is `true`, since in that case, the highlighting is done asynchronously.
		 * @memberof Prism
		 * @public
		 */
		highlightElement: function (element, async, callback) {
			// Find language
			var language = _.util.getLanguage(element);
			var grammar = _.languages[language];

			// Set language on the element, if not present
			_.util.setLanguage(element, language);

			// Set language on the parent, for styling
			var parent = element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre') {
				_.util.setLanguage(parent, language);
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			function insertHighlightedCode(highlightedCode) {
				env.highlightedCode = highlightedCode;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
			}

			_.hooks.run('before-sanity-check', env);

			// plugins may change/add the parent/element
			parent = env.element.parentElement;
			if (parent && parent.nodeName.toLowerCase() === 'pre' && !parent.hasAttribute('tabindex')) {
				parent.setAttribute('tabindex', '0');
			}

			if (!env.code) {
				_.hooks.run('complete', env);
				callback && callback.call(env.element);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (!env.grammar) {
				insertHighlightedCode(_.util.encode(env.code));
				return;
			}

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					insertHighlightedCode(evt.data);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
			}
		},

		/**
		 * Low-level function, only use if you know what you’re doing. It accepts a string of text as input
		 * and the language definitions to use, and returns a string with the HTML produced.
		 *
		 * The following hooks will be run:
		 * 1. `before-tokenize`
		 * 2. `after-tokenize`
		 * 3. `wrap`: On each {@link Token}.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @param {string} language The name of the language definition passed to `grammar`.
		 * @returns {string} The highlighted HTML.
		 * @memberof Prism
		 * @public
		 * @example
		 * Prism.highlight('var foo = true;', Prism.languages.javascript, 'javascript');
		 */
		highlight: function (text, grammar, language) {
			var env = {
				code: text,
				grammar: grammar,
				language: language
			};
			_.hooks.run('before-tokenize', env);
			if (!env.grammar) {
				throw new Error('The language "' + env.language + '" has no grammar.');
			}
			env.tokens = _.tokenize(env.code, env.grammar);
			_.hooks.run('after-tokenize', env);
			return Token.stringify(_.util.encode(env.tokens), env.language);
		},

		/**
		 * This is the heart of Prism, and the most low-level function you can use. It accepts a string of text as input
		 * and the language definitions to use, and returns an array with the tokenized code.
		 *
		 * When the language definition includes nested tokens, the function is called recursively on each of these tokens.
		 *
		 * This method could be useful in other contexts as well, as a very crude parser.
		 *
		 * @param {string} text A string with the code to be highlighted.
		 * @param {Grammar} grammar An object containing the tokens to use.
		 *
		 * Usually a language definition like `Prism.languages.markup`.
		 * @returns {TokenStream} An array of strings and tokens, a token stream.
		 * @memberof Prism
		 * @public
		 * @example
		 * let code = `var foo = 0;`;
		 * let tokens = Prism.tokenize(code, Prism.languages.javascript);
		 * tokens.forEach(token => {
		 *     if (token instanceof Prism.Token && token.type === 'number') {
		 *         console.log(`Found numeric literal: ${token.content}`);
		 *     }
		 * });
		 */
		tokenize: function (text, grammar) {
			var rest = grammar.rest;
			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			var tokenList = new LinkedList();
			addAfter(tokenList, tokenList.head, text);

			matchGrammar(text, tokenList, grammar, tokenList.head, 0);

			return toArray(tokenList);
		},

		/**
		 * @namespace
		 * @memberof Prism
		 * @public
		 */
		hooks: {
			all: {},

			/**
			 * Adds the given callback to the list of callbacks for the given hook.
			 *
			 * The callback will be invoked when the hook it is registered for is run.
			 * Hooks are usually directly run by a highlight function but you can also run hooks yourself.
			 *
			 * One callback function can be registered to multiple hooks and the same hook multiple times.
			 *
			 * @param {string} name The name of the hook.
			 * @param {HookCallback} callback The callback function which is given environment variables.
			 * @public
			 */
			add: function (name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			/**
			 * Runs a hook invoking all registered callbacks with the given environment variables.
			 *
			 * Callbacks will be invoked synchronously and in the order in which they were registered.
			 *
			 * @param {string} name The name of the hook.
			 * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
			 * @public
			 */
			run: function (name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; (callback = callbacks[i++]);) {
					callback(env);
				}
			}
		},

		Token: Token
	};
	_self.Prism = _;


	// Typescript note:
	// The following can be used to import the Token type in JSDoc:
	//
	//   @typedef {InstanceType<import("./prism-core")["Token"]>} Token

	/**
	 * Creates a new token.
	 *
	 * @param {string} type See {@link Token#type type}
	 * @param {string | TokenStream} content See {@link Token#content content}
	 * @param {string|string[]} [alias] The alias(es) of the token.
	 * @param {string} [matchedStr=""] A copy of the full string this token was created from.
	 * @class
	 * @global
	 * @public
	 */
	function Token(type, content, alias, matchedStr) {
		/**
		 * The type of the token.
		 *
		 * This is usually the key of a pattern in a {@link Grammar}.
		 *
		 * @type {string}
		 * @see GrammarToken
		 * @public
		 */
		this.type = type;
		/**
		 * The strings or tokens contained by this token.
		 *
		 * This will be a token stream if the pattern matched also defined an `inside` grammar.
		 *
		 * @type {string | TokenStream}
		 * @public
		 */
		this.content = content;
		/**
		 * The alias(es) of the token.
		 *
		 * @type {string|string[]}
		 * @see GrammarToken
		 * @public
		 */
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || '').length | 0;
	}

	/**
	 * A token stream is an array of strings and {@link Token Token} objects.
	 *
	 * Token streams have to fulfill a few properties that are assumed by most functions (mostly internal ones) that process
	 * them.
	 *
	 * 1. No adjacent strings.
	 * 2. No empty strings.
	 *
	 *    The only exception here is the token stream that only contains the empty string and nothing else.
	 *
	 * @typedef {Array<string | Token>} TokenStream
	 * @global
	 * @public
	 */

	/**
	 * Converts the given token or token stream to an HTML representation.
	 *
	 * The following hooks will be run:
	 * 1. `wrap`: On each {@link Token}.
	 *
	 * @param {string | Token | TokenStream} o The token or token stream to be converted.
	 * @param {string} language The name of current language.
	 * @returns {string} The HTML representation of the token or token stream.
	 * @memberof Token
	 * @static
	 */
	Token.stringify = function stringify(o, language) {
		if (typeof o == 'string') {
			return o;
		}
		if (Array.isArray(o)) {
			var s = '';
			o.forEach(function (e) {
				s += stringify(e, language);
			});
			return s;
		}

		var env = {
			type: o.type,
			content: stringify(o.content, language),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language
		};

		var aliases = o.alias;
		if (aliases) {
			if (Array.isArray(aliases)) {
				Array.prototype.push.apply(env.classes, aliases);
			} else {
				env.classes.push(aliases);
			}
		}

		_.hooks.run('wrap', env);

		var attributes = '';
		for (var name in env.attributes) {
			attributes += ' ' + name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + attributes + '>' + env.content + '</' + env.tag + '>';
	};

	/**
	 * @param {RegExp} pattern
	 * @param {number} pos
	 * @param {string} text
	 * @param {boolean} lookbehind
	 * @returns {RegExpExecArray | null}
	 */
	function matchPattern(pattern, pos, text, lookbehind) {
		pattern.lastIndex = pos;
		var match = pattern.exec(text);
		if (match && lookbehind && match[1]) {
			// change the match to remove the text matched by the Prism lookbehind group
			var lookbehindLength = match[1].length;
			match.index += lookbehindLength;
			match[0] = match[0].slice(lookbehindLength);
		}
		return match;
	}

	/**
	 * @param {string} text
	 * @param {LinkedList<string | Token>} tokenList
	 * @param {any} grammar
	 * @param {LinkedListNode<string | Token>} startNode
	 * @param {number} startPos
	 * @param {RematchOptions} [rematch]
	 * @returns {void}
	 * @private
	 *
	 * @typedef RematchOptions
	 * @property {string} cause
	 * @property {number} reach
	 */
	function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
		for (var token in grammar) {
			if (!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			var patterns = grammar[token];
			patterns = Array.isArray(patterns) ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				if (rematch && rematch.cause == token + ',' + j) {
					return;
				}

				var patternObj = patterns[j];
				var inside = patternObj.inside;
				var lookbehind = !!patternObj.lookbehind;
				var greedy = !!patternObj.greedy;
				var alias = patternObj.alias;

				if (greedy && !patternObj.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
					patternObj.pattern = RegExp(patternObj.pattern.source, flags + 'g');
				}

				/** @type {RegExp} */
				var pattern = patternObj.pattern || patternObj;

				for ( // iterate the token list and keep track of the current token/string position
					var currentNode = startNode.next, pos = startPos;
					currentNode !== tokenList.tail;
					pos += currentNode.value.length, currentNode = currentNode.next
				) {

					if (rematch && pos >= rematch.reach) {
						break;
					}

					var str = currentNode.value;

					if (tokenList.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					var removeCount = 1; // this is the to parameter of removeBetween
					var match;

					if (greedy) {
						match = matchPattern(pattern, pos, text, lookbehind);
						if (!match || match.index >= text.length) {
							break;
						}

						var from = match.index;
						var to = match.index + match[0].length;
						var p = pos;

						// find the node that contains the match
						p += currentNode.value.length;
						while (from >= p) {
							currentNode = currentNode.next;
							p += currentNode.value.length;
						}
						// adjust pos (and p)
						p -= currentNode.value.length;
						pos = p;

						// the current node is a Token, then the match starts inside another Token, which is invalid
						if (currentNode.value instanceof Token) {
							continue;
						}

						// find the last node which is affected by this match
						for (
							var k = currentNode;
							k !== tokenList.tail && (p < to || typeof k.value === 'string');
							k = k.next
						) {
							removeCount++;
							p += k.value.length;
						}
						removeCount--;

						// replace with the new match
						str = text.slice(pos, p);
						match.index -= pos;
					} else {
						match = matchPattern(pattern, 0, str, lookbehind);
						if (!match) {
							continue;
						}
					}

					// eslint-disable-next-line no-redeclare
					var from = match.index;
					var matchStr = match[0];
					var before = str.slice(0, from);
					var after = str.slice(from + matchStr.length);

					var reach = pos + str.length;
					if (rematch && reach > rematch.reach) {
						rematch.reach = reach;
					}

					var removeFrom = currentNode.prev;

					if (before) {
						removeFrom = addAfter(tokenList, removeFrom, before);
						pos += before.length;
					}

					removeRange(tokenList, removeFrom, removeCount);

					var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
					currentNode = addAfter(tokenList, removeFrom, wrapped);

					if (after) {
						addAfter(tokenList, currentNode, after);
					}

					if (removeCount > 1) {
						// at least one Token object was removed, so we have to do some rematching
						// this can only happen if the current pattern is greedy

						/** @type {RematchOptions} */
						var nestedRematch = {
							cause: token + ',' + j,
							reach: reach
						};
						matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);

						// the reach might have been extended because of the rematching
						if (rematch && nestedRematch.reach > rematch.reach) {
							rematch.reach = nestedRematch.reach;
						}
					}
				}
			}
		}
	}

	/**
	 * @typedef LinkedListNode
	 * @property {T} value
	 * @property {LinkedListNode<T> | null} prev The previous node.
	 * @property {LinkedListNode<T> | null} next The next node.
	 * @template T
	 * @private
	 */

	/**
	 * @template T
	 * @private
	 */
	function LinkedList() {
		/** @type {LinkedListNode<T>} */
		var head = { value: null, prev: null, next: null };
		/** @type {LinkedListNode<T>} */
		var tail = { value: null, prev: head, next: null };
		head.next = tail;

		/** @type {LinkedListNode<T>} */
		this.head = head;
		/** @type {LinkedListNode<T>} */
		this.tail = tail;
		this.length = 0;
	}

	/**
	 * Adds a new node with the given value to the list.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {T} value
	 * @returns {LinkedListNode<T>} The added node.
	 * @template T
	 */
	function addAfter(list, node, value) {
		// assumes that node != list.tail && values.length >= 0
		var next = node.next;

		var newNode = { value: value, prev: node, next: next };
		node.next = newNode;
		next.prev = newNode;
		list.length++;

		return newNode;
	}
	/**
	 * Removes `count` nodes after the given node. The given node will not be removed.
	 *
	 * @param {LinkedList<T>} list
	 * @param {LinkedListNode<T>} node
	 * @param {number} count
	 * @template T
	 */
	function removeRange(list, node, count) {
		var next = node.next;
		for (var i = 0; i < count && next !== list.tail; i++) {
			next = next.next;
		}
		node.next = next;
		next.prev = node;
		list.length -= i;
	}
	/**
	 * @param {LinkedList<T>} list
	 * @returns {T[]}
	 * @template T
	 */
	function toArray(list) {
		var array = [];
		var node = list.head.next;
		while (node !== list.tail) {
			array.push(node.value);
			node = node.next;
		}
		return array;
	}


	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _;
		}

		if (!_.disableWorkerMessageHandler) {
			// In worker
			_self.addEventListener('message', function (evt) {
				var message = JSON.parse(evt.data);
				var lang = message.language;
				var code = message.code;
				var immediateClose = message.immediateClose;

				_self.postMessage(_.highlight(code, _.languages[lang], lang));
				if (immediateClose) {
					_self.close();
				}
			}, false);
		}

		return _;
	}

	// Get current script and highlight
	var script = _.util.currentScript();

	if (script) {
		_.filename = script.src;

		if (script.hasAttribute('data-manual')) {
			_.manual = true;
		}
	}

	function highlightAutomaticallyCallback() {
		if (!_.manual) {
			_.highlightAll();
		}
	}

	if (!_.manual) {
		// If the document state is "loading", then we'll use DOMContentLoaded.
		// If the document state is "interactive" and the prism.js script is deferred, then we'll also use the
		// DOMContentLoaded event because there might be some plugins or languages which have also been deferred and they
		// might take longer one animation frame to execute which can create a race condition where only some plugins have
		// been loaded when Prism.highlightAll() is executed, depending on how fast resources are loaded.
		// See https://github.com/PrismJS/prism/issues/2102
		var readyState = document.readyState;
		if (readyState === 'loading' || readyState === 'interactive' && script && script.defer) {
			document.addEventListener('DOMContentLoaded', highlightAutomaticallyCallback);
		} else {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(highlightAutomaticallyCallback);
			} else {
				window.setTimeout(highlightAutomaticallyCallback, 16);
			}
		}
	}

	return _;

}(_self));

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}

// some additional documentation/types

/**
 * The expansion of a simple `RegExp` literal to support additional properties.
 *
 * @typedef GrammarToken
 * @property {RegExp} pattern The regular expression of the token.
 * @property {boolean} [lookbehind=false] If `true`, then the first capturing group of `pattern` will (effectively)
 * behave as a lookbehind group meaning that the captured text will not be part of the matched text of the new token.
 * @property {boolean} [greedy=false] Whether the token is greedy.
 * @property {string|string[]} [alias] An optional alias or list of aliases.
 * @property {Grammar} [inside] The nested grammar of this token.
 *
 * The `inside` grammar will be used to tokenize the text value of each token of this kind.
 *
 * This can be used to make nested and even recursive language definitions.
 *
 * Note: This can cause infinite recursion. Be careful when you embed different languages or even the same language into
 * each another.
 * @global
 * @public
 */

/**
 * @typedef Grammar
 * @type {Object<string, RegExp | GrammarToken | Array<RegExp | GrammarToken>>}
 * @property {Grammar} [rest] An optional grammar object that will be appended to this grammar.
 * @global
 * @public
 */

/**
 * A function which will invoked after an element was successfully highlighted.
 *
 * @callback HighlightCallback
 * @param {Element} element The element successfully highlighted.
 * @returns {void}
 * @global
 * @public
 */

/**
 * @callback HookCallback
 * @param {Object<string, any>} env The environment variables of the hook.
 * @returns {void}
 * @global
 * @public
 */


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': {
		pattern: /<!--(?:(?!<!--)[\s\S])*?-->/,
		greedy: true
	},
	'prolog': {
		pattern: /<\?[\s\S]+?\?>/,
		greedy: true
	},
	'doctype': {
		// https://www.w3.org/TR/xml/#NT-doctypedecl
		pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
		greedy: true,
		inside: {
			'internal-subset': {
				pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
				lookbehind: true,
				greedy: true,
				inside: null // see below
			},
			'string': {
				pattern: /"[^"]*"|'[^']*'/,
				greedy: true
			},
			'punctuation': /^<!|>$|[[\]]/,
			'doctype-tag': /^DOCTYPE/i,
			'name': /[^\s<>'"]+/
		}
	},
	'cdata': {
		pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
		greedy: true
	},
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
		greedy: true,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'special-attr': [],
			'attr-value': {
				pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
				inside: {
					'punctuation': [
						{
							pattern: /^=/,
							alias: 'attr-equals'
						},
						{
							pattern: /^(\s*)["']|["']$/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': [
		{
			pattern: /&[\da-z]{1,8};/i,
			alias: 'named-entity'
		},
		/&#x?[\da-f]{1,8};/i
	]
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];
Prism.languages.markup['doctype'].inside['internal-subset'].inside = Prism.languages.markup;

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
	/**
	 * Adds an inlined language to markup.
	 *
	 * An example of an inlined language is CSS with `<style>` tags.
	 *
	 * @param {string} tagName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addInlined('style', 'css');
	 */
	value: function addInlined(tagName, lang) {
		var includedCdataInside = {};
		includedCdataInside['language-' + lang] = {
			pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
			lookbehind: true,
			inside: Prism.languages[lang]
		};
		includedCdataInside['cdata'] = /^<!\[CDATA\[|\]\]>$/i;

		var inside = {
			'included-cdata': {
				pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
				inside: includedCdataInside
			}
		};
		inside['language-' + lang] = {
			pattern: /[\s\S]+/,
			inside: Prism.languages[lang]
		};

		var def = {};
		def[tagName] = {
			pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function () { return tagName; }), 'i'),
			lookbehind: true,
			greedy: true,
			inside: inside
		};

		Prism.languages.insertBefore('markup', 'cdata', def);
	}
});
Object.defineProperty(Prism.languages.markup.tag, 'addAttribute', {
	/**
	 * Adds an pattern to highlight languages embedded in HTML attributes.
	 *
	 * An example of an inlined language is CSS with `style` attributes.
	 *
	 * @param {string} attrName The name of the tag that contains the inlined language. This name will be treated as
	 * case insensitive.
	 * @param {string} lang The language key.
	 * @example
	 * addAttribute('style', 'css');
	 */
	value: function (attrName, lang) {
		Prism.languages.markup.tag.inside['special-attr'].push({
			pattern: RegExp(
				/(^|["'\s])/.source + '(?:' + attrName + ')' + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,
				'i'
			),
			lookbehind: true,
			inside: {
				'attr-name': /^[^\s=]+/,
				'attr-value': {
					pattern: /=[\s\S]+/,
					inside: {
						'value': {
							pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
							lookbehind: true,
							alias: [lang, 'language-' + lang],
							inside: Prism.languages[lang]
						},
						'punctuation': [
							{
								pattern: /^=/,
								alias: 'attr-equals'
							},
							/"|'/
						]
					}
				}
			}
		});
	}
});

Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

Prism.languages.xml = Prism.languages.extend('markup', {});
Prism.languages.ssml = Prism.languages.xml;
Prism.languages.atom = Prism.languages.xml;
Prism.languages.rss = Prism.languages.xml;


/* **********************************************
     Begin prism-css.js
********************************************** */

(function (Prism) {

	var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;

	Prism.languages.css = {
		'comment': /\/\*[\s\S]*?\*\//,
		'atrule': {
			pattern: RegExp('@[\\w-](?:' + /[^;{\s"']|\s+(?!\s)/.source + '|' + string.source + ')*?' + /(?:;|(?=\s*\{))/.source),
			inside: {
				'rule': /^@[\w-]+/,
				'selector-function-argument': {
					pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
					lookbehind: true,
					alias: 'selector'
				},
				'keyword': {
					pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
					lookbehind: true
				}
				// See rest below
			}
		},
		'url': {
			// https://drafts.csswg.org/css-values-3/#urls
			pattern: RegExp('\\burl\\((?:' + string.source + '|' + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ')\\)', 'i'),
			greedy: true,
			inside: {
				'function': /^url/i,
				'punctuation': /^\(|\)$/,
				'string': {
					pattern: RegExp('^' + string.source + '$'),
					alias: 'url'
				}
			}
		},
		'selector': {
			pattern: RegExp('(^|[{}\\s])[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' + string.source + ')*(?=\\s*\\{)'),
			lookbehind: true
		},
		'string': {
			pattern: string,
			greedy: true
		},
		'property': {
			pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
			lookbehind: true
		},
		'important': /!important\b/i,
		'function': {
			pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
			lookbehind: true
		},
		'punctuation': /[(){};:,]/
	};

	Prism.languages.css['atrule'].inside.rest = Prism.languages.css;

	var markup = Prism.languages.markup;
	if (markup) {
		markup.tag.addInlined('style', 'css');
		markup.tag.addAttribute('style', 'css');
	}

}(Prism));


/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true,
			greedy: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true,
			greedy: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,
		lookbehind: true,
		inside: {
			'punctuation': /[.\\]/
		}
	},
	'keyword': /\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,
	'boolean': /\b(?:false|true)\b/,
	'function': /\b\w+(?=\()/,
	'number': /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
	'operator': /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'class-name': [
		Prism.languages.clike['class-name'],
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
			lookbehind: true
		}
	],
	'keyword': [
		{
			pattern: /((?:^|\})\s*)catch\b/,
			lookbehind: true
		},
		{
			pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
			lookbehind: true
		},
	],
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
	'number': {
		pattern: RegExp(
			/(^|[^\w$])/.source +
			'(?:' +
			(
				// constant
				/NaN|Infinity/.source +
				'|' +
				// binary integer
				/0[bB][01]+(?:_[01]+)*n?/.source +
				'|' +
				// octal integer
				/0[oO][0-7]+(?:_[0-7]+)*n?/.source +
				'|' +
				// hexadecimal integer
				/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source +
				'|' +
				// decimal bigint
				/\d+(?:_\d+)*n/.source +
				'|' +
				// decimal number (integer or float) but no bigint
				/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source
			) +
			')' +
			/(?![\w$])/.source
		),
		lookbehind: true
	},
	'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
});

Prism.languages.javascript['class-name'][0].pattern = /(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/;

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: RegExp(
			// lookbehind
			// eslint-disable-next-line regexp/no-dupe-characters-character-class
			/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source +
			// Regex pattern:
			// There are 2 regex patterns here. The RegExp set notation proposal added support for nested character
			// classes if the `v` flag is present. Unfortunately, nested CCs are both context-free and incompatible
			// with the only syntax, so we have to define 2 different regex patterns.
			/\//.source +
			'(?:' +
			/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source +
			'|' +
			// `v` flag syntax. This supports 3 levels of nested character classes.
			/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source +
			')' +
			// lookahead
			/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source
		),
		lookbehind: true,
		greedy: true,
		inside: {
			'regex-source': {
				pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
				lookbehind: true,
				alias: 'language-regex',
				inside: Prism.languages.regex
			},
			'regex-delimiter': /^\/|\/$/,
			'regex-flags': /^[a-z]+$/,
		}
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
		alias: 'function'
	},
	'parameter': [
		{
			pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		},
		{
			pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
			lookbehind: true,
			inside: Prism.languages.javascript
		}
	],
	'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/
});

Prism.languages.insertBefore('javascript', 'string', {
	'hashbang': {
		pattern: /^#!.*/,
		greedy: true,
		alias: 'comment'
	},
	'template-string': {
		pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
		greedy: true,
		inside: {
			'template-punctuation': {
				pattern: /^`|`$/,
				alias: 'string'
			},
			'interpolation': {
				pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
				lookbehind: true,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	},
	'string-property': {
		pattern: /((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,
		lookbehind: true,
		greedy: true,
		alias: 'property'
	}
});

Prism.languages.insertBefore('javascript', 'operator', {
	'literal-property': {
		pattern: /((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,
		lookbehind: true,
		alias: 'property'
	},
});

if (Prism.languages.markup) {
	Prism.languages.markup.tag.addInlined('script', 'javascript');

	// add attribute support for all DOM events.
	// https://developer.mozilla.org/en-US/docs/Web/Events#Standard_events
	Prism.languages.markup.tag.addAttribute(
		/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,
		'javascript'
	);
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {

	if (typeof Prism === 'undefined' || typeof document === 'undefined') {
		return;
	}

	// https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	var LOADING_MESSAGE = 'Loading…';
	var FAILURE_MESSAGE = function (status, message) {
		return '✖ Error ' + status + ' while fetching file: ' + message;
	};
	var FAILURE_EMPTY_MESSAGE = '✖ Error: File does not exist or is empty';

	var EXTENSIONS = {
		'js': 'javascript',
		'py': 'python',
		'rb': 'ruby',
		'ps1': 'powershell',
		'psm1': 'powershell',
		'sh': 'bash',
		'bat': 'batch',
		'h': 'c',
		'tex': 'latex'
	};

	var STATUS_ATTR = 'data-src-status';
	var STATUS_LOADING = 'loading';
	var STATUS_LOADED = 'loaded';
	var STATUS_FAILED = 'failed';

	var SELECTOR = 'pre[data-src]:not([' + STATUS_ATTR + '="' + STATUS_LOADED + '"])'
		+ ':not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';

	/**
	 * Loads the given file.
	 *
	 * @param {string} src The URL or path of the source file to load.
	 * @param {(result: string) => void} success
	 * @param {(reason: string) => void} error
	 */
	function loadFile(src, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.open('GET', src, true);
		xhr.onreadystatechange = function () {
			if (xhr.readyState == 4) {
				if (xhr.status < 400 && xhr.responseText) {
					success(xhr.responseText);
				} else {
					if (xhr.status >= 400) {
						error(FAILURE_MESSAGE(xhr.status, xhr.statusText));
					} else {
						error(FAILURE_EMPTY_MESSAGE);
					}
				}
			}
		};
		xhr.send(null);
	}

	/**
	 * Parses the given range.
	 *
	 * This returns a range with inclusive ends.
	 *
	 * @param {string | null | undefined} range
	 * @returns {[number, number | undefined] | undefined}
	 */
	function parseRange(range) {
		var m = /^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(range || '');
		if (m) {
			var start = Number(m[1]);
			var comma = m[2];
			var end = m[3];

			if (!comma) {
				return [start, start];
			}
			if (!end) {
				return [start, undefined];
			}
			return [start, Number(end)];
		}
		return undefined;
	}

	Prism.hooks.add('before-highlightall', function (env) {
		env.selector += ', ' + SELECTOR;
	});

	Prism.hooks.add('before-sanity-check', function (env) {
		var pre = /** @type {HTMLPreElement} */ (env.element);
		if (pre.matches(SELECTOR)) {
			env.code = ''; // fast-path the whole thing and go to complete

			pre.setAttribute(STATUS_ATTR, STATUS_LOADING); // mark as loading

			// add code element with loading message
			var code = pre.appendChild(document.createElement('CODE'));
			code.textContent = LOADING_MESSAGE;

			var src = pre.getAttribute('data-src');

			var language = env.language;
			if (language === 'none') {
				// the language might be 'none' because there is no language set;
				// in this case, we want to use the extension as the language
				var extension = (/\.(\w+)$/.exec(src) || [, 'none'])[1];
				language = EXTENSIONS[extension] || extension;
			}

			// set language classes
			Prism.util.setLanguage(code, language);
			Prism.util.setLanguage(pre, language);

			// preload the language
			var autoloader = Prism.plugins.autoloader;
			if (autoloader) {
				autoloader.loadLanguages(language);
			}

			// load file
			loadFile(
				src,
				function (text) {
					// mark as loaded
					pre.setAttribute(STATUS_ATTR, STATUS_LOADED);

					// handle data-range
					var range = parseRange(pre.getAttribute('data-range'));
					if (range) {
						var lines = text.split(/\r\n?|\n/g);

						// the range is one-based and inclusive on both ends
						var start = range[0];
						var end = range[1] == null ? lines.length : range[1];

						if (start < 0) { start += lines.length; }
						start = Math.max(0, Math.min(start - 1, lines.length));
						if (end < 0) { end += lines.length; }
						end = Math.max(0, Math.min(end, lines.length));

						text = lines.slice(start, end).join('\n');

						// add data-start for line numbers
						if (!pre.hasAttribute('data-start')) {
							pre.setAttribute('data-start', String(start + 1));
						}
					}

					// highlight code
					code.textContent = text;
					Prism.highlightElement(code);
				},
				function (error) {
					// mark as failed
					pre.setAttribute(STATUS_ATTR, STATUS_FAILED);

					code.textContent = error;
				}
			);
		}
	});

	Prism.plugins.fileHighlight = {
		/**
		 * Executes the File Highlight plugin for all matching `pre` elements under the given container.
		 *
		 * Note: Elements which are already loaded or currently loading will not be touched by this method.
		 *
		 * @param {ParentNode} [container=document]
		 */
		highlight: function highlight(container) {
			var elements = (container || document).querySelectorAll(SELECTOR);

			for (var i = 0, element; (element = elements[i++]);) {
				Prism.highlightElement(element);
			}
		}
	};

	var logged = false;
	/** @deprecated Use `Prism.plugins.fileHighlight.highlight` instead. */
	Prism.fileHighlight = function () {
		if (!logged) {
			console.warn('Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.');
			logged = true;
		}
		Prism.plugins.fileHighlight.highlight.apply(this, arguments);
	};

}());
Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",(function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))})),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(a,e){var s={};s["language-"+e]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[e]},s.cdata=/^<!\[CDATA\[|\]\]>$/i;var t={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:s}};t["language-"+e]={pattern:/[\s\S]+/,inside:Prism.languages[e]};var n={};n[a]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,(function(){return a})),"i"),lookbehind:!0,greedy:!0,inside:t},Prism.languages.insertBefore("markup","cdata",n)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(a,e){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp("(^|[\"'\\s])(?:"+a+")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))","i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[e,"language-"+e],inside:Prism.languages[e]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml;Prism.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},Prism.languages.webmanifest=Prism.languages.json;!function(e){var t="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",a={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},n={bash:a,environment:{pattern:RegExp("\\$"+t),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+t),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};e.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+t),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:n},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:a}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:n},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:n.entity}}],environment:{pattern:RegExp("\\$?"+t),alias:"constant"},variable:n.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},a.inside=e.languages.bash;for(var s=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],o=n.variable[1].inside,i=0;i<s.length;i++)o[s[i]]=e.languages.bash[s[i]];e.languages.sh=e.languages.bash,e.languages.shell=e.languages.bash}(Prism);!function(t){function a(t){return RegExp("(^(?:"+t+"):[ \t]*(?![ \t]))[^]+","i")}t.languages.http={"request-line":{pattern:/^(?:CONNECT|DELETE|GET|HEAD|OPTIONS|PATCH|POST|PRI|PUT|SEARCH|TRACE)\s(?:https?:\/\/|\/)\S*\sHTTP\/[\d.]+/m,inside:{method:{pattern:/^[A-Z]+\b/,alias:"property"},"request-target":{pattern:/^(\s)(?:https?:\/\/|\/)\S*(?=\s)/,lookbehind:!0,alias:"url",inside:t.languages.uri},"http-version":{pattern:/^(\s)HTTP\/[\d.]+/,lookbehind:!0,alias:"property"}}},"response-status":{pattern:/^HTTP\/[\d.]+ \d+ .+/m,inside:{"http-version":{pattern:/^HTTP\/[\d.]+/,alias:"property"},"status-code":{pattern:/^(\s)\d+(?=\s)/,lookbehind:!0,alias:"number"},"reason-phrase":{pattern:/^(\s).+/,lookbehind:!0,alias:"string"}}},header:{pattern:/^[\w-]+:.+(?:(?:\r\n?|\n)[ \t].+)*/m,inside:{"header-value":[{pattern:a("Content-Security-Policy"),lookbehind:!0,alias:["csp","languages-csp"],inside:t.languages.csp},{pattern:a("Public-Key-Pins(?:-Report-Only)?"),lookbehind:!0,alias:["hpkp","languages-hpkp"],inside:t.languages.hpkp},{pattern:a("Strict-Transport-Security"),lookbehind:!0,alias:["hsts","languages-hsts"],inside:t.languages.hsts},{pattern:a("[^:]+"),lookbehind:!0}],"header-name":{pattern:/^[^:]+/,alias:"keyword"},punctuation:/^:/}}};var e,n=t.languages,s={"application/javascript":n.javascript,"application/json":n.json||n.javascript,"application/xml":n.xml,"text/xml":n.xml,"text/html":n.html,"text/css":n.css,"text/plain":n.plain},i={"application/json":!0,"application/xml":!0};function r(t){var a=t.replace(/^[a-z]+\//,"");return"(?:"+t+"|\\w+/(?:[\\w.-]+\\+)+"+a+"(?![+\\w.-]))"}for(var p in s)if(s[p]){e=e||{};var l=i[p]?r(p):p;e[p.replace(/\//g,"-")]={pattern:RegExp("(content-type:\\s*"+l+"(?:(?:\r\n?|\n)[\\w-].*)*(?:\r(?:\n|(?!\n))|\n))[^ \t\\w-][^]*","i"),lookbehind:!0,inside:s[p]}}e&&t.languages.insertBefore("http","header",e)}(Prism);Prism.languages.erlang={comment:/%.+/,string:{pattern:/"(?:\\.|[^\\"\r\n])*"/,greedy:!0},"quoted-function":{pattern:/'(?:\\.|[^\\'\r\n])+'(?=\()/,alias:"function"},"quoted-atom":{pattern:/'(?:\\.|[^\\'\r\n])+'/,alias:"atom"},boolean:/\b(?:false|true)\b/,keyword:/\b(?:after|begin|case|catch|end|fun|if|of|receive|try|when)\b/,number:[/\$\\?./,/\b\d+#[a-z0-9]+/i,/(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i],function:/\b[a-z][\w@]*(?=\()/,variable:{pattern:/(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,lookbehind:!0},operator:[/[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:and|andalso|band|bnot|bor|bsl|bsr|bxor|div|not|or|orelse|rem|xor)\b/,{pattern:/(^|[^<])<(?!<)/,lookbehind:!0},{pattern:/(^|[^>])>(?!>)/,lookbehind:!0}],atom:/\b[a-z][\w@]*/,punctuation:/[()[\]{}:;,.#|]|<<|>>/};
(function () {
	'use strict';

	const SESSION_KEY = 'hyperbuddy-command-trail';
	const DEFAULT_COMMAND = 'curl /~meta@1.0/info';
	const STATIC_COMMANDS = [
		'curl /~meta@1.0/info',
		'curl /~meta@1.0/info/address',
		'curl /~meta@1.0/info/preloaded-devices-index',
		'curl /~hyperbuddy@1.0/index',
		'curl /~hyperbuddy@1.0/keys',
		'curl /~message@1.0/keys',
		'curl /~message@1.0&greeting=hello/greeting',
		'curl ~message@1.0&body=hello/~gzip@1.0/zip/~gzip@1.0/unzip/body',
		'curl /~meta@1.0/info/format~hyperbuddy@1.0',
	];
	const DEVICE_ROOT_KEYS = ['info', 'keys', 'format', 'metrics', 'events'];

const PRELOADED_DEVICES = [
		'ans104@1.0',
		'apply@1.0',
		'arweave@1.0',
		'arweave_block_cache@1.0',
		'arweave_offset@1.0',
		'auth_hook@1.0',
		'b32_name@1.0',
		'blacklist@1.0',
		'bundler@1.0',
		'bundler_cache@1.0',
		'bundler_recovery@1.0',
		'bundler_task@1.0',
		'cache@1.0',
		'cacheviz@1.0',
		'cookie@1.0',
		'cookie_auth@1.0',
		'cookie_test_vectors@1.0',
		'copycat@1.0',
		'copycat_arweave@1.0',
		'copycat_graphql@1.0',
		'cron@1.0',
		'dedup@1.0',
		'delegated_compute@1.0',
		'faff@1.0',
		'flat@1.0',
		'genesis_wasm@1.0',
		'gzip@1.0',
		'http_auth@1.0',
		'httpsig@1.0',
		'httpsig_conv@1.0',
		'httpsig_keyid@1.0',
		'httpsig_proxy@1.0',
		'httpsig_siginfo@1.0',
		'hyperbuddy@1.0',
		'json@1.0',
		'json_iface@1.0',
		'local_name@1.0',
		'location@1.0',
		'location_cache@1.0',
		'lua@1.0',
		'lua_lib@1.0',
		'lua_test@1.0',
		'lua_test_ledgers@1.0',
		'manifest@1.0',
		'match@1.0',
		'message@1.0',
		'meta@1.0',
		'metering@1.0',
		'multipass@1.0',
		'name@1.0',
		'node_process@1.0',
		'p4@1.0',
		'patch@1.0',
		'process@1.0',
		'process_cache@1.0',
		'process_worker@1.0',
		'profile@1.0',
		'push@1.0',
		'query@1.0',
		'query_arweave@1.0',
		'query_graphql@1.0',
		'query_test_vectors@1.0',
		'rate_limit@1.0',
		'recorder@1.0',
		'relay@1.0',
		'router@1.0',
		'scheduler@1.0',
		'scheduler_cache@1.0',
		'scheduler_formats@1.0',
		'scheduler_registry@1.0',
		'scheduler_server@1.0',
		'secret@1.0',
		'simple_pay@1.0',
		'stack@1.0',
		'structured@1.0',
		'test@1.0',
		'trie@1.0',
		'trie_props@1.0',
		'tx@1.0',
		'tx_from@1.0',
		'tx_to@1.0',
		'wasi@1.0',
		'wasm@1.0',
		'whois@1.0',
];


	const typeFallbacks = {
		curl: { label: 'curl', description: 'HTTP client command.' },
		url: { label: 'URL', description: 'Network address for resolution.' },
		host: { label: 'Host', description: 'Server hostname.' },
		port: { label: 'Port', description: 'TCP port number.' },
		device: { label: 'Device', description: 'AO-Core device binding.' },
		path: { label: 'Path', description: 'Resolution key path.' },
		flag: { label: 'Flag', description: 'Command flag.' },
		env: { label: 'Environment', description: 'Shell environment variable.' },
		rebar3: { label: 'rebar3', description: 'Erlang build tool command.' },
		message: { label: 'Message', description: 'Inline message construction.' },
		key: { label: 'Key', description: 'Message field or key segment.' },
		literal: { label: 'Literal', description: 'Literal value in the command.' },
		operator: { label: 'Operator', description: 'Separator or operator.' },
		unknown: { label: 'Segment', description: 'Part of the command string.' },
	};

	const tokenPatterns = [
		{
			regex: /^curl$/i,
			type: 'curl',
			label: 'curl',
			description: 'HTTP client — fetches a HyperPATH from your local HyperBEAM node.',
		},
		{
			regex: /^HB_PORT=\d+$/i,
			type: 'env',
			label: 'HB_PORT',
			description:
				'Environment variable setting the HyperBEAM HTTP listen port. Use a free private port; never 8734 if another node owns it.',
		},
		{
			regex: /^rebar3$/i,
			type: 'rebar3',
			label: 'rebar3',
			description: 'Erlang build tool — compiles HyperBEAM, runs tests, and manages Forge device workflows.',
		},
		{
			regex: /^rebar3\s+shell$/i,
			type: 'rebar3',
			label: 'rebar3 shell',
			description: 'Starts the Erlang VM with the hb application — your local HyperBEAM node.',
		},
		{
			regex: /^rebar3\s+device\s+test$/i,
			type: 'rebar3',
			label: 'rebar3 device test',
			description:
				'Forge command: packages the device, boots a test node, runs EUnit. Judge success by the EUnit summary, not exit code.',
		},
		{
			regex: /^rebar3\s+new\s+device\s+name=\w+$/i,
			type: 'rebar3',
			label: 'rebar3 new device',
			description: 'Scaffolds a new AO-Core device project with src/dev_<name>.erl.',
		},
		{
			regex: /^rebar3\s+device\s+(package|local|verify|preload|publish)$/i,
			type: 'rebar3',
			label: 'rebar3 device',
			description: 'Forge sub-commands for packaging, verifying, and loading devices.',
		},
		{
			regex: /^rebar3\s+compile$/i,
			type: 'rebar3',
			label: 'rebar3 compile',
			description: 'Compiles HyperBEAM and all dependencies.',
		},
		{
			regex: /^https?:\/\/localhost:\d+/i,
			type: 'url',
			label: 'Local URL',
			description: 'HTTP endpoint on your local HyperBEAM node. The path after the host is the HyperPATH to resolve.',
		},
		{
			regex: /^localhost$/i,
			type: 'host',
			label: 'localhost',
			description: 'Your machine — HyperBEAM listens here when running rebar3 shell.',
		},
		{
			regex: /^\d{4,5}$/,
			type: 'port',
			label: 'Port',
			description: 'TCP port the node listens on. Default is 8734; override with HB_PORT.',
		},
		{
			regex: /^~[\w.-]+@\d+\.\d+$/,
			type: 'device',
			label: 'Device binding',
			description:
				'Binds a device interpreter (e.g. ~meta@1.0) for subsequent key resolution on the current message.',
		},
		{
			regex: /^-[\w.-]+@\d+\.\d+/,
			type: 'message',
			label: 'Inline message',
			description:
				'Starts an inline message construction path. Fields after & are key=value assignments; /key resolves a leaf.',
		},
		{
			regex: /^\/[\w@./&=?#-]+$/,
			type: 'path',
			label: 'Key path',
			description: 'Slash-separated keys resolved on the current message by the active device.',
		},
		{
			regex: /^[\w-]+=integer=\d+$/,
			type: 'key',
			label: 'Typed field',
			description: 'TABM type annotation: assigns an integer value to a message key.',
		},
		{
			regex: /^[\w-]+=[\w.-]+$/,
			type: 'key',
			label: 'Field assignment',
			description: 'Assigns a value to a message key in an inline HyperPATH.',
		},
		{
			regex: /^-[\w]+$/,
			type: 'flag',
			label: 'Flag',
			description: 'Command-line flag passed to curl or other tools.',
		},
		{
			regex: /^\.\/install-template/,
			type: 'rebar3',
			label: 'install-template',
			description: 'HyperBEAM script that installs the Forge rebar3 device template.',
		},
	];

	function classifyToken(text) {
		for (const pattern of tokenPatterns) {
			if (pattern.regex.test(text)) {
				return { type: pattern.type, label: pattern.label, description: pattern.description };
			}
		}

		if (text.startsWith('~') && text.includes('@')) {
			return {
				type: 'device',
				label: 'Device binding',
				description: typeFallbacks.device.description,
			};
		}

		if (text.startsWith('/')) {
			return { type: 'path', label: 'Key path', description: typeFallbacks.path.description };
		}

		if (text.includes('=')) {
			return { type: 'key', label: 'Field', description: typeFallbacks.key.description };
		}

		if (['&', '/', '?', '#'].includes(text)) {
			return { type: 'operator', label: 'Separator', description: 'Separates segments of the HyperPATH or URL.' };
		}

		return { type: 'literal', label: text, description: typeFallbacks.literal.description };
	}

	function pushToken(tokens, text, start, end) {
		if (!text) return;
		const meta = classifyToken(text);
		tokens.push({ text, start, end, ...meta });
	}

	function parseCommandTokens(command) {
		const tokens = [];
		let i = 0;

		while (i < command.length) {
			if (command[i] === ' ') {
				i += 1;
				continue;
			}

			const remaining = command.slice(i);
			let matched = false;

			for (const pattern of tokenPatterns) {
				const match = remaining.match(pattern.regex);
				if (match && match.index === 0) {
					const text = match[0];
					pushToken(tokens, text, i, i + text.length);
					i += text.length;
					matched = true;
					break;
				}
			}
			if (matched) continue;

			if (remaining.startsWith('http://') || remaining.startsWith('https://')) {
				const urlMatch = remaining.match(/^https?:\/\/[^\s]+/);
				if (urlMatch) {
					const url = urlMatch[0];
					const hostMatch = url.match(/^(https?:\/\/)(localhost|\d+\.\d+\.\d+\.\d+)(:\d+)?(.*)$/i);
					if (hostMatch) {
						pushToken(tokens, hostMatch[1], i, i + hostMatch[1].length);
						let offset = i + hostMatch[1].length;
						pushToken(tokens, hostMatch[2], offset, offset + hostMatch[2].length);
						offset += hostMatch[2].length;
						if (hostMatch[3]) {
							pushToken(tokens, hostMatch[3].slice(1), offset + 1, offset + hostMatch[3].length);
							offset += hostMatch[3].length;
						}
						if (hostMatch[4]) {
							const pathParts = hostMatch[4].split(/(?=[/~&])|(?<=\/)/).filter(Boolean);
							for (const part of pathParts) {
								pushToken(tokens, part, offset, offset + part.length);
								offset += part.length;
							}
						}
					} else {
						pushToken(tokens, url, i, i + url.length);
					}
					i += url.length;
					continue;
				}
			}

			if (remaining.startsWith('-message@') || /^-[\w.-]+@\d/.test(remaining)) {
				const inlineMatch = remaining.match(/^-[\w.-]+@\d+\.\d+[^/\s]*/);
				const segment = inlineMatch ? inlineMatch[0] : remaining.split(/\s/)[0];
				const parts = segment.split(/(?=[&/])|(?<=[&/])/).filter(Boolean);
				let offset = i;
				for (const part of parts) {
					pushToken(tokens, part, offset, offset + part.length);
					offset += part.length;
				}
				i += segment.length;
				continue;
			}

			const wordMatch = remaining.match(/^[^\s&/=]+/);
			if (wordMatch) {
				const text = wordMatch[0];
				pushToken(tokens, text, i, i + text.length);
				i += text.length;
				continue;
			}

			pushToken(tokens, command[i], i, i + 1);
			i += 1;
		}

		return tokens;
	}

	function splitPathIntoTraversalSteps(pathToken) {
		const parts = [];
		const text = pathToken.text;
		let offset = pathToken.start;
		let pos = 0;

		const deviceMatch = text.match(/^(\/~[\w.-]+@\d+\.\d+)/);
		if (deviceMatch) {
			parts.push({
				text: deviceMatch[1],
				start: offset,
				end: offset + deviceMatch[1].length,
			});
			pos = deviceMatch[1].length;
		} else if (text.startsWith('/')) {
			const keyMatch = text.match(/^(\/[^/]+)/);
			if (keyMatch) {
				parts.push({
					text: keyMatch[1],
					start: offset,
					end: offset + keyMatch[1].length,
				});
				pos = keyMatch[1].length;
			}
		}

		while (pos < text.length) {
			const rest = text.slice(pos);
			const keyMatch = rest.match(/^(\/[^/]+)/);
			if (!keyMatch) break;
			parts.push({
				text: keyMatch[1],
				start: offset + pos,
				end: offset + pos + keyMatch[1].length,
			});
			pos += keyMatch[1].length;
		}

		return parts.length ? parts : [pathToken];
	}

	function getTraversalSections(commandText) {
		const tokens = parseCommandTokens(commandText);
		if (!tokens.length) return [];

		const sections = [tokens[0]];
		let index = 1;

		function pushSlice(start, end) {
			sections.push({
				text: commandText.slice(start, end),
				start: start,
				end: end,
			});
		}

		while (index < tokens.length) {
			const token = tokens[index];

			if (token.text === '/' && index + 1 < tokens.length) {
				const next = tokens[index + 1];
				if (
					next.text.startsWith('~') ||
					(next.text !== '/' &&
						next.text !== '&' &&
						next.text !== '=' &&
						next.type !== 'operator')
				) {
					pushSlice(token.start, next.end);
					index += 2;
					continue;
				}
			}

			if (token.text === '&') {
				let end = token.end;
				let cursor = index + 1;
				while (cursor < tokens.length) {
					const part = tokens[cursor];
					if (part.text === '/' || part.text === '&') break;
					end = part.end;
					cursor += 1;
				}
				pushSlice(token.start, end);
				index = cursor;
				continue;
			}

			if (token.type === 'path' || (token.text.startsWith('/') && token.text.length > 1)) {
				splitPathIntoTraversalSteps(token).forEach(function (step) {
					sections.push(step);
				});
				index += 1;
				continue;
			}

			if (token.text.startsWith('~') && token.text.includes('@')) {
				sections.push(token);
				index += 1;
				continue;
			}

			sections.push(token);
			index += 1;
		}

		return sections;
	}

	function getCommandSections(commandText) {
		return getTraversalSections(commandText);
	}

	function findSectionIndexForStart(sections, start) {
		return sections.findIndex(function (section) {
			return section.start === start;
		});
	}

	function extractHyperPath(command) {
		const trimmed = command.trim();
		if (!trimmed) return null;

		const relativeMatch = trimmed.match(/^curl\s+(?:-\w+\s+)*(\/?~[^\s]+|\/[^\s]*)/i);
		if (relativeMatch) {
			let path = relativeMatch[1];
			if (!path.startsWith('/')) path = '/' + path;
			return path;
		}

		const absoluteMatch = trimmed.match(/curl\s+(?:-\w+\s+)*https?:\/\/[^/\s]+(\/[^\s]*|~[^\s]*)/i);
		if (absoluteMatch) {
			let path = absoluteMatch[1];
			if (!path.startsWith('/')) path = '/' + path;
			return path;
		}

		if (/^\/?~/.test(trimmed)) {
			return trimmed.startsWith('/') ? trimmed : '/' + trimmed;
		}

		if (trimmed.startsWith('/')) {
			return trimmed.split(/\s/)[0];
		}

		return null;
	}

	function formatHttpStatusLabel(status, statusText) {
		const detail = (statusText || '').trim();
		return detail ? 'HTTP ' + status + ' ' + detail : 'HTTP ' + status;
	}

	function createEntryId() {
		return Date.now() + '-' + Math.random().toString(36).slice(2, 8);
	}

	function escapeHtml(value) {
		return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	function detectHighlightLanguage(text) {
		const trimmed = text.trim();
		if (!trimmed) return 'bash';

		if (/^<!DOCTYPE\s+html|^<html[\s>]/i.test(trimmed)) return 'markup';
		if (/^<\w+[^>]*>/.test(trimmed) && /<\/\w+>/.test(trimmed)) return 'markup';

		if (/^[\[{]/.test(trimmed)) {
			try {
				JSON.parse(trimmed);
				return 'json';
			} catch {
				// fall through
			}
		}

		if (/^curl\s/m.test(trimmed) && /HTTP\/\d/m.test(trimmed)) return 'http';
		if (/^curl\s/m.test(trimmed)) return 'bash';
		if (
			/HTTP\/\d/m.test(trimmed) ||
			/^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+/m.test(trimmed)
		) {
			return 'http';
		}

		if (/^===>/m.test(trimmed) || /^Erlang\/OTP/m.test(trimmed) || /^(\d+>|1>)/m.test(trimmed)) {
			return 'erlang';
		}

		if (
			/^rebar3\s/m.test(trimmed) ||
			/^HB_PORT=/m.test(trimmed) ||
			/^\.\/install-template/m.test(trimmed)
		) {
			return 'bash';
		}

		if (/^-[a-zA-Z]/.test(trimmed) || /^~[a-z]+@/.test(trimmed)) return 'bash';

		return 'bash';
	}

	function highlightResponse(text) {
		if (!text) return { html: '', language: 'plain' };

		const language = detectHighlightLanguage(text);
		if (typeof Prism !== 'undefined' && Prism.languages[language]) {
			return {
				html: Prism.highlight(text, Prism.languages[language], language),
				language: language,
			};
		}

		return { html: escapeHtml(text), language: 'plain' };
	}

	function readTrail() {
		try {
			const raw = sessionStorage.getItem(SESSION_KEY);
			if (!raw) return { entries: [], currentId: null };
			const parsed = JSON.parse(raw);
			const entries = Array.isArray(parsed.entries) ? parsed.entries : [];
			entries.forEach(function (entry, index) {
				if (!entry.step) {
					entry.step = index + 1;
				}
			});
			return {
				entries: entries,
				currentId: parsed.currentId || null,
			};
		} catch {
			return { entries: [], currentId: null };
		}
	}

	function writeTrail(trail) {
		sessionStorage.setItem(SESSION_KEY, JSON.stringify(trail));
	}

	const form = document.getElementById('command-form');
	const shell = document.getElementById('command-shell');
	const inspectLayer = document.getElementById('inspect-layer');
	const input = document.getElementById('command-input');
	const trailEl = document.getElementById('trail');
	const viewportEl = document.getElementById('app-viewport');
	const autocompleteEl = document.getElementById('autocomplete');
	const submitBtn = document.getElementById('command-submit');
	const sectionNavEl = document.getElementById('section-nav');
	const sectionPrevBtn = document.getElementById('section-prev');
	const sectionNextBtn = document.getElementById('section-next');
	const sectionIndicatorEl = document.getElementById('section-indicator');

	let command = DEFAULT_COMMAND;
	let isFocused = false;
	let hoveredToken = null;
	let activeSectionIndex = -1;
	let traversalFullCommand = '';
	let traversalDepth = -1;
	let running = false;
	let trail = readTrail();
	let highlightedId = null;
	let userPinnedScroll = false;
	let autocompleteRequest = 0;
	let autocompleteItems = [];
	let autocompleteIndex = -1;
	let keysCache = new Map();
	let deviceCatalogCache = null;

	async function getDeviceCatalog() {
		if (deviceCatalogCache) return deviceCatalogCache;

		try {
			const response = await fetch('/~meta@1.0/info/preloaded-devices-index~message@1.0/keys', {
				headers: { Accept: 'application/json' },
			});
			if (response.ok) {
				const data = await response.json();
				const names = Object.values(data).filter(function (value) {
					return typeof value === 'string' && /@\d+\.\d+$/.test(value);
				});
				if (names.length > 0) {
					deviceCatalogCache = names.sort();
					return deviceCatalogCache;
				}
			}
		} catch {
			// fall back to bundled catalog
		}

		deviceCatalogCache = PRELOADED_DEVICES.slice();
		return deviceCatalogCache;
	}

	input.value = command;
	input.placeholder = DEFAULT_COMMAND;

	function updateSubmitButton() {
		if (!submitBtn) return;
		submitBtn.disabled = running || !command.trim();
	}

	function scrollCurrentEntryToCenter(force) {
		if (!viewportEl) return;
		if (userPinnedScroll && !force) return;

		const currentRow = trailEl.querySelector('.trail-entry.is-current');
		if (!currentRow) return;

		requestAnimationFrame(function () {
			const viewportRect = viewportEl.getBoundingClientRect();
			const rowRect = currentRow.getBoundingClientRect();
			const rowCenter = rowRect.top + rowRect.height / 2;
			const viewportCenter = viewportRect.top + viewportRect.height / 2;
			const delta = rowCenter - viewportCenter;
			viewportEl.scrollTop += delta;
		});
	}

	function isCurrentEntryCentered() {
		const currentRow = trailEl.querySelector('.trail-entry.is-current');
		if (!currentRow || !viewportEl) return true;

		const viewportRect = viewportEl.getBoundingClientRect();
		const rowRect = currentRow.getBoundingClientRect();
		const rowCenter = rowRect.top + rowRect.height / 2;
		const viewportCenter = viewportRect.top + viewportRect.height / 2;
		return Math.abs(rowCenter - viewportCenter) < 72;
	}

	function getDeviceCompletionContext(text, cursor) {
		const before = text.slice(0, cursor);
		const match = before.match(/(?:^|[\s/&])(~[\w@.-]*)$/);
		if (!match) return null;

		const partial = match[1];
		return {
			replaceStart: before.length - partial.length,
			replaceEnd: cursor,
			prefix: partial.slice(1),
			partial: partial,
		};
	}

	function getCompletionContext(text, cursor) {
		const before = text.slice(0, cursor);
		const curlMatch = before.match(/^curl\s+(?:-\w+\s+)*/i);

		if (!curlMatch) {
			return {
				mode: 'command',
				replaceStart: 0,
				replaceEnd: cursor,
				prefix: before,
				parentPath: null,
				pathTail: '',
			};
		}

		const pathRegionStart = curlMatch[0].length;
		const pathBeforeCursor = before.slice(pathRegionStart);
		const lastSlash = pathBeforeCursor.lastIndexOf('/');
		const lastAmp = pathBeforeCursor.lastIndexOf('&');
		const lastSep = Math.max(lastSlash, lastAmp);

		if (lastSep < 0) {
			return {
				mode: 'path-root',
				replaceStart: pathRegionStart,
				replaceEnd: cursor,
				prefix: pathBeforeCursor,
				parentPath: null,
				pathTail: pathBeforeCursor,
			};
		}

		const pathTail = pathBeforeCursor.slice(0, lastSep + 1);
		const segmentPrefix = pathBeforeCursor.slice(lastSep + 1);
		let parentPath = pathTail.replace(/[&/]+$/, '');
		if (parentPath && !parentPath.startsWith('/')) {
			parentPath = '/' + parentPath;
		}

		return {
			mode: 'segment',
			replaceStart: pathRegionStart + lastSep + 1,
			replaceEnd: cursor,
			prefix: segmentPrefix,
			parentPath: parentPath || null,
			pathTail: pathTail,
		};
	}

	function extractCompletableKeys(data) {
		if (!data || typeof data !== 'object' || Array.isArray(data)) return [];

		return Object.keys(data)
			.filter(function (key) {
				if (key === 'commitments' || key === 'signature' || key === 'type') return false;
				const value = data[key];
				return typeof value !== 'object' || value === null;
			})
			.sort();
	}

	async function fetchPathKeys(path) {
		if (!path) return [];
		if (keysCache.has(path)) return keysCache.get(path);

		try {
			const response = await fetch(path, {
				headers: { Accept: 'application/json' },
			});
			if (!response.ok) return [];
			const data = await response.json();
			const keys = extractCompletableKeys(data);
			keysCache.set(path, keys);
			return keys;
		} catch {
			return [];
		}
	}

	async function buildSuggestions(text, cursor) {
		const before = text.slice(0, cursor);
		const after = text.slice(cursor);
		const deviceCtx = getDeviceCompletionContext(text, cursor);
		const ctx = getCompletionContext(text, cursor);
		const suggestions = [];
		const seen = new Set();

		function add(replaceStart, replaceEnd, insertText, label, detail) {
			const value = text.slice(0, replaceStart) + insertText + after;
			if (!insertText || seen.has(value) || value === text) return;
			seen.add(value);
			suggestions.push({ value: value, label: label || insertText, detail: detail || '' });
		}

		if (deviceCtx) {
			const catalog = await getDeviceCatalog();
			catalog.forEach(function (deviceName) {
				if (
					deviceCtx.prefix &&
					!deviceName.toLowerCase().startsWith(deviceCtx.prefix.toLowerCase())
				) {
					return;
				}
				const binding = '~' + deviceName;
				add(deviceCtx.replaceStart, cursor, binding, binding, 'device');
			});
			return suggestions;
		}

		STATIC_COMMANDS.forEach(function (cmd) {
			if (cmd.toLowerCase().startsWith(before.toLowerCase()) && cmd !== before) {
				add(0, cursor, cmd, cmd, 'command');
			}
		});

		if (before === '' || before === 'c' || before === 'cu' || before === 'cur') {
			add(0, cursor, 'curl ', 'curl ', 'HTTP client');
		}

		if (ctx.mode === 'path-root') {
			STATIC_COMMANDS.forEach(function (cmd) {
				const path = cmd.replace(/^curl\s+/, '');
				if (path.toLowerCase().startsWith((ctx.prefix || '').toLowerCase())) {
					add(ctx.replaceStart, cursor, path, path, 'path');
				}
			});
		}

		if (ctx.mode === 'segment' && ctx.parentPath) {
			if (/~[\w.-]+@\d+\.\d+$/.test(ctx.parentPath) && !ctx.prefix) {
				DEVICE_ROOT_KEYS.forEach(function (key) {
					add(ctx.replaceStart, cursor, key, key, 'common key');
				});
			}

			const keys = await fetchPathKeys(ctx.parentPath);
			keys.forEach(function (key) {
				if (ctx.prefix && !key.toLowerCase().startsWith(ctx.prefix.toLowerCase())) return;
				add(ctx.replaceStart, cursor, key, key, ctx.parentPath);
			});
		}

		return suggestions.slice(0, 8);
	}

	function hideAutocomplete() {
		autocompleteItems = [];
		autocompleteIndex = -1;
		if (!autocompleteEl) return;
		autocompleteEl.hidden = true;
		autocompleteEl.innerHTML = '';
		autocompleteEl.classList.remove('is-device-list');
	}

	function renderAutocomplete(items) {
		autocompleteItems = items;
		if (!autocompleteEl) return;
		autocompleteEl.innerHTML = '';
		autocompleteEl.classList.toggle(
			'is-device-list',
			items.length > 0 && items[0].detail === 'device',
		);

		if (!items.length || !isFocused) {
			hideAutocomplete();
			return;
		}

		items.forEach(function (item, index) {
			const button = document.createElement('button');
			button.type = 'button';
			button.className = 'autocomplete-item' + (index === autocompleteIndex ? ' is-active' : '');
			button.setAttribute('role', 'option');

			const label = document.createElement('span');
			label.className = 'autocomplete-item-label';
			label.textContent = item.label;

			button.appendChild(label);
			if (item.detail) {
				const detail = document.createElement('span');
				detail.className = 'autocomplete-item-detail';
				detail.textContent = item.detail;
				button.appendChild(detail);
			}

			button.addEventListener('mousedown', function (event) {
				event.preventDefault();
				applySuggestion(item);
			});

			autocompleteEl.appendChild(button);
		});

		autocompleteEl.hidden = false;
	}

	function applySuggestion(item) {
		if (!item) return;

		command = item.value;
		input.value = command;
		const caret = command.length;
		input.setSelectionRange(caret, caret);
		hideAutocomplete();
		renderInspectLayer();
		void queueAutocomplete();
	}

	async function queueAutocomplete() {
		const requestId = ++autocompleteRequest;
		const cursor = input.selectionStart ?? command.length;
		const items = await buildSuggestions(command, cursor);
		if (requestId !== autocompleteRequest) return;
		renderAutocomplete(items);
	}

	function resizeInput() {
		if (!input.value.trim()) {
			input.style.height = '';
			return;
		}
		input.style.height = 'auto';
		input.style.height = Math.min(input.scrollHeight, 120) + 'px';
	}

	function resolveTokenAtPoint(clientX, clientY) {
		const previousPointerEvents = input.style.pointerEvents;
		input.style.pointerEvents = 'none';
		const target = document.elementFromPoint(clientX, clientY);
		input.style.pointerEvents = previousPointerEvents;

		const segment = target && target.closest('[data-token-start]');
		if (!segment || !shell.contains(segment)) return null;

		const start = Number(segment.getAttribute('data-token-start'));
		if (Number.isNaN(start)) return null;

		return getCommandSections(command).find(function (token) {
			return token.start === start;
		}) || null;
	}

	function syncTraversalState(commandText, depth) {
		traversalFullCommand = commandText;
		const sections = getTraversalSections(commandText);
		if (typeof depth === 'number') {
			traversalDepth = Math.max(-1, Math.min(depth, sections.length - 1));
		} else {
			traversalDepth = sections.length > 0 ? sections.length - 1 : -1;
		}
		activeSectionIndex = traversalDepth;
	}

	function getMinTraversalDepth(fullCommand, sections) {
		for (let i = 0; i < sections.length; i++) {
			const candidate = fullCommand.slice(0, sections[i].end).trim();
			if (extractHyperPath(candidate)) return i;
		}
		return 0;
	}

	function updateSectionNav() {
		const fullCommand = traversalFullCommand || command;
		const sections = getTraversalSections(fullCommand);
		const hasSections = sections.length > 1;
		const minDepth = getMinTraversalDepth(fullCommand, sections);

		if (!sectionNavEl) return;

		sectionNavEl.hidden = !hasSections;
		if (!hasSections) return;

		if (sectionPrevBtn) {
			sectionPrevBtn.disabled = traversalDepth <= minDepth || running;
		}
		if (sectionNextBtn) {
			sectionNextBtn.disabled = traversalDepth >= sections.length - 1 || running;
		}

		if (sectionIndicatorEl) {
			if (traversalDepth >= 0) {
				sectionIndicatorEl.textContent =
					String(traversalDepth + 1) + ' / ' + String(sections.length);
			} else {
				sectionIndicatorEl.textContent = String(sections.length) + ' sections';
			}
		}
	}

	function focusSection(section, index) {
		if (!section) return;

		activeSectionIndex = index;
		traversalDepth = index;
		hoveredToken = null;
		input.focus();
		input.setSelectionRange(section.start, section.end);
		renderInspectLayer();
		updateSectionNav();
	}

	async function stepTraversal(delta) {
		if (running) return;

		if (!traversalFullCommand) {
			syncTraversalState(command);
		}

		const sections = getTraversalSections(traversalFullCommand);
		if (sections.length <= 1) return;

		const maxDepth = sections.length - 1;
		const nextDepth = traversalDepth + delta;
		if (nextDepth < 0 || nextDepth > maxDepth) return;

		traversalDepth = nextDepth;
		activeSectionIndex = nextDepth;
		const nextCommand = traversalFullCommand.slice(0, sections[nextDepth].end).trim();
		await submitCommand(nextCommand, { traversalStep: true });
	}

	function syncActiveSectionFromSelection() {
		const sections = getCommandSections(command);
		if (!sections.length) {
			activeSectionIndex = -1;
			return;
		}

		const cursor = input.selectionStart ?? command.length;
		const anchor = input.selectionEnd ?? cursor;
		const selectionStart = Math.min(cursor, anchor);
		const selectionEnd = Math.max(cursor, anchor);

		const matchedIndex = sections.findIndex(function (section) {
			return selectionStart >= section.start && selectionEnd <= section.end;
		});

		activeSectionIndex = matchedIndex;
		if (matchedIndex >= 0) {
			traversalDepth = matchedIndex;
		}
	}

	function getHighlightedSection(tokens) {
		if (hoveredToken) {
			return hoveredToken;
		}

		const depth = traversalDepth >= 0 ? traversalDepth : activeSectionIndex;
		if (depth >= 0 && depth < tokens.length) {
			return tokens[depth];
		}

		return null;
	}

	function renderInspectLayer() {
		const fullCommand = traversalFullCommand || command;
		const hasValue = Boolean(fullCommand.trim());
		const sections = getCommandSections(fullCommand);
		const inspectInteractive = hasValue && !isFocused;
		const inspectVisible = hasValue;
		const highlightedSection = getHighlightedSection(sections);
		const showInactive =
			traversalDepth >= 0 && sections.length > 1 && traversalDepth < sections.length - 1;

		inspectLayer.classList.toggle('is-visible', inspectVisible);
		inspectLayer.classList.toggle('is-interactive', inspectInteractive);
		input.classList.toggle('is-overlay', hasValue);
		input.classList.toggle('is-ghost', hasValue && !isFocused);

		if (!hasValue) {
			inspectLayer.innerHTML = '';
			resizeInput();
			updateSubmitButton();
			updateSectionNav();
			return;
		}

		const segments = document.createElement('div');
		segments.className = 'inspect-segments';

		sections.forEach(function (token, index) {
			const gapBefore =
				index === 0
					? fullCommand.slice(0, token.start)
					: fullCommand.slice(sections[index - 1].end, token.start);

			if (gapBefore) {
				const gap = document.createElement('span');
				gap.className = 'inspect-gap';
				if (showInactive && index > traversalDepth) {
					gap.classList.add('is-inactive');
				}
				gap.textContent = gapBefore;
				segments.appendChild(gap);
			}

			const wrap = document.createElement('span');
			wrap.className = 'inspect-segment-wrap';

			const segment = document.createElement('span');
			segment.className = 'inspect-segment';
			if (showInactive && index > traversalDepth) {
				segment.classList.add('is-inactive');
			}
			if (highlightedSection && highlightedSection.start === token.start) {
				segment.classList.add('is-active');
			}
			segment.setAttribute('data-token-start', String(token.start));
			segment.setAttribute('data-token-end', String(token.end));
			segment.textContent = token.text;
			segment.addEventListener('pointerdown', function (event) {
				event.preventDefault();
				selectToken(token);
			});
			wrap.appendChild(segment);
			segments.appendChild(wrap);
		});

		const trailing = sections.length
			? fullCommand.slice(sections[sections.length - 1].end)
			: fullCommand;
		if (trailing) {
			const gap = document.createElement('span');
			gap.className = 'inspect-gap is-inactive';
			gap.textContent = trailing;
			segments.appendChild(gap);
		}

		inspectLayer.innerHTML = '';
		inspectLayer.appendChild(segments);
		resizeInput();
		updateSubmitButton();
		updateSectionNav();
	}

	function selectToken(token) {
		const sections = getCommandSections(traversalFullCommand || command);
		const index = findSectionIndexForStart(sections, token.start);
		focusSection(token, index >= 0 ? index : -1);
	}

	function appendCommandBubble(parent, commandText) {
		const bubble = document.createElement('div');
		bubble.className = 'trail-command-bubble';

		const segments = document.createElement('div');
		segments.className = 'trail-command-segments';

		const prompt = document.createElement('span');
		prompt.className = 'trail-command-prompt';
		prompt.textContent = '$ ';
		segments.appendChild(prompt);

		const tokens = parseCommandTokens(commandText);
		if (tokens.length === 0) {
			segments.appendChild(document.createTextNode(commandText));
		} else {
			tokens.forEach(function (token, index) {
				const gapBefore =
					index === 0
						? commandText.slice(0, token.start)
						: commandText.slice(tokens[index - 1].end, token.start);

				if (gapBefore) {
					const gap = document.createElement('span');
					gap.className = 'trail-command-gap';
					gap.textContent = gapBefore;
					segments.appendChild(gap);
				}

				const segment = document.createElement('span');
				segment.className = 'trail-command-segment';
				segment.textContent = token.text;
				segments.appendChild(segment);
			});
		}

		bubble.appendChild(segments);
		parent.appendChild(bubble);
	}

	function renderTrail() {
		trailEl.innerHTML = '';

		trail.entries.forEach(function (entry) {
			const row = document.createElement('article');
			row.className = 'trail-entry';
			row.dataset.entryId = entry.id;

			if (entry.id === trail.currentId) {
				row.classList.add('is-current');
			} else if (entry.id === highlightedId) {
				row.classList.add('is-highlighted');
			}

			appendCommandBubble(row, entry.command);

			const outputCard = document.createElement('div');
			outputCard.className = 'trail-output-card';

			const isHttpError = entry.httpStatus !== undefined && entry.httpStatus >= 400;
			const isError = entry.kind === 'error' || isHttpError;

			const result = document.createElement('div');
			result.className = 'trail-result' + (isHttpError ? ' is-http-error' : '');

			const meta = document.createElement('div');
			meta.className = 'trail-result-meta';

			const label = document.createElement('span');
			label.className = 'trail-result-label';
			label.textContent = isHttpError ? 'Error response' : 'Response';

			const metaTrail = document.createElement('div');
			metaTrail.className = 'trail-result-meta-trail';

			if (entry.statusLabel) {
				const chip = document.createElement('span');
				chip.className = 'status-chip ' + (isHttpError || isError ? 'is-error' : 'is-success');
				chip.textContent = entry.statusLabel;
				metaTrail.appendChild(chip);
			}

			meta.appendChild(label);
			meta.appendChild(metaTrail);

			const highlighted = highlightResponse(entry.body || '');
			const body = document.createElement('pre');
			body.className = 'trail-code-output language-' + highlighted.language;
			const code = document.createElement('code');
			code.className = 'language-' + highlighted.language;
			code.innerHTML = highlighted.html;
			body.appendChild(code);

			result.appendChild(meta);
			result.appendChild(body);
			outputCard.appendChild(result);

			if (entry.hint) {
				const hint = document.createElement('p');
				hint.className = 'trail-output-note' + (isError ? ' is-error' : '');
				hint.textContent = entry.hint;
				outputCard.appendChild(hint);
			}

			row.appendChild(outputCard);
			trailEl.appendChild(row);
		});

		const currentRow = trailEl.querySelector('[data-entry-id="' + trail.currentId + '"]');
		if (currentRow) {
			scrollCurrentEntryToCenter(false);
		}
	}

	function buildHistoryUrl(step) {
		const url = new URL(window.location.href);
		url.searchParams.delete('path');
		url.searchParams.delete('entry');
		url.hash = '';
		if (step > 0) {
			url.searchParams.set('s', String(step));
		} else {
			url.searchParams.delete('s');
		}
		return url.pathname + url.search;
	}

	function pushHistoryState(entry, replace) {
		const state = {
			command: entry.command,
			path: entry.path,
			entryId: entry.id,
			step: entry.step,
		};
		const historyUrl = buildHistoryUrl(entry.step);
		if (replace) {
			history.replaceState(state, '', historyUrl);
		} else {
			history.pushState(state, '', historyUrl);
		}
	}

	function buildHint(status) {
		if (status === 404) {
			return 'HyperPATH not found on this node — check device name, version, and key path.';
		}
		if (status >= 500) {
			return 'Server error from HyperBEAM — check the node logs in your rebar3 shell.';
		}
		if (status >= 400) {
			return 'Request failed — verify the HyperPATH and that HyperBEAM is running.';
		}
		return undefined;
	}

	async function fetchPath(path) {
		const response = await fetch(path, {
			method: 'GET',
			headers: { Accept: 'application/json, text/plain, */*' },
		});

		const contentType = response.headers.get('content-type') || '';
		let body = await response.text();

		if (contentType.includes('application/json')) {
			try {
				body = JSON.stringify(JSON.parse(body), null, 2);
			} catch {
				// keep raw body
			}
		}

		const isError = response.status >= 400;
		return {
			body: body,
			httpStatus: response.status,
			statusLabel: formatHttpStatusLabel(response.status, response.statusText),
			kind: isError ? 'error' : 'success',
			hint: isError ? buildHint(response.status) : undefined,
		};
	}

	async function submitCommand(nextCommand, options) {
		const value = (nextCommand || command).trim();
		if (!value || running) return;

		const path = extractHyperPath(value);
		if (!path) {
			command = value;
			input.value = command;
			hideAutocomplete();
			renderInspectLayer();

			const entry = {
				id: createEntryId(),
				step: trail.entries.length + 1,
				command: value,
				path: '',
				body: 'Could not extract a HyperPATH from the command.\n\nTry: curl /~meta@1.0/info',
				kind: 'error',
				statusLabel: 'Parse error',
				timestamp: Date.now(),
			};
			trail.entries.push(entry);
			trail.currentId = entry.id;
			highlightedId = null;
			writeTrail(trail);
			renderTrail();
			userPinnedScroll = false;
			scrollCurrentEntryToCenter(true);

			if (!options || !options.traversalStep) {
				syncTraversalState(value);
			} else {
				activeSectionIndex = traversalDepth;
			}
			updateSectionNav();
			return;
		}

		running = true;
		userPinnedScroll = false;
		updateSubmitButton();
		command = value;
		input.value = command;
		hideAutocomplete();
		renderInspectLayer();

		let result;
		try {
			result = await fetchPath(path);
		} catch (error) {
			result = {
				body:
					'Could not reach ' +
					path +
					'\n\n' +
					String(error && error.message ? error.message : error),
				kind: 'error',
				statusLabel: 'Network error',
				hint: 'Is HyperBEAM running on this origin?',
			};
		}

		const entry = {
			id: createEntryId(),
			step: trail.entries.length + 1,
			command: value,
			path: path,
			body: result.body,
			kind: result.kind,
			httpStatus: result.httpStatus,
			statusLabel: result.statusLabel,
			hint: result.hint,
			timestamp: Date.now(),
		};

		const replace = options && options.replaceHistory;
		const skipHistoryPush = options && options.skipHistoryPush;

		trail.entries.push(entry);
		trail.currentId = entry.id;
		highlightedId = null;
		writeTrail(trail);
		renderTrail();

		if (!skipHistoryPush) {
			pushHistoryState(entry, replace);
		}

		running = false;
		updateSubmitButton();
		updateSectionNav();

		if (!options || !options.traversalStep) {
			syncTraversalState(value);
		} else {
			activeSectionIndex = traversalDepth;
		}
	}

	function restoreFromHistoryState(state, replaceHighlightOnly) {
		if (!state || !state.entryId) return;

		const entry = trail.entries.find(function (item) {
			return item.id === state.entryId;
		});

		if (!entry) return;

		command = state.command || entry.command;
		input.value = command;
		trail.currentId = entry.id;
		highlightedId = replaceHighlightOnly ? entry.id : null;
		syncTraversalState(command);
		writeTrail(trail);
		renderInspectLayer();
		renderTrail();
	}

	function findEntryByStep(step) {
		return trail.entries.find(function (item) {
			return item.step === step;
		});
	}

	function restoreEntry(entry, replaceUrl) {
		command = entry.command;
		input.value = command;
		trail.currentId = entry.id;
		syncTraversalState(command);
		const state = {
			command: entry.command,
			path: entry.path,
			entryId: entry.id,
			step: entry.step,
		};
		const historyUrl = buildHistoryUrl(entry.step);
		if (replaceUrl) {
			history.replaceState(state, '', historyUrl);
		}
	}

	function bootstrapFromUrl() {
		const url = new URL(window.location.href);
		const stepParam = url.searchParams.get('s');
		const legacyEntryId = url.searchParams.get('entry');
		const legacyPath = url.searchParams.get('path');

		if (stepParam) {
			const step = Number(stepParam);
			const existing = Number.isFinite(step) ? findEntryByStep(step) : undefined;
			if (existing) {
				restoreEntry(existing, true);
				return;
			}
		}

		if (legacyEntryId) {
			const existing = trail.entries.find(function (item) {
				return item.id === legacyEntryId;
			});
			if (existing) {
				restoreEntry(existing, true);
				return;
			}
		}

		if (legacyPath && trail.entries.length === 0) {
			command = legacyPath.startsWith('/') ? 'curl ' + legacyPath : 'curl /' + legacyPath;
			input.value = command;
			history.replaceState(null, '', buildHistoryUrl(0));
			return;
		}

		if (url.searchParams.has('path') || url.searchParams.has('entry')) {
			history.replaceState(null, '', buildHistoryUrl(0));
		}
	}

	input.addEventListener('input', function () {
		command = input.value;
		syncTraversalState(command);
		const sections = getTraversalSections(command);
		if (activeSectionIndex >= sections.length) {
			activeSectionIndex = -1;
		}
		renderInspectLayer();
		void queueAutocomplete();
	});

	input.addEventListener('focus', function () {
		isFocused = true;
		hoveredToken = null;
		syncActiveSectionFromSelection();
		renderInspectLayer();
		void queueAutocomplete();
	});

	input.addEventListener('blur', function () {
		isFocused = false;
		hoveredToken = null;
		syncActiveSectionFromSelection();
		renderInspectLayer();
		window.setTimeout(hideAutocomplete, 120);
	});

	input.addEventListener('click', function () {
		syncActiveSectionFromSelection();
		renderInspectLayer();
	});

	input.addEventListener('keyup', function () {
		syncActiveSectionFromSelection();
		updateSectionNav();
	});

	input.addEventListener('keydown', function (event) {
		if (!autocompleteEl.hidden && autocompleteItems.length > 0) {
			if (event.key === 'ArrowDown') {
				event.preventDefault();
				autocompleteIndex = (autocompleteIndex + 1) % autocompleteItems.length;
				renderAutocomplete(autocompleteItems);
				return;
			}
			if (event.key === 'ArrowUp') {
				event.preventDefault();
				autocompleteIndex =
					autocompleteIndex <= 0 ? autocompleteItems.length - 1 : autocompleteIndex - 1;
				renderAutocomplete(autocompleteItems);
				return;
			}
			if (event.key === 'Tab') {
				event.preventDefault();
				applySuggestion(autocompleteItems[Math.max(autocompleteIndex, 0)]);
				return;
			}
			if (event.key === 'Escape') {
				event.preventDefault();
				hideAutocomplete();
				return;
			}
			if (event.key === 'Enter' && !event.shiftKey && autocompleteIndex >= 0) {
				event.preventDefault();
				applySuggestion(autocompleteItems[autocompleteIndex]);
				return;
			}
		}

		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			hideAutocomplete();
			void submitCommand();
		}
	});

	input.addEventListener('mousemove', function (event) {
		if (!isFocused || !command.trim()) return;
		hoveredToken = resolveTokenAtPoint(event.clientX, event.clientY);
		renderInspectLayer();
	});

	input.addEventListener('mouseleave', function () {
		if (!isFocused) return;
		hoveredToken = null;
		renderInspectLayer();
	});

	shell.addEventListener('pointerdown', function (event) {
		if (event.target === input || event.target.closest('.command-submit')) return;
		event.preventDefault();
		input.focus();
	});

	if (submitBtn) {
		submitBtn.addEventListener('click', function (event) {
			event.preventDefault();
			if (submitBtn.disabled) return;
			hideAutocomplete();
			void submitCommand();
		});
	}

	if (sectionPrevBtn) {
		sectionPrevBtn.addEventListener('click', function () {
			void stepTraversal(-1);
		});
	}

	if (sectionNextBtn) {
		sectionNextBtn.addEventListener('click', function () {
			void stepTraversal(1);
		});
	}

	form.addEventListener('submit', function (event) {
		event.preventDefault();
		void submitCommand();
	});

	window.addEventListener('popstate', function (event) {
		if (event.state && event.state.entryId) {
			restoreFromHistoryState(event.state, true);
			return;
		}
		highlightedId = null;
		renderTrail();
	});

	if (viewportEl) {
		viewportEl.addEventListener(
			'scroll',
			function () {
				if (!trail.entries.length) return;
				userPinnedScroll = !isCurrentEntryCentered();
			},
			{ passive: true },
		);
	}

	bootstrapFromUrl();
	syncTraversalState(command);
	renderInspectLayer();
	renderTrail();
	updateSubmitButton();

	if (trail.entries.length === 0) {
		void submitCommand(command, { replaceHistory: true });
	} else {
		const current = trail.entries.find(function (item) {
			return item.id === trail.currentId;
		});
		if (current) {
			restoreEntry(current, true);
		}
	}

	if (typeof window.hideAppLoader === 'function') {
		window.hideAppLoader();
	}

	void getDeviceCatalog();
})();
