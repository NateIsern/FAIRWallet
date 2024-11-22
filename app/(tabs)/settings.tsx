import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Crypto from 'expo-crypto';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { storeTransaction } from '@/store/transactions';

export default function SettingsScreen() {
  const handleChangePassword = async () => {
    // Implement change password logic here
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      'new-password'
    );
    console.log('Change password', passwordHash);
  };

  const handleBackupWallet = async () => {
    // Implement backup wallet logic here
    const backupHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      'wallet-backup'
    );
    console.log('Backup wallet', backupHash);
    await storeTransaction({ backupHash });
  };

  return (
    <View style={styles.container}>
      <IconSymbol size={28} name="settings" color="#000" />
      <Text style={styles.title}>Wallet Settings</Text>
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
});
