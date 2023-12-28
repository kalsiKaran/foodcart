import React from "react";
import Favourites from "../../components/foryou/Favourites";
import Title from "../../components/ui/Title";
import axios from "axios";

const Index = ({ productList }) => {
  return (
    <div className="container mx-auto py-16">
        <Title addClass="text-2xl md:text-4xl uppercase text-center mb-5">Favourites</Title>
        <Favourites productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      productList: product.data ? product.data : [],
    },
  };
};

export default Index;
