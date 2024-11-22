import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function SettingsOptions() {
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
