import React from 'react';

import { Header, Button, Icon } from 'react-native-elements';
import { Logo } from './styles';

export default function MyHeader({ navigation }) {
  return (
    <Header
      containerStyle={{
        borderBottomWidth: 0,
      }}
      backgroundColor="#141419"
      leftComponent={<Logo />}
      rightComponent={
        <Button
          buttonStyle={{ backgroundColor: '#141419' }}
          icon={{
            name: 'shopping-basket',
            color: '#fff',
          }}
          onPress={() => navigation.push('Cart')}
        />
      }
    />
  );
}
