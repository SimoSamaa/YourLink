<template>
  <section class="phone-containe border-l-[1px] border-border p-4 flex justify-center max-[1000px]:p-0">
    <div
      :class="[ 'phone pt-10 px-4 fixed top-1/2 -translate-y-1/2 rounded-3xl border-black2 border-8', theme.page || 'bg-base' ]"
      :style="{ background: theme.bgClr }"
    >

      <div
        v-if="isLoading"
        class="inset-0 absolute grid place-content-center rounded-2xl bg-white"
      >
        <LoadingSpinner />
      </div>
      <div>
        <div class="h-[400px] overflow-auto overflow-x-hidden">
          <!-- USER INFO -->
          <div class="mb-4">
            <div
              :class="[ 'mx-auto size-20 rounded-full overflow-hidden bg-black2 grid place-content-center', theme.bgImg || 'text-white' ]"
            >
              <img
                v-if="user.userImg"
                class="size-20 object-cover object-center"
                :src="user.userImg"
                alt="user-img"
              />
              <p
                v-else
                class="font-semibold text-3xl"
              >
                {{ (user.username as string)?.charAt(0) }}
              </p>
            </div>
            <h3 class="text-center my-2">{{ user.username }}</h3>
            <p
              class="text-center text-sm"
              style="word-wrap: break-word;"
            >{{ user.bio }}</p>
          </div>
          <!-- HEADERS -->
          <ul class="space-y-1 text-center font-semibold mb-2">
            <li
              v-for="header in headers"
              :key="header.id"
            >
              {{ header.title }}
            </li>
          </ul>
          <!-- LINKS -->
          <ul class="links">
            <li
              class="simo duration-150 transition-transform hover:scale-105 hover:rounded-none ease-out scale-[.95]"
              :class="[ link.layout, theme.link || 'bg-white' ]"
              :style="linkStyle(theme)"
              v-for="link in links"
              :key="link.id"
            >
              <a
                :href="link.link"
                target="_blank"
                class="py-2 px-4"
                tabindex="-1"
              >
                <div>
                  <box-icon
                    v-if="!link.icon.includes('icons/')"
                    type="logo"
                    :name="link.icon"
                  ></box-icon>
                  <img
                    v-else
                    :src="APP_URL + link.icon"
                    alt="link-icon"
                    class="w-6 h-6 rounded-full object-cover object-center"
                  >
                </div>
                <div class="text-sm">{{ link.title }}</div>
                <div>
                  <appIcon
                    name="more"
                    size="20px"
                  />
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <img
        src="@/assets/logo.webp"
        :class="[ 'w-[100px] absolute bottom-4 left-1/2 -translate-x-1/2', theme.logo ]"
        alt="logo"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { HeaderLinks } from "@/types/interfacesHeader";
import { Link } from "@/types/interfacesLink";
import { User } from "@/types/interfacesAuth";
import { Theme } from "@/types/interfacesTheme";
import { linkTheme } from '@/hooks/helpers';

const store = useStore();
const linkStyle = linkTheme();

const APP_URL = ref(process.env.VUE_APP_URL);

defineProps<{ isLoading: boolean }>();

const headers = computed<HeaderLinks[]>(() =>
  store.getters[ "links/headers" ]
    .filter((header: HeaderLinks) => header.isDisable !== false) //
    .sort((a: HeaderLinks, b: HeaderLinks) => a.dataIndex + b.dataIndex)
);

const links = computed<Link[]>(() =>
  store.getters[ "links/links" ]
    .filter((link: Link) => link.isDisable !== false)
    .sort((a: Link, b: Link) => a.dataIndex + b.dataIndex)
);

const user = computed<User>(() => store.getters[ "user/user" ]);
const theme = computed<Theme>(() => store.getters[ 'theme/theme' ]);
</script>

<style scoped lang="scss">
.phone-containe {
  .phone {
    width: 250px;
    height: min(500px, 90%);

    &:before {
      @apply content-[''] absolute left-1/2 -top-1 -translate-x-1/2 bg-black2 w-32 h-5 rounded-bl-lg rounded-br-lg z-20;
    }
  }
}
</style>
