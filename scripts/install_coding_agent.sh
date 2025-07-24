#!/usr/bin/env bash

set -euo pipefail

TOKEN=${1:-}
if [[ -z "$TOKEN" ]]; then
  echo "Usage: $0 <AZURE_TOKEN>"
  exit 1
fi

PYTHON=python3.12
ENV_DIR="$HOME/neoenv"
RC_FILE="$HOME/.zshrc"

echo "▶︎ Creating virtual environment in $ENV_DIR ..."
mkdir -p "$ENV_DIR"
cd "$ENV_DIR"
$PYTHON -m venv .venv
source .venv/bin/activate

echo "▶︎ Installing neo-ai from the private feed ..."
pip install --upgrade pip
pip install \
  --extra-index-url "https://gxazure:${TOKEN}@pkgs.dev.azure.com/genexuslabs/gxeai-agents/_packaging/coda-neo-prod/pypi/simple" \
  neo-ai

add_alias() {
  local ALIAS_LINE=$1
  if ! grep -Fxq "$ALIAS_LINE" "$RC_FILE"; then
    echo "$ALIAS_LINE" >> "$RC_FILE"
    echo "Added ▶︎ $ALIAS_LINE"
  else
    echo "Alias already present ▶︎ $ALIAS_LINE"
  fi
}

echo "▶︎ Updating $RC_FILE ..."
add_alias "alias neo=\"source ${ENV_DIR}/.venv/bin/activate && neo\""

echo "▶︎ Reloading your shell configuration for this session ..."
source "$RC_FILE"

echo "Done!  You can now run 'neo' right away."
