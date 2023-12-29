import { useEffect, useState } from "react";
import MenuItem from "../product/MenuItem";

const Recommends = ({productList}) => {
  const [RecommendList, setRecommendList] = useState([]);

  useEffect(() => {
    setRecommendList(productList?.filter((product) => product.recommend === 1));
  }, [productList]);

  return (
    <div>
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
  );
};

export default Recommends;
