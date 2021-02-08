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

export const PostLinkTitle = styled.span`
  display: block;
  font-size: 0.8rem;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 0.75rem;
  }
`;



function LocationButton({ title, url, handleHoverPosition, handleClickPosition, long, lat }) {


  return (
      <LocationLinkBase
        href={url}
        onMouseEnter={() => handleHoverPosition(long, lat)}
        onClick={() => handleClickPosition(long, lat)}
      >
        <PostLinkTitle>{title}</PostLinkTitle>
      </LocationLinkBase>
  );
}

export default LocationButton;