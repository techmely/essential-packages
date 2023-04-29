<template>
  <div>
    {{ message || "Hello" }} {{ name }}! I can run in React, Vue, Solid or
    Svelte!
  </div>
</template>

<script>
export default {
  name: "button",

  props: ["message"],

  data() {
    return { name: "Foo" };
  },
};
</script>