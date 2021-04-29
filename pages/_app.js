import Head from "next/head"
import Layout from "@components/layout"
import "../node_modules/uikit/dist/css/uikit.min.css"
import UIKit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'
import "../styles/globals.css"

UIKit.use(Icons)

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Welcome To My Blog</title>
        <meta
          name="Description"
          content=""
        />
      </Head>

      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
