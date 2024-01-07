import { useEffect, useState } from "react";
import MenuItem from "../product/MenuItem";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
  
  appenDots: (dots) => (
    <div>
      <ul className="justify-center ">{dots}</ul>
    </div>
  ),
  customPaging: (i) => (
    <div className="w-3 h-3 border border-red-400 rounded-full"></div>
  ),

  responsive: [
    {
      breakpoint: 1160,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};


const Recommends = ({productList}) => {
  const [RecommendList, setRecommendList] = useState([]);

  useEffect(() => {
    setRecommendList(productList?.filter((product) => product.recommend === 1));
  }, [productList]);

  return (
    <>
    <div className="hidden sm:block">
        {RecommendList.length > 0 &&
          (<Slider {...settings}>
              {RecommendList.map((item, _idx) => (
                <div key={_idx} className="pb-10 px-3 pt-8 group-sm-card">
                  <MenuItem product={item} />
                </div>
              ))}
          </Slider>)
        }
    </div>

    <div className="block sm:hidden">
      {RecommendList.length > 0 &&
        <div className="flex items-center px-3 -mr-6 -ml-3 pb-10 mt-10 snap-x overflow-x-auto scrollbar-hidden">
            {RecommendList.map((item, _idx) => (
              <div key={_idx} className="mr-3 min-w-[220px] sm:min-w-[280px] snap-center group-sm-card">
                <MenuItem product={item} />
              </div>
            ))}
        </div>
      }
    </div>
    </>
  );
};

export default Recommends;
