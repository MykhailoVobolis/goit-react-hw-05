import Footer from "../Footer/Footer";
import Navigation from "../Navigation/Navigation";

import { Suspense } from "react";

import css from "./Layout.module.css";

export default function Layout({ children }) {
  return (
    <div className={css.pageContainer}>
      <Navigation />
      <main className={css.mainContainer}>
        <Suspense fallback={<div></div>}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
