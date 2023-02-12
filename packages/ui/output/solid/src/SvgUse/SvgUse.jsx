function SvgUse(props) {
  return (
    <svg class={props.className} role="img" aria-label={label} {...rest}>
      <use href={`/images/svg/all.svg#${id}`}></use>
    </svg>
  );
}

export default SvgUse;
