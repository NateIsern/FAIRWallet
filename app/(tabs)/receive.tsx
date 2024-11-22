import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Clipboard, Picker } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Crypto from 'expo-crypto';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { storeTransaction } from '@/store/transactions';

export default function ReceiveScreen() {
  const [walletAddress, setWalletAddress] = useState('your-wallet-address-here');
  const [selectedWallet, setSelectedWallet] = useState('');

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
    await storeTransaction({ walletAddress: secureAddress, wallet: selectedWallet });
  };

  return (
    <View style={styles.container}>
      <IconSymbol size={28} name="receive" color="#000" />
      <Text style={styles.title}>Receive FairCoin</Text>
      <Picker
        selectedValue={selectedWallet}
        style={styles.input}
        onValueChange={(itemValue) => setSelectedWallet(itemValue)}
      >
        <Picker.Item label="Wallet 1" value="wallet1" />
        <Picker.Item label="Wallet 2" value="wallet2" />
        <Picker.Item label="Wallet 3" value="wallet3" />
      </Picker>
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
