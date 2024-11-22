import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Crypto from 'expo-crypto';

export default function SendScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = async () => {
    // Implement send transaction logic here
    const transactionHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${recipient}-${amount}`
    );
    console.log(`Sending ${amount} to ${recipient} with transaction hash: ${transactionHash}`);
  };

  const confirmSend = () => {
    Alert.alert(
      'Confirm Send',
      `Are you sure you want to send ${amount} to ${recipient}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send', onPress: handleSend },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recipient Address"
        value={recipient}
        onChangeText={setRecipient}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Send" onPress={confirmSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
