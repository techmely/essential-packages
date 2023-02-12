<script>
  export let className;
</script>

<svg role="img" aria-label={label} {...rest} class={className}>
  <use href={`/images/svg/all.svg#${id}`} />
</svg>