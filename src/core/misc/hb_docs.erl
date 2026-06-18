%%% @doc Prototype protocol-native documentation payloads for HyperBEAM.
-module(hb_docs).
-export([node_info/2, device_info/3, maybe_info_request/3, is_node_info_request/2]).
-export([device_info_route/4]).
-export([node_info_data/1, device_info_data/2]).

-include("include/hb.hrl").
-include_lib("eunit/include/eunit.hrl").

-define(ARWEAVE_DEVICE, <<"arweave@2.9">>).
-define(MESSAGE_DEVICE, <<"message@1.0">>).
-define(COOKBOOK_DEVICE, <<"cookbook@1.0">>).
-define(PACKAGED_DEVICE_DOCS_ROOT, ["docs", "cookbook", "device-docs"]).

%% @doc Return true when an inbound request addresses node-root `/info`.
is_node_info_request([Base, Req], Opts) when is_map(Base), is_map(Req) ->
    not maps:is_key(<<"device">>, Base) andalso
        hb_path:hd(Req, Opts) =:= <<"info">>;
is_node_info_request(_, _Opts) ->
    false.

%% @doc Route complete `/info/...` paths before AO-Core resolves the `info`
%% device key. This keeps nested docs URLs such as `/~message@1.0/info/schema/field`
%% from resolving against the already-rendered HTML response.
maybe_info_request(Msgs, Req, Opts) ->
    case info_route(Msgs) of
        {node, Tail} -> {true, node_info_route(Tail, Req, Opts)};
        {device, Device, Tail} -> {true, device_info_route(Device, Tail, Req, Opts)};
        false -> false
    end.

info_route([Base, Info | Tail]) when is_map(Base), is_map(Info) ->
    case {maps:is_key(<<"device">>, Base), path_key(Info)} of
        {false, <<"info">>} -> {node, path_tail_keys(Tail)};
        _ -> false
    end;
info_route([{as, Device, _Base}, Info | Tail]) when is_map(Info) ->
    case {supported_device(Device), path_key(Info)} of
        {true, <<"info">>} -> {device, Device, path_tail_keys(Tail)};
        _ -> false
    end;
info_route(_) ->
    false.

path_key(Msg) ->
    hb_maps:get(<<"path">>, Msg, <<>>, #{}).

path_tail_keys(Tail) ->
    [path_key(Msg) || Msg <- Tail, is_map(Msg), path_key(Msg) =/= <<>>].

supported_device(?ARWEAVE_DEVICE) -> true;
supported_device(?MESSAGE_DEVICE) -> true;
supported_device(?COOKBOOK_DEVICE) -> true;
supported_device(_) -> false.

node_info(Req, Opts) ->
    Data = node_info_data(Opts),
    {ok, maybe_render(node, Data, Req)}.

device_info(Device, Req, Opts) ->
    Data = device_info_data(Device, Opts),
    {ok, maybe_render(device, Data, Req)}.

node_info_route([], Req, Opts) ->
    node_info(Req, Opts);
node_info_route([<<"assets">> | AssetPath], _Req, _Opts) ->
    docs_asset_response(AssetPath);
node_info_route([<<"schema">>], Req, Opts) ->
    Data = node_info_data(Opts),
    Payload = node_component_index(<<"node-schema-index">>, <<"schema">>, Data),
    respond_html_or_json(node_schema, Payload, Payload, Req);
node_info_route([<<"spec">>], Req, Opts) ->
    Data = node_info_data(Opts),
    Payload = node_component_index(<<"node-spec-index">>, <<"spec">>, Data),
    respond_html_or_json(node_spec, Payload, Payload, Req);
node_info_route([<<"recipes">>], Req, Opts) ->
    Data = node_info_data(Opts),
    Payload = node_component_index(<<"node-recipes-index">>, <<"recipes">>, Data),
    respond_html_or_json(node_recipes, Payload, Payload, Req);
node_info_route([<<"implementations">>], Req, Opts) ->
    Data = node_info_data(Opts),
    Payload = node_component_index(<<"node-implementations-index">>, <<"implementations">>, Data),
    respond_html_or_json(node_implementations, Payload, Payload, Req);
node_info_route([<<"boilerplate">>], Req, _Opts) ->
    Payload = boilerplate_index(),
    respond_html_or_json(node_boilerplate, Payload, Payload, Req);
node_info_route([<<"boilerplate">> | Parts], Req, _Opts) ->
    case boilerplate_page_payload(Parts) of
        {ok, Payload} ->
            respond_html_or_json(node_boilerplate_page, Payload, Payload, Req);
        not_found ->
            {ok, not_found_response()}
    end;
node_info_route([<<"concepts">>], Req, Opts) ->
    Data = node_info_data(Opts),
    Payload = #{
        <<"kind">> => <<"node-concepts-index">>,
        <<"concepts">> => maps:get(<<"concepts">>, Data, #{})
    },
    respond_html_or_json(node_concepts, Payload, Payload, Req);
node_info_route([<<"concepts">>, Concept], Req, Opts) ->
    Data = node_info_data(Opts),
    Concepts = maps:get(<<"concepts">>, Data, #{}),
    case maps:get(Concept, Concepts, undefined) of
        undefined -> {ok, not_found_response()};
        Description ->
            Payload = #{
                <<"kind">> => <<"node-concept">>,
                <<"concept">> => Concept,
                <<"description">> => Description
            },
            respond_html_or_json(node_concept, Payload, Payload, Req)
    end;
node_info_route(_Tail, _Req, _Opts) ->
    {ok, not_found_response()}.

device_info_route(Device, [], Req, Opts) ->
    device_info(Device, Req, Opts);
device_info_route(_Device, [<<"assets">> | AssetPath], _Req, _Opts) ->
    docs_asset_response(AssetPath);
device_info_route(Device, [<<"schema">>], Req, Opts) ->
    Data = device_info_data(Device, Opts),
    Schema = maps:get(<<"schema">>, Data, #{}),
    respond_html_or_json(schema_index, Data, Schema, Req);
device_info_route(Device, [<<"schema">>, Key], Req, Opts) ->
    Data = device_info_data(Device, Opts),
    Schema = maps:get(<<"schema">>, Data, #{}),
    case maps:get(Key, Schema, undefined) of
        undefined -> {ok, not_found_response()};
        KeySchema ->
            Payload = #{
                <<"device">> => maps:get(<<"device">>, Data, #{}),
                <<"device-data">> => Data,
                <<"key">> => Key,
                <<"schema">> => KeySchema
            },
            respond_html_or_json(schema_key, Payload, KeySchema, Req)
    end;
device_info_route(Device, [<<"schema">>, Key, Param], Req, Opts) ->
    Data = device_info_data(Device, Opts),
    Schema = maps:get(<<"schema">>, Data, #{}),
    case maps:get(Key, Schema, undefined) of
        undefined ->
            {ok, not_found_response()};
        KeySchema ->
            Params = maps:get(<<"parameters">>, KeySchema, #{}),
            case maps:get(Param, Params, undefined) of
                undefined ->
                    {ok, not_found_response()};
                ParamSchema ->
                    Payload = #{
                        <<"device">> => maps:get(<<"device">>, Data, #{}),
                        <<"device-data">> => Data,
                        <<"key">> => Key,
                        <<"parameter">> => Param,
                        <<"schema">> => ParamSchema
                    },
                    respond_html_or_json(schema_parameter, Payload, ParamSchema, Req)
            end
    end;
device_info_route(Device, [<<"spec">>], Req, Opts) ->
    Data = device_info_data(Device, Opts),
    Spec = maps:get(<<"spec">>, Data, #{}),
    respond_html_or_json(spec, Data, Spec, Req);
device_info_route(Device, [<<"recipes">>], Req, Opts) ->
    Data = device_info_data(Device, Opts),
    Recipes = maps:get(<<"recipes">>, Data, #{}),
    respond_html_or_json(recipes, Data, Recipes, Req);
device_info_route(Device, [<<"recipes">>, Slug], Req, Opts) ->
    Data = device_info_data(Device, Opts),
    Recipes = maps:get(<<"recipes">>, Data, #{}),
    case maps:get(Slug, Recipes, undefined) of
        undefined -> {ok, not_found_response()};
        Recipe ->
            Payload = #{
                <<"device">> => maps:get(<<"device">>, Data, #{}),
                <<"device-data">> => Data,
                <<"recipe">> => Recipe,
                <<"slug">> => Slug
            },
            respond_html_or_json(recipe, Payload, Recipe, Req)
    end;
device_info_route(Device, [<<"implementations">>], Req, Opts) ->
    Data = device_info_data(Device, Opts),
    Implementations = maps:get(<<"implementations">>, Data, []),
    respond_html_or_json(implementations, Data, Implementations, Req);
device_info_route(_Device, _Tail, _Req, _Opts) ->
    {ok, not_found_response()}.

respond_html_or_json(Kind, HtmlData, JsonData, Req) ->
    {ok,
        case wants_html(Req) of
            true -> html_response(Kind, HtmlData);
            false -> JsonData
        end}.

not_found_response() ->
    #{
        <<"status">> => 404,
        <<"content-type">> => <<"application/json">>,
        <<"body">> => <<"{\"error\":\"not found\"}">>
    }.

node_info_data(Opts) ->
    #{
        <<"kind">> => <<"node-info">>,
        <<"node">> => node_href(Opts),
        <<"summary">> =>
            <<"HyperBEAM node documentation index generated from the node's "
                "runtime device inventory prototype.">>,
        <<"renderer">> => cookbook_renderer(),
        <<"arweave-info">> => <<"/~arweave@2.9/info">>,
        <<"arweave-schema">> => <<"/~arweave@2.9/info/schema">>,
        <<"arweave-spec">> => <<"/~arweave@2.9/info/spec">>,
        <<"arweave-recipes">> => <<"/~arweave@2.9/info/recipes">>,
        <<"message-info">> => <<"/~message@1.0/info">>,
        <<"message-schema">> => <<"/~message@1.0/info/schema">>,
        <<"message-spec">> => <<"/~message@1.0/info/spec">>,
        <<"message-recipes">> => <<"/~message@1.0/info/recipes">>,
        <<"cookbook-info">> => <<"/~cookbook@1.0/info">>,
        <<"boilerplate-link">> => <<"/info/boilerplate">>,
        <<"devices">> => [
            #{
                <<"name">> => <<"arweave">>,
                <<"version">> => <<"2.9">>,
                <<"href">> => <<"/~arweave@2.9/info">>,
                <<"schema">> => <<"/~arweave@2.9/info/schema">>,
                <<"spec">> => <<"/~arweave@2.9/info/spec">>,
                <<"recipes">> => <<"/~arweave@2.9/info/recipes">>
            },
            #{
                <<"name">> => <<"message">>,
                <<"version">> => <<"1.0">>,
                <<"href">> => <<"/~message@1.0/info">>,
                <<"schema">> => <<"/~message@1.0/info/schema">>,
                <<"spec">> => <<"/~message@1.0/info/spec">>,
                <<"recipes">> => <<"/~message@1.0/info/recipes">>
            },
            #{
                <<"name">> => <<"cookbook">>,
                <<"version">> => <<"1.0">>,
                <<"href">> => <<"/~cookbook@1.0/info">>,
                <<"schema">> => <<"/~cookbook@1.0/info/schema">>,
                <<"spec">> => <<"/~cookbook@1.0/info/spec">>,
                <<"recipes">> => <<"/~cookbook@1.0/info/recipes">>
            }
        ],
        <<"boilerplate">> => boilerplate_index(),
        <<"concepts">> => #{
            <<"hyperbeam">> =>
                <<"A node runtime for AO-Core messages, devices, and "
                    "path-addressed computation.">>,
            <<"ao-core">> =>
                <<"The message execution model where each path segment applies "
                    "a request message to a base message.">>,
            <<"devices">> =>
                <<"Versioned interpreters that expose computable keys over "
                    "messages.">>,
            <<"messages">> =>
                <<"Typed key/value structures that carry data, commitments, "
                    "device names, and execution history.">>
        }
    }.

device_info_data(?ARWEAVE_DEVICE, Opts) ->
    #{
        <<"kind">> => <<"device-info">>,
        <<"device">> => #{
            <<"name">> => <<"arweave">>,
            <<"version">> => <<"2.9">>,
            <<"id">> => ?ARWEAVE_DEVICE,
            <<"spec-id">> => ?ARWEAVE_DEVICE
        },
        <<"device-id">> => ?ARWEAVE_DEVICE,
        <<"device-name">> => <<"arweave">>,
        <<"device-version">> => <<"2.9">>,
        <<"summary">> =>
            <<"Read Arweave network status, blocks, transactions, raw data, "
                "chunks, upload prices, anchors, and pending chunks through "
                "the node's configured Arweave route.">>,
        <<"renderer">> => cookbook_renderer(),
        <<"links">> => #{
            <<"self">> => <<"/~arweave@2.9/info">>,
            <<"schema">> => <<"/~arweave@2.9/info/schema">>,
            <<"spec">> => <<"/~arweave@2.9/info/spec">>,
            <<"recipes">> => <<"/~arweave@2.9/info/recipes">>,
            <<"implementations">> => <<"/~arweave@2.9/info/implementations">>
        },
        <<"schema-link">> => <<"/~arweave@2.9/info/schema">>,
        <<"specification-link">> => <<"/~arweave@2.9/info/spec">>,
        <<"recipes-link">> => <<"/~arweave@2.9/info/recipes">>,
        <<"keys">> => arweave_key_summaries(),
        <<"schema">> => arweave_schema(Opts),
        <<"schema-order">> => arweave_key_order(),
        <<"spec">> => arweave_spec_status(),
        <<"recipes">> => arweave_recipes(),
        <<"recipe-count">> => map_size(arweave_recipes()),
        <<"implementations">> => [
            #{
                <<"name">> => <<"dev_arweave">>,
                <<"module">> => <<"dev_arweave">>,
                <<"source">> => <<"src/preloaded/arweave/dev_arweave.erl">>,
                <<"status">> => <<"preloaded-source">>
            }
        ],
        <<"coverage">> => #{
            <<"spec">> => <<"missing">>,
            <<"schema">> => <<"generated-plus-parameter-docs">>,
            <<"recipes">> => <<"device-docs-arweave-workflow-pages">>,
            <<"parameter-docs">> => <<"prototype-core-keys">>
        },
        <<"spec-status">> => <<"missing">>
    };
