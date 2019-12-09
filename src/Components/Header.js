import React, { Component } from "react";
import {HeaderStyle, ImgHeader} from "./Header.style";
import logo from '../imgs/snouzEat128x128_blanc.png'
// import PStyle from "./Header.style";

class Header extends Component {
  render() {
    return (
      <HeaderStyle>
        <ImgHeader src={logo} alt="Snouz'Eat logo's"/>
        Mangez-mieux avec Snouz'Eat !
      </HeaderStyle>
    );
  }
}

export default Header;
