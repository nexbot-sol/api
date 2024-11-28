require('dotenv').config();

const API_CONFIG = {
  coingecko: {
    baseUrl: 'https://api.coingecko.com/api/v3',
    endpoints: {
      simplePrice: '/simple/price',
      marketChart: '/coins/{id}/market_chart',
    },
  },
  solana: {
    cluster: process.env.SOLANA_CLUSTER || 'https://api.mainnet-beta.solana.com',
  },
  helius: {
    baseUrl: process.env.HELIUS_API_URL || 'https://api.helius.xyz/v0',
    apiKey: process.env.HELIUS_API_KEY,
  },
};

module.exports = API_CONFIG;
