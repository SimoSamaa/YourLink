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
          class="bg-[#ddd] duration-150 transition-transform hover:scale-105 ease-out"
          :class="link.layout"
          v-for="link in links"
          :key="link.id"
        >
          <a :href="link.link" target="_blank" class="py-2 px-4">
            <div>
              <box-icon type="logo" :name="link.icon"></box-icon>
            </div>
            <div class="text-sm">{{ link.title }}</div>
            <div><appIcon name="more" size="20px" /></div>
          </a>
        </li>
      </ul>
      <img
        src="../../assets/logo.png"
        class="w-[100px] absolute bottom-4 left-1/2 -translate-x-1/2"
        alt="logo"
      />
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
  store.getters["links/links"]
    .filter((link: any) => link.isDisable !== false)
    .sort((a: HeaderLinks, b: HeaderLinks) => a.dataIndex + b.dataIndex)
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

    // CLASSSIC LAYOUT (DEFAULT)
    .classic {
      @apply rounded-full;
      a {
        @apply flex justify-between;
        div:nth-child(1) {
          @apply grid place-content-center;
        }
      }
    }
    // FEATURED LAYOUT
    .featured {
      @apply rounded-lg;
      a {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(3, 1fr);

        div:nth-child(1) {
          grid-column: span 3;
          grid-row: span 2;
          // display: block;
        }

        div:nth-child(2) {
          grid-column: span 2;
        }

        div:nth-child(3) {
          margin-left: auto;
        }
      }
    }
  }
}
</style>
