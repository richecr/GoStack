import React from 'react';
import { View, Text, Button } from 'react-native';

// import { Container } from './styles';

export default function Home({ navigation }) {
  return (
    <View>
      <Text>Home</Text>

      <Button title="cart" onPress={() => navigation.push('Cart')} />
    </View>
  );
}
