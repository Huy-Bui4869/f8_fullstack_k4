import React, { Fragment } from "react";
import "./Loading.scss";

export default function Loading() {
  return (
    <Fragment>
      <div className="overlay">
        <div className="loader"></div>
        <div className="loaderSmall"></div>
        <div className="loaderBig"></div>
      </div>
    </Fragment>
  );
}
