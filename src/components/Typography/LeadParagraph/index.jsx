import styled from "styled-components";

export const LeadParagraph = styled.p`
  margin-top: 24px;
  color: #000;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default LeadParagraph;
