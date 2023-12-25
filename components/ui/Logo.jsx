import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <span className="text-[2rem] font-bubblegum font-bold cursor-pointer">
        Foodhub
      </span>
    </Link>
  );
};

export default Logo;
