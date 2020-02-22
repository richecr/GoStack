import React from 'react';

import { Header, Button, Icon } from 'react-native-elements';
import { Logo } from './styles';

export default function MyHeader({ navigation }) {
  return (
    <Header
      backgroundColor="#141419"
      leftComponent={<Logo />}
      rightComponent={
        <Button
          buttonStyle={{ backgroundColor: '#141419' }}
          icon={{
            name: 'shopping-cart',
            color: '#fff',
          }}
          onPress={() => navigation.push('Cart')}
        />
      }
    />
  );
}
