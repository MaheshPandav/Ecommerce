import React, { Fragment, useCallback, useMemo, useState } from "react";
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
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const isSignIn = useMemo(() => modalType === "SignIn", [modalType]);

  const toggleDrawer = () => {
    setIsOpenDrawer(!isOpenDrawer);
  };

  const toggleModal = (type) => {
    setIsModal(!isModal);
    setModalType(type);
  };

  const clearStates = () => {
    setState({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    } else if (name === "password") {
      setError((prev) => ({
        ...prev,
        [name]: !value.trim()
          ? "Password is required"
          : !value.match(passwordReg)
          ? "Please enter valid password"
          : "",
      }));
    } else if (name === "confirmPassword") {
      setError((prev) => ({
        ...prev,
        [name]: !value.trim()
          ? "confirmPassword is required"
          : value !== state.password
          ? "Password and confirm password must be the same"
          : "",

      }));
    }else{
      setError((prev) => ({
        ...prev,
        [name]: !value.trim()
          ? "User Name is required"
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
    const { userName, email, password } = state;
    const storedUsers = JSON.parse(localStorage.getItem("user-data")) || [];
    const existingUser = storedUsers.find((user) => user.userName === userName);
    if (existingUser) {
      onError("User already exists with this email.");
      return;
    }
    const userToken = Math.random().toString(36).substr(2, 10);
    const newUser = { userName, email, password };
    storedUsers.push(newUser);
    localStorage.setItem("user-data", JSON.stringify(storedUsers));
    setToken(userToken);
    localStorage.setItem("token", userToken);
    onSuccess("Signup successful! You can now login.");
    window.location.reload()
  };

    const handleSignin = () => {
      const { userName, password } = state;
      const storedUsers = JSON.parse(localStorage.getItem("user-data")) || [];
      const user = storedUsers.find((user) => user.userName === userName);
      const userToken = Math.random().toString(36).substr(2, 10);
      if (!user || user.password !== password) {
        onError("User not found or incorrect password.");
        return;
      }
      setToken(userToken);
      localStorage.setItem("token", userToken);
      onSuccess("Login successful! Welcome back!");
      window.location.reload()
    };

  const isSignupValidateFields = useMemo(
    () =>
      !state.userName?.trim() ||
      !state.email?.trim() ||
      !state.password?.trim() ||
      !state.password !== !state.confirmPassword ||
      !state.confirmPassword?.trim() ||
      !state.email.match(errorReg) ||
      !state.password.match(passwordReg),
    [state.confirmPassword, state.email, state.password, state.userName]
  );

  const isSignInValidateFields = useMemo(
    () =>
      !state.userName?.trim() ||
      !state.password?.trim() ||
      !state.email.match(errorReg) ||
      !state.password.match(passwordReg),
    [state.email, state.password, state.userName]
  );

  const isValidate = useMemo(
    () =>
      modalType === "SignIn"
        ? !isSignInValidateFields
        : !isSignupValidateFields,
    [isSignInValidateFields, isSignupValidateFields, modalType]
  );

  const handleValidation = useCallback(() => {
    const { userName, email, confirmPassword, password } = state;
    if (!isValidate) {
      if (modalType === "SignIn") {
        setError((prev) => ({
          ...prev,
          userName: !userName.trim() ? "User Name is required" : "",
          password: !password.trim()
            ? "Password is required"
            : !password.match(passwordReg)
            ? "Please enter valid password"
            : "",
        }));
      } else {
        setError((prev) => ({
          ...prev,
          userName: !userName.trim() ? "User Name is required" : "",
          email: !email.trim()
            ? "Email is required"
            : !email.match(errorReg)
            ? "Please enter valid email"
            : "",
          password: !password.trim()
            ? "Password is required"
            : !password.match(passwordReg)
            ? "Please enter valid password"
            : "",
          confirmPassword: !confirmPassword.trim()
            ? "Password is required"
            : password !== confirmPassword
            ? "Password and confirm password must be the same"
            : "",
        }));
      }
      return false;
    } else {
      return true;
    }
  }, [isValidate, modalType, state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = handleValidation();
    if (isValid) {
      if (isSignIn) {
        handleSignin();
      } else {
        handleSignup();
      }
      toggleModal("");
      clearStates();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    onError("User logged out!");
    window.location.reload()
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
            label="User Name"
            name="userName"
            value={state.userName}
            type="text"
            placeholder="Enter User Name"
            onChange={handleOnChange}
            error={error.userName}
          />
          {!isSignIn && (
            <InputField
              label="Email"
              name="email"
              value={state.email}
              type="text"
              placeholder="Enter Email"
              onChange={handleOnChange}
              error={error.email}
            />
          )}
          <InputField
            label="Password"
            name="password"
            value={state.password}
            type="text"
            placeholder="Enter Password"
            onChange={handleOnChange}
            error={error.password}
          />
          {!isSignIn && (
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={state.confirmPassword}
              type="text"
              placeholder="Enter Confirm Password"
              onChange={handleOnChange}
              error={error.confirmPassword}
            />
          )}
          <Button type="submit" btnType="half-width" className="submit">
            {modalType}
          </Button>
        </form>
      </PopupModal>
      <div className="header-content">
        <div className="container">
          <div className="left-section">
            <img alt="" src={Logo} className="site-logo" onClick={()=>window.location.reload()} />
          </div>
          <div className="right-section">
            {token ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Fragment>
                <Button onClick={() => toggleModal("SignIn")}>Login</Button>
                <Button onClick={() => toggleModal("Sign-Up")}>Signup</Button>
              </Fragment>
            )}
          </div>
          <MenuIcon onClick={toggleDrawer} />
        </div>
      </div>
    </header>
  );
}

export default Header;
