import styled from 'styled-components';

const ImgWrapper = styled.img`
   margin-right: 20px;
`;

const NavWrapper = styled.nav`
   display: flex;
   text-align: center;
   @media (max-width: 730px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
   }
`;

const NavTirdTitle = styled.h3`
   color: #fff;
   display: inline-block;
`;
export { ImgWrapper, NavWrapper, NavTirdTitle };
