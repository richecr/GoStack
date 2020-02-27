import React from 'react';
import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';

import api from '../../services/api';

import {
  Container,
  Product,
  ProductImage,
  ProductTitle,
  ProductPrice,
  ButtonAddProduct,
  ProductAmount,
  TextAmount,
  AddButton,
} from './styles';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const response = await api.get('/products');
    this.setState({ products: response.data });
  }

  renderProduct({ item }) {
    return (
      <Product>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>R$ {item.price}</ProductPrice>
        <ButtonAddProduct>
          <ProductAmount>
            <Icon name="shopping-cart" size={16} color="#fff" type="entypo" />
            <TextAmount>1</TextAmount>
          </ProductAmount>
          <AddButton>Adicionar</AddButton>
        </ButtonAddProduct>
      </Product>
    );
  }

  render() {
    const { products } = this.state;

    return (
      <Container>
        <FlatList
          horizontal
          data={products}
          extraData={this.props}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderProduct}
        />
      </Container>
    );
  }
}
