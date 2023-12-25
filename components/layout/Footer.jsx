import React from "react";
import Title from "../ui/Title";
import { FOOTER } from '../../constants';

const Footer = () => {
  return (
    <div className="bg-secondary text-white">
      <div className="container mx-auto pt-16 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between justify-center text-center md:gap-y-0 gap-y-6 ">
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
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
            <Title addClass="text-[38px]">Foodhub</Title>
            <p className="mt-3">{FOOTER?.desc}</p>
            <div className="flex items-center justify-center mt-5 gap-x-2">
              {FOOTER?.socialMedia?.map((item, index) => (
                <a
                  href={item.link}
                  className="w-8 h-8 grid place-content-center bg-white text-secondary rounded-full hover:text-white hover:bg-primary transition-all transform hover:scale-110 "
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
            <Title addClass="text-[30px]">Opening Hours</Title>
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
        <p className="text-center mt-10">
          {FOOTER.rights}
        </p>
      </div>
    </div>
  );
};

export default Footer;
