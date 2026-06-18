# Post Signed Data To Arweave

Use `~arweave@2.9` as the publishing boundary for signed ANS-104 data items and signed L1 transactions. This workflow also shows the expected behavior when an otherwise valid transaction reaches an Arweave route but cannot be accepted by the network.

Source tests: `dev_arweave:post_ans104_message_test_parallel/0`, `dev_arweave:post_tx_message_test_parallel/0`, `dev_arweave:post_tx_json_failure_test_parallel/0`, `dev_arweave:post_tx_json_success_test_parallel/0`, `dev_arweave:post_tx_json_mixed_status_prefers_success_test_parallel/0`.

Prerequisites:

- Local HyperBEAM node at `http://localhost:8734`.
- A node wallet for signing.
- Arweave routes configured for `/arweave` or `/arweave/tx`.
- Optional: a route config with more than one Arweave node when checking parallel publish behavior.

## 1. Sign And Post An ANS-104 Message

The test signs a process message with `~ans104@1.0`, posts it through `~arweave@2.9/tx`, then reads the signed ID back from the same node.

```bash
HB=${HB:-http://localhost:8734}

curl -sS -X POST \
  -H 'content-type: text/plain' \
  --data 'test-data' \
  "$HB/~message@1.0/commit&commitment-device=ans104@1.0&variant=ao.N.1&type=Process/~arweave@2.9/tx"
```

Expected:

```text
status: 200
```

Read the signed item back by ID:

```bash
SIGNED_ID='<id returned by the commit or tx response>'
curl -sS "$HB/$SIGNED_ID/serialize~json@1.0"
```

Expected message fields:

```json
{
  "variant": "ao.N.1",
  "type": "Process",
  "data": "test-data"
}
```

## 2. Post A Signed L1 Transaction

The tx path accepts a tx-encoded payload. A test wallet with no AR balance should still prove the node reached the Arweave route: the route returns Arweave's transaction verification failure.

```bash
HB=${HB:-http://localhost:8734}

curl -sS -X POST \
  -H 'content-type: text/plain' \
  --data 'test-data' \
  "$HB/~message@1.0/commit&commitment-device=tx@1.0&tag=value/~tx@1.0/serialize~json@1.0" \
  > /tmp/hb-arweave-tx.json

curl -sS -i -X POST \
  -H 'content-type: application/json' \
  --data-binary @/tmp/hb-arweave-tx.json \
  "$HB/~arweave@2.9/tx?codec-device=tx@1.0"
```

Expected for an unfunded test wallet:

```text
HTTP/1.1 400
Transaction verification failed.
```

If the wallet and transaction are valid for the configured Arweave node, the same request can succeed with `200`.

## 3. Prefer Any Successful Parallel Publish

Operators can route `/arweave/tx` to more than one node. The upstream test posts to two mock nodes in parallel and accepts the response if any admissible node returns `200`.

```json
{
  "template": {
    "path": "^/arweave/tx",
    "method": "POST"
  },
  "nodes": [
    {
      "match": "^/arweave",
      "with": "http://arweave-node-1.example/"
    },
    {
      "match": "^/arweave",
      "with": "http://arweave-node-2.example/"
    }
  ],
  "parallel": true,
  "responses": 2,
  "stop-after": false,
  "admissible-status": 200
}
```

Expected:

- If both nodes return `200`, `~arweave@2.9/tx` returns `200`.
- If one node returns `400` and another returns `200`, `~arweave@2.9/tx` returns `200`.
- Each configured node receives the POST when `responses` is `2` and `stop-after` is `false`.

## Test Coverage Notes

The exact helper assertions for failed connection list handling are not public recipes; they are recorded in [Unviable Tests](unviable.md). This workflow covers the operator-facing publish behavior that those helpers support.
