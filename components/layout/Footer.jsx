import React from "react";
import Title from "../ui/Title";
import { FOOTER, FOOTERLINKS } from '../../constants';
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-secondary text-white border-t border-t-slate-200">

    <div className="-mt-10 mb-10">
      <div className="relative mx-auto p-10 h-24 w-24 outline outline-8 outline-secondary rounded-full overflow-hidden">
        <Image src="/images/logo.png" alt="logo" layout="fill" />
      </div>
    </div>

    <div className="border-y border-gray-700 py-4 flex justify-center items-center gap-x-5 sm:gap-x-8">
        {FOOTERLINKS.map((link, _idx) => (
          <Link href={link.path} key={_idx}>
            <h6 className="text-sm sm:text-lg cursor-pointer hover:text-amber-500 transition duration-500">{link.title}</h6>
          </Link>
        ))}
    </div>

      <div className="container mx-auto pt-16 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between justify-center text-center md:gap-y-0 gap-y-6 ">
          <div className="md:flex-1">
            <Title addClass="text-2xl">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <a href={FOOTER?.location} target="_blank" rel="noreferrer">
                <i className="fa fa-map-marker"></i>
                <span className="inline-block ml-2">Location</span>
              </a>
              <div>
                <i className="fa fa-phone"></i>
                <a
                  className="inline-block ml-2"
                  href={`tel:${FOOTER?.phoneNumber}`}
                >
                  {FOOTER?.phoneNumber}
                </a>
              </div>
              <a href={`mailto:${FOOTER?.email}`}>
                <i className="fa fa-envelope"></i>
                <span className="inline-block ml-2">{FOOTER?.email}</span>
              </a>
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-3xl">KANGO CASTLE</Title>
            <p className="mt-3">{FOOTER?.desc}</p>
            <div className="flex items-center justify-center mt-5 gap-x-4">
              {FOOTER?.socialMedia?.map((item, index) => (
                <a
                  href={item.link}
                  className="shadow-md w-8 h-8 grid place-content-center bg-white text-red-500 rounded-full hover:text-white hover:bg-red-500 transition-all duration-500 hover:scale-110 "
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={item.icon}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-2xl">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">
                  {FOOTER?.openingHours?.day}
                </span>
              </div>
              <div>
                <span className="inline-block ml-2">
                  {FOOTER?.openingHours?.hour}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
        <p className="text-center mt-10 py-6 border-t border-t-gray-600">
          {FOOTER.rights}
        </p>
    </div>
  );
};

export default Footer;
