#!/bin/bash

output_path=$1
ch=$2
gateway_port=$3
is_debug=$4

output_file="${output_path}compose.gateway.yml"
container_name_ch=$( [[ "$ch" == '/' ]] && echo "root" || echo "$ch" | sed 's|^/||; s|/$||')

# Generate compose.gateway.yml
cat <<EOF >$output_file
services:
  $container_name_ch:
    container_name: talkn-ch-gateway-${container_name_ch}
    image: nginx:alpine
    volumes:
      - ${output_path}nginx.conf:/etc/nginx/nginx.conf
      - ${output_path}openssl.crt:/etc/ssl/certs/openssl.crt
      - ${output_path}openssl.key:/etc/ssl/certs/openssl.key
    ports:
      - "$gateway_port:443"
    environment:
      - IS_DOCKER=true
      - NODE_ENV=development
    command: ["nginx", "-g", "daemon off;", "-c", "/etc/nginx/nginx.conf"]
    deploy:
      resources:
        limits:
          memory: 2g
    networks:
      - talkn-global

networks:
  talkn-global:
    external: true
EOF

[ "$is_debug" == "true" ] && echo "DOCKER COMPOSE ----------------"
[ "$is_debug" == "true" ] && echo "Generated $output_file"
