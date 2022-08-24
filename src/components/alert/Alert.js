import React, { useEffect } from "react";
import "./Alert.css";
import { FaExclamation, FaTimes } from "react-icons/fa";

const Alert = ({ alertContent, alertClass, onCloseAlert }) => {
  useEffect(() => {
    const int = setTimeout(() => {
      onCloseAlert();
    }, 3000);
    return () => {
      clearTimeout(int);
    };
  });
  return (
    <div className={`alert ${alertClass}`}>
      <FaExclamation size={16} className="icon-x" />
      <span className="msg">{alertContent}</span>
      <div className="close-btn" onClick={onCloseAlert}>
        <FaTimes size={19} className="icon-x"></FaTimes>
      </div>
    </div>
  );
};

export default Alert;
