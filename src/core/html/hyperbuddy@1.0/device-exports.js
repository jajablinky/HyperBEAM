const PRELOADED_DEVICE_EXPORTS = {
	"ans104@1.0": [
		"commit",
		"content-type",
		"deserialize",
		"from",
		"serialize",
		"to",
		"to-hint",
		"verify"
	],
	"apply@1.0": [
		"default",
		"pair"
	],
	"arweave-block-cache@1.0": [
		"heights",
		"latest",
		"path",
		"read",
		"write"
	],
	"arweave-offset@1.0": [
		"get"
	],
	"arweave@1.0": [
		"block",
		"chunk",
		"current",
		"get-chunk",
		"pending",
		"post-chunk",
		"post-tx",
		"post-tx-header",
		"price",
		"raw",
		"status",
		"tx",
		"tx-anchor"
	],
	"auth-hook@1.0": [
		"request"
	],
	"blacklist@1.0": [
		"request"
	],
	"bundler-cache@1.0": [
		"complete-tx",
		"list-item-ids",
		"load-bundle-states",
		"load-items",
		"load-tx",
		"write-item",
		"write-tx"
	],
	"bundler-recovery@1.0": [
		"recover-bundles",
		"recover-unbundled-items"
	],
	"bundler-task@1.0": [
		"data-items-to-tx",
		"format-timestamp",
		"log-task",
		"worker-loop"
	],
	"bundler@1.0": [
		"ensure-server",
		"get-state",
		"item",
		"tx"
	],
	"cache@1.0": [
		"group",
		"link",
		"read",
		"write"
	],
	"cacheviz@1.0": [
		"dot",
		"index",
		"js",
		"json",
		"svg"
	],
	"cookie-auth@1.0": [
		"commit",
		"finalize",
		"generate",
		"verify"
	],
	"cookie@1.0": [
		"commit",
		"extract",
		"finalize",
		"from",
		"generate",
		"get-cookie",
		"opts",
		"reset",
		"store",
		"to",
		"verify"
	],
	"copycat-arweave@1.0": [
		"arweave"
	],
	"copycat-graphql@1.0": [
		"graphql"
	],
	"copycat@1.0": [
		"arweave",
		"graphql"
	],
	"cron@1.0": [
		"every",
		"once",
		"stop"
	],
	"delegated-compute@1.0": [
		"compute",
		"init",
		"normalize",
		"snapshot"
	],
	"faff@1.0": [
		"charge",
		"estimate"
	],
	"flat@1.0": [
		"commit",
		"deserialize",
		"from",
		"serialize",
		"to",
		"verify"
	],
	"genesis-wasm@1.0": [
		"compute",
		"import",
		"init",
		"latest-checkpoint",
		"normalize",
		"snapshot"
	],
	"gzip@1.0": [
		"unzip",
		"zip"
	],
	"http-auth@1.0": [
		"commit",
		"generate",
		"verify"
	],
	"httpsig-conv@1.0": [
		"encode-http-msg",
		"from",
		"to"
	],
	"httpsig-keyid@1.0": [
		"keyid-to-committer",
		"req-to-key-material"
	],
	"httpsig-proxy@1.0": [
		"commit",
		"verify"
	],
	"httpsig-siginfo@1.0": [
		"add-derived-specifiers",
		"commitment-to-sig-name",
		"commitments-to-siginfo",
		"committed-keys-to-siginfo",
		"from-siginfo-keys",
		"remove-derived-specifiers",
		"siginfo-to-commitments",
		"to-siginfo-keys"
	],
	"httpsig@1.0": [
		"add-content-digest",
		"commit",
		"from",
		"normalize-for-encoding",
		"proxy-commit",
		"proxy-verify",
		"serialize",
		"to",
		"verify"
	],
	"hyperbuddy@1.0": [
		"events",
		"format",
		"index",
		"metrics",
		"throw"
	],
	"json-iface@1.0": [
		"compute",
		"from",
		"init",
		"json-to-message",
		"message-to-json-struct",
		"to"
	],
	"json@1.0": [
		"commit",
		"committed",
		"content-type",
		"deserialize",
		"from",
		"serialize",
		"to",
		"verify"
	],
	"local-name@1.0": [
		"lookup",
		"register"
	],
	"location-cache@1.0": [
		"list",
		"read",
		"write"
	],
	"location@1.0": [
		"all",
		"known",
		"node",
		"read"
	],
	"lua-lib@1.0": [
		"event",
		"get",
		"install",
		"resolve",
		"set"
	],
	"lua-test@1.0": [
		"parse-spec"
	],
	"lua@1.0": [
		"decode",
		"encode",
		"functions",
		"init",
		"normalize",
		"pure-lua-process-benchmark",
		"snapshot"
	],
	"manifest@1.0": [
		"index",
		"request"
	],
	"match@1.0": [
		"all"
	],
	"message@1.0": [
		"commit",
		"committed",
		"committers",
		"get",
		"id",
		"index",
		"keys",
		"remove",
		"set",
		"set-path",
		"verify"
	],
	"meta@1.0": [
		"build",
		"info",
		"is-operator"
	],
	"metering@1.0": [
		"estimate",
		"price"
	],
	"name@1.0": [
		"request"
	],
	"p4@1.0": [
		"balance",
		"request",
		"response"
	],
	"patch@1.0": [
		"all",
		"compute",
		"init",
		"normalize",
		"patches",
		"snapshot"
	],
	"process-cache@1.0": [
		"latest",
		"read",
		"write"
	],
	"process-worker@1.0": [
		"await",
		"group",
		"notify-compute",
		"server",
		"stop"
	],
	"process@1.0": [
		"as",
		"compute",
		"info",
		"now",
		"push",
		"schedule",
		"slot",
		"snapshot"
	],
	"profile@1.0": [
		"eval"
	],
	"push@1.0": [
		"push"
	],
	"query-arweave@1.0": [
		"query"
	],
	"query-graphql@1.0": [
		"execute",
		"handle",
		"input",
		"keys-to-template",
		"test-query"
	],
	"query@1.0": [
		"all",
		"base",
		"graphql",
		"has-results",
		"only",
		"test-setup"
	],
	"rate-limit@1.0": [
		"request"
	],
	"recorder@1.0": [
		"index",
		"land",
		"maybe-append",
		"record",
		"take-off"
	],
	"relay@1.0": [
		"call",
		"cast",
		"request"
	],
	"router@1.0": [
		"info",
		"match",
		"preprocess",
		"register",
		"route",
		"routes"
	],
	"scheduler-cache@1.0": [
		"latest",
		"list",
		"read",
		"write",
		"write-spawn"
	],
	"scheduler-formats@1.0": [
		"aos2-normalize-types",
		"aos2-to-assignment",
		"aos2-to-assignments",
		"assignments-to-aos2",
		"assignments-to-bundle"
	],
	"scheduler-registry@1.0": [
		"find",
		"get-processes",
		"get-wallet",
		"start"
	],
	"scheduler-server@1.0": [
		"schedule",
		"start",
		"stop"
	],
	"scheduler@1.0": [
		"checkpoint",
		"init",
		"next",
		"schedule",
		"slot",
		"status"
	],
	"secret@1.0": [
		"commit",
		"export",
		"generate",
		"import",
		"list",
		"sync"
	],
	"simple-pay@1.0": [
		"balance",
		"charge",
		"estimate",
		"topup"
	],
	"stack@1.0": [
		"generate-append-device",
		"input-prefix",
		"output-prefix",
		"prefix",
		"router"
	],
	"structured@1.0": [
		"commit",
		"decode-ao-types",
		"decode-types",
		"decode-value",
		"encode-ao-types",
		"encode-types",
		"encode-value",
		"from",
		"implicit-keys",
		"is-list-from-ao-types",
		"to",
		"verify"
	],
	"test@1.0": [
		"append",
		"compute",
		"delay",
		"increment-counter",
		"index",
		"init",
		"load",
		"mangle",
		"mul",
		"postprocess",
		"restore",
		"snapshot",
		"test-func",
		"update-state"
	],
	"trie@1.0": [
		"get",
		"keys",
		"set"
	],
	"tx-from@1.0": [
		"fields"
	],
	"tx-to@1.0": [
		"excluded-tags",
		"fields-to-tx"
	],
	"tx@1.0": [
		"commit",
		"from",
		"to",
		"to-hint",
		"verify"
	],
	"wasi@1.0": [
		"clock-time-get",
		"compute",
		"fd-read",
		"fd-write",
		"init",
		"path-open",
		"stdout"
	],
	"wasm@1.0": [
		"compute",
		"import",
		"init",
		"instance",
		"normalize",
		"snapshot",
		"terminate"
	],
	"whois@1.0": [
		"echo",
		"ensure-host",
		"node"
	]
};
