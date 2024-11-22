import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as Crypto from 'expo-crypto';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { storeTransaction } from '@/store/transactions';

export default function SendScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSend = async () => {
    const transactionHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${recipient}-${amount}`
    );
    console.log(`Sending ${amount} to ${recipient} with transaction hash: ${transactionHash}`);
    await storeTransaction({ recipient, amount, transactionHash });
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
      <IconSymbol size={28} name="send" color="#000" />
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
