import React from 'react';
import { FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as CartActions from '../../store/modules/cart/actions';
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

class Home extends React.Component {
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

  handleAddProduct(item) {
    const { addProductRequest } = this.props;

    addProductRequest(item.id);
  }

  renderProduct({ item }) {
    return (
      <Product>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>R$ {item.price}</ProductPrice>
        <ButtonAddProduct onPress={() => this.handleAddProduct(item)}>
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
          renderItem={item => this.renderProduct(item)}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
