#!/bin/bash
# CH example: localhost, host.docker.internal

# 引数がなければエラーを表示して終了
if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <CN> <alt_name1> <alt_name2> <alt_name3> ..."
  exit 1
fi

# CNと代替名リストを取得
CN=$1
shift
ALT_NAMES=("$@")

# 証明書ディレクトリの作成
CERT_BASE_DIR=./common/nginx
mkdir -p "$CERT_BASE_DIR"

CERT_CH_DIR="$CERT_BASE_DIR/${CN}"
mkdir -p "$CERT_CH_DIR"

KEY_FILE="$CERT_CH_DIR/openssl.key"
CRT_FILE="$CERT_CH_DIR/openssl.crt"
CONF_FILE="$CERT_CH_DIR/openssl.cnf"

cat > "$CONF_FILE" <<EOF
[req]
distinguished_name = req_distinguished_name
req_extensions     = req_ext
x509_extensions    = v3_ca
prompt             = no

[req_distinguished_name]
CN = $CN

[req_ext]
subjectAltName = @alt_names

[v3_ca]
subjectAltName = @alt_names

[alt_names]
EOF

# 代替名を追加
i=1
for alt_name in "${ALT_NAMES[@]}"; do
  echo "DNS.$i = $alt_name" >> "$CONF_FILE"
  ((i++))
done

# 証明書の生成
openssl req -x509 -nodes -days 60 -newkey rsa:2048 \
  -keyout "$KEY_FILE" -out "$CRT_FILE" \
  -config "$CONF_FILE"

# 証明書をシステムの信頼されたリストに追加 (macOS用)
if [[ "$OSTYPE" == "darwin"* ]]; then
  sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "$CRT_FILE"
  echo "Certificate for $CN added to the trusted list."
fi

echo "Certificate for $CN with SANs ${ALT_NAMES[*]} generated."
