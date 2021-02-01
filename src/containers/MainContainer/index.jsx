import React, { useState, useEffect, useRef } from 'react';
import Mapbox, { Marker } from 'mapbox-gl';
import Cosmic from 'cosmicjs'

import styled from 'styled-components'

import Container from '../../components/Containers'
import PageTitle from '../../components/TextComponents'
import LocationButton from '../../components/LocationButton'



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
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0;
  bottom: 0;
  align-self: flex-end;
  height: 10vh;
`

let map = null;

function MapContainer() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObjects({
      type: 'locations',
      limit: 5,
      props: 'title,slug,content, metadata',
    })
    .then(data => {
      setPageData(data)
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    });

  }, []);

  Mapbox.accessToken = 'pk.eyJ1IjoidGV0bGllIiwiYSI6ImNrazZrb2Z4bDAzcHQydm8ycTViNjc0NWgifQ.aCFviWYyJgEyIFlBXFExvw';
  const mapElement = useRef(null);

  useEffect(() => {
    if(pageData !== null){ // sjekk om data er lastet
      map = new Mapbox.Map({
        container: mapElement.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 1,
        center: [10.7522, 59.9139],
      })

      pageData.objects.map(item => {
        const lon = item.metadata.longitude
        const lat = item.metadata.latitude
        const newMarker = new Mapbox.Marker()
        newMarker.setLngLat([lon, lat])
        newMarker.addTo(map)
      })
    }
  }, [pageData]);

  function handleClick(event) {
    console.log('hello')
  }

  function renderSkeleton() {
    return (
      <p>Laster data...</p>
    );
  };

  function renderPage() {
    return (
    <Main>
      <Container>
          <PageTitle>Zones of Conflict</PageTitle>
      </Container>
      <MapStyle ref={mapElement} />
      <LocationLinkContainer>
          {pageData.objects.map(item => {
              return (
                <LocationButton
                  onClick={() => console.log('hello')} type='submit'
                  title={item.title}
                  longitude={item.metadata.longitude}
                  longitude={item.metadata.latitude}
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
      {(pageData === null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default MapContainer;