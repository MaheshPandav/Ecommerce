import React from "react";
import style from "./footer.module.scss";
import Logo from "../../assets/images/app-logo-white.svg";

function Footer() {
  return (
    <footer id={style["footer"]}>
      <img alt="" src={Logo} className={style["site-logo"]} />
      <ul>
        <li>About</li>
        <span />
        <li>Blog</li>
        <span />
        <li>ContactUs</li>
        <span />
        <li>Email: appstore@gmail.com</li>
        <span />
        <li>Contact: +918888888888</li>
      </ul>
      <p>©2021 appstore Pvt. Ltd</p>
    </footer>
  );
}

export default Footer;
