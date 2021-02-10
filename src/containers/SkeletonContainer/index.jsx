import React from 'react';
import styled from 'styled-components'

import Container from '../../components/Container'

export const Main = styled.main`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 50vw 50vw;
    grid-template-rows: auto;
    grid-template-areas: 
    "info map"
    "locations locations";

    @media screen and (max-width: 768px) {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-template-areas: 
      "locations"
      "map"
      "info";
    }
`;

export const LocationLinkSkeleton = styled.div`
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


export const LocationLinkItemSkeleton = styled.a`
  min-width: 100px;
  height: 0.8rem;
  padding: 0.5em 0.5em;
  margin: 0.5em;
  background-color: #f2f2f2;
  border-radius: 0.5rem;
`;

export const MapSkeletonOuter = styled.div`
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

export const MapSkeletonInner = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 90%;
  height: 90%;
  margin: 15px;
`

export const SkeletonText = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 90%;
  height: 1rem;
  margin: 15px;

  @media screen and (max-width: 768px) {
    height: 1rem;
  }

  @media screen and (max-width: 480px) {
    height: 0.75rem;
  }
`
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
`

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
`

export const ShimmerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: loading 1.5s infinite ease-in; 

  @keyframes loading {
    0% { transform: translateX(-150%) }
    50% { transform: translateX(-60%) }
    100% { transform: translateX(150%) }
  }
`
export const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  background: rgba(255,255,255,0.2);
  transform: skewX(-20deg);
  box-shadow: 0 0 30px 30px rgba(255,255,255,0.05);
`

function SkeletonContainer() {

  return (
    <Main>
      <Container style={{backgroundColor: '#f2f2f2'}}>
        <SkeletonTitle />
        <br />
        <SkeletonLead />
        <SkeletonLead />
        <SkeletonLead />
        <br />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
      </Container>
      <MapSkeletonOuter>
        <MapSkeletonInner />
      </MapSkeletonOuter>
      <LocationLinkSkeleton>
        {[1,2,3,4,5,6,7,8,9,10].map(number => <LocationLinkItemSkeleton key={number}/>)}
        <ShimmerWrapper><Shimmer></Shimmer></ShimmerWrapper>
      </LocationLinkSkeleton>
    </Main>
  )
};

export default SkeletonContainer;