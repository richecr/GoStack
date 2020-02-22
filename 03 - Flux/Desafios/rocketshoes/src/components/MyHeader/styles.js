import styled from 'styled-components/native';

import logo from '../../assets/Logo.png';

export const Container = styled.View`
  background: #141419;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Logo = styled.Image.attrs({
  source: logo,
})`
  width: 185px;
  height: 24px;
`;
