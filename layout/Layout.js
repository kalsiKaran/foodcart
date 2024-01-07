import React, { useEffect, useState } from "react";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import axios from "axios";

const Layout = ({ children }) => {
  const[Config, setConfig] = useState({});

  useEffect(() => {
    const fetchConfig = async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/config`);
      if(response) {
        setConfig(response.data)
      }else{
        setConfig({});
      }
    }

    fetchConfig();
  }, []);
  return (
    <React.Fragment>
      <Header Config={Config} />
      {children}
      <Footer Config={Config} />
    </React.Fragment>
  );
};

export default Layout;
