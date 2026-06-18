#!/usr/bin/env bash
# Start HyperBEAM on HB_PORT (default 8734) without overlapping listeners.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PORT="${HB_PORT:-8734}"
PIDFILE="${ROOT}/.hyperbeam-dev-server.${PORT}.pid"

usage() {
  cat <<EOF
Usage: $(basename "$0") [command]

Commands:
  start       Start rebar3 shell if port ${PORT} is free (default)
  stop        Stop the process listening on port ${PORT}
  restart     stop, then start
  status      Show whether the dev server is up
  attach      Print how to use the running node (does not start a new one)

Environment:
  HB_PORT     HTTP port (default: 8734)

If port ${PORT} is already in use, start exits without launching another shell.
Use 'restart' to replace the running instance.
EOF
}

port_pids() {
  lsof -ti ":${PORT}" 2>/dev/null || true
}

http_ok() {
  curl -sf -m 2 -o /dev/null "http://localhost:${PORT}/info" 2>/dev/null
}

status() {
  local pids
  pids="$(port_pids | tr '\n' ' ' | sed 's/ $//')"
  if [[ -z "$pids" ]]; then
    echo "down (nothing on port ${PORT})"
    return 1
  fi
  if http_ok; then
    echo "up   http://localhost:${PORT}  (pid(s): ${pids})"
    return 0
  fi
  echo "stale (port ${PORT} held by pid(s): ${pids}, HTTP not responding)"
  return 2
}

stop() {
  local pids
  pids="$(port_pids)"
  if [[ -z "$pids" ]]; then
    rm -f "$PIDFILE"
    echo "No process on port ${PORT}"
    return 0
  fi
  echo "Stopping process(es) on port ${PORT}: ${pids//$'\n'/ }"
  # shellcheck disable=SC2046
  kill $(echo "$pids" | tr '\n' ' ') 2>/dev/null || true
  sleep 1
  pids="$(port_pids)"
  if [[ -n "$pids" ]]; then
    # shellcheck disable=SC2046
    kill -9 $(echo "$pids" | tr '\n' ' ') 2>/dev/null || true
  fi
  rm -f "$PIDFILE"
}

start() {
  local existing
  existing="$(port_pids)"
  if [[ -n "$existing" ]]; then
    if http_ok; then
      echo "HyperBEAM already running at http://localhost:${PORT}"
      echo "pid(s): ${existing//$'\n'/ }"
      echo "Use: $(basename "$0") attach"
      echo "Or:  $(basename "$0") restart"
      exit 0
    fi
    echo "Port ${PORT} is in use but not responding — cleaning up stale listener(s)."
    stop
  fi

  cd "$ROOT"
  export HB_PORT="$PORT"
  echo "Starting HyperBEAM on http://localhost:${PORT} ..."
  exec env HB_PORT="$PORT" rebar3 shell
}

attach() {
  if ! status; then
    echo "Nothing to attach to. Run: $(basename "$0") start"
    exit 1
  fi
  cat <<EOF
Dev server is already running at http://localhost:${PORT}.

Do not start another 'rebar3 shell' on the same port — that causes eaddrinuse.

To reload Erlang modules in the running shell, use your existing terminal:
  c(hb_docs).

To open a remote shell to the running node, find the node name in the
original terminal output and run:
  erl -remsh <node@host> -sname dev-attach
EOF
}

cmd="${1:-start}"
case "$cmd" in
  start) start ;;
  stop) stop ;;
  restart) stop; start ;;
  status) status ;;
  attach) attach ;;
  -h|--help|help) usage ;;
  *)
    echo "Unknown command: $cmd" >&2
    usage >&2
    exit 1
    ;;
esac
