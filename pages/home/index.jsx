import React, { useEffect } from "react";
import About from "../../components/About";
import PopularCategories from "../../components/PopularCategories";
import Hero from "../../components/Hero";
import Customers from "../../components/customers/Customers";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";
import Foryou from "../../components/foryou/Foryou";
import { useRouter } from "next/router";

const Index = ({ categoryList, productList, bannerList }) => {
  const router = useRouter();
  
  useEffect(() => {
    const { tableId } = router.query;
    if (tableId) {
      localStorage.setItem("tableId", tableId);
    }
  }, [router.query]);

  return (
    <React.Fragment>
      <Hero bannerList={bannerList} />
      <PopularCategories categoryList={categoryList} />
      <Foryou productList={productList} />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Customers />
    </React.Fragment>
  );
};


export const getServerSideProps = async () => {
  const categories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const products = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
  const banners = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/banners`);
  return {
    props: {
      categoryList: categories.data ? categories.data : [],
      productList: products.data ? products.data : [],
      bannerList: banners.data ? banners.data : [],
    },
  };
};

export default Index;
