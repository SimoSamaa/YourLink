<template>
  <nav
    v-show="openNavMobile"
    class="bg-white capitalize border-r border-border flex flex-col"
  >
    <div class="nav-head flex gap-2 px-4 py-8 items-center">
      <base-button mode="nav-btn" @click="toggleNave">
        <appIcon name="bar" />
      </base-button>
      <img class="min-w-10" src="../../assets/logo.webp" alt="logo" />
    </div>
    <ul
      class="list-container grid gap-8 pl-4 relative max-[1000px]:divide-x-[1px] divide-border"
    >
      <span
        ref="actLink"
        class="active-link absolute rounded-tl-full rounded-bl-full h-[56px] left-4 bg-bg transition-all duration-300 ease-out"
      ></span>
      <li
        @click="selectPage($event, 0)"
        data-num-selected="0"
        :class="{ act: activeClass === 0 }"
      >
        <router-link to="/admin/links">
          <appIcon name="link" />
          <div>links</div>
        </router-link>
      </li>
      <li
        @click="selectPage($event, 1)"
        data-num-selected="1"
        :class="{ act: activeClass === 1 }"
      >
        <router-link to="/admin/appearance">
          <appIcon name="appearance" />
          <div>appearance</div>
        </router-link>
      </li>
      <li class="hidden max-[1000px]:block">
        <router-link to="/admin/preview">
          <appIcon name="eye" />
          <div>preview</div>
        </router-link>
      </li>
      <li
        @click="selectPage($event, 2)"
        data-num-selected="2"
        :class="{ act: activeClass === 2 }"
      >
        <router-link to="/admin/account">
          <appIcon name="acoount" />
          <div>my account</div>
        </router-link>
      </li>
    </ul>
    <div class="logout-container mt-auto grid p-4">
      <base-button class="logout" @click="logout">
        <appIcon name="logout" />
        <div>logout</div>
      </base-button>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import { ref, onUpdated, PropType } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useMediaQuery from "@/hooks/matchMedia";

const emit = defineEmits(["setToggleNav", "setToggleNavMobile"]);

defineProps({
  openNavMobile: Boolean as PropType<boolean>,
});

const store = useStore();
const router = useRouter();

const actLink = ref<HTMLElement | null>(null);
const navLinks = ref<NodeList>();
const listLinks = ref<NodeList>();
const activeClass = ref<number>(0);

const toggleNave = () => {
  const checkNavMedia = window.matchMedia("(max-width: 1000px)");
  !checkNavMedia.matches ? emit("setToggleNav") : emit("setToggleNavMobile");
};

const selectPage = (e: MouseEvent, num: number) => {
  activeClass.value = num;
  const select = actLink.value;
  if (select && e.currentTarget instanceof HTMLElement) {
    select.style.top = e.currentTarget.offsetTop + "px";
  }
};

// LOGOUT
const logout = () => {
  store.dispatch("auth/logout");
  router.replace("/");
};

onUpdated(() => {
  const links = (navLinks.value = document.querySelectorAll("ul li a"));
  const lists = (listLinks.value =
    document.querySelectorAll(".list-container li"));
  const listContainer = lists[0].closest("ul") as HTMLElement;
  let oldTab = lists[0] as HTMLElement;

  function handleClickNavMobile(event: Event) {
    const newTab = event.currentTarget as HTMLElement;

    if (oldTab !== null && newTab !== oldTab) {
      lineActiveAnimation(oldTab, newTab);
    }

    oldTab = newTab;
  }

  function addListeners() {
    lists.forEach((list: Element) => {
      list.addEventListener("click", handleClickNavMobile);
    });
  }

  function removeListeners() {
    lists.forEach((list: Element) => {
      list.removeEventListener("click", handleClickNavMobile);
    });
  }

  function lineActiveAnimation(oldTab: HTMLElement, newTab: HTMLElement) {
    const newTabPosition = oldTab.compareDocumentPosition(newTab);
    let transitionWidth: number;
    const matchWidth = newTab.offsetWidth / listContainer.offsetWidth;

    if (newTabPosition === 4) {
      transitionWidth =
        newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
    } else {
      transitionWidth =
        oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;
      listContainer.style.setProperty("--left", newTab.offsetLeft + "px");
    }

    listContainer.style.setProperty(
      "--width",
      (transitionWidth / listContainer.offsetWidth).toString()
    );

    setTimeout(() => {
      listContainer.style.setProperty("--left", newTab.offsetLeft + "px");
      listContainer.style.setProperty("--width", matchWidth.toString());
    }, 220);
  }

  useMediaQuery(
    () => {
      addListeners();
    },
    () => {
      removeListeners();
    }
  );

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

  .logout {
    padding-inline: 0;
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
      @apply z-20 relative;

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

      @include breakpoint("md") {
        display: none;
      }
    }

    .act {
      color: var(--clr-textSecondary);
      transition: color 300ms ease-out;
    }
  }

  @include breakpoint("md") {
    @apply fixed left-0 bottom-0 w-full border-t-[1px]
    border-border shadow-xl z-30;
    :is(.nav-head, .active-link, .logout-container) {
      @apply hidden;
    }

    ul {
      @apply flex p-0 gap-0;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 4px;
        scale: var(--width, 0.25) 1;
        translate: var(--left, 0) 0;
        transform-origin: left;
        background-color: var(--clr-textPrimary);
        transition: scale 200ms, translate 200ms;
        z-index: 40;
      }

      li {
        width: calc(100% / 4);

        a {
          justify-content: center;
        }
      }
    }
  }

  @include breakpoint("sm") {
    ul li a div {
      @apply hidden;
    }
  }
}
</style>
