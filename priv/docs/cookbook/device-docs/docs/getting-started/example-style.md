# Reading The Examples

Examples are written as direct HyperBEAM paths. A device path starts with `~device@version`, then names the key to execute:

```bash
curl -sS "http://localhost:8734/~message@1.0&greeting=hello/greeting"
```

This request creates a message with a `greeting` field and then reads that field. Query parameters and path segments are both part of the message that reaches the device.

Typed values use HyperBEAM's typed key form:

```bash
curl -sS "http://localhost:8734/~message@1.0&count+integer=42/count"
```

Composition is just another path segment. This command builds a message, then asks the JSON device to serialize it:

```bash
curl -sS "http://localhost:8734/~message@1.0&greeting=hello&count+integer=42/~json@1.0/serialize"
```

If a URL contains `&`, quote it in the shell. If an example includes an operator-sensitive device, run it on a node you control.
