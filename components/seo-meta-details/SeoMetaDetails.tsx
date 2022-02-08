import React from "react";
import Head from "next/head";

import { ISeoDetails } from "../../models/models";

interface CustomProps {
  seoDetails: ISeoDetails;
}
const SeoMetaDetails: React.FunctionComponent<CustomProps> = (
  props: CustomProps
) => {
  return (
    <>
      {props.seoDetails !== null && (
        <Head>
          <title>{props.seoDetails?.metaTitle} </title>
          <meta
            name="description"
            content={props.seoDetails?.metaDescription}
          />
          <meta name="keywords" content={props.seoDetails?.keywords} />
          {props?.seoDetails?.meta?.map((meta) => {
            <meta property={meta?.name} content={meta?.content} />;
          })}
          <link rel="canonical" href={props.seoDetails?.canonicalUrl} />
          {props.seoDetails?.preventIndexing && (
            <>
              <meta name="robots" content="noindex"></meta>
              <meta name="googlebot" content="noindex"></meta>
            </>
          )}
          <meta
            property="og:image"
            content={props.seoDetails?.metaImage?.url}
            key="og:image"
          />
        </Head>
      )}
    </>
  );
};

export default SeoMetaDetails;
