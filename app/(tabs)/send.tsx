import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Picker } from 'react-native';
import * as Crypto from 'expo-crypto';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { storeTransaction } from '@/store/transactions';

export default function SendScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');

  const handleSend = async () => {
    const transactionHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${recipient}-${amount}-${selectedWallet}`
    );
    console.log(`Sending ${amount} to ${recipient} from wallet ${selectedWallet} with transaction hash: ${transactionHash}`);
    await storeTransaction({ recipient, amount, transactionHash, wallet: selectedWallet });
  };

  const confirmSend = () => {
    Alert.alert(
      'Confirm Send',
      `Are you sure you want to send ${amount} to ${recipient} from wallet ${selectedWallet}?`,
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
      <Picker
        selectedValue={selectedWallet}
        style={styles.input}
        onValueChange={(itemValue) => setSelectedWallet(itemValue)}
      >
        <Picker.Item label="Wallet 1" value="wallet1" />
        <Picker.Item label="Wallet 2" value="wallet2" />
        <Picker.Item label="Wallet 3" value="wallet3" />
      </Picker>
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
