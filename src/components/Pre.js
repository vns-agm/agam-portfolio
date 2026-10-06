import React from "react";
function Pre(props) {
  return (
    <div
      id="preloader"
      className={props.load ? "" : "preloader-hidden"}
      aria-hidden={!props.load}
    ></div>
  );
}

export default Pre;
