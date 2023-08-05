import React, { Fragment, useState } from "react";
import Logo from "../../assets/images/app-logo.png";
import Button from "../button";
import "./header.scss";
import PopupModal from "../popupModal";

const MenuIcon = (props) => {
  return (
    <div {...props} className="menu-icn">
      <span />
      <span />
      <span />
    </div>
  );
};
function Header() {
  const token = false;
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };
  return (
    <header id="header">
      <PopupModal isVisible={true} title={"Login"}></PopupModal>
      <div className="header-content">
        <div className="container">
          <div className="left-section">
            <img alt="" src={Logo} className="site-logo" />
          </div>
          <div className="right-section">
            {token ? (
              <Button>logout</Button>
            ) : (
              <Fragment>
                <Button>login</Button>
                <Button>signup</Button>
              </Fragment>
            )}
            <MenuIcon onClick={toggleDrawer} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
