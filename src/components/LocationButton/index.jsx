import React from 'react';
import styled from 'styled-components';



export const LocationLinkBase = styled.a`
  min-width: 100px;
  padding: 0.5em 0.5em;
  margin: 0.5em;
  border: 2px solid black;
  border-radius: 0.5rem;
  color: black;
  text-decoration: none;
  text-align: center;
  &:hover {
    border: 2px solid blue;
  }
`;

export const PostLinkTitle = styled.span`
  display: block;
  font-size: 0.8rem;
`;


function LocationButton({ title, url }) {
  return (
      <LocationLinkBase href={url} onMouseOver={console.log('clicked')}
      >
        <PostLinkTitle>{title}</PostLinkTitle>
      </LocationLinkBase>
  );
}

export default LocationButton;