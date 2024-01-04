import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <span className="mt-2 text-2xl font-bubblegum font-bold cursor-pointer z-50 text-red-500">
        KANGO CASTLE
      </span>
    </Link>
  );
};

export default Logo;
