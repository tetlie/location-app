import styled from 'styled-components'

const MainTitle = styled.h1`
  font-size: 4rem;
  font-weight: 700;
  text-align: left;
  line-height: 1;

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

export default MainTitle;