device_info_data(?MESSAGE_DEVICE, Opts) ->
    #{
        <<"kind">> => <<"device-info">>,
        <<"device">> => #{
            <<"name">> => <<"message">>,
            <<"version">> => <<"1.0">>,
            <<"id">> => ?MESSAGE_DEVICE,
            <<"spec-id">> => ?MESSAGE_DEVICE
        },
        <<"device-id">> => ?MESSAGE_DEVICE,
        <<"device-name">> => <<"message">>,
        <<"device-version">> => <<"1.0">>,
        <<"summary">> =>
            <<"Construct messages from URL fields, read public keys, set or "
                "remove fields, calculate IDs, commit messages, and verify "
                "commitments.">>,
        <<"renderer">> => cookbook_renderer(),
        <<"links">> => #{
            <<"self">> => <<"/~message@1.0/info">>,
            <<"schema">> => <<"/~message@1.0/info/schema">>,
            <<"spec">> => <<"/~message@1.0/info/spec">>,
            <<"recipes">> => <<"/~message@1.0/info/recipes">>,
            <<"implementations">> => <<"/~message@1.0/info/implementations">>
        },
        <<"schema-link">> => <<"/~message@1.0/info/schema">>,
        <<"specification-link">> => <<"/~message@1.0/info/spec">>,
        <<"recipes-link">> => <<"/~message@1.0/info/recipes">>,
        <<"keys">> => message_key_summaries(),
        <<"schema">> => message_schema(Opts),
        <<"schema-order">> => message_key_order(),
        <<"spec">> => device_spec_status(?MESSAGE_DEVICE),
        <<"recipes">> => message_recipes(),
        <<"recipe-count">> => map_size(message_recipes()),
        <<"implementations">> => [
            #{
                <<"name">> => <<"dev_message">>,
                <<"module">> => <<"dev_message">>,
                <<"source">> => <<"src/preloaded/message/dev_message.erl">>,
                <<"status">> => <<"preloaded-source">>
            }
        ],
        <<"coverage">> => #{
            <<"spec">> => <<"specs/message@1.0.md">>,
            <<"schema">> => <<"generated-plus-parameter-docs">>,
            <<"recipes">> => <<"device-docs-message-pages">>,
            <<"traceability">> => <<"docs/device-recipes/modules/dev-message.md">>
        },
        <<"spec-status">> => maps:get(<<"spec-status">>, device_spec_status(?MESSAGE_DEVICE))
    };
device_info_data(?COOKBOOK_DEVICE, Opts) ->
    #{
        <<"kind">> => <<"device-info">>,
        <<"device">> => #{
            <<"name">> => <<"cookbook">>,
            <<"version">> => <<"1.0">>,
            <<"id">> => ?COOKBOOK_DEVICE,
            <<"spec-id">> => ?COOKBOOK_DEVICE
        },
        <<"device-id">> => ?COOKBOOK_DEVICE,
        <<"device-name">> => <<"cookbook">>,
        <<"device-version">> => <<"1.0">>,
        <<"summary">> =>
            <<"Prototype docs renderer device. It renders the shared docs object "
                "for node and device /info pages while the long-term HyperBuddy "
                "integration remains a separate decision.">>,
        <<"renderer">> => cookbook_renderer(),
        <<"links">> => #{
            <<"self">> => <<"/~cookbook@1.0/info">>,
            <<"schema">> => <<"/~cookbook@1.0/info/schema">>,
            <<"spec">> => <<"/~cookbook@1.0/info/spec">>,
            <<"recipes">> => <<"/~cookbook@1.0/info/recipes">>,
            <<"implementations">> => <<"/~cookbook@1.0/info/implementations">>
        },
        <<"schema-link">> => <<"/~cookbook@1.0/info/schema">>,
        <<"specification-link">> => <<"/~cookbook@1.0/info/spec">>,
        <<"recipes-link">> => <<"/~cookbook@1.0/info/recipes">>,
        <<"keys">> => cookbook_key_summaries(),
        <<"schema">> => cookbook_schema(Opts),
        <<"schema-order">> => cookbook_key_order(),
        <<"spec">> => device_spec_status(?COOKBOOK_DEVICE),
        <<"recipes">> => #{},
        <<"recipe-count">> => 0,
        <<"implementations">> => [
            #{
                <<"name">> => <<"dev_cookbook">>,
                <<"module">> => <<"dev_cookbook">>,
                <<"source">> => <<"src/preloaded/node/dev_cookbook.erl">>,
                <<"status">> => <<"preloaded-source">>
            }
        ],
        <<"coverage">> => #{
            <<"spec">> => <<"specs/cookbook@1.0.md">>,
            <<"schema">> => <<"prototype-renderer-keys">>,
            <<"recipes">> => <<"not-applicable">>,
            <<"renderer">> => <<"cookbook@1.0">>
        },
        <<"spec-status">> => maps:get(<<"spec-status">>, device_spec_status(?COOKBOOK_DEVICE))
    };
device_info_data(Device, _Opts) ->
    #{
        <<"kind">> => <<"device-info">>,
        <<"device">> => #{ <<"id">> => Device },
        <<"status">> => <<"not-implemented">>,
        <<"summary">> => <<"No prototype docs payload exists for this device.">>
    }.

maybe_render(Kind, Data, Req) ->
    case wants_html(Req) of
        true ->
            html_response(Kind, Data);
        false ->
            Data
    end.

wants_html(Req) ->
    Accept = hb_util:to_lower(hb_maps:get(<<"accept">>, Req, <<"">>, #{})),
    binary:match(Accept, <<"text/html">>) =/= nomatch andalso
        binary:match(Accept, <<"application/json">>) =:= nomatch.

html_response(node, Data) ->
    html_doc_response(render_node_html(Data));
html_response(device, Data) ->
    Links = maps:get(<<"links">>, Data, #{}),
    maps:merge(
        html_doc_response(render_device_html(Data)),
        #{
        <<"schema+link">> => maps:get(<<"schema">>, Links, <<>>),
        <<"specification+link">> => maps:get(<<"spec">>, Links, <<>>),
            <<"recipes+link">> => maps:get(<<"recipes">>, Links, <<>>)
        }
    );
html_response(schema_index, Data) ->
    html_doc_response(render_schema_index_html(Data));
html_response(schema_key, Data) ->
    html_doc_response(render_schema_key_html(Data));
html_response(schema_parameter, Data) ->
    html_doc_response(render_schema_parameter_html(Data));
html_response(spec, Data) ->
    html_doc_response(render_spec_html(Data));
html_response(recipes, Data) ->
    html_doc_response(render_recipes_html(Data));
html_response(recipe, Data) ->
    html_doc_response(render_recipe_html(Data));
html_response(implementations, Data) ->
    html_doc_response(render_implementations_html(Data));
html_response(node_schema, Data) ->
    html_doc_response(render_node_component_html(<<"Schema">>, Data));
html_response(node_spec, Data) ->
    html_doc_response(render_node_component_html(<<"Spec">>, Data));
html_response(node_recipes, Data) ->
    html_doc_response(render_node_component_html(<<"Recipes">>, Data));
html_response(node_implementations, Data) ->
    html_doc_response(render_node_component_html(<<"Implementations">>, Data));
html_response(node_boilerplate, Data) ->
    html_doc_response(render_node_boilerplate_html(Data));
html_response(node_boilerplate_page, Data) ->
    html_doc_response(render_node_boilerplate_page_html(Data));
html_response(node_concepts, Data) ->
    html_doc_response(render_node_concepts_html(Data));
html_response(node_concept, Data) ->
    html_doc_response(render_node_concept_html(Data)).

html_doc_response(Body) ->
    #{
        <<"status">> => 200,
        <<"content-type">> => <<"text/html; charset=utf-8">>,
        <<"body">> => Body
    }.

node_href(Opts) ->
    Host = hb_opts:get(node_host, <<"localhost">>, Opts),
    Port = hb_opts:get(port, 8734, Opts),
    iolist_to_binary(["http://", hb_util:bin(Host), ":", hb_util:bin(Port)]).

cookbook_renderer() ->
    #{
        <<"device">> => ?COOKBOOK_DEVICE,
        <<"node-renderer">> => <<"/~cookbook@1.0/index">>,
        <<"device-renderer">> => <<"/~cookbook@1.0/device?for=<device@version>">>,
        <<"source">> => <<"src/preloaded/node/dev_cookbook.erl">>,
        <<"status">> => <<"prototype-renderer-device">>
    }.

node_component_index(Kind, LinkKey, Data) ->
    Devices = maps:get(<<"devices">>, Data, []),
    #{
        <<"kind">> => Kind,
        <<"renderer">> => maps:get(<<"renderer">>, Data, cookbook_renderer()),
        <<"devices">> =>
            [
                #{
                    <<"device">> =>
                        <<(maps:get(<<"name">>, Device))/binary, "@",
                            (maps:get(<<"version">>, Device))/binary>>,
                    <<"href">> => maps:get(LinkKey, Device, maps:get(<<"href">>, Device, <<>>))
                }
            || Device <- Devices
            ]
    }.

arweave_key_summaries() ->
    [
        key_summary(<<"status">>, <<"computed">>, <<"Proxy the Arweave gateway /info endpoint.">>),
        key_summary(<<"current">>, <<"computed">>, <<"Return current Arweave network/block information.">>),
        key_summary(<<"tx">>, <<"computed">>, <<"Read or post an Arweave transaction as an AO-Core message.">>),
        key_summary(<<"raw">>, <<"computed">>, <<"Read raw transaction bytes and raw-data metadata.">>),
        key_summary(<<"chunk">>, <<"computed">>, <<"Read or post Arweave data chunks by offset.">>),
        key_summary(<<"block">>, <<"computed">>, <<"Read a block by height or block ID.">>),
        key_summary(<<"price">>, <<"computed">>, <<"Quote the gateway upload price for a byte size or target.">>),
        key_summary(<<"tx_anchor">>, <<"computed">>, <<"Read the current transaction anchor.">>),
        key_summary(<<"pending">>, <<"computed">>, <<"Read chunks for an unconfirmed transaction.">>)
    ].

key_summary(Name, Kind, Description) ->
    device_key_summary(?ARWEAVE_DEVICE, Name, Kind, Description).

device_key_summary(Device, Name, Kind, Description) ->
    #{
        <<"name">> => Name,
        <<"kind">> => Kind,
        <<"description">> => Description,
        <<"href">> => <<"/~", Device/binary, "/", Name/binary>>
    }.

arweave_schema(Opts) ->
    Static = maps:from_list([{Name, arweave_key_schema(Name)} || Name <- arweave_key_order()]),
    Static#{
        <<"generated">> => generated_schema(Opts),
        <<"source">> => <<"hb_types:extract(dev_arweave, Opts)">>
    }.

generated_schema(Opts) ->
    generated_schema(dev_arweave, Opts).

generated_schema(Module, Opts) ->
    case hb_types:extract(Module, Opts#{ <<"hashpath">> => ignore }) of
        {ok, Schema} -> Schema;
        {error, Reason} ->
            #{
                <<"status">> => <<"unavailable">>,
                <<"reason">> => hb_util:bin(io_lib:format("~tp", [Reason]))
            }
    end.

arweave_key_schema(<<"status">>) ->
    schema_key(
        <<"status">>,
        <<"Proxy the Arweave gateway /info endpoint.">>,
        #{}
    );
arweave_key_schema(<<"current">>) ->
    schema_key(
        <<"current">>,
        <<"Return current network and block metadata from the configured route.">>,
        #{}
    );
arweave_key_schema(<<"tx">>) ->
    schema_key(
        <<"tx">>,
        <<"Read a transaction into a HyperBEAM message, or POST a signed transaction.">>,
        #{
            <<"tx">> =>
                param(<<"tx">>, true, <<"id">>, <<"Arweave transaction ID to read.">>,
                    <<"ptBC0UwDmrUTBQX3MqZ1lB57ex20ygwzkjjCrQjIx3o">>),
            <<"exclude-data">> =>
                param(<<"exclude-data">>, false, <<"boolean">>,
                    <<"Return only transaction headers when true.">>, <<"true">>),
            <<"target">> =>
                param(<<"target">>, false, <<"enum">>,
                    <<"Select whether POST input comes from request, base, or a named path.">>,
                    <<"request">>)
        }
    );
arweave_key_schema(<<"raw">>) ->
    schema_key(
        <<"raw">>,
        <<"Read raw transaction data, with optional range metadata.">>,
        #{
            <<"raw">> =>
                param(<<"raw">>, true, <<"id">>, <<"Transaction or data item ID.">>,
                    <<"wKzEejXI5AlypYl82NYzgtBNIAOg10Ui0EWM4bkYRN4">>),
            <<"range">> =>
                param(<<"range">>, false, <<"http-range">>,
                    <<"Byte range, for example bytes 0-63/774.">>,
                    <<"bytes 0-63/774">>)
        }
    );
arweave_key_schema(<<"chunk">>) ->
    schema_key(
        <<"chunk">>,
        <<"Fetch exact byte ranges from the weave by offset and length.">>,
        #{
            <<"offset">> =>
                param(<<"offset">>, true, <<"integer">>,
                    <<"Starting weave byte offset.">>, <<"378092137521399">>),
            <<"length">> =>
                param(<<"length">>, true, <<"integer">>,
                    <<"Number of bytes to read.">>, <<"1000">>)
        }
    );
arweave_key_schema(<<"block">>) ->
    schema_key(
        <<"block">>,
        <<"Read a block by height or block ID.">>,
        #{
            <<"block">> =>
                param(<<"block">>, true, <<"integer-or-id">>,
                    <<"Block height or 64-byte block ID.">>, <<"1749502">>)
        }
    );
arweave_key_schema(<<"price">>) ->
    schema_key(
        <<"price">>,
        <<"Quote the Arweave gateway upload price.">>,
        #{
            <<"size">> =>
                param(<<"size">>, true, <<"integer">>,
                    <<"Payload byte count to quote.">>, <<"1024">>),
            <<"target">> =>
                param(<<"target">>, false, <<"address">>,
                    <<"Optional target wallet address for the quote.">>, <<"">>)
        }
    );
arweave_key_schema(<<"tx_anchor">>) ->
    schema_key(
        <<"tx_anchor">>,
        <<"Read the current transaction anchor from the configured route.">>,
        #{}
    );
arweave_key_schema(<<"pending">>) ->
    schema_key(
        <<"pending">>,
        <<"Read chunks for an unconfirmed transaction.">>,
        #{
            <<"pending">> =>
                param(<<"pending">>, true, <<"id">>,
                    <<"Pending transaction ID.">>, <<"">>),
            <<"offset">> =>
                param(<<"offset">>, false, <<"integer">>,
                    <<"Optional pending chunk offset.">>, <<"0">>)
        }
    ).

