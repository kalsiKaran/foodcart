import Image from "next/image";
import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import axios from "axios";
import { useRouter } from "next/router";

const Search = ({ setIsMenuModal }) => {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      setProduct(res.data);
      // setFiltered(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      getProducts();
    }, 1000);
  }, []);

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    const searchFilter = product.filter((item) =>
      item.product_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if(e.target.value){
      setFiltered(searchFilter)
    }else{
      setFiltered([])
    }
  };

  return (
    <div className="w-full sm:w-1/2 z-50">
      <div className="relative flex items-center justify-end text-gray-600 w-full">
        <span className="text-xl -mr-12 z-10 font-bold text-red-500 border-r-2 pr-3">
          <RiSearch2Line />
        </span>
        <input type="text" placeholder="Search for a dish..." onChange={handleSearch} className="bg-white h-12 sm:h-15 pr-12 sm:pr-5 pl-16 rounded-lg text-md focus:outline-none w-full border shadow-md peer" />

          {filtered.length > 0 &&
            <div className="absolute left-0 top-0 z-[-1] w-full bg-white pt-16 pb-3 px-2 rounded-xl peer-focus:scale-y-100 scale-y-0 origin-top transition-all duration-200 shadow-xl">
              <ul className="max-h-[15rem] overflow-auto">
                  {filtered.map((item) => (
                    <li
                      className="flex items-center justify-between p-1 hover:bg-amber-100 rounded-md transition-all px-3 cursor-pointer"
                      key={item.id}
                      onClick={() => {
                        router.push(`/product/${item?.id}`);
                        setIsMenuModal(false);
                      }}
                    >
                      <div className="relative flex min-w-[40px]">
                        <Image
                          src={item?.product_image}
                          alt={item.product_name}
                          width={40}
                          height={40}
                          priority
                          objectFit="cover"
                          className="rounded-md"
                        />
                      </div>
                      <span className="grow ml-5">{item.product_name}</span>
                      <span className="font-semibold">₹{item.selling_price}</span>
                    </li>
                  ))}
              </ul>
            </div>
          }
      </div>
    </div>
  );
};

export default Search;
