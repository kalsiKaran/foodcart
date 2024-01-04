import Head from "next/head";
import Home from "./home";

export default function Index() {
  return (
    <div>
      <Head>
        <title>KANGO CASTLE</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Home />
    </div>
  );
}
  
  export async function getServerSideProps() {
    return{
      redirect: {
        destination: '/home',
        permanent: false
      }
    }
  }

