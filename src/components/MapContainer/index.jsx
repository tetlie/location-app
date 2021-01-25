import React, { useEffect, useRef } from 'react';
import Mapbox from 'mapbox-gl';

import styled from 'styled-components'


export const MapStyle = styled.div`
  height: 500px;
`;

function MapContainer() {

  Mapbox.accessToken = 'pk.eyJ1IjoidGV0bGllIiwiYSI6ImNrazZrb2Z4bDAzcHQydm8ycTViNjc0NWgifQ.aCFviWYyJgEyIFlBXFExvw';

  let map;
  const mapElement = useRef(null);

  const BIRKELUNDEN = [ 10.758951384716575, 59.92720253249749 ]
  const popupBirkelunden = new Mapbox.Popup({ offset: 25 }).setText(
    'KB Birkelunden.'
    );

  const BJORVIKA = [ 10.755203398987216, 59.90838471095703, ]
  const popupBjorvika = new Mapbox.Popup({ offset: 25 }).setText(
    'KB Bjørvika.'
    );


  useEffect(() => {

    map = new Mapbox.Map({
      container: mapElement.current,
      style: 'mapbox://styles/mapbox/dark-v10',
      zoom: 10,
      center: [10.7522, 59.9139],
    });

    const markerBirkelunden = new Mapbox.Marker()
      markerBirkelunden.setLngLat(BIRKELUNDEN)
      markerBirkelunden.addTo(map)
      markerBirkelunden.setPopup(popupBirkelunden);

    const markerBjorvika = new Mapbox.Marker()
      markerBjorvika.setLngLat(BJORVIKA)
      markerBjorvika.addTo(map)
      markerBjorvika.setPopup(popupBjorvika);

  }, []);

  return (
    <>
      <MapStyle ref={mapElement}></MapStyle>
    </>
  )
};

export default MapContainer;