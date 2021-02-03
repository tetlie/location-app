import React from 'react';
import styled from 'styled-components';



export const LocationLinkBase = styled.a`
  min-width: 10%;
  padding: 0.5em 0.5em;
  margin: 0.5em;
  border: 2px solid black;
  border-radius: 0.5rem;
  color: black;
  text-decoration: none;
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
      <LocationLinkBase href={url}>
        <PostLinkTitle>{title}</PostLinkTitle>
      </LocationLinkBase>
  );
}

export default LocationButton;