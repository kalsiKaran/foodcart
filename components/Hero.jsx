import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import React from "react";
import Skeleton from "react-loading-skeleton";

const Hero = ({bannerList}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
    };

  return (
      
    <Slider {...settings}>
        {bannerList ? bannerList.map((banner => (
            <React.Fragment key={banner.id}>
                <Link href="/menu">
                    <div className="relative h-32 my-5 mx-auto w-[calc(100%_-_3rem)] sm:my-0 sm:w-full sm:h-[80vh] overflow-hidden">
                        <Image
                            src={banner.image}
                            alt={banner.name}
                            layout="fill"
                            priority
                            objectFit="cover"
                            loading="eager"
                            className="absolute h-full w-full rounded-md sm:rounded-none"
                        />
                    </div>
                </Link>
            </React.Fragment>
        ))):
            <div className="h-56 my-5 mx-auto w-[calc(100%_-_3rem)] sm:my-0 sm:w-full sm:h-[70vh] overflow-hidden">
                <Skeleton height="100%" width="100%" />
            </div>
        }
    </Slider>
  );
};

export default Hero;
