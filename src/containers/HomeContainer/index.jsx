import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

import Container from '../../components/Containers'
import MainTitle from '../../components/MainTitle'
import Paragraph from '../../components/Paragraph'
import styled from 'styled-components'

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

function HomeContainer() {

  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY 
    });

    bucket.getObject({
      slug: 'front-page',
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
          <MainTitle>{pageData.title}</MainTitle>
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

export default HomeContainer;