message_key_summaries() ->
    [
        device_key_summary(?MESSAGE_DEVICE, <<"default field access">>, <<"computed">>,
            <<"Read public fields directly by path segment.">>),
        device_key_summary(?MESSAGE_DEVICE, <<"keys">>, <<"computed">>,
            <<"List public keys visible on the message.">>),
        device_key_summary(?MESSAGE_DEVICE, <<"set">>, <<"computed">>,
            <<"Merge request fields into a target message.">>),
        device_key_summary(?MESSAGE_DEVICE, <<"remove">>, <<"computed">>,
            <<"Remove fields from a target message.">>),
        device_key_summary(?MESSAGE_DEVICE, <<"id">>, <<"computed">>,
            <<"Calculate or return a message ID.">>),
        device_key_summary(?MESSAGE_DEVICE, <<"commit">>, <<"computed">>,
            <<"Commit a message with a configured commitment device.">>),
        device_key_summary(?MESSAGE_DEVICE, <<"verify">>, <<"computed">>,
            <<"Verify selected or all message commitments.">>)
    ].

cookbook_key_summaries() ->
    [
        device_key_summary(?COOKBOOK_DEVICE, <<"index">>, <<"computed">>,
            <<"Render the node documentation index.">>),
        device_key_summary(?COOKBOOK_DEVICE, <<"node">>, <<"computed">>,
            <<"Render the node documentation index.">>),
        device_key_summary(?COOKBOOK_DEVICE, <<"device">>, <<"computed">>,
            <<"Render documentation for a requested device.">>),
        device_key_summary(?COOKBOOK_DEVICE, <<"schema">>, <<"computed">>,
            <<"Render the schema page for a requested device.">>),
        device_key_summary(?COOKBOOK_DEVICE, <<"spec">>, <<"computed">>,
            <<"Render the spec page for a requested device.">>),
        device_key_summary(?COOKBOOK_DEVICE, <<"recipes">>, <<"computed">>,
            <<"Render the recipes page for a requested device.">>)
    ].

message_schema(Opts) ->
    Static = maps:from_list([{Name, message_key_schema(Name)} || Name <- message_key_order()]),
    Static#{
        <<"generated">> => generated_schema(dev_message, Opts),
        <<"source">> => <<"hb_types:extract(dev_message, Opts)">>
    }.

message_key_schema(<<"field">>) ->
    schema_key(
        ?MESSAGE_DEVICE,
        <<"field">>,
        <<"Read any public message field by using the field name as the path segment.">>,
        #{
            <<"field">> =>
                param(<<"field">>, true, <<"key">>,
                    <<"Public key present in the message, for example greeting or count.">>,
                    <<"greeting">>)
        }
    );
message_key_schema(<<"keys">>) ->
    schema_key(
        ?MESSAGE_DEVICE,
        <<"keys">>,
        <<"Return the public keys available on a message.">>,
        #{}
    );
message_key_schema(<<"set">>) ->
    schema_key(
        ?MESSAGE_DEVICE,
        <<"set">>,
        <<"Merge request fields into the target message.">>,
        #{
            <<"key">> =>
                param(<<"key">>, true, <<"key">>,
                    <<"Field name to set on the message.">>, <<"greeting">>),
            <<"value">> =>
                param(<<"value">>, true, <<"term">>,
                    <<"Field value; typed suffixes such as +integer are supported.">>,
                    <<"hello">>)
        }
    );
message_key_schema(<<"remove">>) ->
    schema_key(
        ?MESSAGE_DEVICE,
        <<"remove">>,
        <<"Remove selected fields from a message.">>,
        #{
            <<"key">> =>
                param(<<"key">>, true, <<"key-or-list">>,
                    <<"Field name or set of fields to remove.">>, <<"greeting">>)
        }
    );
message_key_schema(<<"id">>) ->
    schema_key(
        ?MESSAGE_DEVICE,
        <<"id">>,
        <<"Calculate the message ID, optionally using relevant existing commitments.">>,
        #{
            <<"id-device">> =>
                param(<<"id-device">>, false, <<"device">>,
                    <<"Device used to calculate the ID when no commitment ID is selected.">>,
                    <<"httpsig@1.0">>)
        }
    );
message_key_schema(<<"commit">>) ->
    schema_key(
        ?MESSAGE_DEVICE,
        <<"commit">>,
        <<"Commit the target message using the requested or default commitment device.">>,
        #{
            <<"commitment-device">> =>
                param(<<"commitment-device">>, false, <<"device">>,
                    <<"Commitment device, for example httpsig@1.0 or ans104@1.0.">>,
                    <<"httpsig@1.0">>),
            <<"type">> =>
                param(<<"type">>, false, <<"enum">>,
                    <<"Commitment type requested from the commitment device.">>,
                    <<"signed">>)
        }
    );
message_key_schema(<<"verify">>) ->
    schema_key(
        ?MESSAGE_DEVICE,
        <<"verify">>,
        <<"Verify commitments on a message.">>,
        #{
            <<"committers">> =>
                param(<<"committers">>, false, <<"list-or-all">>,
                    <<"Optional committer selector.">>, <<"all">>),
            <<"commitment-ids">> =>
                param(<<"commitment-ids">>, false, <<"list">>,
                    <<"Optional commitment ID selector.">>, <<"all">>)
        }
    ).

cookbook_schema(Opts) ->
    Static = maps:from_list([{Name, cookbook_key_schema(Name)} || Name <- cookbook_key_order()]),
    Static#{
        <<"generated">> => generated_schema(dev_cookbook, Opts),
        <<"source">> => <<"hb_types:extract(dev_cookbook, Opts)">>
    }.

cookbook_key_schema(<<"index">>) ->
    schema_key(
        ?COOKBOOK_DEVICE,
        <<"index">>,
        <<"Render the node documentation index using the cookbook docs shell.">>,
        #{}
    );
cookbook_key_schema(<<"node">>) ->
    schema_key(
        ?COOKBOOK_DEVICE,
        <<"node">>,
        <<"Render the node documentation index using the cookbook docs shell.">>,
        #{}
    );
cookbook_key_schema(<<"device">>) ->
    schema_key(
        ?COOKBOOK_DEVICE,
        <<"device">>,
        <<"Render documentation for the requested device ID.">>,
        #{
            <<"for">> =>
                param(<<"for">>, true, <<"device-id">>,
                    <<"Device ID to render, for example message@1.0.">>,
                    <<"message@1.0">>)
        }
    );
cookbook_key_schema(<<"schema">>) ->
    schema_key(
        ?COOKBOOK_DEVICE,
        <<"schema">>,
        <<"Render the schema page for the requested device ID.">>,
        #{
            <<"for">> =>
                param(<<"for">>, true, <<"device-id">>,
                    <<"Device ID whose schema should be rendered.">>,
                    <<"message@1.0">>)
        }
    );
cookbook_key_schema(<<"spec">>) ->
    schema_key(
        ?COOKBOOK_DEVICE,
        <<"spec">>,
        <<"Render the spec page for the requested device ID.">>,
        #{
            <<"for">> =>
                param(<<"for">>, true, <<"device-id">>,
                    <<"Device ID whose spec should be rendered.">>,
                    <<"message@1.0">>)
        }
    );
cookbook_key_schema(<<"recipes">>) ->
    schema_key(
        ?COOKBOOK_DEVICE,
        <<"recipes">>,
        <<"Render the recipes page for the requested device ID.">>,
        #{
            <<"for">> =>
                param(<<"for">>, true, <<"device-id">>,
                    <<"Device ID whose recipes should be rendered.">>,
                    <<"message@1.0">>)
        }
    ).

schema_key(Name, Description, Parameters) ->
    schema_key(?ARWEAVE_DEVICE, Name, Description, Parameters).

schema_key(Device, Name, Description, Parameters) ->
    Required = [
        ParamName
    ||  {ParamName, ParamSpec} <- maps:to_list(Parameters),
        maps:get(<<"required">>, ParamSpec, false) =:= true
    ],
    maps:merge(Parameters, #{
        <<"name">> => Name,
        <<"kind">> => <<"computed">>,
        <<"description">> => Description,
        <<"href">> => <<"/~", Device/binary, "/", Name/binary>>,
        <<"action-path-template">> => action_path_template(Device, Name),
        <<"parameter-names">> => join_names(maps:keys(Parameters)),
        <<"required-parameters">> => join_names(Required),
        <<"parameters">> => Parameters
    }).

action_path_template(?MESSAGE_DEVICE, <<"field">>) ->
    <<"/~message@1.0/{field}">>;
action_path_template(Device, Name) ->
    <<"/~", Device/binary, "/", Name/binary>>.

join_names([]) ->
    <<"">>;
join_names(Names) ->
    iolist_to_binary(lists:join(<<",">>, lists:sort(Names))).

param(Name, Required, Type, Description, Example) ->
    #{
        <<"name">> => Name,
        <<"required">> => Required,
        <<"type">> => Type,
        <<"description">> => Description,
        <<"example">> => Example
    }.

arweave_spec_status() ->
    device_spec_status(?ARWEAVE_DEVICE).

device_spec_status(Device) ->
    SourcePath = << "specs/", Device/binary, ".md" >>,
    TXID = device_spec_txid(Device),
    case file:read_file(binary_to_list(SourcePath)) of
        {ok, Markdown} ->
            #{
                <<"kind">> => <<"device-spec">>,
                <<"href">> => <<"/~", Device/binary, "/info/spec">>,
                <<"spec-status">> => <<"present">>,
                <<"coverage-status">> => <<"present">>,
                <<"source-path">> => SourcePath,
                <<"txid">> => TXID,
                <<"title">> => markdown_title(Markdown, Device),
                <<"summary">> => markdown_summary(Markdown),
                <<"markdown-bytes">> => byte_size(Markdown)
            };
        {error, _Reason} ->
            #{
                <<"kind">> => <<"device-spec">>,
                <<"href">> => <<"/~", Device/binary, "/info/spec">>,
                <<"spec-status">> => <<"missing">>,
                <<"coverage-status">> => <<"missing">>,
                <<"source-path">> => SourcePath,
                <<"txid">> => TXID,
                <<"summary">> =>
                    <<"The specs branch does not currently contain this device "
                        "specification file. This endpoint is stable so callers "
                        "can discover the missing coverage explicitly.">>,
                <<"next-action">> =>
                    <<"Write the normative device contract and replace this "
                        "placeholder with the spec body or content-addressed spec link.">>
            }
    end.

device_spec_txid(Device) ->
    TXIDPath = << "specs/", Device/binary, ".txid" >>,
    case file:read_file(binary_to_list(TXIDPath)) of
        {ok, Raw} ->
            TXID = trim(Raw),
            case is_arweave_txid(TXID) of
                true -> TXID;
                false -> <<>>
            end;
        {error, _Reason} ->
            <<>>
    end.

is_arweave_txid(TXID) when byte_size(TXID) =:= 43 ->
    lists:all(
        fun(Char) ->
            (Char >= $A andalso Char =< $Z) orelse
                (Char >= $a andalso Char =< $z) orelse
                (Char >= $0 andalso Char =< $9) orelse
                Char =:= $_ orelse Char =:= $-
        end,
        binary_to_list(TXID)
    );
is_arweave_txid(_TXID) ->
    false.

arweave_recipes() ->
    recipes_from_sources(arweave_recipe_sources()).

message_recipes() ->
    recipes_from_sources(message_recipe_sources()).

arweave_recipe_sources() ->
    [
        {<<"post-signed-data-to-arweave">>,
            <<"docs/device-recipes/examples/arweave@2.9/post-signed-data-to-arweave.md">>},
        {<<"read-transaction-messages">>,
            <<"docs/device-recipes/examples/arweave@2.9/read-transaction-messages.md">>},
        {<<"read-raw-data-and-ranges">>,
            <<"docs/device-recipes/examples/arweave@2.9/read-raw-data-and-ranges.md">>},
        {<<"read-chunk-ranges-by-offset">>,
            <<"docs/device-recipes/examples/arweave@2.9/read-chunk-ranges-by-offset.md">>},
        {<<"resolve-offset-addresses">>,
            <<"docs/device-recipes/examples/arweave@2.9/resolve-offset-addresses.md">>},
        {<<"inspect-and-reassemble-bundles">>,
            <<"docs/device-recipes/examples/arweave@2.9/inspect-and-reassemble-bundles.md">>}
    ].

message_recipe_sources() ->
    [
        {<<"build-a-message-and-serialize-it">>,
            <<"docs/recipes/message-to-json-pipe.md">>},
        {<<"build-a-typed-message-and-read-fields">>,
            <<"docs/devices/foundations/message-at-1-0.md">>,
            <<"Build a typed message and read fields">>},
        {<<"list-public-keys-for-a-constructed-message">>,
            <<"docs/devices/foundations/message-at-1-0.md">>,
            <<"List public keys for a constructed message">>},
        {<<"calculate-and-verify-ids-commitments">>,
            <<"docs/devices/foundations/message-at-1-0.md">>,
            <<"Calculate and verify IDs/commitments">>}
    ].

recipes_from_sources(Sources) ->
    maps:from_list([recipe_from_source_spec(Source) || Source <- Sources]).

recipe_from_source_spec({Slug, RelPath}) ->
    {Slug, recipe_from_source(Slug, RelPath, undefined)};
recipe_from_source_spec({Slug, RelPath, SectionTitle}) ->
    {Slug, recipe_from_source(Slug, RelPath, SectionTitle)}.

recipe_from_source(Slug, RelPath, SectionTitle) ->
    AbsPath = device_docs_path(RelPath),
    case file:read_file(binary_to_list(AbsPath)) of
        {ok, SourceMarkdown} ->
            Markdown = select_recipe_markdown(SourceMarkdown, SectionTitle),
            Blocks = code_blocks(Markdown),
            Runnable = [Block || Block <- Blocks, maps:get(<<"runnable">>, Block, false) =:= true],
            FirstCommand =
                case Runnable of
                    [First|_] -> command_preview(maps:get(<<"text">>, First, <<>>));
                    [] -> <<>>
                end,
            maps:merge(#{
                <<"name">> => Slug,
                <<"title">> => markdown_title(Markdown, Slug),
                <<"summary">> => markdown_summary(Markdown),
                <<"source">> => AbsPath,
                <<"source-relative">> => RelPath,
                <<"recipe-status">> => <<"loaded">>,
                <<"block-count">> => length(Blocks),
                <<"runnable-block-count">> => length(Runnable),
                <<"first-command">> => FirstCommand,
                <<"blocks">> => Blocks
            }, recipe_section_metadata(SectionTitle));
        {error, Reason} ->
            #{
                <<"name">> => Slug,
                <<"title">> => Slug,
                <<"summary">> => <<"Recipe source was not readable.">>,
                <<"source">> => AbsPath,
                <<"source-relative">> => RelPath,
                <<"recipe-status">> => <<"missing">>,
                <<"error">> => hb_util:bin(io_lib:format("~tp", [Reason])),
                <<"block-count">> => 0,
                <<"runnable-block-count">> => 0
            }
    end.

recipe_section_metadata(undefined) ->
    #{};
