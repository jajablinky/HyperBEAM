# Read Raw Data And Ranges

Read Arweave transaction and ANS-104 item bodies without materializing full structured messages. Use `HEAD` for metadata and `range` for deterministic byte slices.

Source tests: `dev_arweave:head_raw_tx_test_parallel/0`, `dev_arweave:head_raw_ans104_test_parallel/0`, `dev_arweave:get_raw_range_tx_test_parallel/0`, `dev_arweave:get_raw_range_ans104_test_parallel/0`.

Prerequisites:

- Local HyperBEAM node at `http://localhost:8734`.
- Arweave routes available through the node.
- For the ANS-104 item example, import block `1827942` or run against a node that can resolve the item directly.

## 1. Inspect Raw Transaction Metadata

```bash
HB=${HB:-http://localhost:8734}
TXID=ptBC0UwDmrUTBQX3MqZ1lB57ex20ygwzkjjCrQjIx3o

curl -sS "$HB/~copycat@1.0/arweave?from=1749502&to=1749502&mode=write" >/dev/null
curl -sSI "$HB/~arweave@2.9/raw=$TXID"
```

Expected stable headers:

```text
content-type: application/json
content-length: 774
header-length: 0
```

## 2. Read Raw Transaction Ranges

```bash
HB=${HB:-http://localhost:8734}
TXID=ptBC0UwDmrUTBQX3MqZ1lB57ex20ygwzkjjCrQjIx3o

curl -sS "$HB/~copycat@1.0/arweave?from=1749502&to=1749502&mode=write" >/dev/null
curl -sS "$HB/~arweave@2.9/raw=$TXID?range=bytes%200-2%2F774"
printf '\n'
curl -sS "$HB/~arweave@2.9/raw=$TXID?range=bytes%20100-105%2F774"
```

Expected bodies:

```text
{"d
ame Cr
```

The second response also carries `content-type: application/json`.

## 3. Import The Block That Contains The ANS-104 Item

```bash
HB=${HB:-http://localhost:8734}

curl -sS "$HB/~copycat@1.0/arweave&from=1827942&to=1827942"
```

Expected:

```text
block 1827942 is available in the node's local Arweave view
```

## 4. Inspect Raw ANS-104 Item Metadata

```bash
HB=${HB:-http://localhost:8734}
ITEM=0vy2Ey8bWkSDcRIvWQJjxDeVGYOrTSmYIIhBILJntY8

curl -sSI "$HB/~arweave@2.9/raw=$ITEM"
```

Expected stable headers:

```text
content-type: application/json
content-length: 575
```

## 5. Read Raw ANS-104 Item Ranges

```bash
HB=${HB:-http://localhost:8734}
ITEM=0vy2Ey8bWkSDcRIvWQJjxDeVGYOrTSmYIIhBILJntY8

curl -sS "$HB/~arweave@2.9/raw=$ITEM?range=bytes%200-1%2F575"
printf '\n'
curl -sS "$HB/~arweave@2.9/raw=$ITEM?range=bytes%20100-105%2F575"
```

Expected bodies:

```text
{
t #972
```

The malformed-tag synthetic fixture in the upstream test suite is not a user workflow; it is recorded in [Unviable Tests](unviable.md).
