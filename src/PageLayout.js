import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";

function PageLayout({ children }) {
  return (
    <div style={{paddingTop:80}}>
      <Header /> 
       {children}
       <Footer />
    </div>
  );
}

export default PageLayout;
