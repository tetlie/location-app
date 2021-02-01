import React from 'react';
import styled from 'styled-components';



export const LocationLinkBase = styled.button`
  width: 30%;
  display: block;
  padding: 1em;
  margin: 1em;
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
  font-size: 1rem;
  font-weight: 700;
`;

export const PostLinkDate = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #333333;
`;

function LocationButton({ title }) {
  return (
      <LocationLinkBase>
        <PostLinkTitle>{title}</PostLinkTitle>
      </LocationLinkBase>
  );
}

export default LocationButton;