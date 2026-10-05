#!/bin/bash
# Saves an Intgral MCP access token without it passing through the chat (INT-1010), macOS.
# The user pastes the token into a local hidden-input dialog; it is checked against the gateway,
# kept in the login Keychain, and exported to apps at every login. Output never contains it.
# Usage: bash set-token.sh <MCP address> [variable name, default INTGRAL_MCP_TOKEN]

# Accepts a bare token or one "identity=token" entry; refuses a whole MCP_ACCESS_TOKENS line.
intgral_resolve_token() {
  local token
  token=$(printf '%s' "$1" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//')
  if [[ $token =~ ^[A-Za-z0-9._-]+=([^,=[:space:]]+)$ ]]; then token=${BASH_REMATCH[1]}; fi
  if [ -z "$token" ]; then echo "no token was entered" >&2; return 1; fi
  case $token in *[,=[:space:]]*) echo "that is not a single token" >&2; return 1 ;; esac
  printf '%s\n' "$token"
}

# The MCP initialize call the client will make; prints the HTTP status (000 = unreachable).
# The header goes through stdin so the token never appears in the process list.
intgral_check_token() {
  printf 'Authorization: Bearer %s\n' "$2" | curl -s -o /dev/null -w '%{http_code}\n' --max-time 30 -X POST "$1" \
    -H @- -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
    --data '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"intgral-token-setup","version":"1"}}}'
}

intgral_read_token_dialog() {
  osascript -e 'text returned of (display dialog "请粘贴 Intgral 团队发给你的访问令牌：" default answer "" with hidden answer with title "Intgral 访问令牌" buttons {"取消", "保存"} default button "保存" cancel button "取消")' 2>/dev/null
}

# Keychain holds the token; a LaunchAgent exports it to GUI apps (the Codex desktop app does
# not read shell profiles) at each login, and launchctl setenv covers the current session.
intgral_save_token() {
  local var=$1 token=$2 service="intgral-mcp-token-$1" agent="$HOME/Library/LaunchAgents/ai.intgral.$1.plist"
  security add-generic-password -U -a "$USER" -s "$service" -w "$token" >/dev/null || return 1
  launchctl setenv "$var" "$token" || return 1
  mkdir -p "$HOME/Library/LaunchAgents"
  cat >"$agent" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>ai.intgral.$var</string>
  <key>ProgramArguments</key><array><string>/bin/sh</string><string>-c</string>
    <string>launchctl setenv $var "\$(security find-generic-password -s $service -w)"</string></array>
  <key>RunAtLoad</key><true/>
</dict></plist>
PLIST
}

intgral_token_setup() {
  local url=$1 var=${2:-INTGRAL_MCP_TOKEN} raw token status
  if [ -z "$url" ]; then echo "missing the Intgral MCP address; nothing saved"; return 1; fi
  raw=$(intgral_read_token_dialog) || { echo "the dialog was closed; nothing saved"; return 1; }
  token=$(intgral_resolve_token "$raw" 2>&1) || { echo "$token; nothing saved"; return 1; }
  status=$(intgral_check_token "$url" "$token")
  if [ "$status" != 200 ]; then echo "the gateway did not accept the token (HTTP $status); nothing saved"; return 1; fi
  intgral_save_token "$var" "$token" || { echo "could not save to the Keychain; nothing saved"; return 1; }
  echo "saved $var (length ${#token}); restart the client to use it"
}

if [ "${BASH_SOURCE[0]}" = "$0" ]; then intgral_token_setup "$@"; fi
