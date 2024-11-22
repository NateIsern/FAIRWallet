import React, { useState } from 'react';
import { View, Button, StyleSheet, Picker } from 'react-native';
import { storeTransaction } from '@/store/transactions';

export default function SettingsOptions() {
  const [selectedWallet, setSelectedWallet] = useState('');

  const handleChangePassword = () => {
    // Implement change password logic here
    console.log('Change password');
  };

  const handleBackupWallet = async () => {
    // Implement backup wallet logic here
    console.log('Backup wallet');
    await storeTransaction({ backupHash: 'wallet-backup', wallet: selectedWallet });
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
