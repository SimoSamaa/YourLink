<template>
  <nav
    v-show="openNavMobile"
    class="bg-white capitalize border-r border-border flex flex-col z-20"
  >
    <div class="nav-head flex gap-2 px-4 py-8 items-center">
      <base-button
        mode="nav-btn"
        @click="toggleNave"
        @mouseover="hoverIn"
        @mouseleave="hoverOut"
      >
        <appIcon name="bar" />
      </base-button>
      <img class="min-w-10" src="../../assets/logo.png" alt="app-logo" />
    </div>
    <ul class="grid gap-8 pl-4 relative">
      <span
        ref="actLink"
        class="active-link bg-bg absolute rounded-tl-full rounded-bl-full h-[56px] left-4 bg-bg transition-all duration-300 ease-out"
      ></span>
      <li
        @click="selectPage($event, 0)"
        data-num-selected="0"
        :class="{ act: activeClass === 0 }"
      >
        <router-link to="/yourLink/admin/links">
          <appIcon name="link" />
          <div>links</div>
        </router-link>
      </li>
      <li
        @click="selectPage($event, 1)"
        data-num-selected="1"
        :class="{ act: activeClass === 1 }"
      >
        <router-link to="/yourLink/admin/appearance">
          <appIcon name="appearance" />
          <div>appearance</div>
        </router-link>
      </li>
      <li
        @click="selectPage($event, 2)"
        data-num-selected="2"
        :class="{ act: activeClass === 2 }"
      >
        <router-link to="/yourLink/admin/account">
          <appIcon name="acoount" />
          <div>my account</div>
        </router-link>
      </li>
    </ul>
    <div class="mt-auto grid p-4">
      <base-button class="logout">
        <appIcon name="logout" />
        <div>signout</div>
      </base-button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onUpdated, PropType } from "vue";

const emit = defineEmits([
  "setToggleNav",
  "setHoverOut",
  "setHoverIn",
  "setToggleNavMobile",
]);

defineProps({
  openNavMobile: Boolean as PropType<boolean>,
});

const actLink = ref<HTMLElement | null>(null);
const navLinks = ref<NodeList>();
const activeClass = ref<number>(0);

const toggleNave = () => {
  const checkNavMedia = window.matchMedia("(max-width: 1000px)");
  !checkNavMedia.matches ? emit("setToggleNav") : emit("setToggleNavMobile");
};

const hoverOut = () => emit("setHoverOut");
const hoverIn = () => emit("setHoverIn");

const selectPage = (e: MouseEvent, num: number) => {
  activeClass.value = num;
  const select = actLink.value;
  if (select && e.currentTarget instanceof HTMLElement) {
    select.style.top = e.currentTarget.offsetTop + "px";
  }
};

onUpdated(() => {
  const links = (navLinks.value = document.querySelectorAll("ul li a"));

  links.forEach((link: Element) => {
    const list = link.closest("li") as HTMLElement;

    if (list && link.classList.contains("router-link-active")) {
      list.classList.add("act");

      if (list.dataset.numSelected === undefined) return;
      activeClass.value = parseInt(list.dataset.numSelected);

      const select = actLink.value;
      if (select && list instanceof HTMLElement) {
        select.style.top = list.offsetTop + "px";
      }
    } else {
      list.classList.remove("act");
    }
  });
});
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

.close-nav nav {
  .nav-head img,
  ul :is(li div, li a div) {
    @apply scale-0;
  }

  li a {
    width: fit-content;
  }

  li a div {
    animation: links 300ms ease-out forwards;
  }

  @keyframes links {
    to {
      display: none;
    }
  }

  .logout div {
    display: none;
  }
}

nav {
  ul {
    .active-link {
      width: calc(100% - 1rem);
      border-block: 2px solid var(--clr-border);

      &::before,
      &::after {
        --radius-size: 1rem;

        content: "";
        position: absolute;
        right: 0;
        width: var(--radius-size);
        aspect-ratio: 1;
        border-radius: 50%;
      }

      &::before {
        top: calc(var(--radius-size) * -1);
        border-radius: 0 0 100vw 0;
        box-shadow: 10px 10px 0 10px var(--clr-bg);
        border-bottom: 2px solid var(--clr-border);
      }

      &::after {
        bottom: calc(var(--radius-size) * -1);
        border-radius: 0 100vw 0 0;
        box-shadow: 10px -10px 0 10px var(--clr-bg);
        border-top: 2px solid var(--clr-border);
      }
    }

    li {
      @apply z-10 relative;

      a {
        @apply p-4 flex gap-4 whitespace-nowrap;

        div {
          @apply origin-left duration-300 ease-out transition-transform;
        }
      }
    }

    .act::before {
      content: "";
      position: absolute;
      right: -2px;
      top: 0;
      background: var(--clr-bg);
      width: 5px;
      height: 100%;
    }

    .act {
      color: var(--clr-textSecondary);
      transition: color 300ms ease-out;
    }
  }

  @include breakpoint("md") {
    @apply absolute left-0 top-0;
  }
}
</style>
