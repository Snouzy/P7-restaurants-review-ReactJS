import styled from "styled-components";

const ImgWrapper = styled.div`
   margin-right: 50px;
   @media (max-width: 635px) {
      margin-right: 0px;
  }
`;

const NavWrapper = styled.nav`
  @media (max-width: 635px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
  }
`;

export { ImgWrapper, NavWrapper };

