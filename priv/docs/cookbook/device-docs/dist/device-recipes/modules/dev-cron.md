# dev_cron Device Test Recipes

Source owner: `~cron@1.0`

Source module: `node/dev_cron.erl`

Category: Compute, Processes, And Composition

Test count: 4 unique zero-arity test entries from upstream `edge` commit `c6a16a26dc4ddca55c57db2fd7be6b898d105bb3`.

Viability: High.

Existing curated recipe overlap: [scheduled-lua-process](/recipes/scheduled-lua-process.md).

## What The Tests Cover

One-shot and recurring scheduled self-calls.

## Recipe Candidates

- Schedule a one-shot self-call and an every-loop process call.

## Outcome Summary

| Outcome | Count |
|---|---:|
| Existing recipe overlap | 4 |

## Test Traceability

| Test | Outcome | Why | Source |
|---|---|---|---|
| `stop_once_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [node/dev_cron.erl:213](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_cron.erl#L213) |
| `stop_every_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [node/dev_cron.erl:250](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_cron.erl#L250) |
| `once_executed_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [node/dev_cron.erl:295](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_cron.erl#L295) |
| `every_worker_loop_test` | Existing recipe overlap | The behavior is already partly represented by the curated recipes; keep this test as traceability or use it to strengthen expected results. | [node/dev_cron.erl:331](https://github.com/permaweb/HyperBEAM/blob/c6a16a26dc4ddca55c57db2fd7be6b898d105bb3/src/preloaded/node/dev_cron.erl#L331) |

## Tests Not Promoted To Standalone Recipes

All tests in this module are at least plausible recipe seeds, although some are already covered by existing curated recipes.
