const { executeTrade, getAccountBalance } = require('../services/solanaService');
const Trade = require('../models/tradeModel');

const executeTradeController = async (req, res) => {
  const { toPublicKey, amount } = req.body;

  // Validate input
  if (!toPublicKey || !amount) {
    return res.status(400).json({ success: false, message: 'Missing required fields: toPublicKey or amount' });
  }

  try {
    // Execute the trade
    const result = await executeTrade(toPublicKey, amount);

    // Save trade details to the database
    const trade = new Trade({
      toPublicKey,
      amount,
      signature: result.signature,
      timestamp: new Date(),
    });
    await trade.save();

    // Respond with success
    res.status(201).json({ success: true, trade });
  } catch (error) {
    console.error('Error executing trade:', error.message);
    res.status(500).json({ success: false, message: 'Error executing trade' });
  }
};

const getBalanceController = async (req, res) => {
  const { publicKey } = req.params;

  // Validate input
  if (!publicKey) {
    return res.status(400).json({ success: false, message: 'Missing required parameter: publicKey' });
  }

  try {
    // Retrieve the balance
    const balance = await getAccountBalance(publicKey);

    // Respond with the balance
    res.status(200).json({ success: true, balance });
  } catch (error) {
    console.error('Error fetching balance:', error.message);
    res.status(500).json({ success: false, message: 'Error fetching balance' });
  }
};

module.exports = { executeTradeController, getBalanceController };
