import React, { Component } from "react";
import { NavWrapper, ImgWrapper } from "./Header.style";
import logo from "../imgs/snouzEat128x128_blanc.png";
// import PStyle from "./Header.style";

class Header extends Component {
   render() {
      return (
         <NavWrapper className="navbar navbar-dark bg-dark mb-2">
            <ImgWrapper>
               <img src={logo} alt="brand logo"/>
            </ImgWrapper>
            <h3 className="navbar-text text-center">Mangez mieux avec SNOUZ'EAT !</h3>
         </NavWrapper>
      );
   }
}

export default Header;
