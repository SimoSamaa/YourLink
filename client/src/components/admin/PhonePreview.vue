<template>
  <section
    class="phone-containe border-l-[1px] border-border p-4 flex justify-center max-[1000px]:p-0"
  >
    <div
      ref="zaba"
      class="phone pt-10 px-4 bg-white fixed top-1/2 -translate-y-1/2 rounded-3xl border-black2 border-8"
    >
      <!-- HEADERS -->
      <ul class="space-y-4 text-center font-semibold">
        <li v-for="header in sortedHeaders" :key="header.id">
          {{ header.title }}
        </li>
      </ul>
      <!-- LINKS -->
      <ul class="links grid gap-4">
        <li
          class="bg-red-500 rounded-full duration-150 transition-transform ease hover:scale-105"
          v-for="link in links"
          :key="link.id"
        >
          <a
            :href="link.link"
            target="_blank"
            class="flex items-center justify-between py-2 px-4"
          >
            <div v-html="link.icon"></div>
            <div class="text-sm">{{ link.title }}</div>
            <appIcon name="more" size="20px" />
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { HeaderLinks } from "@/types/interfacesHeader";

const store = useStore();

const zaba = ref<HTMLElement | null>(null);

const headers = computed<HeaderLinks[]>(() => store.getters["links/headers"]);

// Filter out headers with empty title
const sortedHeaders = computed<HeaderLinks[]>(() =>
  headers.value
    .filter((header: HeaderLinks) => header.isDisable !== false) //
    .sort((a: HeaderLinks, b: HeaderLinks) => a.dataIndex + b.dataIndex)
);

// LINKS
const links = computed<any>(() =>
  store.getters["links/links"].filter((link: any) => link.isDisable !== false)
);

onMounted(() => {
  window.addEventListener("resize", function () {
    const height = zaba.value.offsetHeight;
    const width = zaba.value.offsetWidth;

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
.phone-containe {
  .phone {
    width: 250px;
    height: min(500px, 90%);

    &:before {
      @apply content-[''] absolute left-1/2 -top-1
          -translate-x-1/2 bg-black2 w-32 h-5 rounded-bl-lg rounded-br-lg;
    }
  }
}
</style>
