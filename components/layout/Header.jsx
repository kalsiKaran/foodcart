import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";

import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { HEADERLINKS } from "../../constants";
import { useMediaQuery } from "@mui/material";

const Header = () => {
  const [isMenuModal, setIsMenuModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  useEffect(() => {
    if(isMobile){
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  return (
    <div
      className={`shadow-sm h-[4.5rem] sm:h-[5.5rem] mb-[72px] sm:mb-0 z-50 w-full ${
        isScrolled || router.asPath !== "/home" ?  "bg-slate-50 sticky top-0" : "relative"
      }`}
    >
      <div className="container mx-auto text-neutral-800 flex justify-between items-center h-full z-50">
        <Logo />
        <nav
          className={`fixed h-full w-full px-6 bg-slate-100 translate-x-full top-[90px] left-0 z-10 transition duration-400 pt-[80px] ${
            isMenuModal === true && "translate-x-0"
          }`}
        >
          
          <div className="grid grid-cols-2 gap-4">
            <Link href="/favourites">
              <div className="h-24 w-full bg-white rounded-xl grid place-items-center place-content-center shadow-md" onClick={() => setIsMenuModal(false)}>
                <AiOutlineHeart className="text-3xl text-red-400" />
                <h6 className="text-md mt-2">Favourites</h6>
              </div>
            </Link>

            <Link href="/cart">
              <div className="h-24 w-full bg-white rounded-xl grid place-items-center place-content-center shadow-md" onClick={() => setIsMenuModal(false)} >
                <IoCartOutline className="text-3xl text-red-400" />
                <h6 className="text-md mt-2">Your Cart</h6>
              </div>
            </Link>
          </div>

          <Link href="/cart">
            <div className="flex items-center p-4 mt-8 w-full bg-white rounded-lg shadow-sm" onClick={() => setIsMenuModal(false)} >
              <FaRegUser className="text-xl text-red-400" />
              <h6 className="ml-3 text-md text-gray-700">Login / Signup</h6>
            </div>
          </Link>

          <ul className="mt-5 rounded-lg overflow-hidden shadow-sm">
            {HEADERLINKS.map((link, _idx) => (
              <li key={_idx} className={`bg-white border-l-4 border-l-transparent border-b border-b-gray-100 p-4 text-xs font-semibold uppercase transition-all duration-200 cursor-pointer ${ router.asPath === link.path && "border-l-4 border-l-amber-500" }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href={link.path}>
                  <div className="flex items-center justify-between w-full">
                    {link.title}
                    <i className="fas fa-angle-right text-gray-500"></i>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

        </nav>
          <Search />
        <div className="flex gap-x-4 items-center z-50">
          <Link href="/cart">
            <span className="relative mr-1 hidden sm:flex items-center bg-amber-300 px-3 py-1 rounded-md font-semibold cursor-pointer hover:scale-95 transition duration-500">
              <IoCartOutline className="text-2xl mr-2"/>
              Cart
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full border bg-white absolute -top-2 -right-2 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>

          <Link href="/auth/login">
            <FaRegUser
              className={`hover:text-primary hidden sm:block transition-all cursor-pointer text-xl ${(router.asPath.includes("auth") ||
              router.asPath.includes("profile")) &&
            "text-primary"}`}
            />
          </Link>

          <button
            className="sm:hidden inline-block"
            onClick={() => setIsMenuModal(!isMenuModal)}
          >
            { !isMenuModal ? 

              <div className="bg-red-50 h-10 w-10 rounded-full grid place-content-center">
                <FaHamburger className="text-2xl text-red-400 transition-all" />
              </div>:
              <IoCloseSharp size={25} className="text-red-400 hover:scale-105 transition-all" />
            }
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Header;
