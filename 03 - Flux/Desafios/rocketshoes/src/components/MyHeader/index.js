import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import { Logo } from './styles';

export default function MyHeader({ navigation }) {
  return (
    <Header
      containerStyle={{
        borderBottomWidth: 0,
      }}
      backgroundColor="#141419"
      leftComponent={
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Logo />
        </TouchableOpacity>
      }
      rightComponent={
        <Button
          buttonStyle={{ backgroundColor: '#141419' }}
          icon={{
            name: 'shopping-basket',
            color: '#fff',
          }}
          onPress={() => navigation.navigate('Cart')}
        />
      }
    />
  );
}
