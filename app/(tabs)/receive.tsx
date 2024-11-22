import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Clipboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Crypto from 'expo-crypto';

export default function ReceiveScreen() {
  const [walletAddress, setWalletAddress] = useState('your-wallet-address-here');

  const handleCopyAddress = () => {
    Clipboard.setString(walletAddress);
    alert('Wallet address copied to clipboard');
  };

  const secureWalletAddress = async () => {
    const secureAddress = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      walletAddress
    );
    setWalletAddress(secureAddress);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receive FairCoin</Text>
      <Text style={styles.address}>{walletAddress}</Text>
      <QRCode value={walletAddress} size={200} />
      <Button title="Copy Address" onPress={handleCopyAddress} />
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
