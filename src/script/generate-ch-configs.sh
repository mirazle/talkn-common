#!/bin/bash

is_debug=true
input_json="$HOME/talkn-ch-gateway/common/src/ch-config.json"
output_base="$HOME/talkn-ch-gateway/common/ch-configs"
script_dir=$(dirname "$(realpath "$0")")

if [ ! -f "$input_json" ]; then
  echo "JSON file $input_json not found!"
  exit 1
fi

# Process top-level service
ch="/"
gateway_port=$(jq -r '.gateway.port' "$input_json")

process_ch() {
  local output_base=$1
  local ch=$2
  local gateway_port=$3
  local is_debug=$4
  local output_path="${output_base}${ch}"
  if [ "$gateway_port" != "null" ]; then
    mkdir -p "$output_path"
    sudo "$script_dir/generate.gateway.compose.sh" "$output_path" "$ch" "$gateway_port" "$is_debug"
    sudo "$script_dir/generate.gateway.openssl.sh" "$output_path" "$ch" "$gateway_port" "$is_debug"
    sudo "$script_dir/generate.gateway.nginx.sh" "$output_path" "$ch" "$gateway_port" "$is_debug"
    sudo "$script_dir/generate.server.compose.sh" "$output_path" "$ch" "$gateway_port" "$is_debug"
  fi
}

process_ch "$output_base" "$ch" "$gateway_port" "$is_debug"

# Process children recursively
jq -c '.children[]' "$input_json" | while read -r child; do
  ch="/$(echo "$child" | jq -r '.nginx.location')"
  gateway_port=$(echo "$child" | jq -r '.gateway.port')
  process_ch "$output_base" "$ch" "$gateway_port" "$is_debug"

  # Recursively process children
  echo "$child" | jq -c '.children[]?' | while read -r sub_child; do
    sub_ch="/$(echo "$sub_child" | jq -r '.nginx.location')"
    sub_gateway_port=$(echo "$sub_child" | jq -r '.gateway.port')

    process_ch "$output_base" "$sub_ch" "$sub_gateway_port" "$is_debug"
  done
done
