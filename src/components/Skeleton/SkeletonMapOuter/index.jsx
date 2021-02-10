import styled from 'styled-components'

const SkeletonMapOuter = styled.div`
  background-color: #f2f2f2;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  grid-area: map;

  @media screen and (max-width: 768px) {
    height: 40vh;
  }
`;

export default SkeletonMapOuter;