<template>
  <div id="title-hover">{{ title }}</div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
    default: "title",
  },
});
</script>

<style lang="scss">
$hover-classes: ("links-actions li", "base-btn");
@each $class in $hover-classes {
  #title-hover {
    @apply absolute -bottom-9 left-1/2 -translate-x-1/2
      rounded capitalize text-sm text-white bg-black2 px-2 py-1;
    transform: translate(-50%, -10px) scale(0.1);
    opacity: 0;
    transition: transform 300ms ease, opacity 300ms ease-out;

    &::after {
      @apply content-[''] absolute -top-3 left-1/2 -translate-x-1/2
      border-transparent border-b-black2 border-[7px];
    }
  }

  .#{$class}:hover #title-hover:not(:hover) {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}
</style>
