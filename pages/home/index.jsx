import React from "react";
import About from "../../components/About";
import PopularCategories from "../../components/PopularCategories";
import Hero from "../../components/Hero";
import Customers from "../../components/customers/Customers";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";
import Foryou from "../../components/foryou/Foryou";

const Index = ({ categoryList, productList }) => {

  return (
    <React.Fragment>
      <Hero />
      <PopularCategories categoryList={categoryList} />
      <Foryou productList={productList} />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Customers />
    </React.Fragment>
  );
};


export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      categoryList: res.data ? res.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

export default Index;
