import styled from 'styled-components'

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export default MainTitle;