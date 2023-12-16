import React, { useEffect } from "react";
import MenuWrapper from "../../components/product/MenuWrapper";
import axios from "axios";
import { useRouter } from "next/router";

const Index = ({ categoryList, productList }) => {
  const router = useRouter();

  useEffect(() => {
    const { tableId } = router.query;
    if (tableId) {
      localStorage.setItem("tableId", tableId);
    }
  }, [router.query]);

  return (
    <div className="pt-10">
      <MenuWrapper categoryList={categoryList} productList={productList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const category = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`
  );
  const product = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/products`
  );
  return {
    props: {
      categoryList: category.data ? category.data : [],
      productList: product.data ? product.data : [],
    },
  };
};

export default Index;
