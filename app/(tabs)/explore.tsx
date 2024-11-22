import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { fetchTransactions } from '@/store/transactions';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactionsList();
  }, []);

  const fetchTransactionsList = async () => {
    const transactions = await fetchTransactions('your-wallet-address');
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
