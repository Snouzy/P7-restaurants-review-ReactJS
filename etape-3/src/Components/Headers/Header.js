import React from 'react';
import { NavWrapper, ImgWrapper, NavTirdTitle } from './Header.style';
import logo from '../../imgs/snouzEat128x128_blanc.png';

const Header = () => (
   <NavWrapper className="navbar navbar-dark bg-dark mb-2">
      <div>
         <ImgWrapper src={logo} alt="brand logo" />
         <NavTirdTitle>Snouz'Eat</NavTirdTitle>
      </div>
      <div>
         <h3 className="navbar-text text-center">
            Mangez mieux avec SNOUZ'EAT !
         </h3>
         <p style={{ color: '#999C9F' }}>
            Ajoutez vos restaurants en cliquant sur la carte !
         </p>
      </div>
   </NavWrapper>
);

export default Header;
