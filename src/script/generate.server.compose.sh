#!/bin/bash

output_path=$1
ch=$2
gateway_port=$3
is_debug=$4

output_file="${output_path}compose.server.yml"
container_name_ch=$( [[ "$ch" == '/' ]] && echo "root" || echo "$ch" | sed 's|^/||; s|/$||')

# Generate compose.gateway.yml
cat <<EOF >$output_file
services:
  io-${container_name_ch}:
    container_name: talkn-ch-server-io-${container_name_ch}
    image: node:22.2.0
    depends_on:
      - redis
    external_links:
      - talkn-ch-server-redis:redis
    working_dir: /app
    volumes:
      - .:/app
      - /app/node_modules
      - ~/talkn-ch-gateway/common/ch-configs${ch}openssl.crt:/etc/ssl/certs/openssl.crt
      - ~/talkn-ch-gateway/common/ch-configs${ch}openssl.key:/etc/ssl/certs/openssl.key
    command: sh -c "npm install && npm run dev"

    environment:
      - IS_DOCKER=true
      - TOP_CONNECTION=${ch}
      - NODE_ENV=development
      - REDIS_HOST=redis
      - REDIS_PORT=${CH_PORT:-6379}
    networks:
      - talkn-global

networks:
  talkn-global:
    external: true

EOF

[ "$is_debug" == "true" ] && echo "DOCKER COMPOSE ----------------"
[ "$is_debug" == "true" ] && echo "Generated $output_file"
