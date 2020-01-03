import React from "react";
import { NavWrapper, ImgWrapper, NavTirdTitle } from "./Header.style";
import logo from "../../imgs/snouzEat128x128_blanc.png";

const Header = () => (
   <NavWrapper className="navbar navbar-dark bg-dark mb-2">
      <div>
         <ImgWrapper src={logo} alt="brand logo" />
         <NavTirdTitle>Snouz'Eat</NavTirdTitle>
      </div>
      <h3 className="navbar-text text-center">Mangez mieux avec SNOUZ'EAT !</h3>
   </NavWrapper>
);

export default Header;
