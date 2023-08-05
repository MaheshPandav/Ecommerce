import React from "react";
import "./button.scss";

const Button = (props) => {
  const { onClick, className, children, type } = props;
  return (
    <div
      className={`${"button-borders"} ${props.btnType} ${className}`}
      style={props?.style}
    >
      <button
        className={`${"primary-button"} ${props.btnType}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
