import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

import styled from 'styled-components'

import Container from '../../components/Containers'
import MainTitle from '../../components/MainTitle'
import Paragraph from '../../components/Paragraph'


export const HLine = styled.hr`
  border: 1px solid black;
`


export const LeadParagraph = styled.p`
  margin-top: 24px;
  color: #000;
  font-size: 1.2rem;
  font-weight: 700;
  text-align: left;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`

export const CountryTitle = styled.h2`
    font-weight: 400;
`




function LocationContainer({ match }) {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObject({
      slug: match.params.slug,
      props: 'slug,title,content,metadata'
    })

    .then(data => {
      setPageData(data.object)
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })

  }, []);

  function renderSkeleton() {
    return (
      <p>Laster data...</p>
    );
  }

  
  function renderPage() {
    return (
    <main>
      <Container as="main">
        {pageData.metadata.country && <CountryTitle>{pageData.metadata.country}</CountryTitle>}
        <HLine />
        <MainTitle>{pageData.title}</MainTitle>
        <HLine />
        {pageData.metadata.lead_paragraph && <LeadParagraph>{pageData.metadata.lead_paragraph}</LeadParagraph>}
        <HLine />
        <Paragraph dangerouslySetInnerHTML={{__html: pageData.content}}></Paragraph>
      </Container>
    </main>
    )
  }

  return (
    <>
      {(pageData === null) ? renderSkeleton() : renderPage()}
    </>
  )
};

export default LocationContainer;