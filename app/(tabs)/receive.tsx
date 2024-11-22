import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ReceiveScreen() {
  const walletAddress = 'your-wallet-address-here';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive FairCoin</Text>
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
