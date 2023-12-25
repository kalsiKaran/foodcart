import React from "react";
import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";
import Link from "next/link";

const CampaignItem = ({ category }) => {

  return (
      <Link href='/menu'>
        <div className="bg-secondary flex-1 relative rounded-md overflow-hidden flex items-center justify-between mx-2 cursor-pointer overflow-hidden group">
            {category?.category_image && 
              <Image
                src={category?.category_image}
                alt=""
                layout="fill"
                className="absolute object-cover rounded-2xl z-0 group-hover:scale-110 transition-all duration-500"
                priority
              />
            }
          <div className="text-white z-10 bg-gray-900 bg-opacity-75 h-32 flex items-center justify-center w-full">
            <Title addClass="text-[32px] text-center break-words w-full px-3 leading-tight">{category.name}</Title>
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
  responsive: [
    {
      breakpoint: 576, // Adjust this breakpoint to target mobile devices
      settings: {
        slidesToShow: 1, // Show 1 slide on mobile devices
        slidesToScroll: 1,
      },
    },
  ],
};

const Campaigns = ({ categoryList }) => {
  return (
    <div className="container mx-auto -mt-[84px] mb-10 bg-gray-50 relative p-5 rounded-lg shadow-2xl z-10">
      <Slider {...settings}>
        {categoryList && categoryList.map(((category, _idx) => (
          <CampaignItem key={_idx} category={category} />
        )))}
      </Slider>
    </div>
  );
};

export default Campaigns;
