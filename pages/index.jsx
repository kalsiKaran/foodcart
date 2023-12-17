import Head from "next/head";
import Input from "../components/form/Input";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Home from "./home";
import axios from "axios";

export default function Index({ categoryList, productList }) {
  return (
    <div className="">
      <Head>
        <title>Foodhub</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Home categoryList={categoryList} productList={productList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const category = await axios.get(
    `${process.env.API_URL}/menu`
  );
  const product = await axios.get(
    `${process.env.API_URL}/products`
  );
  return {
    props: {
      categoryList: category.data ? category.data.categories : [],
      productList: product.data ? product.data.products : [],
    },
  };
};
