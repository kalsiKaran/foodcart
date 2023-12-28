import "slick-carousel/slick/slick.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "slick-carousel/slick/slick-theme.css";
import "nprogress/nprogress.css";
import 'react-loading-skeleton/dist/skeleton.css';

import Layout from "../layout/Layout";

import { Provider } from "react-redux";
import { store } from "../redux/store";

import { ToastContainer } from "react-toastify";

import { Router } from "next/router";

import nProgress from "nprogress";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
