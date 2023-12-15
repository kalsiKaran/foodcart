import React from "react";
import About from "../../components/About";
import Campaigns from "../../components/Campaigns";
import Carousel from "../../components/Carousel";
import Customers from "../../components/customers/Customers";
import MenuWrapper from "../../components/product/MenuWrapper";

import { useCustomContext } from "../../context/customContext";

const Index = ({ categoryList, productList }) => {

  const { categories } = useCustomContext();

  return (
    <React.Fragment>
      <Carousel />
      <Campaigns categoryList={categories} productList={productList} />
      {/* <MenuWrapper categoryList={categoryList} productList={productList} /> */}
      <About />
      <Customers />
    </React.Fragment>
  );
};

export default Index;
