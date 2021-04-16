import React from "react";

const Like = (props) => {
  let classes = "fa fa-heart";
  if (!props.liked) classes += "-o";
  return (
    <React.Fragment>
      <i
        className={classes}
        aria-hidden="true"
        onClick={props.handleLike}
        style={{ cursor: "pointer" }}
      ></i>
    </React.Fragment>
  );
};

export default Like;
