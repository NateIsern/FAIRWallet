import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { storeTransaction } from '@/store/transactions';

export default function ReceiveQRCode({ walletAddress }) {
  const [selectedWallet, setSelectedWallet] = useState('');

  const handleStoreTransaction = async () => {
    await storeTransaction({ walletAddress, wallet: selectedWallet });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Wallet Address</Text>
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
