import { useState, useEffect } from "react";
import { FaUserAlt, FaShoppingCart, FaSearch } from "react-icons/fa";
import Logo from "../ui/Logo";
import Search from "../ui/Search";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { HEADERLINKS } from "../../constants";

const Header = () => {
  const [isSearchModal, setIsSearchModal] = useState(false);
  const [isMenuModal, setIsMenuModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cart = useSelector((state) => state.cart);

  const router = useRouter();

  useEffect(() => {
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
  }, []);

  return (
    <div
      className={`h-[5.5rem] z-50 w-full ${
        isScrolled || router.asPath !== "/" ?  "bg-secondary sticky top-0" : "relative bg-transparent"
      }`}
    >
      <div className="container mx-auto text-white flex justify-between items-center h-full">
        <Logo />
        <nav
          className={`sm:static absolute top-0 left-0 sm:w-auto sm:h-auto w-full h-screen sm:text-white text-black sm:bg-transparent bg-white sm:flex hidden z-50 ${
            isMenuModal === true && "!grid place-content-center"
          }`}
        >
          <ul className="flex gap-x-2 sm:flex-row flex-col items-center">
            {HEADERLINKS.map((link, _idx) => (
              <li key={_idx} className={`px-[5px] py-[10px] text-sm font-semibold uppercase hover:text-primary hover:scale-105 transition-all duration-200 cursor-pointer ${ router.asPath === link.path && "text-primary" }`}
                onClick={() => setIsMenuModal(false)}
              >
                <Link href={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
          {isMenuModal && (
            <button
              className="absolute  top-4 right-4 z-50"
              onClick={() => setIsMenuModal(false)}
            >
              <GiCancel size={25} className=" transition-all" />
            </button>
          )}
        </nav>
        <div className="flex gap-x-4 items-center">
          <button onClick={() => setIsSearchModal(true)}>
            <FaSearch className="hover:text-primary transition-all cursor-pointer text-xl" />
          </button>
          <Link href="/cart">
            <span className="relative">
              <FaShoppingCart
                className={`hover:text-primary transition-all cursor-pointer text-xl`}
              />
              <span className="w-4 h-4 text-xs grid place-content-center rounded-full bg-primary absolute -top-2 -right-3 text-black font-bold">
                {cart.products.length === 0 ? "0" : cart.products.length}
              </span>
            </span>
          </Link>

          <Link href="/auth/login">
            <FaUserAlt
              className={`hover:text-primary transition-all cursor-pointer text-xl ${(router.asPath.includes("auth") ||
              router.asPath.includes("profile")) &&
            "text-primary"}`}
            />
          </Link>
          <button
            className="sm:hidden inline-block"
            onClick={() => setIsMenuModal(true)}
          >
            <GiHamburgerMenu className="text-xl hover:text-primary transition-all" />
          </button>
        </div>
      </div>
      {isSearchModal && <Search setIsSearchModal={setIsSearchModal} />}
    </div>
  );
};

export default Header;
