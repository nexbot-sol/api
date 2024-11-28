const axios = require('axios');
require('dotenv').config();

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

const getTokenPrice = async (tokenId) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
      params: {
        ids: tokenId,
        vs_currencies: 'usd',
      },
    });
    return response.data[tokenId].usd;
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw new Error('Failed to fetch token price');
  }
};

const getMarketData = async (tokenId) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${tokenId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '1',
      },
    });
    return response.data.prices; // Array of price points
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw new Error('Failed to fetch market data');
  }
};

module.exports = { getTokenPrice, getMarketData };
