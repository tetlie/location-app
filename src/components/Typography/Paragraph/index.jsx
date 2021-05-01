import styled from "styled-components";

const Paragraph = styled.p`
  margin-top: 24px;
  color: #000;
  font-size: 1rem;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

export default Paragraph;
