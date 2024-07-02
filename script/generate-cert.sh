#!/bin/bash

# SSL証明書とキーの保存ディレクトリを作成
mkdir -p ~/talkn-certs

openssl req -x509 -out ~/talkn-certs/localhost.crt -keyout ~/talkn-certs/localhost.key \
 -newkey rsa:2048 -nodes -sha256 \
 -subj '/CN=localhost' -days 365 -extensions EXT -config <( \
 printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost,DNS:assets.localhost,DNS:client.localhost,DNS:cover.localhost,DNS:components.localhost,DNS:api.localhost,DNS:ext.localhost,DNS:tune.localhost,DNS:www.localhost,DNS:own.localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

echo "SSL certificate and key generated."

# 証明書を常に信頼
sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain ~/talkn-certs/localhost.crt
echo "Certificate added to the trusted list."
