import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { storeTransaction } from '@/store/transactions';

export default function ReceiveQRCode({ walletAddress }) {
  const handleStoreTransaction = async () => {
    await storeTransaction({ walletAddress });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wallet Address</Text>
      <Text style={styles.address}>{walletAddress}</Text>
      <QRCode value={walletAddress} size={200} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  address: {
    fontSize: 16,
    marginBottom: 16,
  },
});
