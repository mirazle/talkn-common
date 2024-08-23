#!/bin/bash

output_path=$1
ch=$2
gateway_port=$3
is_debug=$4
nginx_path="${output_path}nginx.conf"
container_name_ch=$( [[ "$ch" == '/' ]] && echo "root" || echo "$ch" | sed 's|^/||; s|/$||')

echo "${container_name_ch}"

# nginx.confの生成
cat <<EOF > "$nginx_path"
worker_processes  1;
error_log  ./error.log debug;
worker_rlimit_nofile 83000;

events {
  worker_connections 4096;
}

http {
  upstream backend {
    server talkn-ch-server-io-$container_name_ch:443;
  }
  
  server {
    server_name localhost;
    listen 443 ssl;
    access_log  ./access.log;
    ssl_certificate /etc/ssl/certs/openssl.crt;
    ssl_certificate_key /etc/ssl/certs/openssl.key;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    proxy_set_header Connection "upgrade";
    proxy_http_version 1.1;

    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header X-Gateway-Host \$host;
    proxy_set_header X-Gateway-Port "$gateway_port";
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header X-Gateway-Name \$hostname;
    proxy_set_header Access-Control-Allow-Origin "*";
    proxy_set_header Access-Control-Allow-Methods "POST, GET, PUT, DELETE, OPTIONS";
    proxy_set_header Access-Control-Allow-Headers "DNT, X-Mx-ReqToken, Keep-Alive, User-Agent, X-Requested-With, If-Modified-Since, Cache-Control, Content-Type";
    proxy_set_header Access-Control-Allow-Credentials true;

    # Normal Routing.
    location / {
      proxy_pass https://backend/socket.io/;
    }

    # Load Balance Routing.

    # Down Case Routing. (from ch-configs.json)

  }
}
EOF

[ "$is_debug" == "true" ] && echo "NGINX ---------------------"
[ "$is_debug" == "true" ] && echo "Generated $nginx_path"
