import styled from "styled-components";

export const SkeletonTitle = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 50%;
  height: 4rem;
  margin: 15px;

  @media screen and (max-width: 768px) {
    height: 3rem;
  }

  @media screen and (max-width: 480px) {
    height: 2.5rem;
  }
`;

export default SkeletonTitle;
