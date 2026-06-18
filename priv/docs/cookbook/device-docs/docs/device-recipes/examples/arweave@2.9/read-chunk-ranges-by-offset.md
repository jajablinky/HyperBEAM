# Read Chunk Ranges By Offset

Fetch exact byte ranges from the Arweave weave through `~arweave@2.9/chunk`, then hash the returned bytes. This is the most direct user-facing form of the chunk reconstruction tests.

Source tests: `dev_arweave:get_partial_chunk_post_split_test_parallel/0`, `dev_arweave:get_full_chunk_post_split_test_parallel/0`, `dev_arweave:get_multi_chunk_post_split_test_parallel/0`, `dev_arweave:get_mid_chunk_post_split_test_parallel/0`, `dev_arweave:get_partial_chunk_pre_split_test_parallel/0`, `dev_arweave:get_full_chunk_pre_split_test_parallel/0`, `dev_arweave:get_multi_chunk_pre_split_test_parallel/0`, `dev_arweave:get_mid_chunk_pre_split_test_parallel/0`, `dev_arweave:get_pre_split_small_chunks_test_parallel/0`, `dev_arweave:get_post_split_small_chunks_test_parallel/0`, `dev_arweave:get_pre_split_gap_test_parallel/0`, `dev_arweave:get_pre_split_small_tx_test_parallel/0`, `dev_arweave:get_ed25519_item_test_parallel/0`, `dev_arweave:bucket_based_offset_fail_test_parallel/0`, `dev_arweave:bucket_based_offset_pass_test_parallel/0`, `dev_arweave:get_post_split_mid_chunk_large_module_test_parallel/0`.

Prerequisites:

- Local HyperBEAM node at `http://localhost:8734`.
- Arweave routes available through the node.
- `openssl` and `base64` for the hash helper.

Arweave's data chunk size in the source tree is `256 * 1024`, or `262144` bytes.

## 1. Define A Hash Helper

```bash
HB=${HB:-http://localhost:8734}

hash_body() {
  openssl dgst -sha256 -binary | base64 | tr '+/' '-_' | tr -d '='
}

check_chunk() {
  offset=$1
  length=$2
  expected=$3
  actual=$(curl -sS "$HB/~arweave@2.9/chunk?offset=$offset&length=$length" | hash_body)
  printf '%s %s %s\n' "$offset" "$length" "$actual"
  test "$actual" = "$expected"
}
```

## 2. Verify Post-Split Chunk Ranges

These ranges come from transaction `QL7_EnmrFtx-0wVgPr2IwaGWQT8vmPcF3R20CKMO3D4`.

| Case | Offset | Length | Expected SHA-256 |
|---|---:|---:|---|
| Partial chunk | `378092137521399` | `1000` | `G62E7qonT1RBmkC6e3pNJz_thpS9xkVD3qTJAk6o3Uc` |
| Full chunk | `378092137521399` | `262144` | `LyTBdUe0rNmpqt8C-p7HksdiredXaa0wCBAPt3504W0` |
| Three chunks | `378092137521399` | `786432` | `4Cb_N0z0tMDwCiWrUbuzktfn-H6NLHT1btXGDo3CByI` |
| Mid-chunk span | `378092137721399` | `562144` | `xkEZpGqDiCVuVZfGVyscmfYNZqYmgBLjOrMD2P_SfWs` |

```bash
check_chunk 378092137521399 1000 G62E7qonT1RBmkC6e3pNJz_thpS9xkVD3qTJAk6o3Uc
check_chunk 378092137521399 262144 LyTBdUe0rNmpqt8C-p7HksdiredXaa0wCBAPt3504W0
check_chunk 378092137521399 786432 4Cb_N0z0tMDwCiWrUbuzktfn-H6NLHT1btXGDo3CByI
check_chunk 378092137721399 562144 xkEZpGqDiCVuVZfGVyscmfYNZqYmgBLjOrMD2P_SfWs
```

## 3. Verify Pre-Split Chunk Ranges

These ranges come from transaction `v4ophPvV-cNp5gkpkjMuUZ-lf-fBfm1Wk-pB4vJb00E`.

| Case | Offset | Length | Expected SHA-256 |
|---|---:|---:|---|
| Partial chunk | `30575701172109` | `1000` | `yU5tZyDCTZ4MFcT6lng74tvx1oIbPkpCw1VAJsSqeuo` |
| Full chunk | `30575701172109` | `262144` | `nVCvjEq9T5nxIR6jvglNbX1_CYCg0WifxfQoXhS4gik` |
| Three chunks | `30575701172109` | `786432` | `DfS3jtLXqG3zO_IFA3P-r55SUBoeJmeIh4Eim2Rldeo` |
| Mid-chunk span | `30575701372109` | `562144` | `mgSfqsNapn_BXpbnIHtdeu3rQyvrjBaS0c7rEbUbtBU` |