recipe_section_metadata(SectionTitle) ->
    #{ <<"source-section">> => SectionTitle }.

boilerplate_index() ->
    Pages = [boilerplate_page_entry(Page) || Page <- boilerplate_pages()],
    #{
        <<"kind">> => <<"node-boilerplate-index">>,
        <<"href">> => <<"/info/boilerplate">>,
        <<"summary">> =>
            <<"Reusable HyperBEAM, AO-Core, device, Forge, and reference docs "
                "packaged from the cookbook source corpus.">>,
        <<"source-root">> => hb_util:bin(device_docs_root()),
        <<"ui-source">> => <<"priv/docs/cookbook/device-docs/site">>,
        <<"build-script">> => <<"priv/docs/cookbook/device-docs/scripts/build-docs-site.mjs">>,
        <<"pages">> => Pages
    }.

boilerplate_page_payload(Parts) ->
    case boilerplate_relpath_from_parts(Parts) of
        undefined ->
            not_found;
        RelPath ->
            case lists:keyfind(RelPath, 2, boilerplate_pages()) of
                false ->
                    not_found;
                Page ->
                    Entry = boilerplate_page_entry(Page),
                    Source = device_docs_path(RelPath),
                    case file:read_file(binary_to_list(Source)) of
                        {ok, Markdown} ->
                            {ok, Entry#{
                                <<"kind">> => <<"node-boilerplate-page">>,
                                <<"markdown">> => Markdown,
                                <<"markdown-bytes">> => byte_size(Markdown)
                            }};
                        {error, Reason} ->
                            {ok, Entry#{
                                <<"kind">> => <<"node-boilerplate-page">>,
                                <<"markdown">> => <<>>,
                                <<"error">> => hb_util:bin(io_lib:format("~tp", [Reason]))
                            }}
                    end
            end
    end.

boilerplate_relpath_from_parts([]) ->
    undefined;
boilerplate_relpath_from_parts(Parts) ->
    case lists:all(fun safe_route_part/1, Parts) of
        true ->
            iolist_to_binary([<<"docs/">>, lists:join(<<"/">>, Parts), <<".md">>]);
        false ->
            undefined
    end.

safe_route_part(Part) when is_binary(Part) ->
    Part =/= <<>> andalso
        binary:match(Part, <<"/">>) =:= nomatch andalso
        binary:match(Part, <<"..">>) =:= nomatch;
safe_route_part(_) ->
    false.

boilerplate_page_entry({Section, RelPath, FallbackTitle}) ->
    Source = device_docs_path(RelPath),
    Markdown =
        case file:read_file(binary_to_list(Source)) of
            {ok, Body} -> Body;
            {error, _Reason} -> <<>>
        end,
    #{
        <<"section">> => Section,
        <<"title">> => markdown_title(Markdown, FallbackTitle),
        <<"summary">> => markdown_summary(Markdown),
        <<"href">> => boilerplate_href(RelPath),
        <<"source">> => Source,
        <<"source-relative">> => RelPath
    }.

boilerplate_href(<<"docs/", Rest/binary>>) ->
    WithoutExt = strip_suffix(Rest, <<".md">>),
    <<"/info/boilerplate/", WithoutExt/binary>>;
boilerplate_href(RelPath) ->
    WithoutExt = strip_suffix(RelPath, <<".md">>),
    <<"/info/boilerplate/", WithoutExt/binary>>.

strip_suffix(Bin, Suffix) ->
    case ends_with(Bin, Suffix) of
        true -> binary:part(Bin, 0, byte_size(Bin) - byte_size(Suffix));
        false -> Bin
    end.

boilerplate_pages() ->
    [
        {<<"Overview">>, <<"docs/index.md">>, <<"HyperBEAM Docs">>},
        {<<"Introduction">>, <<"docs/introduction/index.md">>, <<"Introduction">>},
        {<<"Introduction">>, <<"docs/introduction/what-is-hyperbeam.md">>, <<"What Is HyperBEAM?">>},
        {<<"Introduction">>, <<"docs/introduction/what-is-ao-core.md">>, <<"What Is AO-Core?">>},
        {<<"Introduction">>, <<"docs/introduction/ao-devices.md">>, <<"AO Devices">>},
        {<<"Introduction">>, <<"docs/introduction/pathing-in-ao-core.md">>, <<"Pathing In AO-Core">>},
        {<<"Using These Docs">>, <<"docs/getting-started/index.md">>, <<"Using These Docs">>},
        {<<"Using These Docs">>, <<"docs/getting-started/example-style.md">>, <<"Example Style">>},
        {<<"Devices">>, <<"docs/devices/index.md">>, <<"Devices">>},
        {<<"Device Forge">>, <<"docs/forge/index.md">>, <<"Device Forge">>},
        {<<"Device Forge">>, <<"docs/forge/create-a-device.md">>, <<"Create A Device">>},
        {<<"Device Forge">>, <<"docs/forge/install-template.md">>, <<"Install Template">>},
        {<<"Device Forge">>, <<"docs/forge/operator-configuration.md">>, <<"Operator Configuration">>},
        {<<"Device Forge">>, <<"docs/forge/publish-and-load.md">>, <<"Publish And Load">>},
        {<<"Device Forge">>, <<"docs/forge/run-local.md">>, <<"Run Local">>},
        {<<"Device Forge">>, <<"docs/forge/runbook.md">>, <<"Runbook">>},
        {<<"Device Forge">>, <<"docs/forge/test-package-verify.md">>, <<"Test Package Verify">>},
        {<<"Device Forge">>, <<"docs/forge/trusted-signers-and-pins.md">>, <<"Trusted Signers And Pins">>},
        {<<"Recipes">>, <<"docs/recipes/index.md">>, <<"Recipes">>},
        {<<"Device Recipes">>, <<"docs/device-recipes/index.md">>, <<"Device Recipes">>},
        {<<"Device Recipes">>, <<"docs/device-recipes/recipe-format.md">>, <<"Recipe Format">>},
        {<<"Device Recipes">>, <<"docs/device-recipes/test-matrix.md">>, <<"Test Matrix">>},
        {<<"Device Recipes">>, <<"docs/device-recipes/evaluation.md">>, <<"Evaluation">>},
        {<<"Device Recipes">>, <<"docs/device-recipes/non-user-workflows.md">>, <<"Non-User Workflows">>},
        {<<"Reference">>, <<"docs/reference/glossary.md">>, <<"Glossary">>},
        {<<"Reference">>, <<"docs/reference/example-validation.md">>, <<"Example Validation">>},
        {<<"Reference">>, <<"docs/reference/device-inventory.md">>, <<"Device Inventory">>}
    ].

select_recipe_markdown(Markdown, undefined) ->
    Markdown;
select_recipe_markdown(Markdown, SectionTitle) ->
    case extract_markdown_section(Markdown, SectionTitle) of
        {ok, SectionMarkdown} -> SectionMarkdown;
        false -> Markdown
    end.

extract_markdown_section(Markdown, SectionTitle) ->
    Lines = binary:split(Markdown, <<"\n">>, [global]),
    extract_markdown_section_lines(Lines, SectionTitle).

extract_markdown_section_lines([], _SectionTitle) ->
    false;
extract_markdown_section_lines([Line | Rest], SectionTitle) ->
    case heading(trim(Line)) of
        {Level, Text} when Text =:= SectionTitle ->
            {SectionLines, _After} = take_section_body(Rest, Level, []),
            {ok,
                iolist_to_binary(
                    lists:join(<<"\n">>, [<<"# ", SectionTitle/binary>> | SectionLines])
                )};
        _ ->
            extract_markdown_section_lines(Rest, SectionTitle)
    end.

take_section_body([Line | Rest] = All, Level, Acc) ->
    case heading(trim(Line)) of
        {NextLevel, _Text} when NextLevel =< Level ->
            {lists:reverse(Acc), All};
        _ ->
            take_section_body(Rest, Level, [Line | Acc])
    end;
take_section_body([], _Level, Acc) ->
    {lists:reverse(Acc), []}.

device_docs_path(RelPath) ->
    hb_util:bin(filename:join([device_docs_root(), binary_to_list(RelPath)])).

device_docs_root() ->
    case os:getenv("HB_DEVICE_DOCS_ROOT") of
        false -> packaged_device_docs_root();
        "" -> packaged_device_docs_root();
        Root -> Root
    end.

packaged_device_docs_root() ->
    case code:priv_dir(hb) of
        {error, _Reason} ->
            filename:join(["priv" | ?PACKAGED_DEVICE_DOCS_ROOT]);
        PrivDir ->
            filename:join([PrivDir | ?PACKAGED_DEVICE_DOCS_ROOT])
    end.

command_preview(Text) ->
    OneLine0 = binary:replace(Text, <<"\r">>, <<" ">>, [global]),
    OneLine = binary:replace(OneLine0, <<"\n">>, <<" ">>, [global]),
    case byte_size(OneLine) > 1200 of
        true -> <<(binary:part(OneLine, 0, 1200))/binary, "...">>;
        false -> OneLine
    end.

arweave_key_order() ->
    [
        <<"status">>, <<"current">>, <<"tx">>, <<"raw">>, <<"chunk">>,
        <<"block">>, <<"price">>, <<"tx_anchor">>, <<"pending">>
    ].

message_key_order() ->
    [<<"field">>, <<"keys">>, <<"set">>, <<"remove">>, <<"id">>, <<"commit">>, <<"verify">>].

cookbook_key_order() ->
    [<<"index">>, <<"node">>, <<"device">>, <<"schema">>, <<"spec">>, <<"recipes">>].

render_node_html(Data) ->
    Devices = maps:get(<<"devices">>, Data),
    Renderer = maps:get(<<"renderer">>, Data, cookbook_renderer()),
    Boilerplate = maps:get(<<"boilerplate">>, Data, boilerplate_index()),
    Content =
        [
            <<"<p class=\"eyebrow\">Node</p><h1>HyperBEAM Docs</h1><p>">>,
            esc(maps:get(<<"summary">>, Data)),
            <<"</p><p class=\"hb-docs-renderer-note\">Rendered by <a href=\"">>,
            esc(maps:get(<<"node-renderer">>, Renderer)),
            <<"\">~">>, esc(maps:get(<<"device">>, Renderer)), <<"</a>.</p>">>,
            <<"<h2>Guides</h2>">>,
            boilerplate_structured_index(Boilerplate),
            <<"<h2>Devices</h2><div class=\"hb-docs-card-grid\">">>,
            [device_row(Device) || Device <- Devices],
            <<"</div><h2>Concepts</h2>">>,
            concept_rows(maps:get(<<"concepts">>, Data))
        ],
    docs_page_html(<<"HyperBEAM Node Info">>, node_sidebar(Devices), Content).

render_device_html(Data) ->
    Device = maps:get(<<"device">>, Data),
    DeviceID = maps:get(<<"id">>, Device),
    Schema = maps:get(<<"schema">>, Data),
    SchemaOrder = maps:get(<<"schema-order">>, Data, []),
    Recipes = maps:get(<<"recipes">>, Data),
    Spec = maps:get(<<"spec">>, Data),
    Content =
        [
            <<"<p class=\"eyebrow\">Device</p><h1>~">>,
            esc(maps:get(<<"id">>, Device)),
            <<"</h1><p>">>, esc(maps:get(<<"summary">>, Data)), <<"</p>">>,
            device_section_index(SchemaOrder, Spec, Recipes),
            <<"<h2 id=\"schema\">Schema</h2><table><thead><tr>"
                "<th>Key</th><th>Description</th><th>Parameters</th></tr></thead><tbody>">>,
            schema_rows(DeviceID, Schema, SchemaOrder),
            <<"</tbody></table>">>,
            render_spec_section(DeviceID, Spec),
            <<"<h2 id=\"recipes\">Recipes</h2><div class=\"hb-docs-card-grid\">">>,
            recipe_nav(Recipes),
            <<"</div>">>,
            <<"<h2>Runnable Workflows</h2>">>,
            recipe_rows(DeviceID, Recipes)
        ],
    docs_page_html(<<"HyperBEAM Device Info">>, device_sidebar(Data), Content).

