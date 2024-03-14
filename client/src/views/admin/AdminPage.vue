<template>
  <section
    class="admin-body overflow-hidden grid relative"
    :class="{ 'close-nav': closeClass }"
  >
    <NavigationAdmin
      :openNavMobile="openNavMobile"
      @set-toggle-nav="handledToggleNav"
    />
    <main class="py-5 pl-5 grid overflow-auto">
      <!-- ADMIN PAGES -->
      <router-view :isLoading></router-view>
      <!-- PHONE RESULT -->
      <PhonePreview class="max-[1000px]:hidden" />
    </main>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import useMediaQuery from "@/hooks/matchMedia";
import NavigationAdmin from "@/components/layouts/NavigationAdmin.vue";
import PhonePreview from "@/components/admin/PhonePreview.vue";

const store = useStore();

const closeClass = ref<boolean>(true);
const openNavMobile = ref<boolean>(false);
const isLoading = ref<boolean>(false);

const handledToggleNav = () => {
  closeClass.value = !closeClass.value;
  localStorage.setItem("nav-status", JSON.stringify(closeClass.value));
};

const loadHeaders = async () => {
  isLoading.value = true;
  try {
    await store.dispatch("links/featchHeaders");
    await store.dispatch("links/fetchLinks");
  } catch (err) {
    (err as Error).message;
  } finally {
    isLoading.value = false;
  }
};

loadHeaders();

onMounted(() => {
  const storedValue = localStorage.getItem("nav-status");
  if (storedValue !== null) closeClass.value = JSON.parse(storedValue);

  useMediaQuery(
    () => {
      closeClass.value = false;
      openNavMobile.value = true;
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
  }
}
</style>
