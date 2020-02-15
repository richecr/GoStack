import React from 'react';

import './index.css';
import logo from "../../assets/facebook-1.png";

export default function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo-facebook"/>
      <a href="#">Meu Perfil</a>
    </div>
  );
}
