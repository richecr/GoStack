import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Oi</Text>
    </View>
  );
}
