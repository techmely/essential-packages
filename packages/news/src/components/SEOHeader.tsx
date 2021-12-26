import Head from 'next/head';
import React from 'react';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
};

const SEOHeader: React.FC<Props> = ({ title, description, imageUrl }) => {
  return (
    <Head>
      <link rel="icon" type="image/svg+xml" href="/logo.svg"></link>
      <title>{title}</title>
      <meta property="og:title" content={title}></meta>
      <meta property="og:image" content={imageUrl}></meta>
      <meta property="og:description" content={description}></meta>
    </Head>
  );
};

export default SEOHeader;
