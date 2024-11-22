import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text, Picker } from 'react-native';
import { fetchTransactions } from '@/store/transactions';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [transactions, setTransactions] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState('');

  useEffect(() => {
    fetchTransactionsList();
  }, [selectedWallet]);

  const fetchTransactionsList = async () => {
    const transactions = await fetchTransactions(selectedWallet);
    setTransactions(transactions);
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transaction}>
      <IconSymbol size={20} name="paperplane.fill" color="#000" />
      <Text>Amount: {item.amount}</Text>
      <Text>Date: {item.date}</Text>
    </View>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedView style={styles.walletSelectionContainer}>
        <Picker
          selectedValue={selectedWallet}
          style={styles.input}
          onValueChange={(itemValue) => setSelectedWallet(itemValue)}
        >
          <Picker.Item label="Wallet 1" value="wallet1" />
          <Picker.Item label="Wallet 2" value="wallet2" />
          <Picker.Item label="Wallet 3" value="wallet3" />
        </Picker>
      </ThemedView>
      <ThemedView style={styles.transactionsContainer}>
        <ThemedText type="subtitle">Transactions</ThemedText>
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  walletSelectionContainer: {
    marginVertical: 16,
  },
  transactionsContainer: {
    marginVertical: 16,
  },
  transaction: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
