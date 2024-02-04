import React from "react";
import Title from "../ui/Title";
import { FOOTER, FOOTERLINKS } from '../../constants';
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

const Footer = ({Config}) => {
  return (
    <div className="bg-secondary text-white border-t border-t-slate-200">

    <div className="-mt-10 mb-10">
      <div className="relative mx-auto h-24 w-24 outline outline-8 outline-secondary rounded-full overflow-hidden">
        {Config.logo ? <Image src={Config?.logo} alt="logo" layout="fill" priority="true" /> : <Skeleton height={120} width={120} />}
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
              <span>
                <i className="fa fa-map-marker"></i>
                <span className="inline-block ml-2">{Config?.address}</span>
              </span>
              <div>
                {Config.phone && <Link href={`tel:${Config.phone}`}>
                  <span className="cursor-pointer">
                    <i className="fa fa-phone"></i>
                    <span className="ml-2">{Config?.phone}</span>
                  </span>
                </Link>}
              </div>
              {Config.email &&
                <Link href={`mailto:${Config?.email}`}>
                  <span className="cursor-pointer">
                    <i className="fa fa-envelope"></i>
                    <span className="inline-block ml-2">{Config?.email}</span>
                  </span>
                </Link>
              }
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-3xl">{Config?.name}</Title>
            <p className="mt-3">{FOOTER?.desc}</p>
            <div className="flex items-center justify-center mt-5 gap-x-4">
              {FOOTER?.socialMedia?.map((item, index) => (
                <Link
                  href={item.link}
                  className="shadow-md w-8 h-8 grid place-content-center bg-white text-red-500 rounded-full hover:text-white hover:bg-red-500 transition-all duration-500 hover:scale-110 "
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className={item.icon}></i>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-2xl">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">
                  Everyday
                </span>
              </div>
              <div>
                <span className="inline-block ml-2">
                  {Config?.hours}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
        <p className="text-center mt-10 py-6 border-t border-t-gray-600">
          {Config?.copyright}
        </p>
    </div>
  );
};

export default Footer;
