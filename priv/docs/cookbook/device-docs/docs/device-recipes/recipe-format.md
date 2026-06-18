# Device Recipe Format

The Friday 2026-06-12 call converged on a deliberately simple format: one workflow per Markdown page, prose for human intent, and fenced HTTP-style blocks for the machine-checkable parts. Front matter can be added later, but it is not required for the first corpus.

## Page Shape

````markdown
# Verb Noun With Device

A short statement of why a user or operator would run this workflow.

Source tests: `dev_example:some_test/0`, `dev_example:other_test/0`.

Prerequisites:
- Local HyperBEAM node at `http://localhost:8734`.
- Any non-default device, wallet, route, or fixture needed by this workflow.

## Workflow

### Step 1 - Request

```http
GET /~message@1.0&greeting=hello/greeting HTTP/1.1
Host: localhost:8734
```

### Expected

```text
hello
```
````

## Rules For Promotion

A test can become a standalone recipe when it satisfies all of these checks:

- It exercises a root device or an owning root-device workflow, not only a helper module.
- It can be run through HTTP, curl, aoconnect, or a small inline code block against a normal local node.
- It has a positive user or operator intent: read data, transform data, schedule work, route work, commit/verify, meter, pay, debug, or configure.
- It has deterministic expected output, or the recipe clearly marks the non-deterministic fields such as signatures, IDs, timestamps, scheduler slots, or live Arweave availability.
- It does not require a private mock server, hidden test store, race harness, benchmark harness, or disabled upstream behavior.

## Rules For Rejection

A test should stay out of standalone recipes when it is one of these:

- Internal helper/storage/server coverage under an owning root device.
- Negative assertion that only proves failure handling.
- Benchmark, stress, concurrency, corruption, restart, or timing coverage.
- Codec edge vector with no standalone human workflow.
- Disabled upstream test.
- Test harness fixture whose only audience is device implementers.

Rejected tests still belong in the corpus as traceability. They are useful for conformance, expected-error sections, and future generated tests.
