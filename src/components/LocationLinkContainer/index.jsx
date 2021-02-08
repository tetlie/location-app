import styled from 'styled-components'

const LocationLinkContainer = styled.div`
  grid-area: locations;
  background-color: white;
  width: 100%;
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

export default LocationLinkContainer;