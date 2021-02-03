import React, { useState, useEffect, useRef } from 'react';
import Mapbox, { Marker } from 'mapbox-gl';
import Cosmic from 'cosmicjs'

import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import LocationButton from '../../components/LocationButton'
import HomeContainer from '../HomeContainer';
import LocationContainer from '../LocationContainer';

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
`;

export const MapStyle = styled.div`
  height: 90vh;
  grid-area: map;
`;

export const LocationLinkContainer = styled.div`
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
`;

let map = null;

function MainContainer() {

  const [locationsData, setLocationsData] = useState(null);

  useEffect(() => { // for locations
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObjects({
      type: 'locations',
      props: 'title,slug,content,metadata',
    })
    .then(data => {
      setLocationsData(data)
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    });

  }, []);

  Mapbox.accessToken = process.env.MAPBOX_API_KEY;
  const mapElement = useRef(null);

  useEffect(() => { // for map
    if(locationsData !== null){ // sjekk om data er lastet
      map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 1,
        center: [10.7522, 59.9139],
      })

      locationsData.objects.map(item => {
        const lon = item.metadata.longitude
        const lat = item.metadata.latitude
        const newMarker = new Mapbox.Marker()
        newMarker.setLngLat([lon, lat])
        newMarker.addTo(map)
        newMarker.getElement().addEventListener('click', event => {
          window.location.href = `/${item.slug}`;
        });
      })

    }
  }, [locationsData]);


  function handleHoverPosition(){
    map.flyTo({
      center: [
        -77.0364,
        38.8951
      ]
    })
  }



  function renderSkeleton() {
    return (
      <p>Laster data...</p>
    );
  };

  function renderPage() {
    return (
    <Main>
      <Router>
        <Switch>
          <Route path="/:slug" component={LocationContainer} />
          <Route path="/" component={HomeContainer} exact />
        </Switch>
      </Router>
      <MapStyle ref={mapElement} />
        <LocationLinkContainer>
           {locationsData.objects.map(item => {
              return (
                <LocationButton
                  title={item.title}
                  longitude={item.metadata.longitude}
                  longitude={item.metadata.latitude}
                  url={`${item.slug}`} 
                  key={item.slug}
                />
              )
            })}
        </LocationLinkContainer>
    </Main>
    )
  }

  return (
    <>
      {(locationsData === null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default MainContainer;