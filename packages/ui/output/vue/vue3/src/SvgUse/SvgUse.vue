<template>
  <svg
    role="img"
    :aria-label="label"
    :class="_classStringToObject(className)"
    v-bind="rest"
  >
    <use :href="`/images/svg/all.svg#${id}`"></use>
  </svg>
</template>

<script>
export default {
  name: "svg-use",

  props: ["className"],

  methods: {
    _classStringToObject(str) {
      const obj = {};
      if (typeof str !== "string") {
        return obj;
      }
      const classNames = str.trim().split(/\s+/);
      for (const name of classNames) {
        obj[name] = true;
      }
      return obj;
    },
  },
};
</script>