render_schema_index_html(Data) ->
    Device = maps:get(<<"device">>, Data),
    DeviceID = maps:get(<<"id">>, Device),
    Schema = maps:get(<<"schema">>, Data, #{}),
    SchemaOrder = maps:get(<<"schema-order">>, Data, []),
    Content =
        [
            <<"<p class=\"eyebrow\">Schema</p><h1>~">>, esc(DeviceID),
            <<" schema</h1><table><thead><tr><th>Key</th><th>Description</th>"
                "<th>Parameters</th></tr></thead><tbody>">>,
            schema_rows(DeviceID, Schema, SchemaOrder),
            <<"</tbody></table>">>
        ],
    docs_page_html(<<"HyperBEAM Schema">>, device_sidebar(Data), Content).

render_schema_key_html(Payload) ->
    Data = maps:get(<<"device-data">>, Payload),
    Device = maps:get(<<"device">>, Payload),
    DeviceID = maps:get(<<"id">>, Device),
    Key = maps:get(<<"key">>, Payload),
    KeySchema = maps:get(<<"schema">>, Payload),
    Params = maps:get(<<"parameters">>, KeySchema, #{}),
    Content =
        [
            <<"<p class=\"eyebrow\">Schema Key</p><h1>~">>, esc(DeviceID),
            <<" / ">>, esc(Key), <<"</h1><p>">>,
            esc(maps:get(<<"description">>, KeySchema, <<>>)),
            <<"</p><h2>Parameters</h2>">>,
            params_table(DeviceID, Key, Params)
        ],
    docs_page_html(<<"HyperBEAM Schema Key">>, device_sidebar(Data), Content).

render_schema_parameter_html(Payload) ->
    Data = maps:get(<<"device-data">>, Payload),
    Device = maps:get(<<"device">>, Payload),
    DeviceID = maps:get(<<"id">>, Device),
    Key = maps:get(<<"key">>, Payload),
    Param = maps:get(<<"parameter">>, Payload),
    ParamSchema = maps:get(<<"schema">>, Payload),
    Content =
        [
            <<"<p class=\"eyebrow\">Schema Parameter</p><h1>~">>, esc(DeviceID),
            <<" / ">>, esc(Key), <<" / ">>, esc(Param), <<"</h1>">>,
            <<"<table><tbody>">>,
            <<"<tr><th>Name</th><td><code>">>, esc(Param), <<"</code></td></tr>">>,
            <<"<tr><th>Required</th><td>">>,
            case maps:get(<<"required">>, ParamSchema, false) of
                true -> <<"yes">>;
                false -> <<"no">>
            end,
            <<"</td></tr><tr><th>Type</th><td>">>,
            esc(maps:get(<<"type">>, ParamSchema, <<>>)),
            <<"</td></tr><tr><th>Description</th><td>">>,
            esc(maps:get(<<"description">>, ParamSchema, <<>>)),
            <<"</td></tr><tr><th>Example</th><td><code>">>,
            esc(maps:get(<<"example">>, ParamSchema, <<>>)),
            <<"</code></td></tr></tbody></table>">>
        ],
    docs_page_html(<<"HyperBEAM Schema Parameter">>, device_sidebar(Data), Content).

render_spec_html(Data) ->
    Device = maps:get(<<"device">>, Data),
    DeviceID = maps:get(<<"id">>, Device),
    Content =
        [
            <<"<p class=\"eyebrow\">Specification</p><h1>~">>, esc(DeviceID),
            <<" spec</h1>">>,
            render_spec_body(maps:get(<<"spec">>, Data, #{}))
        ],
    docs_page_html(<<"HyperBEAM Spec">>, device_sidebar(Data), Content).

render_recipes_html(Data) ->
    Device = maps:get(<<"device">>, Data),
    DeviceID = maps:get(<<"id">>, Device),
    Recipes = maps:get(<<"recipes">>, Data, #{}),
    Content =
        [
            <<"<p class=\"eyebrow\">Recipes</p><h1>~">>, esc(DeviceID),
            <<" recipes</h1><div class=\"hb-docs-card-grid\">">>,
            recipe_nav(Recipes),
            <<"</div>">>,
            recipe_rows(DeviceID, Recipes)
        ],
    docs_page_html(<<"HyperBEAM Recipes">>, device_sidebar(Data), Content).

render_recipe_html(Payload) ->
    Data = maps:get(<<"device-data">>, Payload),
    Recipe = maps:get(<<"recipe">>, Payload),
    Content =
        [
            <<"<article class=\"recipe markdown-section\">">>,
            <<"<p class=\"eyebrow\">">>,
            esc(maps:get(<<"source-relative">>, Recipe, <<>>)),
            <<"</p>">>,
            render_markdown(recipe_markdown(Recipe)),
            <<"</article>">>
        ],
    docs_page_html(<<"HyperBEAM Recipe">>, device_sidebar(Data), Content).

render_implementations_html(Data) ->
    Device = maps:get(<<"device">>, Data),
    DeviceID = maps:get(<<"id">>, Device),
    Implementations = maps:get(<<"implementations">>, Data, []),
    Content =
        [
            <<"<p class=\"eyebrow\">Implementations</p><h1>~">>, esc(DeviceID),
            <<" implementations</h1><table><thead><tr><th>Name</th><th>Module</th>"
                "<th>Source</th><th>Status</th></tr></thead><tbody>">>,
            [
                [
                    <<"<tr><td>">>, esc(maps:get(<<"name">>, Impl, <<>>)),
                    <<"</td><td><code>">>, esc(maps:get(<<"module">>, Impl, <<>>)),
                    <<"</code></td><td><code>">>, esc(maps:get(<<"source">>, Impl, <<>>)),
                    <<"</code></td><td>">>, esc(maps:get(<<"status">>, Impl, <<>>)),
                    <<"</td></tr>">>
                ]
            || Impl <- Implementations
            ],
            <<"</tbody></table>">>
        ],
    docs_page_html(<<"HyperBEAM Implementations">>, device_sidebar(Data), Content).

render_node_component_html(Title, Data) ->
    Devices = maps:get(<<"devices">>, Data, []),
    Content =
        [
            <<"<p class=\"eyebrow\">Node</p><h1>">>, esc(Title),
            <<" index</h1><div class=\"hb-docs-card-grid\">">>,
            [
                [
                    <<"<a class=\"hb-docs-card\" href=\"">>,
                    esc(maps:get(<<"href">>, Device, <<>>)),
                    <<"\"><strong>~">>, esc(maps:get(<<"device">>, Device, <<>>)),
                    <<"</strong><span>">>, esc(maps:get(<<"href">>, Device, <<>>)),
                    <<"</span><small>Open</small></a>">>
                ]
            || Device <- Devices
            ],
            <<"</div>">>
        ],
    docs_page_html(<<"HyperBEAM Node Index">>, node_sidebar_from_component(Devices), Content).

render_node_boilerplate_html(Data) ->
    Content =
        [
            <<"<p class=\"eyebrow\">Node</p><h1>Guides</h1><p>">>,
            esc(maps:get(<<"summary">>, Data, <<>>)),
            <<"</p>">>,
            boilerplate_structured_index(Data)
        ],
    docs_page_html(<<"HyperBEAM Guides">>, node_sidebar([]), Content).

render_node_boilerplate_page_html(Data) ->
    Markdown = maps:get(<<"markdown">>, Data, <<>>),
    Content =
        [
            <<"<p class=\"eyebrow\">Guide</p><h1>">>,
            esc(maps:get(<<"title">>, Data, <<>>)),
            <<"</h1>">>,
            render_markdown(drop_first_h1(Markdown))
        ],
    docs_page_html(<<"HyperBEAM Guide">>, node_sidebar([]), Content).

render_node_concepts_html(Data) ->
    Concepts = maps:get(<<"concepts">>, Data, #{}),
    Content =
        [
            <<"<p class=\"eyebrow\">Node</p><h1>Concepts</h1>">>,
            concept_rows(Concepts)
        ],
    docs_page_html(<<"HyperBEAM Concepts">>, node_sidebar([]), Content).

render_node_concept_html(Data) ->
    Concept = maps:get(<<"concept">>, Data, <<>>),
    Content =
        [
            <<"<p class=\"eyebrow\">Concept</p><h1>">>, esc(Concept),
            <<"</h1><p>">>, esc(maps:get(<<"description">>, Data, <<>>)), <<"</p>">>
        ],
    docs_page_html(<<"HyperBEAM Concept">>, node_sidebar([]), Content).

docs_page_html(Title, Sidebar, Content) ->
    iolist_to_binary([
        html_head(Title),
        <<"<body class=\"ready sticky hb-docs-protocol\"><main>">>,
        docs_sidebar(Sidebar),
        <<"<section class=\"content\"><article class=\"markdown-section\" id=\"main\">">>,
        Content,
        <<"</article></section></main>">>,
        docs_shell_assets(),
        <<"</body></html>">>
    ]).

html_head(Title) ->
    [
        <<"<!doctype html><html lang=\"en\"><head><meta charset=\"utf-8\">"
            "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
            "<title>">>,
        esc(Title),
        <<"</title>"
            "<link rel=\"stylesheet\" href=\"/info/assets/fonts.css\">"
            "<link rel=\"stylesheet\" href=\"/info/assets/docsify-vue.css\">"
            "<link rel=\"stylesheet\" href=\"/info/assets/prism.css\">"
            "<link rel=\"stylesheet\" href=\"/info/assets/site.css\">"
            "<style>">>,
        hb_docs_overrides_css(),
        <<"</style></head>">>
    ].

hb_docs_overrides_css() ->
    <<"
body.hb-docs-protocol { background: var(--bg); color: var(--text); }
body.hb-docs-protocol .sidebar { top: 0 !important; }
body.hb-docs-protocol .content { padding-top: 0 !important; }
body.hb-docs-protocol .content .markdown-section { padding-top: 36px !important; }
body.hb-docs-protocol .eyebrow {
  margin: 0 0 0.5rem;
  color: var(--text-tertiary);
  font-size: var(--text-caption);
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
}
.hb-docs-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
  gap: 12px;
  margin: 1rem 0 1.5rem;
}
.hb-docs-card {
  display: grid;
  gap: 6px;
  min-height: 120px;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text) !important;
  text-decoration: none !important;
}
.hb-docs-card:hover { background: var(--bg-hover); }
.hb-docs-card span,
.hb-docs-card small { color: var(--text-secondary); }
.hb-docs-guide-index {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
  column-gap: 28px;
  row-gap: 22px;
  margin: 1rem 0 2rem;
}
.hb-docs-guide-group {
  min-width: 0;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}
.hb-docs-guide-group h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  line-height: 1.3;
}
.hb-docs-guide-group ul {
  display: grid;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.hb-docs-guide-group li { margin: 0; }
.hb-docs-guide-group a {
  color: var(--text) !important;
  font-weight: 500;
  text-decoration: none !important;
}
.hb-docs-guide-group a:hover { text-decoration: underline !important; }
.hb-docs-section-index {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 1.5rem 0 2rem;
}
.hb-docs-section-index a {
  display: grid;
  gap: 4px;
  min-height: 78px;
  padding: 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg);
  color: var(--text) !important;
  text-decoration: none !important;
}
	.hb-docs-section-index a:hover { background: var(--bg-hover); }
	.hb-docs-section-index span { color: var(--text-secondary); font-size: var(--text-caption); }
	.hb-docs-renderer-note {
	  color: var(--text-secondary);
	  font-size: var(--text-small);
	}
	.spec-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0.75rem 0 1rem;
}
.status {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 8px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-muted);
  color: var(--text-secondary);
  font-size: var(--text-caption);
  font-weight: 600;
  text-transform: uppercase;
}
.pill {
  display: inline-flex;
  align-items: center;
  min-height: 22px;
  padding: 0 7px;
  margin: 0 4px 4px 0;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--bg-muted);
  color: var(--text-secondary);
  font-size: var(--text-caption);
}
.recipe {
  margin: 1.5rem 0;
  padding: 0;
  border: 0;
  background: transparent;
}
@media (max-width: 1000px) {
  body.hb-docs-protocol .sidebar {
    display: block !important;
    position: static !important;
    transform: none !important;
    width: auto !important;
    max-height: none;
    border-bottom: 1px solid var(--border) !important;
    box-shadow: none !important;
  }
  body.hb-docs-protocol .content {
    position: static !important;
  }
  .hb-docs-section-index {
    grid-template-columns: 1fr;
  }
}
">>.
docs_sidebar(Items) ->
    [
        <<"<aside class=\"sidebar\"><h1>HyperBEAM</h1><div class=\"sidebar-nav\"><ul>">>,
        Items,
        <<"</ul></div></aside>">>
    ].

node_sidebar(Devices) ->
    Boilerplate = boilerplate_index(),
    [
        <<"<li class=\"active\"><a href=\"/info\">Node Info</a></li>">>,
        <<"<li><p>Indexes</p><ul>"
            "<li><a href=\"/info/schema\">Schema</a></li>"
            "<li><a href=\"/info/spec\">Spec</a></li>"
            "<li><a href=\"/info/recipes\">Recipes</a></li>"
            "<li><a href=\"/info/implementations\">Implementations</a></li>"
            "</ul></li>">>,
        <<"<li><p>Guides</p><ul>">>,
        boilerplate_sidebar_rows(Boilerplate),
        <<"</ul></li>">>,
        <<"<li><p>Devices</p><ul>">>,
        [
            [
                <<"<li><a href=\"">>, esc(maps:get(<<"href">>, Device)), <<"\">~">>,
                esc(maps:get(<<"name">>, Device)),
                <<"@">>, esc(maps:get(<<"version">>, Device, <<>>)),
                <<"</a></li>">>
            ]
        || Device <- Devices
        ],
        <<"</ul></li>">>
    ].

boilerplate_sidebar_rows(Index) ->
    Pages = maps:get(<<"pages">>, Index, []),
    [
        <<"<li><a href=\"/info/boilerplate\">All guides</a></li>">>,
        [
            boilerplate_sidebar_section(Section, Pages)
        || Section <- boilerplate_section_order()
        ]
    ].

boilerplate_sidebar_section(<<"Overview">>, Pages) ->
    case boilerplate_pages_for_section(<<"Overview">>, Pages) of
        [] ->
            [];
        [Page | _Rest] ->
            [
                <<"<li><a href=\"">>, esc(maps:get(<<"href">>, Page, <<>>)),
                <<"\">Overview</a></li>">>
            ]
    end;
boilerplate_sidebar_section(Section, Pages) ->
    case boilerplate_pages_for_section(Section, Pages) of
        [] ->
            [];
        SectionPages ->
            [
                <<"<li><p>">>, esc(Section), <<"</p><ul>">>,
                [
                    [
                        <<"<li><a href=\"">>, esc(maps:get(<<"href">>, Page, <<>>)),
                        <<"\">">>, esc(maps:get(<<"title">>, Page, <<>>)), <<"</a></li>">>
                    ]
                || Page <- SectionPages
                ],
                <<"</ul></li>">>
            ]
    end.

boilerplate_pages_for_section(Section, Pages) ->
    [
        Page
    || Page <- Pages,
       maps:get(<<"section">>, Page, <<>>) =:= Section
    ].

boilerplate_section_order() ->
    [
        <<"Overview">>,
        <<"Introduction">>,
        <<"Using These Docs">>,
        <<"Devices">>,
        <<"Device Forge">>,
        <<"Recipes">>,
        <<"Device Recipes">>,
        <<"Reference">>
    ].

node_sidebar_from_component(Devices) ->
    [
        <<"<li><a href=\"/info\">Node Info</a></li>">>,
        <<"<li class=\"active\"><p>Index</p><ul>">>,
        [
            [
                <<"<li><a href=\"">>, esc(maps:get(<<"href">>, Device, <<>>)),
                <<"\">~">>, esc(maps:get(<<"device">>, Device, <<>>)), <<"</a></li>">>
            ]
        || Device <- Devices
        ],
        <<"</ul></li>">>
    ].

