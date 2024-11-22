import * as Crypto from 'expo-crypto';

export const fetchTransactions = async (walletAddress) => {
  // Implement your logic to fetch transactions from the backend or any other source
  const transactions = []; // Replace with actual logic to fetch transactions
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
