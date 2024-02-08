<template>
  <section
    class="admin-body overflow-hidden grid relative"
    :class="{ 'close-nav': closeClass }"
  >
    <header
      class="py-2 px-4 bg-white border-border border hidden max-[1000px]:block"
    >
      <div class="flex gap-2 items-center">
        <base-button mode="nav-btn" @click="handledToggleNavMobile">
          <appIcon name="bar"
        /></base-button>
        <img class="max-w-[120px]" src="../../assets/logo.png" alt="llogo" />
      </div>
    </header>
    <transition name="test">
      <NavigationAdmin
        :openNavMobile="openNavMobile"
        @set-toggle-nav="handledToggleNav"
        @set-toggle-nav-mobile="handledToggleNavMobile"
      />
    </transition>
    <!-- backdrop -->
    <transition name="test2">
      <div
        v-if="openNavMobile"
        @click="handledToggleNavMobile"
        class="backdrop hidden absolute inset-0 bg-black bg-opacity-50"
      ></div>
    </transition>
    <main class="p-4 grid">
      <router-view></router-view>
      <section class="zaba">PHONE SECTION</section>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import NavigationAdmin from "../../components/layouts/NavigationAdmin.vue";

const closeClass = ref<boolean>(true);
const openNavMobile = ref<boolean>(false);

const handledToggleNav = () => {
  closeClass.value = !closeClass.value;
  localStorage.setItem("nav-status", JSON.stringify(closeClass.value));
};

const handledToggleNavMobile = () =>
  (openNavMobile.value = !openNavMobile.value);

onMounted(() => {
  const storedValue = localStorage.getItem("nav-status");
  if (storedValue !== null) closeClass.value = JSON.parse(storedValue);

  const checkNavMedia = window.matchMedia("(max-width: 1000px)");

  function loadNavMedia(ev: MediaQueryListEvent) {
    const e = ev.currentTarget as MediaQueryList;
    if (e.matches) {
      closeClass.value = false;
      openNavMobile.value = false;
      localStorage.setItem("nav-status", JSON.stringify(closeClass.value));
    } else {
      openNavMobile.value = true;
      // localStorage.setItem("nav-status", "true");
    }
  }

  loadNavMedia(
    Object.create(null, {
      currentTarget: {
        value: checkNavMedia,
      },
    })
  );
  checkNavMedia.addListener(loadNavMedia);
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

    // overflow-y: scroll;
    .zaba {
      // background: red;
    }
  }

  @include breakpoint("md") {
    display: block;
    --nav-size: 0;

    .backdrop {
      display: block;
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
