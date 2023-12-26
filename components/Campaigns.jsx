import React, { useState } from "react";
import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";
import Link from "next/link";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import { useMediaQuery } from "@mui/material";

const CampaignItem = ({ category }) => {

  return (
    <>
      <Link href='/menu'>
        <div className="relative flex flex-col items-center mx-2 cursor-pointer">
            {category?.category_image ? 
              <div className="bg-slate-200 shadow-lg relative h-20 max-w-[5rem] md:h-40 w-full md:max-w-[10rem] rounded-full group overflow-hidden">
                <Image
                  src={category?.category_image}
                  alt=""
                  layout="fill"
                  className="object-cover h-full w-full z-0 hover:scale-110 transition-all duration-1000"
                  priority
                />
              </div>:
              <Skeleton height={160} width={160} circle={true} />
            }
            <h1 className="text-sm md:text-2xl mt-2 text-center break-words w-full px-3 font-semibold text-slate-800">{category.name}</h1>
        </div>
      </Link>
      </>
  );
};

const Campaigns = ({ categoryList }) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [showMore, setShowMore] = useState(3);

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  autoplay: true,
  arrows: true,
  nextArrow: <NextBtn />,
  prevArrow: <PrevBtn />,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1160,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
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


  return (
    <div className="bg-slate-100 py-6">
      <div className="container mx-auto my-5 md:my-10 relative p-5 rounded-lg z-10">
        <Title addClass="text-2xl md:text-4xl uppercase mb-5 md:mb-10 text-center">Our Popular Category</Title>
        { isMobile ?
          <div className="w-full">
            <div className="grid grid-cols-3">
            { categoryList && categoryList.slice(0, showMore).map(((category, _idx) => (
              <CampaignItem key={_idx} category={category} />
              )))}
            </div>

            { categoryList.length > showMore &&
              <button className="mt-6 text-center border rounded-md p-2 w-full font-semibold text-sm text-slate-600" onClick={() => setShowMore(showMore + 3)}>See more <i className="fas fa-angle-down ml-2"></i></button>
            }
          </div> :
          <Slider {...settings}>
            {categoryList && categoryList.map(((category, _idx) => (
              <CampaignItem key={_idx} category={category} />
            )))}
          </Slider>
        }
      </div>
    </div>
  );
};

export default Campaigns;
