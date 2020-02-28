import React from 'react';
import { FlatList, Text } from 'react-native';

import { Container } from './styles';

export default class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  renderProduct({ item }) {
    return <Text>{item.title}</Text>;
  }

  render() {
    const { products } = this.state;

    return (
      <Container>
        <FlatList
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderProduct}
        />
      </Container>
    );
  }
}