device_sidebar(Data) ->
    Device = maps:get(<<"device">>, Data, #{}),
    DeviceID = maps:get(<<"id">>, Device, <<>>),
    SchemaOrder = maps:get(<<"schema-order">>, Data, []),
    Recipes = maps:get(<<"recipes">>, Data, #{}),
    [
        <<"<li><a href=\"/info\">Node Info</a></li>">>,
        <<"<li class=\"active\"><a href=\"/~">>, esc(DeviceID), <<"/info\">~">>,
        esc(DeviceID), <<"</a></li>">>,
        <<"<li><p>Schema</p><ul>">>,
        <<"<li><a href=\"/~">>, esc(DeviceID), <<"/info/schema\">All keys</a></li>">>,
        [
            [
                <<"<li><a href=\"/~">>, esc(DeviceID), <<"/info/schema/">>,
                esc(Key), <<"\">">>, esc(Key), <<"</a></li>">>
            ]
        || Key <- SchemaOrder
        ],
        <<"</ul></li>">>,
        <<"<li><a href=\"/~">>, esc(DeviceID), <<"/info/spec\">Spec</a></li>">>,
        <<"<li><p>Recipes</p><ul>">>,
        <<"<li><a href=\"/~">>, esc(DeviceID), <<"/info/recipes\">All recipes</a></li>">>,
        [
            [
                <<"<li><a href=\"/~">>, esc(DeviceID), <<"/info/recipes/">>,
                esc(Slug), <<"\">">>, esc(maps:get(<<"title">>, Recipe, Slug)),
                <<"</a></li>">>
            ]
        || {Slug, Recipe} <- lists:sort(maps:to_list(Recipes))
        ],
        <<"</ul></li>">>
    ].

device_row(Device) ->
    [
        <<"<a class=\"hb-docs-card\" href=\"">>,
        esc(maps:get(<<"href">>, Device)),
        <<"\"><strong>~">>,
        esc(maps:get(<<"name">>, Device)),
        <<"@">>, esc(maps:get(<<"version">>, Device)),
        <<"</strong><span>">>, esc(maps:get(<<"schema">>, Device)),
        <<"</span><small>Open docs</small></a>">>
    ].

boilerplate_structured_index(Index) ->
    Pages = maps:get(<<"pages">>, Index, []),
    [
        <<"<nav class=\"hb-docs-guide-index\" aria-label=\"Guides\">">>,
        [
            boilerplate_guide_group(Section, Pages)
        || Section <- boilerplate_section_order()
        ],
        <<"</nav>">>
    ].

boilerplate_guide_group(Section, Pages) ->
    case boilerplate_pages_for_section(Section, Pages) of
        [] ->
            [];
        SectionPages ->
            [
                <<"<section class=\"hb-docs-guide-group\"><h3>">>, esc(Section),
                <<"</h3><ul>">>,
                [
                    boilerplate_guide_link(Page)
                || Page <- SectionPages
                ],
                <<"</ul></section>">>
            ]
    end.

boilerplate_guide_link(Page) ->
    [
        <<"<li><a href=\"">>, esc(maps:get(<<"href">>, Page, <<>>)),
        <<"\">">>, esc(maps:get(<<"title">>, Page, <<>>)), <<"</a></li>">>
    ].

concept_rows(Concepts) ->
    [
        [
            <<"<p><strong>">>, esc(Key), <<"</strong><br>">>, esc(Value), <<"</p>">>
        ]
    || {Key, Value} <- lists:sort(maps:to_list(Concepts))
    ].

schema_rows(DeviceID, Schema, Order) ->
    [
        case maps:get(Name, Schema, undefined) of
            undefined -> [];
            KeySchema ->
                [
                    <<"<tr><td><a href=\"/~">>, esc(DeviceID), <<"/info/schema/">>,
                    esc(Name),
                    <<"\">">>, esc(Name), <<"</a></td><td>">>,
                    esc(maps:get(<<"description">>, KeySchema, <<>>)),
                    <<"</td><td>">>,
                    param_pills(maps:get(<<"parameters">>, KeySchema, #{})),
                    <<"</td></tr>">>
                ]
        end
    || Name <- Order
    ].

param_pills(Params) when map_size(Params) =:= 0 ->
    <<"none">>;
param_pills(Params) ->
    [
        [
            <<"<span class=\"pill\">">>, esc(Name),
            case maps:get(<<"required">>, Param, false) of
                true -> <<" required">>;
                false -> <<" optional">>
            end,
            <<"</span>">>
        ]
    || {Name, Param} <- lists:sort(maps:to_list(Params))
    ].

recipe_nav(Recipes) ->
    [
        [
            <<"<a class=\"hb-docs-card\" href=\"#recipe-">>, esc(Name), <<"\"><strong>">>,
            esc(maps:get(<<"title">>, Recipe, Name)), <<"</strong><span>">>,
            esc(maps:get(<<"summary">>, Recipe, <<>>)), <<"</span><small>">>,
            esc(hb_util:bin(maps:get(<<"runnable-block-count">>, Recipe, 0))),
            <<" runnable blocks</small></a>">>
        ]
    || {Name, Recipe} <- lists:sort(maps:to_list(Recipes))
    ].

device_section_index(SchemaOrder, Spec, Recipes) ->
    [
        <<"<nav class=\"hb-docs-section-index\" aria-label=\"Device sections\">">>,
        <<"<a href=\"#schema\"><strong>Schema</strong><span>">>,
        esc(hb_util:bin(length(SchemaOrder))),
        <<" documented keys</span></a>">>,
        <<"<a href=\"#spec\"><strong>Spec</strong><span>">>,
        spec_index_label(Spec),
        <<"</span></a>">>,
        <<"<a href=\"#recipes\"><strong>Recipes</strong><span>">>,
        esc(hb_util:bin(map_size(Recipes))),
        <<" imported pages</span></a>">>,
        <<"</nav>">>
    ].

spec_index_label(Spec) ->
    case maps:get(<<"spec-status">>, Spec, <<"missing">>) of
        <<"present">> -> <<"Open the normative contract">>;
        _ -> <<"Spec coverage not published yet">>
    end.

render_spec_section(_DeviceID, Spec) ->
    [
        <<"<h2 id=\"spec\">Spec</h2>">>,
        render_spec_body(Spec)
    ].

render_spec_body(Spec) ->
    Status = maps:get(<<"spec-status">>, Spec, <<"missing">>),
    [
        spec_tx_link_paragraph(Spec),
        case {Status, spec_markdown(Spec)} of
            {<<"present">>, Markdown} when byte_size(Markdown) > 0 ->
                render_markdown(drop_first_h1(Markdown));
            _ ->
                [<<"<p>">>, esc(maps:get(<<"summary">>, Spec, <<>>)), <<"</p>">>]
        end
    ].

spec_tx_link_paragraph(Spec) ->
    case spec_tx_link(Spec, <<>>) of
        [] -> [];
        Link -> [<<"<p>">>, Link, <<"</p>">>]
    end.

spec_tx_link(Spec, Prefix) ->
    case maps:get(<<"txid">>, Spec, <<>>) of
        <<>> -> [];
        TXID ->
            [
                Prefix,
                <<"<a href=\"https://viewblock.io/arweave/tx/">>, esc(TXID),
                <<"\" target=\"_blank\" rel=\"noopener\">View spec transaction</a>">>
            ]
    end.

spec_markdown(Spec) ->
    Source = maps:get(<<"source-path">>, Spec, <<>>),
    case file:read_file(binary_to_list(Source)) of
        {ok, Markdown} -> Markdown;
        {error, _Reason} -> <<>>
    end.

params_table(_DeviceID, _Key, Params) when map_size(Params) =:= 0 ->
    <<"<p>No parameters.</p>">>;
params_table(DeviceID, Key, Params) ->
    [
        <<"<table><thead><tr><th>Name</th><th>Required</th><th>Type</th>"
            "<th>Description</th><th>Example</th></tr></thead><tbody>">>,
        [
            [
                <<"<tr><td><a href=\"/~">>, esc(DeviceID), <<"/info/schema/">>,
                esc(Key), <<"/">>, esc(Name), <<"\"><code>">>, esc(Name),
                <<"</code></a></td><td>">>,
                case maps:get(<<"required">>, Param, false) of
                    true -> <<"yes">>;
                    false -> <<"no">>
                end,
                <<"</td><td>">>, esc(maps:get(<<"type">>, Param, <<>>)),
                <<"</td><td>">>, esc(maps:get(<<"description">>, Param, <<>>)),
                <<"</td><td><code>">>, esc(maps:get(<<"example">>, Param, <<>>)),
                <<"</code></td></tr>">>
            ]
        || {Name, Param} <- lists:sort(maps:to_list(Params))
        ],
        <<"</tbody></table>">>
    ].

recipe_rows(_DeviceID, Recipes) ->
    [
        [
            <<"<article class=\"recipe markdown-section\" id=\"recipe-">>, esc(Name), <<"\">">>,
            <<"<header class=\"recipe-head\"><p class=\"eyebrow\">">>,
            esc(maps:get(<<"source-relative">>, Recipe, <<>>)),
            <<"</p><h3>">>, esc(maps:get(<<"title">>, Recipe, Name)), <<"</h3><p>">>,
            esc(maps:get(<<"summary">>, Recipe, <<>>)), <<"</p></header>">>,
            render_markdown(drop_first_h1(recipe_markdown(Recipe))),
            <<"</article>">>
        ]
    || {Name, Recipe} <- lists:sort(maps:to_list(Recipes))
    ].

recipe_markdown(Recipe) ->
    RelPath = maps:get(<<"source-relative">>, Recipe, <<>>),
    case file:read_file(binary_to_list(device_docs_path(RelPath))) of
        {ok, Markdown} ->
            select_recipe_markdown(Markdown, maps:get(<<"source-section">>, Recipe, undefined));
        {error, _Reason} -> <<>>
    end.

docs_shell_assets() ->
    [
        <<"<script src=\"/info/assets/prism-core.min.js\"></script>">>,
        <<"<script src=\"/info/assets/prism-bash.min.js\"></script>">>,
        <<"<script src=\"/info/assets/prism-json.min.js\"></script>">>,
        <<"<script src=\"/info/assets/prism-http.min.js\"></script>">>,
        <<"<script src=\"/info/assets/prism-erlang.min.js\"></script>">>,
        <<"<script src=\"/info/assets/prism-lua.min.js\"></script>">>,
        <<"<script src=\"/info/assets/prism-markdown.min.js\"></script>">>,
        <<"<script>">>, docs_page_enhancer_js(), <<"</script>">>,
        <<"<script src=\"/info/assets/example-runner.js\"></script>">>,
        <<"<script>">>,
        <<"window.addEventListener('DOMContentLoaded',function(){">>,
        <<"if(window.Prism){window.Prism.highlightAll();}">>,
        <<"if(window.HBDocsCodeChrome){window.HBDocsCodeChrome.refresh();}">>,
        <<"if(window.HBExampleRunner){window.HBExampleRunner.refresh();}">>,
        <<"});">>,
        <<"</script>">>
    ].

docs_page_enhancer_js() ->
    <<"
(function(){
  function addLineNumbers(pre, code) {
    if (pre.dataset.lineNumbers) return;
    var lines = (code.textContent || '').split('\\n');
    if (lines.length && lines[lines.length - 1] === '') lines.pop();
    if (!lines.length) return;
    var gutter = document.createElement('div');
    gutter.className = 'code-line-numbers';
    gutter.setAttribute('aria-hidden', 'true');
    lines.forEach(function (_, i) {
      var span = document.createElement('span');
      span.textContent = String(i + 1);
      gutter.appendChild(span);
    });
    pre.classList.add('has-line-numbers');
    pre.insertBefore(gutter, code);
    pre.dataset.lineNumbers = '1';
  }

	  function addCopyButtons() {
	    document.querySelectorAll('.markdown-section pre').forEach(function (pre) {
      var code = pre.querySelector('code');
      if (!code || pre.dataset.codeChrome) return;
      addLineNumbers(pre, code);
      var lang = (pre.getAttribute('data-lang') || '').trim();
      var header = document.createElement('div');
      header.className = 'code-header';
      var langLabel = document.createElement('span');
      langLabel.className = 'code-header-lang';
      langLabel.textContent = lang || 'code';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-code-btn';
      btn.setAttribute('aria-label', 'Copy code');
      btn.innerHTML =
        '<span class=\"copy-code-btn-stage\" aria-hidden=\"true\">' +
        '<span class=\"copy-code-btn-icon copy-code-btn-icon-copy\">' +
        '<svg viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z\"/></svg>' +
        '</span><span class=\"copy-code-btn-icon copy-code-btn-icon-check\">' +
        '<svg viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M232.49,80.49l-128,128a12,12,0,0,1-17,0l-56-56a12,12,0,1,1,17-17L96,183,215.51,63.51a12,12,0,0,1,17,17Z\"/></svg>' +
        '</span></span>';
      btn.addEventListener('click', function () {
        var text = code.textContent || '';
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.classList.add('copied');
            btn.setAttribute('aria-label', 'Copied');
            setTimeout(function () {
              btn.classList.remove('copied');
              btn.setAttribute('aria-label', 'Copy code');
            }, 1800);
          });
        }
      });
      header.appendChild(langLabel);
      header.appendChild(btn);
      pre.insertBefore(header, pre.firstChild);
      pre.classList.add('has-code-header');
      pre.dataset.codeChrome = '1';
	    });
	  }

	  window.HBDocsCodeChrome = {
	    refresh: function () {
	      addCopyButtons();
	    }
	  };
	})();
">>.

docs_asset_response(Parts) ->
    case valid_asset_parts(Parts) of
        true ->
            Path = docs_asset_path(Parts),
            case file:read_file(Path) of
                {ok, Body0} ->
                    Body = docs_asset_body(Parts, Body0),
                    {ok, #{
                        <<"status">> => 200,
                        <<"content-type">> => docs_asset_content_type(Parts),
                        <<"body">> => Body
                    }};
                {error, _Reason} ->
                    {ok, not_found_response()}
            end;
        false ->
            {ok, not_found_response()}
    end.

valid_asset_parts([]) ->
    false;
valid_asset_parts(Parts) ->
    lists:all(fun valid_asset_part/1, Parts).

valid_asset_part(Part) when is_binary(Part) ->
    Part =/= <<>> andalso
        binary:match(Part, <<"/">>) =:= nomatch andalso
        binary:match(Part, <<"..">>) =:= nomatch;
valid_asset_part(_) ->
    false.

docs_asset_path([<<"prism-core.min.js">>]) ->
    filename:join([device_docs_root(), "node_modules", "prismjs", "components", "prism-core.min.js"]);
docs_asset_path(Parts) ->
    filename:join([device_docs_root(), "dist", "assets" | [binary_to_list(Part) || Part <- Parts]]).

docs_asset_body([<<"example-runner.js">>], Body) ->
    binary:replace(
        Body,
        <<"const DEFAULT_NODE = 'http://localhost:8734';">>,
        <<"const DEFAULT_NODE = window.location.origin;">>
    );
docs_asset_body(_Parts, Body) ->
    Body.

docs_asset_content_type(Parts) ->
    Name = lists:last(Parts),
    case filename:extension(binary_to_list(Name)) of
        ".css" -> <<"text/css; charset=utf-8">>;
        ".js" -> <<"text/javascript; charset=utf-8">>;
        ".json" -> <<"application/json">>;
        ".woff2" -> <<"font/woff2">>;
        ".png" -> <<"image/png">>;
        ".ico" -> <<"image/x-icon">>;
        ".mp4" -> <<"video/mp4">>;
        _ -> <<"application/octet-stream">>
    end.

render_markdown(Markdown) ->
    Lines = binary:split(Markdown, <<"\n">>, [global]),
    iolist_to_binary(render_markdown_lines(Lines, [], [])).

render_markdown_lines([], Para, Acc) ->
    lists:reverse([flush_paragraph(Para) | Acc]);
