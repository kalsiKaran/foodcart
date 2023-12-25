import React from "react";

const Title = ({ children, addClass }) => {
  return <div className={`${addClass} font-bubblegum tracking-wider font-bold`}>{children}</div>;
};

export default Title;
