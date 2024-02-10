<template>
  <button
    class="flex gap-4 capitalize justify-center bg-bg rounded-full py-2 px-4 border-border border text-text2 active:scale-90"
    :class="mode"
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
});
</script>

<style scoped lang="scss">
.nav-btn {
  @apply p-2;
}

.white-btn {
  @apply bg-white text-black2 gap-2 transition-shadow
  duration-300 ease-in-out shadow;
  transition-property: color;
  transition-property: background-color;

  &:hover {
    @apply text-white bg-purple-400 shadow-none;
  }

  &.add:hover {
    @apply bg-sky-500;
  }
}
</style>
