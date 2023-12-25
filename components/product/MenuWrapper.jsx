import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

const MenuWrapper = ({ categoryList, productList }) => {
  const [active, setActive] = useState(0);
  const [filter, setFilter] = useState([]);
  const [productLimit, setProductLimit] = useState(3);

  useEffect(() => {
    setFilter(
      productList?.filter(
        (product) =>
          product.category_id ==
          categoryList[active].id
      )
    );
  }, [categoryList, active, productList]);

  return (
    <div className="container mx-auto  mb-16 mt-20">
      <div className="flex flex-col items-center w-full">
        <Title addClass="text-[40px]">Our Menu</Title>
        <div className="mt-5">
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                className={`px-6 py-2 font-semibold ${
                  index === active && "bg-gradient-to-b from-gray-900 to-gray-600 text-white "
                } ml-4 rounded-3xl `}
                key={category.id}
                onClick={() => {
                  setActive(index);
                  setProductLimit(3);
                }}
              >
                {category.name}
              </button>
            ))}
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 min-h-[380px]">
        {filter?.length > 0 &&
          filter
            .slice(0, productLimit)
            .map((product) => <MenuItem key={product.id} product={product} />)}
      </div>
      {productLimit < filter?.length &&
        <div className="flex items-center justify-center my-8">
          <button
            className="btn-primary"
            onClick={() => setProductLimit(productLimit + 3)}
          >
            View More
          </button>
        </div>
      }
    </div>
  );
};

export default MenuWrapper;
