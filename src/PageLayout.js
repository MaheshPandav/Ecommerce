import React, { Fragment } from "react";
import Header from "./components/header";
import Footer from "./components/footer";

function PageLayout({ children }) {
  return (
    <Fragment>
      <Header /> 
       {children}
       <Footer />
    </Fragment>
  );
}

export default PageLayout;
