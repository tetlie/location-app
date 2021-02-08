import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 90vh;
  margin-left: auto;
  margin-right: auto;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-area: info;
  padding: 2em;

  @media screen and (max-width: 768px) {
    overflow-y: auto;
  }
  
`;

export default Container;