#!/bin/bash

output_path=$1
ch=$2
gateway_port=$3
is_debug=$4

# CNと代替名リストを取得
shift
alt_names=("$@")
key_file="${output_path}openssl.key"
crt_file="${output_path}openssl.crt"
conf_file="${output_path}openssl.cnf"
container_name_ch=$( [[ "$ch" == '/' ]] && echo "root" || echo "$ch" | sed 's|^/||; s|/$||')

cat > "$conf_file" <<EOF
[req]

distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_ca
prompt             = no

[req_distinguished_name]
CN = $container_name_ch

[req_ext]
subjectAltName = @alt_names

[v3_ca]
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
EOF

# 代替名を追加
if [[ ${#alt_names[@]} -gt 0 ]]; then
  i=1
  for alt_name in "${alt_names[@]}"; do
    # echo "DNS.$i = $alt_name" >> "$conf_file"
    ((i++))
  done
fi

# 証明書の生成
openssl req -x509 -nodes -days 60 -newkey rsa:2048 \
  -keyout "$key_file" -out "$crt_file" \
  -config "$conf_file"

# 証明書をシステムの信頼されたリストに追加 (macOS用)
if [[ "$OSTYPE" == "darwin"* ]]; then
  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "$crt_file"
fi


[ "$is_debug" == "true" ] && echo "OPEN SSL ---------------------"
[ "$is_debug" == "true" ] && echo "Generated $key_file"
[ "$is_debug" == "true" ] && echo "Generated $crt_file"
[ "$is_debug" == "true" ] && echo "Generated $conf_file"
