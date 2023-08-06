import React from "react";
import style from "./loader.module.scss";

function LoadingType(type, color) {
  switch (type) {
    case "spinner":
      return (
        <svg
          version="1.1"
          id="L4"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="40px"
          height="19px"
          viewBox="0 25 50 50"
          style={{ enableBackground: "new 0 0 0 0" }}
        >
          <circle fill={color} stroke="none" cx="6" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle fill={color} stroke="none" cx="26" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle fill={color} stroke="none" cx="46" cy="50" r="6">
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      );
    case "circle":
    default:
      return (
        <svg
          version="1.1"
          id="loader-1"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="32px"
          height="32px"
          viewBox="0 0 50 50"
          style={{ enableBackground: "new 0 0 50 50" }}
          xmlSpace="preserve"
        >
          <path
            fill={color}
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      );
  }
}

function Loading({ color, type }) {
  return <div className={style["loader-icon"]}>{LoadingType(type, color)}</div>;
}

export default Loading;
