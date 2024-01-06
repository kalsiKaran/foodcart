import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";

const MenuWrapper = ({ categoryList, productList }) => {
  const router = useRouter();
  const [active, setActive] = useState(-1);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    if(active !== -1){
      setFilter(
        productList?.filter(
          (product) =>
            product.category_id ==
            categoryList[active].id
        )
      );
    }else{
      setFilter(productList)
    }

  }, [categoryList, active, productList]);

  const {activeCategory} = router.query;

  useEffect(() => {
    const categoryToActivate = categoryList.findIndex(category => category.id == activeCategory);
    setActive(categoryToActivate);
  }, [activeCategory]);

  return (
    <div className="container mx-auto pb-16 pt-8 md:pt-16">
      <div className="flex flex-col items-center w-full">
        <Title addClass="text-2xl md:text-4xl uppercase text-center">Our Delicious Menu</Title>
        <div className="mt-5 flex items-center overflow-auto w-full scrollbar-hidden">
          {categoryList &&
            <>
              <button
                className={`px-4 py-2 font-semibold border-b-2 ${
                  -1 === active ? "border-b-red-500 text-red-500" : "border-b-transparent"
                }`}
                onClick={() => {
                  setActive(-1);
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative h-10 w-10 sm:h-16 md:w-16 rounded-full overflow-hidden">
                    <Image
                      src="/images/category-all.jpg"
                    alt="all"
                      layout="fill"
                      loading="eager"
                      className="w-full object-cover group-hover:scale-105 transition-all duration-[3000ms]"
                    />
                  </div>
                  <p className="text-sm sm:text-md font-semibold mt-1 whitespace-nowrap">
                    All
                  </p>
                </div>
              </button>

            { categoryList.map((category, index) => (
              <button
                className={`px-4 py-2 font-semibold border-b-2 ${
                  index === active ? "border-b-red-500 text-red-500" : "border-b-transparent"
                }`}
                key={category.id}
                onClick={() => {
                  setActive(index);
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
                  <p className="text-sm sm:text-md font-semibold mt-1 whitespace-nowrap">
                    {category.name}
                  </p>
                </div>
              </button>
            ))}
            </>
            }
        </div>
      </div>
      <div className="px-3 md:px-0 mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 sm:gap-4">
        {filter?.length > 0 &&
          filter.map((product) => <MenuItem key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default MenuWrapper;
