import * as Crypto from 'expo-crypto';
import { ElectrumClient } from 'electrum-client';

const electrumClient = new ElectrumClient('electrum-server-address', 50001, 'tcp');

export const fetchTransactions = async (walletAddress) => {
  await electrumClient.connect();
  const transactions = await electrumClient.blockchainAddress_getHistory(walletAddress);
  await electrumClient.close();
  return transactions;
};

export const storeTransaction = async (transaction) => {
  const transactionHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    JSON.stringify(transaction)
  );
  // Store the transaction hash securely
  // Implement your storage logic here
};

export const displayTransactions = (transactions) => {
  return transactions.map((transaction) => ({
    id: transaction.tx_hash,
    amount: transaction.value,
    date: new Date(transaction.timestamp * 1000).toLocaleDateString(),
  }));
};
