<script>
  export let message;

  let name = "Foo";
</script>

<div>
  {message || "Hello"}
  {name}! I can run in React, Vue, Solid or Svelte!
</div>