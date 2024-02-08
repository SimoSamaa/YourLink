<template>
  <button
    class="flex gap-4 capitalize justify-center bg-bg rounded-full py-2 border-border border text-text2 active:scale-90"
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
</style>
