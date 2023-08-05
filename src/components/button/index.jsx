import React from "react";
import style from "./button.module.scss";

const Button = (props) => {
  const { onClick, children } = props;
  return (
    <div class={style["button-borders"]}>
      <button className={style["primary-button"]} onClick={onClick} {...props}>
        {children}
      </button>
    </div>
  );
};

export default Button;
