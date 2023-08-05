import React from "react";
import Banner from "../../components/partial/banner";
import AllProduct from "../../components/partial/allProducts";
import style from './home.module.scss'

function HomePage() {
  return (
    <div className={style['home-main']}>
  <Banner />
  <AllProduct/>
  </div>
  );
}

export default HomePage;
