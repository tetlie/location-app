import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

import Container from '../../components/Container'
import MainTitle from '../../components/Typography/MainTitle'
import Paragraph from '../../components/Typography/Paragraph'

import DataVisualisation from '../../components/DataVisualisation';

import SkeletonText from '../../components/Skeleton/SkeletonText'
import SkeletonLead from '../../components/Skeleton/SkeletonLead'
import SkeletonTitle from '../../components/Skeleton/SkeletonTitle'



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
        {[1,2,3].map(number => <SkeletonLead key={number}/>)}
        <br />
        {[1,2,3,4,5,6,7,8,9,10].map(number => <SkeletonText key={number}/>)}
      </Container>
    );
  }

  
  function renderPage() {
    return (
    <main>
      <Container as="main">
          <MainTitle>{pageData.title}</MainTitle>
          <Paragraph dangerouslySetInnerHTML={{__html: pageData.content}}></Paragraph>
          <DataVisualisation />
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