import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SettingsScreen() {
  const handleChangePassword = () => {
    // Implement change password logic here
    console.log('Change password');
  };

  const handleBackupWallet = () => {
    // Implement backup wallet logic here
    console.log('Backup wallet');
  };

  return (
    <View style={styles.container}>
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
