<template>
  <button
    class="disabled:hidden base-btn flex gap-4 capitalize justify-center bg-bg rounded-full py-2 px-4 border-border border text-text2 relative active:scale-90 outline-none"
    :class="mode"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { PropType } from "vue";

defineProps({
  mode: {
    type: String as PropType<string>,
    required: false,
    default: "",
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
});
</script>

<style scoped lang="scss">
button {
  &:is(:hover, :focus-visible) {
    @extend .white-btn;
  }
}
.nav-btn {
  @apply p-2;
}
.white-btn {
  @apply bg-white text-black2 gap-2 transition-shadow
  duration-300 ease-in-out shadow;
  transition-property: color;
  transition-property: background-color;

  &:is(:hover, :focus-visible) {
    @apply text-white bg-purple-500 shadow-none;
  }

  &.err:is(:hover, :focus-visible) {
    @apply bg-red-500;
  }
}

.close {
  @apply rounded-full size-[30px] p-0 border-none
  grid place-content-center;

  &:is(:hover, :focus-visible) {
    @apply bg-red-500;
  }
}

.btn-icon {
  all: unset;
  @apply cursor-pointer rounded px-[3px];
}
</style>
