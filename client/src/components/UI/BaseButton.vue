<template>
  <button
    v-if="!link"
    class="base-btn base-style"
    :class="mode"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
  <router-link
    v-else
    :to="to"
    class="base-style"
  >
    <slot></slot>
  </router-link>
</template>

<script
  lang="ts"
  setup
>
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
  link: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  to: {
    type: String,
    required: false,
    default: "/",
  },
});
</script>

<style
  scoped
  lang="scss"
>
.base-style {
  @apply flex gap-2 capitalize justify-center bg-bg rounded-full py-2 px-4 border-border border text-text2 relative active:scale-90 outline-none font-semibold transition-all duration-200 ease-out;

  &:is(:hover, :focus-visible) {
    @extend .white-btn;
  }

  &:disabled {
    @apply cursor-no-drop brightness-50;
  }

  &.delete-header:disabled {
    @apply hidden;
  }
}

.nav-btn {
  @apply p-2;
}

.white-btn {
  @apply bg-white text-black2 gap-2 transition-shadow duration-300 ease-in-out shadow;
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
  @apply rounded-full size-[30px] p-0 border-none grid place-content-center;

  &:is(:hover, :focus-visible) {
    @apply bg-red-500;
  }
}

.btn-icon {
  all: unset;
  @apply cursor-pointer rounded px-[3px];
}

.full {
  @apply w-full text-white bg-purple-500;
}
</style>
