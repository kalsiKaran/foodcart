import React from "react";
import About from "../../components/About";
import Campaigns from "../../components/Campaigns";
import Carousel from "../../components/Carousel";
import Customers from "../../components/customers/Customers";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";

const Index = ({ categoryList, productList }) => {

  return (
    <React.Fragment>
      <Carousel />
      <Campaigns categoryList={categoryList} />
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
