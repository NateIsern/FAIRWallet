import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Picker } from 'react-native';
import * as Crypto from 'expo-crypto';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { storeTransaction } from '@/store/transactions';

export default function SettingsScreen() {
  const [selectedWallet, setSelectedWallet] = useState('');

  const handleChangePassword = async () => {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      'new-password'
    );
    console.log('Change password', passwordHash);
  };

  const handleBackupWallet = async () => {
    const backupHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      'wallet-backup'
    );
    console.log('Backup wallet', backupHash);
    await storeTransaction({ backupHash, wallet: selectedWallet });
  };

  const handleAddWallet = () => {
    // Implement add wallet logic here
    console.log('Add wallet');
  };

  const handleRemoveWallet = () => {
    // Implement remove wallet logic here
    console.log('Remove wallet');
  };

  const handleSwitchWallet = (wallet) => {
    setSelectedWallet(wallet);
    console.log('Switch wallet', wallet);
  };

  return (
    <View style={styles.container}>
      <IconSymbol size={28} name="settings" color="#000" />
      <Text style={styles.title}>Wallet Settings</Text>
      <Picker
        selectedValue={selectedWallet}
        style={styles.input}
        onValueChange={(itemValue) => handleSwitchWallet(itemValue)}
      >
        <Picker.Item label="Wallet 1" value="wallet1" />
        <Picker.Item label="Wallet 2" value="wallet2" />
        <Picker.Item label="Wallet 3" value="wallet3" />
      </Picker>
      <Button title="Add Wallet" onPress={handleAddWallet} />
      <Button title="Remove Wallet" onPress={handleRemoveWallet} />
      <Button title="Change Password" onPress={handleChangePassword} />
      <Button title="Backup Wallet" onPress={handleBackupWallet} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
