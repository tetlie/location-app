import React, { useState, useEffect, useRef } from 'react';
import Mapbox from 'mapbox-gl';
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
import LocationLinkContainer from '../../components/LocationLinkContainer';

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

export const MapStyle = styled.div`
  height: 90vh;
  grid-area: map;

  @media screen and (max-width: 768px) {
    height: 40vh;
  }
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

let map = null;

function MainContainer() {

  const [locationsData, setLocationsData] = useState(null);
  const [mapCenter, setMapCenter] = useState([10.7522, 59.9139]);

  useEffect(() => {
    const data = localStorage.getItem("map-center");
    data && setMapCenter(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("map-center", JSON.stringify(mapCenter));
  }, [mapCenter]);

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
        zoom: 5,
        center: mapCenter,
      })

      locationsData.objects.map(item => {
        const lon = item.metadata.longitude
        const lat = item.metadata.latitude
        const newMarker = new Mapbox.Marker()
        newMarker.setLngLat([lon, lat])
        // legg til eventlytter på markers i kartet
        newMarker.getElement().addEventListener('click', event => { 
          window.location.href = `/${item.slug}`; // location fra cosmic
          handleClickPosition(lon, lat);
        });
        newMarker.addTo(map)
      })

    }
  }, [locationsData]);

  function handleHoverPosition(long, lat){
    map.flyTo({
      center: [
        long,
        lat
      ],
      zoom: 5
    })
  };

  function handleClickPosition(long, lat) {
    setMapCenter([long, lat]);
    console.log(mapCenter);
  };

  function renderSkeleton() {
    return (
      <Main>
        <MapSkeletonOuter>
          <MapSkeletonInner />
        </MapSkeletonOuter>
      </Main>
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
        <LocationButton
          title={'←'}
          url={`/`} 
        />
        {locationsData.objects.map(item => {
          return (
            <LocationButton
              title={item.title}
              long={item.metadata.longitude}
              lat={item.metadata.latitude}
              url={`${item.slug}`} 
              key={item.slug}
              handleHoverPosition={handleHoverPosition}
              handleClickPosition={handleClickPosition}
            /> 
          )
        })}
      </LocationLinkContainer>
    </Main>
    )
  };

  return (
    <>
      {(locationsData === null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default MainContainer;