import styled from 'styled-components'

const SkeletonLocationLink = styled.div`
  grid-area: locations;
  background-color: #ddd;
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  bottom: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  z-index: 100;
`;

export default SkeletonLocationLink;