```bash
check_chunk 30575701172109 1000 yU5tZyDCTZ4MFcT6lng74tvx1oIbPkpCw1VAJsSqeuo
check_chunk 30575701172109 262144 nVCvjEq9T5nxIR6jvglNbX1_CYCg0WifxfQoXhS4gik
check_chunk 30575701172109 786432 DfS3jtLXqG3zO_IFA3P-r55SUBoeJmeIh4Eim2Rldeo
check_chunk 30575701372109 562144 mgSfqsNapn_BXpbnIHtdeu3rQyvrjBaS0c7rEbUbtBU
```

## 4. Verify Whole-Item Ranges

The source tests compute these offsets from transaction offset metadata, then request `start_offset + 1`.

| Case | ID | Offset | Length | Expected SHA-256 |
|---|---|---:|---:|---|
| Pre-split small chunks | `4FnBmvgWmqXWEEprjVqBsV5aRpAgF6_yJX_GTGsSZjY` | `11741030835624` | `810774` | `LJbiKv5gT2Y5XKFFPF6WqYAdOtaZAvHmtCkfCTbP43g` |
| Post-split small chunks | `YR9m4c3CrlljCRYEWBLeoKekbAyYZRMo2Kpz61IeNp8` | `146563434848503` | `541937` | `cR2HRQRfZP_MiC1egrdc8y8j4SAF9-ppvaIaXDq5i7s` |
| Pre-split gap | `VexuG68KCNpw21fGZw1ycRCYBtQMHhl274zGDBh3kQE` | `13308101099539` | `8789723` | `X6sbQdUyKTQ8LGzmleWU_jxO8Oda7S_bshDDKP_Mnqs` |
| Pre-split small tx | `K4C4dLZ7V4ffYJcR9JtVQwIXCTLD1mMCUaPbHuUdFgw` | `12778619746609` | `1444` | `o7gJm-FgmWcIvbDiFxDaL56WkJIWQCwsN95Z8zNjEO8` |
| ED25519 ANS-104 item | `1rTy7gQuK9lJydlKqCEhtGLp2WWG-GOrVo5JdiCmaxs` | `160399272861860` | `499025` | `PQ5sHoQYSdi1unjHjsfNS_ZXdMvmznEvIkBTvToqVbU` |
| Bucket-offset-sensitive item | `z-oKJfhMq5qoVFrljEfiBKgumaJmCWVxNJaavR5aPE8` | `376836461101676` | `116247` | `4BN8AQEQLpTjresTntyrjJ94eFS2TaMM21MnuHGXtJc` |
| Bucket-offset-compatible item | `cTI07T1OrF0KZEqPmZji1VTdbeKJG7kMAVlLu7KQvyw` | `384600234780717` | `856885` | `EVLmVPkpWZjcDtw_zX2r18O7GC85P8VmuaKNy-sDRrw` |

```bash
check_chunk 11741030835624 810774 LJbiKv5gT2Y5XKFFPF6WqYAdOtaZAvHmtCkfCTbP43g
check_chunk 146563434848503 541937 cR2HRQRfZP_MiC1egrdc8y8j4SAF9-ppvaIaXDq5i7s
check_chunk 13308101099539 8789723 X6sbQdUyKTQ8LGzmleWU_jxO8Oda7S_bshDDKP_Mnqs
check_chunk 12778619746609 1444 o7gJm-FgmWcIvbDiFxDaL56WkJIWQCwsN95Z8zNjEO8
check_chunk 160399272861860 499025 PQ5sHoQYSdi1unjHjsfNS_ZXdMvmznEvIkBTvToqVbU
check_chunk 376836461101676 116247 4BN8AQEQLpTjresTntyrjJ94eFS2TaMM21MnuHGXtJc
check_chunk 384600234780717 856885 EVLmVPkpWZjcDtw_zX2r18O7GC85P8VmuaKNy-sDRrw
```

For `tx@1.0` IDs, the returned bytes can be reattached to the `exclude-data=true` tx header and verified. For `ans104@1.0` IDs, the returned bytes can be deserialized and verified as ANS-104 data items.

## 5. Verify A Large Mid-Chunk Read By Length

This test checks the byte count rather than a hash.

```bash
HB=${HB:-http://localhost:8734}

curl -sS "$HB/~arweave@2.9/chunk?offset=194794421495004&length=732228" \
  > /tmp/hb-large-module-range.bin

wc -c /tmp/hb-large-module-range.bin
```

Expected byte count:

```text
732228
```
