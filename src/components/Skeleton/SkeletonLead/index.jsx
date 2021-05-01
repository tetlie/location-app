import styled from "styled-components";

export const SkeletonLead = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 90%;
  height: 1.2rem;
  margin: 15px;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

export default SkeletonLead;
