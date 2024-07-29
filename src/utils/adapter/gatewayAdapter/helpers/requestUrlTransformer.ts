import React from 'react';
import { API_URL } from 'config';

interface requestUrlTransformerPropsType {}

export const requestUrlTransformer = (sourcelUrl: string) => {
  let url = sourcelUrl;
  if (sourcelUrl.includes(ACCOUNTS_ENDPOINT)) {
    url = sourcelUrl.replace(
      `${API_URL}/accounts`,
      'https://devnet-gateway.multiversx.com/address'
    );
  }
  return url;
};
