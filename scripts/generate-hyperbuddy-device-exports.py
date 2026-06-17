#!/usr/bin/env python3
"""Generate Hyperbuddy device export keys for autocomplete from preloaded devices."""

from __future__ import annotations

import glob
import json
import re
import sys
from pathlib import Path

SKIP = {"info", "module_info", "return_file", "return_error"}


def module_to_device(mod: str) -> str:
    return mod[4:].replace("_", "-") + "@1.0"


def extract_info_block(text: str) -> str:
    match = re.search(
        r"\ninfo\([^)]*\)\s*->\s*(.*?)(?=\n[a-z][a-z_0-9]*\([^)]*\)\s*->|\n%%\s*@doc|\Z)",
        text,
        re.S,
    )
    return match.group(1) if match else ""


def bracket_block(source: str, start: int) -> str:
    depth = 1
    index = start
    while index < len(source) and depth:
        if source[index] in "[{":
            depth += 1
        elif source[index] in "]}":
            depth -= 1
        index += 1
    return source[start : index - 1]


def export_keys(text: str) -> list[str]:
    keys: set[str] = set()
    for match in re.finditer(r"-export\(\[([^\]]+)\]\)", text):
        for fn in re.findall(r"(\w+)/\d+", match.group(1)):
            if fn not in SKIP:
                keys.add(fn.replace("_", "-"))
    return sorted(keys)


def extract_device_keys(text: str) -> list[str]:
    info = extract_info_block(text)
    if info:
        exports_match = re.search(r"exports\s*=>\s*\[", info)
        if exports_match:
            block = bracket_block(info, exports_match.end())
            keys = re.findall(r'<<"([^"]+)">>', block)
            if keys:
                return sorted(set(keys))

        serve_match = re.search(r"serve\s*=>\s*[\w_]*\s*#{", info)
        if serve_match:
            block = bracket_block(info, serve_match.end())
            serve = [
                key
                for key in re.findall(r'<<"([^"]+)">>\s*=>', block)
                if "." not in key
            ]
            return sorted(set(serve) | set(export_keys(text)))

    return export_keys(text)


def main() -> int:
    root = Path(__file__).resolve().parents[1]
    devices: dict[str, list[str]] = {}

    for path in sorted(root.glob("src/preloaded/**/dev_*.erl")):
        mod = path.stem
        keys = extract_device_keys(path.read_text())
        if keys:
            devices[module_to_device(mod)] = keys

    out = root / "src/core/html/hyperbuddy@1.0/device-exports.json"
    out.write_text(json.dumps(devices, indent="\t", sort_keys=True) + "\n")

    js_out = root / "src/core/html/hyperbuddy@1.0/device-exports.js"
    js_out.write_text(
        "const PRELOADED_DEVICE_EXPORTS = "
        + json.dumps(devices, indent="\t", sort_keys=True)
        + ";\n"
    )

    bundle = root / "src/core/html/hyperbuddy@1.0/bundle.js"
    bundle_text = bundle.read_text()
    marker_begin = "/* AUTO-GENERATED DEVICE EXPORTS BEGIN */"
    marker_end = "/* AUTO-GENERATED DEVICE EXPORTS END */"
    replacement = (
        marker_begin
        + "\nconst PRELOADED_DEVICE_EXPORTS = "
        + json.dumps(devices, indent="\t", sort_keys=True)
        + ";\n"
        + marker_end
    )
    pattern = re.compile(
        re.escape(marker_begin) + r".*?" + re.escape(marker_end),
        re.S,
    )
    if not pattern.search(bundle_text):
        raise SystemExit(f"Could not find device export markers in {bundle}")
    bundle.write_text(pattern.sub(replacement, bundle_text, count=1))

    print(
        f"Wrote {len(devices)} device export catalogs to {out}, {js_out}, and {bundle}"
    )
    return 0


if __name__ == "__main__":
    sys.exit(main())
