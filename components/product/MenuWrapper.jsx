import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import Image from "next/image";

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
    <div className="container mx-auto pb-16 pt-8 md:pt-16">
      <div className="flex flex-col items-center w-full">
        <Title addClass="text-2xl md:text-4xl uppercase text-center">Our Delicious Menu</Title>
        <div className="mt-5 flex items-center overflow-auto w-full scrollbar-hidden">
          {categoryList &&
            categoryList.map((category, index) => (
              <button
                className={`px-4 py-2 font-semibold border-b-2 ${
                  index === active ? "border-b-red-500 text-red-500" : "border-b-transparent"
                }`}
                key={category.id}
                onClick={() => {
                  setActive(index);
                  setProductLimit(3);
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative h-10 w-10 sm:h-16 md:w-16 rounded-full overflow-hidden">
                    {category.category_image ? 
                      <Image
                        src={category.category_image}
                        alt={category.category_name}
                        layout="fill"
                        loading="eager"
                        className="w-full object-cover group-hover:scale-105 transition-all duration-[3000ms]"
                      />:
                      <div className="animate-pulse h-full w-full">
                        <div className="h-full w-full bg-slate-200"></div>
                      </div>
                    }
                    
                  </div>
                  <p className="text-sm sm:text-md font-semibold mt-1">
                    {category.name}
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>
      <div className="px-3 md:px-0 mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 sm:gap-4">
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
