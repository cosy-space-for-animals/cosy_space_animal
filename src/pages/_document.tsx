import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head>
        <script
          type='text/javascript'
          src='https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.2.js'
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
