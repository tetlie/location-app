import React, { useEffect, useState } from "react";

import Container from "../../components/Container";
import Cosmic from "cosmicjs";
import CountryTitle from "../../components/Typography/CountryTitle";
import LeadParagraph from "../../components/Typography/LeadParagraph";
import MainTitle from "../../components/Typography/MainTitle";
import Paragraph from "../../components/Typography/Paragraph";
import SkeletonLead from "../../components/Skeleton/SkeletonLead";
import SkeletonText from "../../components/Skeleton/SkeletonText";
import SkeletonTitle from "../../components/Skeleton/SkeletonTitle";
import styled from "styled-components";

function LocationContainer({ match }) {
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const client = new Cosmic();
    const bucket = client.bucket({
      slug: process.env.BUCKET_SLUG,
      read_key: process.env.READ_KEY,
    });

    bucket
      .getObject({
        slug: match.params.slug,
        props: "slug,title,content,metadata",
      })

      .then((data) => {
        setPageData(data.object);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function renderSkeleton() {
    return (
      <Container style={{ backgroundColor: "#f2f2f2" }}>
        <SkeletonTitle />
        <br />
        {[1, 2, 3].map((number) => (
          <SkeletonLead key={number} />
        ))}
        <br />
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
          <SkeletonText key={number} />
        ))}
      </Container>
    );
  }

  function renderPage() {
    return (
      <Container as="main">
        {pageData.metadata.country && (
          <CountryTitle>
            {pageData.metadata.country}
            <HLine />
          </CountryTitle>
        )}
        <MainTitle>{pageData.title}</MainTitle>
        <HLine />
        {pageData.metadata.lead_paragraph && (
          <LeadParagraph>{pageData.metadata.lead_paragraph}</LeadParagraph>
        )}
        <HLine />
        <Paragraph
          dangerouslySetInnerHTML={{ __html: pageData.content }}
        ></Paragraph>
      </Container>
    );
  }

  return <>{pageData === null ? renderSkeleton() : renderPage()}</>;
}

export const HLine = styled.hr`
  border: 1px solid black;
`;

export default LocationContainer;
