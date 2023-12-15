import React, { useEffect, useState } from "react";
import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";
import Link from "next/link";

const CampaignItem = ({ category, productList }) => {
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    setFilter(
      productList.filter(
        (product) =>
          product.category.toLowerCase() ===
          category.title.toLowerCase()
      )
    );
  }, [category, productList]);

  return (
      <Link href='/menu'>
        <div className="bg-secondary flex-1 relative rounded-md overflow-hidden flex items-center justify-between mx-2 cursor-pointer">
            <Image
              src={category.thumbnail}
              alt=""
              layout="fill"
              className=" transition-all absolute object-cover rounded-2xl z-0"
              priority
            />
          <div className="text-white z-10 bg-gray-900 bg-opacity-75 py-10 h-full w-full">
            <Title addClass="text-[32px] text-center">{category.title}</Title>
          </div>
        </div>
      </Link>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  appenDots: (dots) => (
    <div>
      <ul className="my-10 justify-center">{dots}</ul>
    </div>
  ),
  customPaging: (i) => (
    <div className="w-3 h-3 border bg-white rounded-full mt-1"></div>
  ),
};

const Campaigns = ({ categoryList, productList }) => {
  return (
    <div className="container mx-auto -mt-[84px] mb-10 bg-gray-50 relative p-5 rounded-lg shadow-2xl z-10">
      <Slider {...settings}>
        {categoryList && categoryList.map(((category, _idx) => (
          <CampaignItem key={_idx} category={category} productList={productList} />
        )))}
      </Slider>
    </div>
  );
};

export default Campaigns;
