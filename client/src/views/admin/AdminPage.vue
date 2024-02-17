<template>
  <section
    class="admin-body overflow-hidden grid relative"
    :class="{ 'close-nav': closeClass }"
  >
    <!-- <header class="py-2 px-4 bg-white border-border border hidden">
      <div class="flex gap-2 items-center">
        <base-button mode="nav-btn" @click="handledToggleNavMobile">
          <appIcon name="bar"
        /></base-button>
        <img class="max-w-[120px]" src="../../assets/logo.png" alt="llogo" />
      </div>
    </header> -->
    <NavigationAdmin
      :openNavMobile="openNavMobile"
      @set-toggle-nav="handledToggleNav"
    />
    <!-- <transition name="test">
      <NavigationAdmin
        :openNavMobile="openNavMobile"
        @set-toggle-nav="handledToggleNav"
        @set-toggle-nav-mobile="handledToggleNavMobile"
      />
    </transition> -->
    <!-- backdrop -->
    <!-- <transition name="test2">
      <div
        v-if="openNavMobile"
        @click="handledToggleNavMobile"
        class="backdrop hidden absolute inset-0 bg-black bg-opacity-50"
      ></div>
    </transition> -->
    <main class="py-5 pl-5 grid overflow-auto">
      <!-- ADMIN PAGES -->
      <router-view></router-view>
      <!-- PHONE RESULT -->
      <PhonePreview class="max-[1000px]:hidden" />
    </main>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import useMediaQuery from "../../hooks/matchMedia";
import NavigationAdmin from "../../components/layouts/NavigationAdmin.vue";
import PhonePreview from "../../components/admin/PhonePreview.vue";

const closeClass = ref<boolean>(true);
const openNavMobile = ref<boolean>(false);

const handledToggleNav = () => {
  closeClass.value = !closeClass.value;
  localStorage.setItem("nav-status", JSON.stringify(closeClass.value));
};

// const handledToggleNavMobile = () =>
//   (openNavMobile.value = !openNavMobile.value);

onMounted(() => {
  const storedValue = localStorage.getItem("nav-status");
  if (storedValue !== null) closeClass.value = JSON.parse(storedValue);

  useMediaQuery(
    () => {
      closeClass.value = false;
      openNavMobile.value = true;
      // localStorage.setItem("nav-status", JSON.stringify(closeClass.value));
    },
    () => {
      openNavMobile.value = true;
      if (localStorage.getItem("nav-status") === "true") {
        closeClass.value = true;
      }
    }
  );
});
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

.admin-body {
  --nav-size: 13rem;
  height: 100dvh;
  grid-template-columns: var(--nav-size) 1fr;
  transition: grid-template-columns 300ms ease-out;

  &.close-nav {
    --nav-size: 5rem;
  }

  main {
    grid-template-columns: 2fr 1fr;
    min-height: 100dvh;

    @include breakpoint("md") {
      @apply block overflow-y-hidden p-5 pb-[76px];
    }
  }

  @include breakpoint("md") {
    @apply block overflow-auto;
    --nav-size: 0;

    header {
      @apply block sticky top-0;
    }
    .backdrop {
      @apply block;
    }

    // animation
    @include setAnimation(
      "test",
      (
        transform: translateY(-470px),
        opacity: 0.5,
      ),
      (
        opacity: 1,
        transform: translateY(0),
      ),
      null
    );
    @include setAnimation("test2", null, null, "opacity");
  }
}
</style>
