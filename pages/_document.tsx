import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <script async src="https://cdn.splitbee.io/sb.js"></script>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Generate your next desig guidelines in minutes"
          />
          <meta property="og:site_name" content="guideline Generator" />
          <meta
            property="og:description"
            content="Generate your next desig guidelines in mnutes."
          />
          <meta property="og:title" content="Guidelines Generator" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Guidelines Generator" />
          <meta
            name="twitter:description"
            content="Generate your next desig guidelines in minutes"
          />
          <meta
            property="og:image"
            // content="https://twitterbio.com/og-image.png"
          />
          <meta
            name="twitter:image"
            // content="https://twitterbio.com/og-image.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
