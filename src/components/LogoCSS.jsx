import React from "react";
import "./logo-css.css";

export default function LogoCSS() {
  return (
    <div className="logo-css-container">
      <div className="logo-car">
        <div className="logo-car-body"></div>
        <div className="logo-car-wheel left"></div>
        <div className="logo-car-wheel right"></div>
      </div>
      <div className="logo-pin">
        <div className="logo-pin-inner">
          <div className="logo-car-icon"></div>
        </div>
      </div>
      <div className="logo-title">
        <span className="logo-bold">CarGas</span>&<span className="logo-blue">Drive</span>
      </div>
    </div>
  );
}
