import React, { useEffect } from "react";
import "./notification.scss";

const Notification = ({ visible, message, onCloseVisible, type }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseVisible();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onCloseVisible, visible]);

  return (
    <div className={`notification ${visible && "visible"} ${type}`}>
      {message}
    </div>
  );
};

export default Notification;
