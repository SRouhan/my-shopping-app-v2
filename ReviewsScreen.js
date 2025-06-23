import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ReviewsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <Text style={styles.subtitle}>User reviews will be shown here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
});