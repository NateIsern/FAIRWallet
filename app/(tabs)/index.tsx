import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, FlatList, Text } from 'react-native';
import * as Crypto from 'expo-crypto';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { fetchTransactions as fetchTransactionsFromStore } from '@/store/transactions';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchBalance();
    fetchTransactions();
  }, []);

  const fetchBalance = async () => {
    const balance = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      'dummy-balance'
    );
    setBalance(balance);
  };

  const fetchTransactions = async () => {
    const transactions = await fetchTransactionsFromStore('your-wallet-address');
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
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <ThemedView style={styles.balanceContainer}>
        <ThemedText type="subtitle">Balance: {balance}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.transactionsContainer}>
        <ThemedText type="subtitle">Recent Transactions</ThemedText>
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
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceContainer: {
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
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
