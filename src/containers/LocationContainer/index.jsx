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

export const SkeletonText = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 90%;
  height: 1rem;
  margin: 15px;

  @media screen and (max-width: 768px) {
    height: 1rem;
  }

  @media screen and (max-width: 480px) {
    height: 0.75rem;
  }
`
export const SkeletonLead = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 90%;
  height: 1.2rem;
  margin: 15px;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`

export const SkeletonTitle = styled.div`
  background: #ddd;
  margin: 10px 0;
  border-radius: 4px;
  width: 50%;
  height: 4rem;
  margin: 15px;

  @media screen and (max-width: 768px) {
    height: 3rem;
  }

  @media screen and (max-width: 480px) {
    height: 2.5rem;
  }
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
      <Container style={{backgroundColor: '#f2f2f2'}}>
        <SkeletonTitle />
        <br />
        <SkeletonLead />
        <SkeletonLead />
        <SkeletonLead />
        <br />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
      </Container>
    );
  }

  
  function renderPage() {
    return (
    <main>
      <Container as="main">
        {pageData.metadata.country && <CountryTitle>{pageData.metadata.country}<HLine /></CountryTitle>}
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