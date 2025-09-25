import React from "react";
import "./Preloader.css";

export default function Preloader({ text = "Searching for news..." }) {
  return (
    <div className="preloader" role="status" aria-live="polite">
      <div className="circle-preloader" />
      <p className="preloader__text">{text}</p>
    </div>
  );
}
