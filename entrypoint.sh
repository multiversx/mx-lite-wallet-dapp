#!/bin/sh

if [ -n "START_NETWORK_ID_STOP" ]; then
  echo "Network ID defined: ${START_NETWORK_ID_STOP}, replacing in config"
  find /usr/share/nginx/html/ -type f -exec sed -i 's|START_NETWORK_ID_STOP|'${START_NETWORK_ID_STOP}'|g' {} +
fi

if [ -n "START_NETWORK_NAME_STOP" ]; then
  echo "Network name defined: ${START_NETWORK_NAME_STOP}, replacing in config"
  find /usr/share/nginx/html/ -type f -exec sed -i 's|START_NETWORK_NAME_STOP|'${START_NETWORK_NAME_STOP}'|g' {} +
fi

if [ -n "START_API_ADDRESS_STOP" ]; then
  echo "Api address defined: ${START_API_ADDRESS_STOP}, replacing in config"
  find /usr/share/nginx/html/ -type f -exec sed -i 's|START_API_ADDRESS_STOP|'${START_API_ADDRESS_STOP}'|g' {} +
fi

if [ -n "START_GATEWAY_URL_STOP" ]; then
  echo "Gateway URL defined: ${START_GATEWAY_URL_STOP}, replacing in config"
  find /usr/share/nginx/html/ -type f -exec sed -i 's|START_GATEWAY_URL_STOP|'${START_GATEWAY_URL_STOP}'|g' {} +
fi

if [ -n "START_WALLET_ADDRESS_STOP" ]; then
  echo "Wallet address defined: ${START_WALLET_ADDRESS_STOP}, replacing in config"
  find /usr/share/nginx/html/ -type f -exec sed -i 's|START_WALLET_ADDRESS_STOP|'${START_WALLET_ADDRESS_STOP}'|g' {} +
fi

if [ -n "START_WEGLD_ID_STOP" ]; then
  echo "WEGLD id defined: ${START_WEGLD_ID_STOP}, replacing in config"
  find /usr/share/nginx/html/ -type f -exec sed -i 's|START_WEGLD_ID_STOP|'${START_WEGLD_ID_STOP}'|g' {} +
fi

exec nginx -g 'daemon off;'
