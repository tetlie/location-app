import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs'

import {Container} from '../../components/Containers'
import {PageTitle, P} from '../../components/TextComponents'
import MapContainer from '../../components/MapContainer';

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
      props: 'slug,title,content'
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
      <p>Laster data...</p>
    );
  }

  
  function renderPage() {
    return (
    <main>
      <Container>
          <PageTitle>{pageData.title}</PageTitle>
          <Container dangerouslySetInnerHTML={{__html: pageData.content}}></Container>
          <MapContainer />
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