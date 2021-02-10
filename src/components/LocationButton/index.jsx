import React from 'react';
import styled from 'styled-components';

export const LocationLinkBase = styled.a`
  padding: 0.5em;
  margin: 0.5em;
  background-color: black;
  border: 2px solid black;
  border-radius: 3em;
  color: #ddd;
  text-decoration: none;
  text-align: center;
  &:hover {
    background-color: #f2f2f2;
    color: black;
    border: 2px solid black;
  }
  &:active {
    background-color: #f2f2f2;
    color: black;
    border: 2px solid black;
  }
`;

export const LinkTitle = styled.span`
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

function LocationButton({
  title, 
  url, 
  handleHoverPosition, 
  handleClickPosition, 
  long, 
  lat,
  location
}) {
 
  return (
      <LocationLinkBase
        href={url}
        onMouseEnter={() => 
          (location === true) && handleHoverPosition(long, lat)
        }
        onClick={() => 
          (location === true) && handleClickPosition(long, lat)
        }
      >
        <LinkTitle>{title}</LinkTitle>
      </LocationLinkBase>
  );
}

export default LocationButton;