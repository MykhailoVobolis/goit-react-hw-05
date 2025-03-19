import Footer from "../Footer/Footer";
import AppBar from "../AppBar/AppBar.jsx";
import BreadcrumbsNav from "../BreadcrumbsNav/BreadcrumbsNav.jsx";

import { Suspense } from "react";
import { useMedia } from "react-use";

import css from "./Layout.module.css";

export default function Layout({ children }) {
  const isTablet = useMedia("(min-width: 768px)");

  return (
    <div className={css.pageContainer}>
      <AppBar />
      <main className={css.mainContainer}>
        {isTablet && <BreadcrumbsNav />}
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