render_markdown_lines([Line | Rest], Para, Acc) ->
    Trim = trim(Line),
    case fence_language(Trim) of
        {ok, Lang} ->
            {CodeLines, After} = take_code_block(Rest, []),
            Block = render_code_block(Lang, lists:reverse(CodeLines)),
            render_markdown_lines(After, [], [Block, flush_paragraph(Para) | Acc]);
        false ->
            case table_block(Trim, Rest) of
                {ok, Table, AfterTable} ->
                    render_markdown_lines(AfterTable, [], [Table, flush_paragraph(Para) | Acc]);
                false ->
                    case {Trim, heading(Trim), bullet_text(Trim), numbered_text(Trim)} of
                        {<<>>, _, _, _} ->
                            render_markdown_lines(Rest, [], [flush_paragraph(Para) | Acc]);
                        {_, {Level, Text}, _, _} ->
                            H = render_heading(Level, Text),
                            render_markdown_lines(Rest, [], [H, flush_paragraph(Para) | Acc]);
                        {_, _, {ok, Text}, _} ->
                            {Items, AfterList} = take_list_block(Rest, unordered, [Text], []),
                            List = render_list(<<"ul">>, Items),
                            render_markdown_lines(AfterList, [], [List, flush_paragraph(Para) | Acc]);
                        {_, _, _, {ok, Text}} ->
                            {Items, AfterList} = take_list_block(Rest, ordered, [Text], []),
                            List = render_list(<<"ol">>, Items),
                            render_markdown_lines(AfterList, [], [List, flush_paragraph(Para) | Acc]);
                        _ ->
                            render_markdown_lines(Rest, [Trim | Para], Acc)
                    end
            end
    end.

take_code_block([], Acc) ->
    {Acc, []};
take_code_block([Line | Rest], Acc) ->
    case is_fence(Line) of
        true -> {Acc, Rest};
        false -> take_code_block(Rest, [Line | Acc])
    end.

flush_paragraph([]) ->
    [];
flush_paragraph(Lines) ->
    Text = iolist_to_binary(lists:join(<<" ">>, lists:reverse(Lines))),
    [<<"<p>">>, render_inline(Text), <<"</p>">>].

render_heading(Level0, Text) ->
    Level = max(3, min(6, Level0 + 2)),
    Tag = integer_to_binary(Level),
    [<<"<h">>, Tag, <<">">>, render_inline(Text), <<"</h">>, Tag, <<">">>].

render_code_block(Lang, Lines) ->
    NormLang = normalize_lang(Lang),
    Text = join_lines(Lines),
    [
        <<"<pre class=\"language-">>, esc(NormLang), <<"\" data-lang=\"">>,
        esc(NormLang), <<"\"><code class=\"language-">>,
        esc(NormLang), <<"\">">>, esc(Text), <<"</code></pre>">>
    ].

table_block(Header, [Separator | Rest]) ->
    TrimSeparator = trim(Separator),
    case is_table_row(Header) andalso is_table_separator(TrimSeparator) of
        true ->
            {Rows, After} = take_table_rows(Rest, []),
            {ok, render_table([Header | Rows]), After};
        false ->
            false
    end;
table_block(_Header, _Rest) ->
    false.

is_table_row(Line) ->
    Line =/= <<>> andalso binary:match(Line, <<"|">>) =/= nomatch.

is_table_separator(Line) ->
    Cells = parse_table_row(Line),
    Cells =/= [] andalso lists:all(fun is_table_separator_cell/1, Cells).

is_table_separator_cell(Cell) ->
    Trimmed = trim(Cell),
    HasDash = binary:match(Trimmed, <<"-">>) =/= nomatch,
    NoColons = binary:replace(Trimmed, <<":">>, <<>>, [global]),
    NoDashes = binary:replace(NoColons, <<"-">>, <<>>, [global]),
    HasDash andalso trim(NoDashes) =:= <<>>.

take_table_rows([Line | Rest], Acc) ->
    Trim = trim(Line),
    case is_table_row(Trim) andalso Trim =/= <<>> of
        true -> take_table_rows(Rest, [Trim | Acc]);
        false -> {lists:reverse(Acc), [Line | Rest]}
    end;
take_table_rows([], Acc) ->
    {lists:reverse(Acc), []}.

render_table([Header | Rows]) ->
    HeaderCells = parse_table_row(Header),
    [
        <<"<table><thead>">>,
        render_table_row(<<"th">>, HeaderCells),
        <<"</thead><tbody>">>,
        [render_table_row(<<"td">>, parse_table_row(Row)) || Row <- Rows],
        <<"</tbody></table>">>
    ].

render_table_row(Tag, Cells) ->
    [
        <<"<tr>">>,
        [[<<"<">>, Tag, <<">">>, render_inline(Cell), <<"</">>, Tag, <<">">>] || Cell <- Cells],
        <<"</tr>">>
    ].

parse_table_row(Row) ->
    Trimmed = trim(Row),
    WithoutLeading =
        case starts_with(Trimmed, <<"|">>) of
            true -> binary:part(Trimmed, 1, byte_size(Trimmed) - 1);
            false -> Trimmed
        end,
    WithoutOuter =
        case ends_with(WithoutLeading, <<"|">>) of
            true -> binary:part(WithoutLeading, 0, byte_size(WithoutLeading) - 1);
            false -> WithoutLeading
        end,
    [trim(Cell) || Cell <- binary:split(WithoutOuter, <<"|">>, [global])].

render_inline(Text) ->
    render_inline(Text, []).

render_inline(<<>>, Acc) ->
    lists:reverse(Acc);
render_inline(Text, Acc) ->
    case inline_markers(Text) of
        [] ->
            lists:reverse([esc(Text) | Acc]);
        [{Pos, Kind, Marker} | _] ->
            Prefix = binary:part(Text, 0, Pos),
            AfterStartPos = Pos + byte_size(Marker),
            AfterStart = binary:part(Text, AfterStartPos, byte_size(Text) - AfterStartPos),
            case binary:match(AfterStart, Marker) of
                {EndPos, _Len} ->
                    Inner = binary:part(AfterStart, 0, EndPos),
                    RestPos = EndPos + byte_size(Marker),
                    Rest = binary:part(AfterStart, RestPos, byte_size(AfterStart) - RestPos),
                    Node =
                        case Kind of
                            code -> [<<"<code>">>, esc(Inner), <<"</code>">>];
                            strong -> [<<"<strong>">>, render_inline(Inner), <<"</strong>">>]
                        end,
                    render_inline(Rest, [Node, esc(Prefix) | Acc]);
                nomatch ->
                    render_inline(AfterStart, [esc(Marker), esc(Prefix) | Acc])
            end
    end.

inline_markers(Text) ->
    lists:keysort(
        1,
        marker_matches(Text, <<"**">>, strong) ++
            marker_matches(Text, <<"`">>, code)
    ).

marker_matches(Text, Marker, Kind) ->
    case binary:match(Text, Marker) of
        {Pos, _Len} -> [{Pos, Kind, Marker}];
        nomatch -> []
    end.

drop_first_h1(Markdown) ->
    Lines = binary:split(Markdown, <<"\n">>, [global]),
    iolist_to_binary(lists:join(<<"\n">>, drop_first_h1_lines(Lines))).

drop_first_h1_lines([]) ->
    [];
drop_first_h1_lines([Line | Rest]) ->
    case heading(trim(Line)) of
        {1, _Text} -> Rest;
        _ -> [Line | Rest]
    end.

markdown_title(Markdown, Fallback) ->
    Lines = binary:split(Markdown, <<"\n">>, [global]),
    case [Text || Line <- Lines, {1, Text} <- [heading(trim(Line))]] of
        [Title | _] -> Title;
        [] -> Fallback
    end.

markdown_summary(Markdown) ->
    Lines = binary:split(drop_first_h1(Markdown), <<"\n">>, [global]),
    summary_from_lines(Lines).

summary_from_lines([]) ->
    <<>>;
summary_from_lines([Line | Rest]) ->
    Trim = trim(Line),
    case Trim of
        <<>> -> summary_from_lines(Rest);
        <<"Source tests:", _/binary>> -> summary_from_lines(Rest);
        <<"Prerequisites:", _/binary>> -> summary_from_lines(Rest);
        _ ->
            case fence_language(Trim) of
                {ok, _Lang} ->
                    {_CodeLines, AfterFence} = take_code_block(Rest, []),
                    summary_from_lines(AfterFence);
                false ->
                    case heading(Trim) of
                        false -> strip_inline_markdown(Trim);
                        _ -> summary_from_lines(Rest)
                    end
            end
    end.

strip_inline_markdown(Text) ->
    NoTicks = binary:replace(Text, <<"`">>, <<>>, [global]),
    NoTicks.

code_blocks(Markdown) ->
    Lines = binary:split(Markdown, <<"\n">>, [global]),
    code_blocks(Lines, outside, <<>>, [], [], 0).

code_blocks([], outside, _Lang, _Lines, Acc, _Index) ->
    lists:reverse(Acc);
code_blocks([], inside, Lang, Lines, Acc, Index) ->
    lists:reverse([code_block(Index, Lang, lists:reverse(Lines)) | Acc]);
code_blocks([Line | Rest], outside, _Lang, _Lines, Acc, Index) ->
    case fence_language(Line) of
        {ok, Lang} -> code_blocks(Rest, inside, Lang, [], Acc, Index);
        false -> code_blocks(Rest, outside, <<>>, [], Acc, Index)
    end;
code_blocks([Line | Rest], inside, Lang, Lines, Acc, Index) ->
    case is_fence(Line) of
        true ->
            Block = code_block(Index, Lang, lists:reverse(Lines)),
            code_blocks(Rest, outside, <<>>, [], [Block | Acc], Index + 1);
        false ->
            code_blocks(Rest, inside, Lang, [Line | Lines], Acc, Index)
    end.

code_block(Index, Lang, Lines) ->
    Text = join_lines(Lines),
    NormLang = normalize_lang(Lang),
    #{
        <<"index">> => Index,
        <<"language">> => NormLang,
        <<"text">> => Text,
        <<"runnable">> => is_runnable_block(NormLang, Text),
        <<"command-count">> => command_count(Text)
    }.

command_count(Text) ->
    Lines = binary:split(Text, <<"\n">>, [global]),
    length([Line || Line <- Lines, is_command_line(trim(Line))]).

is_runnable_block(<<"http">>, Text) ->
    command_count(Text) > 0;
is_runnable_block(<<"bash">>, Text) ->
    binary:match(Text, <<"curl">>) =/= nomatch;
is_runnable_block(<<"sh">>, Text) ->
    binary:match(Text, <<"curl">>) =/= nomatch;
is_runnable_block(_Lang, _Text) ->
    false.

is_command_line(<<"curl">>) -> true;
is_command_line(<<"curl ", _/binary>>) -> true;
is_command_line(<<"GET ", _/binary>>) -> true;
is_command_line(<<"POST ", _/binary>>) -> true;
is_command_line(<<"PUT ", _/binary>>) -> true;
is_command_line(<<"PATCH ", _/binary>>) -> true;
is_command_line(<<"DELETE ", _/binary>>) -> true;
is_command_line(<<"HEAD ", _/binary>>) -> true;
is_command_line(_Line) -> false.

heading(<<"# ", Text/binary>>) -> {1, Text};
heading(<<"## ", Text/binary>>) -> {2, Text};
heading(<<"### ", Text/binary>>) -> {3, Text};
heading(<<"#### ", Text/binary>>) -> {4, Text};
heading(<<"##### ", Text/binary>>) -> {5, Text};
heading(_Line) -> false.

bullet_text(<<"- ", Text/binary>>) -> {ok, Text};
bullet_text(_Line) -> false.

numbered_text(Line) ->
    case binary:split(Line, <<". ">>) of
        [Num, Text] when byte_size(Num) > 0 ->
            case is_digits(Num) of
                true -> {ok, Text};
                false -> false
            end;
        _ -> false
    end.

take_list_block([], _Kind, Current, Items) ->
    {lists:reverse([finish_list_item(Current) | Items]), []};
take_list_block([Line | Rest] = All, Kind, Current, Items) ->
    Trim = trim(Line),
    case Trim of
        <<>> ->
            {lists:reverse([finish_list_item(Current) | Items]), Rest};
        _ ->
            case list_marker(Kind, Trim) of
                {ok, Text} ->
                    take_list_block(Rest, Kind, [Text], [finish_list_item(Current) | Items]);
                false ->
                    case is_list_continuation(Line, Trim) of
                        true ->
                            take_list_block(Rest, Kind, [Trim | Current], Items);
                        false ->
                            {lists:reverse([finish_list_item(Current) | Items]), All}
                    end
            end
    end.

list_marker(unordered, Line) ->
    bullet_text(Line);
list_marker(ordered, Line) ->
    numbered_text(Line).

is_list_continuation(Line, Trim) ->
    is_indented(Line) andalso not is_block_start(Trim).

is_indented(<<" ", _/binary>>) -> true;
is_indented(<<"\t", _/binary>>) -> true;
is_indented(_Line) -> false.

is_block_start(Trim) ->
    heading(Trim) =/= false orelse
        fence_language(Trim) =/= false orelse
        bullet_text(Trim) =/= false orelse
        numbered_text(Trim) =/= false.

finish_list_item(Lines) ->
    iolist_to_binary(lists:join(<<" ">>, lists:reverse(Lines))).

render_list(Tag, Items) ->
    [
        <<"<">>, Tag, <<">">>,
        [[<<"<li>">>, render_inline(Item), <<"</li>">>] || Item <- Items],
        <<"</">>, Tag, <<">">>
    ].

is_digits(<<>>) ->
    false;
is_digits(Bin) ->
    lists:all(fun(Char) -> Char >= $0 andalso Char =< $9 end, binary_to_list(Bin)).

fence_language(Line) ->
    Trim = trim(Line),
    case starts_with(Trim, <<"```">>) of
        true ->
            Size = byte_size(Trim),
            Lang =
                case Size of
                    3 -> <<"text">>;
                    _ -> trim(binary:part(Trim, 3, Size - 3))
                end,
            {ok, normalize_lang(Lang)};
        false ->
            false
    end.

is_fence(Line) ->
    fence_language(Line) =/= false.

normalize_lang(<<"">>) -> <<"text">>;
normalize_lang(<<"sh">>) -> <<"bash">>;
normalize_lang(<<"shell">>) -> <<"bash">>;
normalize_lang(Lang) -> hb_util:to_lower(Lang).

join_lines([]) ->
    <<>>;
join_lines(Lines) ->
    iolist_to_binary(lists:join(<<"\n">>, Lines)).

trim(Bin) ->
    unicode:characters_to_binary(string:trim(unicode:characters_to_list(Bin))).

starts_with(Bin, Prefix) when byte_size(Bin) >= byte_size(Prefix) ->
    binary:part(Bin, 0, byte_size(Prefix)) =:= Prefix;
