import * as React from "react";

export default function SvgUse(props) {
  return (
    <svg role="img" aria-label={label} {...rest} className={props.className}>
      <use href={`/images/svg/all.svg#${id}`} />
    </svg>
  );
}
