import styled from 'styled-components/native';

import { darken } from 'polished';

export const Container = styled.View`
  background: #191920;
`;

export const Product = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 220px;
`;

export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductTitle = styled.Text`
  color: #333333;
  font-size: 16px;
`;

export const ProductPrice = styled.Text`
  color: #000000;
  font-size: 21px;
  font-weight: bold;
`;

export const ButtonAddProduct = styled.TouchableOpacity`
  flex-direction: row;
  background: #7159c1;
  align-items: center;
  border-radius: 5px;
  margin-top: auto;
`;

export const ProductAmount = styled.View`
  flex-direction: row;
  align-items: center;

  padding: 10px;
  background: ${darken(0.03, '#7159c1')};
  width: 53px;
  border-radius: 5px;
`;

export const TextAmount = styled.Text`
  color: #fff;
  margin-left: 10px;
  margin-right: 10px;
`;

export const AddButton = styled.Text`
  flex: 1;
  text-align: center;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
