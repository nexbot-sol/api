const { Connection, Keypair, Transaction, SystemProgram, PublicKey } = require('@solana/web3.js');
require('dotenv').config();

const connection = new Connection(process.env.SOLANA_CLUSTER, 'confirmed');
const nexbotWallet = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.NEXBOT_WALLET_SECRET_KEY)));

const executeTrade = async (toPublicKey, amount) => {
  try {
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: nexbotWallet.publicKey,
        toPubkey: new PublicKey(toPublicKey),
        lamports: amount * 1e9, // Convert SOL to lamports
      })
    );

    const signature = await connection.sendTransaction(transaction, [nexbotWallet]);
    await connection.confirmTransaction(signature);
    return { success: true, signature };
  } catch (error) {
    console.error('Trade Execution Failed:', error);
    throw new Error('Error executing trade on Solana');
  }
};

const getAccountBalance = async (publicKey) => {
  try {
    const balance = await connection.getBalance(new PublicKey(publicKey));
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw new Error('Failed to fetch balance');
  }
};

const sendNexbotRecord = async (programId, data) => {
  try {
    const transaction = new Transaction().add({
      keys: [],
      programId: new PublicKey(programId),
      data: Buffer.from(data),
    });

    const signature = await connection.sendTransaction(transaction, [nexbotWallet]);
    return signature;
  } catch (error) {
    console.error('Error sending Nexbot record:', error);
    throw new Error('Failed to send Nexbot record');
  }
};

module.exports = { executeTrade, getAccountBalance };
