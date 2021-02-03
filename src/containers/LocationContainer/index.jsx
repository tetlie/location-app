import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs';

import Container from '../../components/Containers'
import MainTitle from '../../components/MainTitle'
import Paragraph from '../../components/Paragraph'



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
        {pageData.metadata.country && <h2>{pageData.metadata.country}</h2>}
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

export default LocationContainer;