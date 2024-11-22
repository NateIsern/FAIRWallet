import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { storeTransaction } from '@/store/transactions';

export default function SettingsOptions() {
  const handleChangePassword = () => {
    // Implement change password logic here
    console.log('Change password');
  };

  const handleBackupWallet = async () => {
    // Implement backup wallet logic here
    console.log('Backup wallet');
    await storeTransaction({ backupHash: 'wallet-backup' });
  };

  return (
    <View style={styles.container}>
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
});
