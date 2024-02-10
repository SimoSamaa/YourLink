<template>
  <section
    class="admin-body overflow-hidden max-[1000px]:overflow-auto grid relative"
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
    <main class="py-5 pl-5 grid overflow-auto max-[1000px]:overflow-y-hidden">
      <!-- ADMIN PAGES -->
      <router-view></router-view>
      <!-- PHONE RESULT -->
      <section
        class="phone-containe border-l-[1px] border-border p-4 flex justify-center"
      >
        <div
          ref="zaba"
          class="phone fixed top-1/2 -translate-y-1/2 rounded-3xl border-black2 border-8"
        ></div>
      </section>
    </main>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import NavigationAdmin from "../../components/layouts/NavigationAdmin.vue";

const closeClass = ref<boolean>(true);
const openNavMobile = ref<boolean>(false);
const zaba = ref();

const handledToggleNav = () => {
  closeClass.value = !closeClass.value;
  localStorage.setItem("nav-status", JSON.stringify(closeClass.value));
};

// const handledToggleNavMobile = () =>
//   (openNavMobile.value = !openNavMobile.value);

onMounted(() => {
  const storedValue = localStorage.getItem("nav-status");
  if (storedValue !== null) closeClass.value = JSON.parse(storedValue);

  const checkNavMedia = window.matchMedia("(max-width: 1000px)");

  function loadNavMedia(ev: MediaQueryListEvent) {
    const e = ev.currentTarget as MediaQueryList;
    if (e.matches) {
      closeClass.value = false;
      openNavMobile.value = true;
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

  window.addEventListener("resize", function () {
    var height = zaba.value.offsetHeight;
    var width = zaba.value.offsetWidth;

    if (height < width) {
      // zaba.value.style.width = height + "px";
      // zaba.value.style.width = height - 100 + "px";
    } else {
      zaba.value.style.width = height / 2 + "px";
    }
  });
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
    .phone-containe {
      .phone {
        background-color: white;
        width: 250px;
        height: min(500px, 90%);

        &:before {
          @apply content-[''] absolute left-1/2 -top-1
          -translate-x-1/2 bg-black2 w-32 h-5 rounded-bl-lg rounded-br-lg;
        }
      }
    }
  }

  @include breakpoint("md") {
    display: block;
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
