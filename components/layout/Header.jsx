import { useState, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { CgMenuCake } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";

import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { HEADERLINKS } from "../../constants";
import { useMediaQuery } from "@mui/material";
import Image from "next/image";
import MobileCart from "../MobileCart";


const Header = () => {
  const [isMenuModal, setIsMenuModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [isLogin, setIsLogin] = useState(0);
  const isMobile = useMediaQuery('(max-width: 640px)');

  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    setIsLogin(auth);
  }, [auth]);

  const router = useRouter();

  useEffect(() => {
    setCartLength(cart.products.length);
  }, [cart]);

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
      <div className="container px-4 sm:px-0 mx-auto text-neutral-800 flex justify-between items-center h-full z-50">
        <Logo />
        <nav
          className={`fixed h-full w-full px-6 bg-slate-100 translate-x-full top-[90px] left-0 z-10 transition duration-400 pt-[80px] ${
            isMenuModal === true && "translate-x-0"
          }`}
        >
          <Link href="/menu">
            <div className="relative h-48 w-full rounded-xl overflow-hidden" onClick={() => setIsMenuModal(false)}>
              <Image
                src='/images/pizza-banner.jpg'
                alt="pizza banner"
                layout="fill"
                loading="eager"
                objectFit="cover"
              />
            </div>
          </Link>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Link href="/favourites">
              <div className="h-24 w-full bg-white rounded-xl grid place-items-center place-content-center shadow-md " onClick={() => setIsMenuModal(false)}>
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

          { !isLogin ? 
          <Link href="/auth/login">
            <div className="flex items-center p-4 mt-6 w-full bg-white rounded-lg shadow-sm" onClick={() => setIsMenuModal(false)} >
              <FaRegUser className="text-xl text-red-400" />
              <h6 className="ml-3 text-md text-gray-700">Login / Signup</h6>
            </div>
          </Link>:
          <Link href="/profile">
            <div className="flex items-center p-4 mt-6 w-full bg-white rounded-lg shadow-sm" onClick={() => setIsMenuModal(false)} >
              <FaRegUser className="text-xl text-red-400" />
              <h6 className="ml-3 text-md text-gray-700">Your Profile</h6>
            </div>
          </Link>
          }

          <ul className="mt-5 rounded-lg overflow-hidden shadow-sm">
            {HEADERLINKS.map((link, _idx) => (
              <li key={_idx} className={`bg-white border-l-4 border-l-transparent border-b border-b-gray-100 p-5 text-xs font-semibold uppercase transition-all duration-200 cursor-pointer ${ router.asPath === link.path && "border-l-4 border-l-amber-500" }`}
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
          <Search setIsMenuModal={setIsMenuModal} />
        <div className="flex gap-x-4 items-center z-50">
          
        <Link href="/favourites">
            <span>
              <AiOutlineHeart className={"hidden sm:block transition-all cursor-pointer text-2xl hover:text-red-500"}/>
            </span>
          </Link>
          <Link href="/auth/login">
            <span>
              <FaRegUser className={"hidden sm:block hover:text-amber-500 transition-all cursor-pointer text-xl"}/>
            </span>
          </Link>
          
          <Link href="/cart">
            <span className="relative ml-1 hidden sm:flex items-center bg-amber-300 px-3 py-1 rounded-md font-semibold cursor-pointer hover:scale-95 transition duration-500">
              <IoCartOutline className="text-2xl mr-2"/>
              Cart
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full border bg-white absolute -top-2 -right-2 text-black font-regular">
                {cartLength === 0 ? "0" : cartLength}
              </span>
            </span>
          </Link>

          <button
            className="sm:hidden inline-block"
            onClick={() => setIsMenuModal(!isMenuModal)}
          >
            <div className={`${isMenuModal ? "h-0 w-0" : "h-10 w-10"} bg-red-50 rounded-full grid place-content-center transition-all duration-500 overflow-hidden`}>
              <CgMenuCake className="text-2xl text-red-400 transition-all" />
            </div>

            <div className={`${!isMenuModal ? "h-0 w-0" : "h-10 w-10"} bg-red-50 rounded-full grid place-content-center transition-all duration-500 overflow-hidden`}>
              <IoCloseSharp size={25} className="text-red-400 hover:scale-105 transition-all" />
            </div>
          </button>
        </div>
      </div>

    { (isMobile && cartLength>0 && (router.asPath !== '/cart') ) && <MobileCart cart={cart} />}
    
    </div>
  );
};

export default Header;
