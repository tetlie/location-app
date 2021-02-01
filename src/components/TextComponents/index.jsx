import styled from 'styled-components'

const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`;

export default PageTitle;