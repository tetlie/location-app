import React from 'react'
import GlobalStyle from './components/GlobalStyle'
import MainContainer from './containers/MainContainer';
import SkeletonContainer from './containers/SkeletonContainer';


function App() {
  return (
    <>
    <GlobalStyle />
    <MainContainer />
    {/* <SkeletonContainer /> */}
    </>
  )
};

export default App;