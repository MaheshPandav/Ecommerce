import React, { Fragment, useState } from "react";
import Logo from "../../assets/images/app-logo.png";
import Button from "../button";
import "./header.scss";
import PopupModal from "../popupModal";
import InputField from "../InputField";
import { errorReg, passwordReg } from "../../utils/regex";
import Notification from "../notification";

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
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [modalType, setModalType] = useState("");
  const [type, setType] = useState("error");
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const toggleModal = (type) => {
    setIsModal(!isModal);
    setModalType(type);
  };

  const clearStates = () => {
    setState({
      email: "",
      password: "",
    });
    setError({
      email: "",
      password: "",
    });
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setState((props) => ({
      ...props,
      [name]: value,
    }));
    if (name === "email") {
      setError((prev) => ({
        ...prev,
        [name]: !value.trim()
          ? "Email is required"
          : !value.match(errorReg)
          ? "Please enter valid email"
          : "",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: !value.trim()
          ? "Password is required"
          : !value.match(passwordReg)
          ? "Please enter valid password"
          : "",
      }));
    }
  };

  const onError = (message) => {
    setType("error");
    setNotificationMessage(message);
    setIsNotification(true);
  };

  const onSuccess = (message) => {
    setType("success");
    setNotificationMessage(message);
    setIsNotification(true);
  };

  const closeNotification = () => {
    setIsNotification(false);
    setTimeout(() => {
      setType("");
      setNotificationMessage("");
    }, 500);
  };

  const handleSignup = () => {
    const { email, password } = state;
    const storedUsers = JSON.parse(localStorage.getItem("user-data")) || [];
    const existingUser = storedUsers.find((user) => user.email === email);
    if (existingUser) {
      onError("User already exists with this email.");
      return;
    }
    const userToken = Math.random().toString(36).substr(2, 10);
    const newUser = { email, password };
    storedUsers.push(newUser);
    localStorage.setItem("user-data", JSON.stringify(storedUsers));
    setToken(userToken);
    localStorage.setItem("token", userToken);
    onSuccess("Signup successful! You can now login.");
  };

  const handleSignin = () => {
    const { email, password } = state;
    const storedUsers = JSON.parse(localStorage.getItem("user-data")) || [];
    const user = storedUsers.find((user) => user.email === email);
    const userToken = Math.random().toString(36).substr(2, 10);
    if (!user || user.password !== password) {
      onError("User not found or incorrect password.");
      return;
    }
    setToken(userToken);
    localStorage.setItem("token", userToken);
    onSuccess("Login successful! Welcome back!");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !state.email.trim() ||
      !state.password.trim() ||
      !state.email.match(errorReg) ||
      !state.password.match(passwordReg)
    ) {
      setError((prev) => ({
        ...prev,
        email: !state.email.trim()
          ? "Email is required"
          : !state.email.match(errorReg)
          ? "Please enter valid email"
          : "",
        password: !state.password.trim()
          ? "Password is required"
          : !state.password.match(passwordReg)
          ? "Please enter valid password"
          : "",
      }));
      return;
    }
    if (modalType === "SignIn") {
      handleSignin();
    } else {
      handleSignup();
    }
    toggleModal("");
    clearStates();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    onError("User logged out!");
  };
  return (
    <header id="header">
      <Notification
        visible={isNotification}
        message={notificationMessage}
        onCloseVisible={closeNotification}
        type={type}
      />
      <PopupModal
        isVisible={isModal}
        title={modalType}
        onClose={() => {
          toggleModal("");
          clearStates();
        }}
      >
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            name="email"
            value={state.email}
            type="text"
            placeholder="Enter Email"
            onChange={handleOnChange}
            error={error.email}
          />
          <InputField
            label="Password"
            name="password"
            value={state.password}
            type="text"
            placeholder="Enter Password"
            onChange={handleOnChange}
            error={error.password}
          />
          <Button type="submit" btnType="half-width" className="submit">
            {modalType}
          </Button>
        </form>
      </PopupModal>
      <div className="header-content">
        <div className="container">
          <div className="left-section">
            <img alt="" src={Logo} className="site-logo" />
          </div>
          <div className="right-section">
            {token ? (
              <Button onClick={handleLogout}>logout</Button>
            ) : (
              <Fragment>
                <Button onClick={() => toggleModal("SignIn")}>login</Button>
                <Button onClick={() => toggleModal("Sign-Up")}>signup</Button>
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