starts_with(_Bin, _Prefix) ->
    false.

ends_with(Bin, Suffix) when byte_size(Bin) >= byte_size(Suffix) ->
    Offset = byte_size(Bin) - byte_size(Suffix),
    binary:part(Bin, Offset, byte_size(Suffix)) =:= Suffix;
ends_with(_Bin, _Suffix) ->
    false.

esc(Value) ->
    B0 = hb_util:bin(Value),
    B1 = binary:replace(B0, <<"&">>, <<"&amp;">>, [global]),
    B2 = binary:replace(B1, <<"<">>, <<"&lt;">>, [global]),
    B3 = binary:replace(B2, <<">">>, <<"&gt;">>, [global]),
    B4 = binary:replace(B3, <<"\"">>, <<"&quot;">>, [global]),
    binary:replace(B4, <<"'">>, <<"&#39;">>, [global]).

node_info_contract_test() ->
    Data = node_info_data(#{ <<"port">> => 9999 }),
    ?assertEqual(<<"node-info">>, maps:get(<<"kind">>, Data)),
    ?assertEqual(<<"/~arweave@2.9/info">>, maps:get(<<"arweave-info">>, Data)),
    ?assertEqual(<<"/~message@1.0/info">>, maps:get(<<"message-info">>, Data)),
    ?assertEqual(<<"/info/boilerplate">>, maps:get(<<"boilerplate-link">>, Data)),
    ?assert(length(maps:get(<<"pages">>, maps:get(<<"boilerplate">>, Data))) > 10),
    ?assertEqual(<<"cookbook@1.0">>, maps:get(<<"device">>, maps:get(<<"renderer">>, Data))),
    ?assertEqual(3, length(maps:get(<<"devices">>, Data))).

node_sidebar_hierarchy_test() ->
    {ok, HTML} = node_info(#{ <<"accept">> => <<"text/html">> }, #{}),
    Body = maps:get(<<"body">>, HTML),
    ?assert(binary:match(Body, <<"<li><p>Guides</p><ul>">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<li><a href=\"/info/boilerplate\">All guides</a></li>">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<li><a href=\"/info/boilerplate/index\">Overview</a></li>">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<li><p>Introduction</p><ul>">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<li><p>Device Forge</p><ul>">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<li><p>Device Recipes</p><ul>">>) =/= nomatch),
    ?assert(binary:match(Body, <<"hb-docs-guide-index">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<section class=\"hb-docs-guide-group\"><h3>Introduction</h3><ul>">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(Body, <<"<h2>Guides</h2><div class=\"hb-docs-card-grid\">">>)).

arweave_info_contract_test() ->
    Data = device_info_data(?ARWEAVE_DEVICE, #{}),
    ?assertEqual(<<"device-info">>, maps:get(<<"kind">>, Data)),
    ?assertEqual(<<"/~arweave@2.9/info/schema">>, maps:get(<<"schema-link">>, Data)),
    Schema = maps:get(<<"schema">>, Data),
    ?assert(maps:is_key(<<"tx">>, Schema)),
    Spec = maps:get(<<"spec">>, Data),
    ?assertEqual(<<"missing">>, maps:get(<<"spec-status">>, Spec)),
    TxSchema = maps:get(<<"tx">>, Schema),
    ?assertEqual(<<"tx">>, maps:get(<<"required-parameters">>, TxSchema)),
    TxParams = maps:get(<<"parameters">>, TxSchema),
    ?assertEqual(true, maps:get(<<"required">>, maps:get(<<"tx">>, TxParams))),
    ?assertEqual(true, maps:get(<<"required">>, maps:get(<<"tx">>, TxSchema))),
    Recipes = maps:get(<<"recipes">>, Data),
    ?assertEqual(6, map_size(Recipes)),
    ReadTx = maps:get(<<"read-transaction-messages">>, Recipes),
    ?assertEqual(<<"loaded">>, maps:get(<<"recipe-status">>, ReadTx)),
    ?assert(maps:get(<<"runnable-block-count">>, ReadTx) > 0).

message_info_contract_test() ->
    Data = device_info_data(?MESSAGE_DEVICE, #{}),
    ?assertEqual(<<"device-info">>, maps:get(<<"kind">>, Data)),
    ?assertEqual(<<"/~message@1.0/info/schema">>, maps:get(<<"schema-link">>, Data)),
    ?assertEqual(<<"present">>, maps:get(<<"spec-status">>, maps:get(<<"spec">>, Data))),
    Schema = maps:get(<<"schema">>, Data),
    ?assert(maps:is_key(<<"field">>, Schema)),
    Recipes = maps:get(<<"recipes">>, Data),
    ?assertEqual(4, map_size(Recipes)),
    ?assertNot(maps:is_key(<<"message-device-local-examples">>, Recipes)),
    Recipe = maps:get(<<"build-a-message-and-serialize-it">>, Recipes),
    ?assert(binary:match(maps:get(<<"first-command">>, Recipe), <<"~message@1.0">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(maps:get(<<"source">>, Recipe), <<"/home/fn/Dev/device-docs">>)),
    ?assert(binary:match(maps:get(<<"source">>, Recipe), <<"priv/docs/cookbook/device-docs">>) =/= nomatch),
    Typed = maps:get(<<"build-a-typed-message-and-read-fields">>, Recipes),
    ?assertEqual(<<"Build a typed message and read fields">>, maps:get(<<"source-section">>, Typed)),
    ?assertEqual(1, maps:get(<<"runnable-block-count">>, Typed)),
    TypedMarkdown = recipe_markdown(Typed),
    ?assert(binary:match(TypedMarkdown, <<"Expected: `42` and `hello`.">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(TypedMarkdown, <<"## Action Keys">>)),
    ?assertEqual(nomatch, binary:match(TypedMarkdown, <<"## Source">>)).

packaged_device_docs_root_test() ->
    Root = hb_util:bin(packaged_device_docs_root()),
    ?assert(binary:match(Root, <<"priv/docs/cookbook/device-docs">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(Root, <<"/home/fn/Dev/device-docs">>)).

html_negotiation_test() ->
    {ok, JSON} = device_info(?ARWEAVE_DEVICE, #{ <<"accept">> => <<"application/json">> }, #{}),
    ?assertNot(maps:is_key(<<"body">>, JSON)),
    {ok, HTML} = device_info(?ARWEAVE_DEVICE, #{ <<"accept">> => <<"text/html">> }, #{}),
    ?assertEqual(<<"text/html; charset=utf-8">>, maps:get(<<"content-type">>, HTML)),
    Body = maps:get(<<"body">>, HTML),
    ?assert(binary:match(Body, <<"~arweave@2.9">>) =/= nomatch),
    ?assert(binary:match(Body, <<"HBExampleRunner">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<h2 id=\"schema\">Schema</h2><table>">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(Body, <<"<h2 id=\"actions\">Actions</h2>">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"hb-docs-action-grid">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"data-template=\"/~arweave@2.9/tx\"">>)),
    ?assert(binary:match(Body, <<"/info/assets/site.css">>) =/= nomatch),
    ?assert(binary:match(Body, <<"/info/assets/prism-core.min.js">>) =/= nomatch),
    ?assert(binary:match(Body, <<"class=\"language-bash\"">>) =/= nomatch).

message_markdown_rendering_test() ->
    {ok, HTML} = device_info(?MESSAGE_DEVICE, #{ <<"accept">> => <<"text/html">> }, #{}),
    Body = maps:get(<<"body">>, HTML),
    ?assert(binary:match(Body, <<"hb-docs-section-index">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<h2 id=\"schema\">Schema</h2><table>">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(Body, <<"data-template=\"/~message@1.0/{field}\"">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"<h2 id=\"actions\">Actions</h2>">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"hb-docs-action-grid">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"Open full spec">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"**Device name">>)),
    ?assert(binary:match(Body, <<"<strong>Device name:</strong>">>) =/= nomatch),
    ?assert(binary:match(Body, <<"<strong>Dispatch shape">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(Body, <<"**Dispatch shape">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"PRESENT">>)),
    ?assertEqual(nomatch, binary:match(Body, <<"specs/message@1.0.md">>)),
    {ok, SpecHTML} = device_info_route(
        ?MESSAGE_DEVICE,
        [<<"spec">>],
        #{ <<"accept">> => <<"text/html">> },
        #{}
    ),
    SpecBody = maps:get(<<"body">>, SpecHTML),
    ?assert(binary:match(SpecBody, <<"<strong>Device name:</strong>">>) =/= nomatch),
    ?assert(binary:match(SpecBody, <<"<strong>Dispatch shape">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(SpecBody, <<"**Dispatch shape">>)),
    ?assertEqual(nomatch, binary:match(SpecBody, <<"PRESENT">>)),
    ?assertEqual(nomatch, binary:match(SpecBody, <<"specs/message@1.0.md">>)),
    ?assert(binary:match(Body, <<"<table><thead>">>) =/= nomatch),
    ?assertEqual(nomatch, binary:match(Body, <<"| Key | What it does |">>)).

schema_key_route_test() ->
    Msgs = [
        {as, ?MESSAGE_DEVICE, #{}},
        #{ <<"path">> => <<"info">> },
        #{ <<"path">> => <<"schema">> },
        #{ <<"path">> => <<"field">> }
    ],
    Req = #{ <<"accept">> => <<"text/html">> },
    {true, {ok, HTML}} = maybe_info_request(Msgs, Req, #{}),
    ?assertEqual(<<"text/html; charset=utf-8">>, maps:get(<<"content-type">>, HTML)),
    Body = maps:get(<<"body">>, HTML),
    ?assert(binary:match(Body, <<"Schema Key">>) =/= nomatch),
    ?assert(binary:match(Body, <<"Read any public message field">>) =/= nomatch).

schema_parameter_route_test() ->
    {ok, HTML} = device_info_route(
        ?ARWEAVE_DEVICE,
        [<<"schema">>, <<"tx">>, <<"exclude-data">>],
        #{ <<"accept">> => <<"text/html">> },
        #{}
    ),
    ?assertEqual(<<"text/html; charset=utf-8">>, maps:get(<<"content-type">>, HTML)),
    Body = maps:get(<<"body">>, HTML),
    ?assert(binary:match(Body, <<"Schema Parameter">>) =/= nomatch),
    ?assert(binary:match(Body, <<"exclude-data">>) =/= nomatch),
    ?assert(binary:match(Body, <<"Return only transaction headers">>) =/= nomatch).

implementations_route_test() ->
    {ok, HTML} = device_info_route(
        ?MESSAGE_DEVICE,
        [<<"implementations">>],
        #{ <<"accept">> => <<"text/html">> },
        #{}
    ),
    Body = maps:get(<<"body">>, HTML),
    ?assert(binary:match(Body, <<"dev_message">>) =/= nomatch),
    ?assert(binary:match(Body, <<"src/preloaded/message/dev_message.erl">>) =/= nomatch).

node_component_routes_test() ->
    {ok, SchemaHTML} = node_info_route([<<"schema">>], #{ <<"accept">> => <<"text/html">> }, #{}),
    ?assert(binary:match(maps:get(<<"body">>, SchemaHTML), <<"Schema index">>) =/= nomatch),
    {ok, Recipes} = node_info_route([<<"recipes">>], #{ <<"accept">> => <<"application/json">> }, #{}),
    ?assertEqual(<<"node-recipes-index">>, maps:get(<<"kind">>, Recipes)),
    ?assertEqual(3, length(maps:get(<<"devices">>, Recipes))).

boilerplate_routes_test() ->
    {ok, Index} = node_info_route([<<"boilerplate">>], #{ <<"accept">> => <<"application/json">> }, #{}),
    ?assertEqual(<<"node-boilerplate-index">>, maps:get(<<"kind">>, Index)),
    ?assert(length(maps:get(<<"pages">>, Index)) > 10),
    ?assertEqual(nomatch, binary:match(maps:get(<<"source-root">>, Index), <<"/home/fn/Dev/device-docs">>)),
    {ok, JSON} = node_info_route(
        [<<"boilerplate">>, <<"introduction">>, <<"what-is-hyperbeam">>],
        #{ <<"accept">> => <<"application/json">> },
        #{}
    ),
    ?assertEqual(<<"node-boilerplate-page">>, maps:get(<<"kind">>, JSON)),
    ?assertEqual(<<"docs/introduction/what-is-hyperbeam.md">>, maps:get(<<"source-relative">>, JSON)),
    ?assert(maps:get(<<"markdown-bytes">>, JSON) > 0),
    {ok, HTML} = node_info_route(
        [<<"boilerplate">>, <<"introduction">>, <<"what-is-hyperbeam">>],
        #{ <<"accept">> => <<"text/html">> },
        #{}
    ),
    Body = maps:get(<<"body">>, HTML),
    ?assert(binary:match(Body, <<"What is HyperBEAM">>) =/= nomatch),
    ?assert(binary:match(Body, <<"HyperBEAM is the primary">>) =/= nomatch).

cookbook_device_contract_test() ->
    Data = device_info_data(?COOKBOOK_DEVICE, #{}),
    ?assertEqual(<<"device-info">>, maps:get(<<"kind">>, Data)),
    ?assertEqual(<<"prototype-renderer-device">>, maps:get(<<"status">>, maps:get(<<"renderer">>, Data))),
    Spec = maps:get(<<"spec">>, Data),
    ?assertEqual(<<"present">>, maps:get(<<"spec-status">>, Spec)),
    ?assertEqual(<<"specs/cookbook@1.0.md">>, maps:get(<<"source-path">>, Spec)),
    Schema = maps:get(<<"schema">>, Data),
    ?assert(maps:is_key(<<"device">>, Schema)),
    DeviceKey = maps:get(<<"device">>, Schema),
    ?assertEqual(<<"for">>, maps:get(<<"required-parameters">>, DeviceKey)).

docs_asset_route_test() ->
    Msgs = [
        #{},
        #{ <<"path">> => <<"info">> },
        #{ <<"path">> => <<"assets">> },
        #{ <<"path">> => <<"site.css">> }
    ],
    {true, {ok, CSS}} = maybe_info_request(Msgs, #{}, #{}),
    ?assertEqual(200, maps:get(<<"status">>, CSS)),
    ?assertEqual(<<"text/css; charset=utf-8">>, maps:get(<<"content-type">>, CSS)),
    ?assert(binary:match(maps:get(<<"body">>, CSS), <<"hb-runner">>) =/= nomatch).

node_info_request_match_test() ->
    Msgs = hb_singleton:from(#{ <<"path">> => <<"/info">> }, #{}),
    ?assert(is_node_info_request(Msgs, #{})),
    DeviceMsgs = hb_singleton:from(#{ <<"path">> => <<"/~arweave@2.9/info">> }, #{}),
    ?assertNot(is_node_info_request(DeviceMsgs, #{})).
