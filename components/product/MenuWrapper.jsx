import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import InfiniteScroll from 'react-infinite-scroll-component';

const categoriesSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 10,
  slidesToScroll: 3,
  autoplay: false,
  arrows: true,
  nextArrow: <NextBtn />,
  prevArrow: <PrevBtn />,
  responsive: [
    {
      breakpoint: 968,
      settings: {
        slidesToShow: 9,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        arrows: false,
      },
    },
  ],
};

function NextBtn({ onClick }) {
  return (
    <button
      className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-lg flex items-center justify-center w-10 h-10 rounded-full text-dark z-10"
      onClick={onClick}
    >
      <IoIosArrowForward />
    </button>
  );
}

function PrevBtn({ onClick }) {
  return (
    <button
      className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-lg flex items-center justify-center w-10 h-10 rounded-full text-dark z-10"
      onClick={onClick}
    >
      <IoIosArrowBack />
    </button>
  );
}

const MenuWrapper = ({ categoryList, productList }) => {
  const router = useRouter();
  const [active, setActive] = useState(-1);
  const [filter, setFilter] = useState([]);
  const [limit, setLimit] = useState(4);
  const [sectionHeight, setSectionHeight] = useState(0);

  useEffect(() => {
    const { activeCategory } = router.query;
    const categoryToActivate = categoryList.findIndex(category => category.id == activeCategory);
    setActive(categoryToActivate);
  }, [router.query.activeCategory, categoryList]);

  const fetchMoreData = () => {
    setLimit((prevLimit) => prevLimit + 4);
  };
  
  useEffect(() => {
    if (active !== -1) {
      setFilter(
        productList?.filter(
          (product) => product.category_id == categoryList[active].id
        )
      );
    } else {
      setFilter(productList);
    }
  }, [categoryList, active, productList]);
  
  const handleInfiniteScroll = () => {
    const sectionElement = document.getElementById('MenuWrapper');
    if (!sectionElement) return;
  
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    const sectionBottom = sectionElement.offsetTop + sectionElement.clientHeight;
  
    if (scrollTop + clientHeight >= sectionBottom && scrollHeight !== sectionHeight) {
      setSectionHeight(scrollHeight);
      setTimeout(() => {
        fetchMoreData();
      }, 1000);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [fetchMoreData]);


  return (
    <div className="container mx-auto pb-16 pt-8 md:pt-16">
      <div className="w-full">
        <Title addClass="text-2xl md:text-4xl uppercase text-center">Our Delicious Menu</Title>
          {categoryList &&
            <>
        <Slider {...categoriesSettings}>
              <button
                className={`px-4 py-2 font-semibold border-b-2 ${
                  -1 === active ? "border-b-red-500 text-red-500" : "border-b-transparent"
                }`}
                onClick={() => {
                  setActive(-1);
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="relative h-10 w-10 sm:h-16 sm:w-16 rounded-full overflow-hidden">
                    <Image
                      src="/images/category-all.jpg"
                    alt="all"
                      layout="fill"
                      loading="eager"
                      className="w-full object-cover group-hover:scale-105 transition-all duration-[3000ms]"
                    />
                  </div>
                  <p className="text-sm sm:text-md font-semibold mt-1">
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
                  <div className="relative h-10 w-10 sm:h-16 sm:w-16 rounded-full overflow-hidden">
                    {category.category_image ? 
                      <Image
                        src={category.category_image}
                        alt={category.category_name}
                        layout="fill"
                        loading="eager"
                        className="w-full object-cover"
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
        </Slider>
            </>
            }
      </div>

      {/* <InfiniteScroll
        dataLength={filter.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className="text-red-500 text-center py-8"><i className="animate-spin text-red-500 text-3xl fa-solid fa-spinner"></i></div>}
        scrollThreshold={0.6}
      > */}
        <div id="MenuWrapper" className="px-3 pb-8 mt-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 sm:gap-4">
          {filter?.length > 0 &&
            filter.slice(0, limit).map((product) => <MenuItem key={product.id} product={product} />)}
        </div>
          { filter.length > limit && <div className="text-red-500 text-center py-4"><i className="animate-spin text-red-500 text-3xl fa-solid fa-spinner"></i></div>}
      {/* </InfiniteScroll> */}
    </div>
  );
};

export default MenuWrapper;
