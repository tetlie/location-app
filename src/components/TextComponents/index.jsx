import styled from 'styled-components'

export const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`

export const P = styled.p`
  margin-top: 24px;
  color: #000;
  font-size: 24px;
  text-align: center;
  max-width: 600;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`