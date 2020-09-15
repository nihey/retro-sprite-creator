import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'

const isProduction = process.env.NODE_ENV === 'production'
const trackingTags = isProduction ? (
  <>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-178059932-1"></script>
    <script
      dangerouslySetInnerHTML={{
        __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-178059932-1');
              `
      }}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
  (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:1992940,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
  })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
              `
      }}
    />
  </>
) : null

class RetroDocument extends Document {
  static async getInitialProps (ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render () {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          { trackingTags }
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default RetroDocument
