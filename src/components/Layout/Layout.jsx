import Footer from "../Footer/Footer";

import { Suspense } from "react";

import css from "./Layout.module.css";
import AppBar from "../AppBar/AppBar.jsx";

export default function Layout({ children }) {
  return (
    <div className={css.pageContainer}>
      <AppBar />
      <main className={css.mainContainer}>
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
