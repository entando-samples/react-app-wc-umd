import React from "react";

export default function Root(props) {
  let name = props.name;
  return <span>{name} is mounted via WC with UMD!</span>;
}
