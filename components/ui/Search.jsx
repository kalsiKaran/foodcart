import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/router";
import PacmanLoader from "react-spinners/PacmanLoader";

const Search = ({ setIsSearchModal }) => {
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
      setFiltered(res.data);
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
    setFiltered(searchFilter);
  };

  return (
    <div className="bg-white sm:bg-transparent fixed top-[4.5rem] sm:top-0 left-0 w-full py-3 sm:py-0 px-2 sm:px-0 sm:relative">
      <div className="relative flex items-center justify-end text-gray-600 w-full sm:w-56 md:w-72 lg:w-96 px-4 sm:px-0">
        <IoIosSearch className="text-xl -mr-10 z-10 font-bold" />
        <input type="text" placeholder="Search..." onChange={handleSearch} className="bg-white h-12 sm:h-10 px-5 pl-12 rounded-full text-sm focus:outline-none w-full border shadow-md peer" />

        {product.length > 0 ? (
              <div className="absolute left-0 top-0 z-[-1] w-full bg-white pt-16 pb-3 px-2 rounded-t-3xl rounded-b-xl peer-focus:scale-y-100 scale-y-0 origin-top transition-all duration-200">
                <ul className=" max-h-[15rem] overflow-auto">
                  {filtered.length > 0 ? (
                    filtered.slice(0, 5).map((item) => (
                      <li
                        className="flex items-center justify-between p-1 hover:bg-amber-100 rounded-md transition-all px-3 cursor-pointer"
                        key={item.id}
                        onClick={() => {
                          router.push(`/product/${item?.id}`);
                          setIsSearchModal(false);
                        }}
                      >
                        <div className="relative flex">
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
                        <span className="font-bold grow ml-5">{item.product_name}</span>
                        <span className="font-bold">${item.selling_price}</span>
                      </li>
                    ))
                  ) : (
                    <span className="w-full text-center block font-bold my-6">
                      No Products Found
                    </span>
                  )}
                </ul>
              </div>
            ) : (
              <div className="absolute left-0 top-0 z-[-1] w-full bg-white pt-16 pb-3 px-2 rounded-xl flex justify-center peer-focus:scale-y-100 scale-y-0 origin-top transition-all duration-200">
                <PacmanLoader />
              </div>
            )}
      </div>
    </div>
  );
};

export default Search;
