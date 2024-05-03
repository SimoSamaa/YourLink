<template>
  <section
    v-if="profileInfo"
    :class="[ 'pt-8 pb-[48.18px] px-4 mx-auto h-screen', theme.page || 'bg-base' ]"
    :style="{ background: theme.bgClr }"
  >
    <div class="p-4 w-full fixed bottom-0 left-0">
      <img
        src="@/assets/logo.webp"
        alt="logo"
        :class="[ 'w-24 mx-auto', theme.logo ]"
      >
    </div>
    <!-- PLACE HOLDER LOADING -->
    <div
      v-if="isLoading"
      class="text-center mb-8 grid place-items-center"
    >
      <PlaceholderLoading class="size-[150px]" />
      <PlaceholderLoading class="mt-4 w-32 h-8" />
      <div class="max-w-[350px] w-[90%] mt-2 space-y-2">
        <PlaceholderLoading class="w-full h-4" />
        <PlaceholderLoading class="w-2/3 mx-auto h-4" />
      </div>
    </div>
    <!-- END -->
    <div
      v-else
      class="text-center mb-8 grid place-items-center"
    >
      <div
        :class="[ !profileInfo.userImg ? 'bg-black2' : 'bg-transparent', theme.bgImg || 'text-white' ]"
        class="border-border border-2 rounded-full text-white overflow-hidden grid place-content-center size-[150px]"
      >
        <img
          v-if="profileInfo.userImg"
          class="size-[150px] object-cover object-center"
          :src="APP_URL + profileInfo.userImg"
          alt="user-img"
        />
        <p
          v-else
          class="font-semibold text-3xl"
        >
          {{ (profileInfo.username as string)?.charAt(0).toUpperCase() }}
        </p>
      </div>
      <h1 class="mt-4">{{ profileInfo.username }}</h1>
      <div
        class="max-w-sm mt-2"
        style="word-wrap: break-word;"
      >{{ profileInfo.bio }}</div>
    </div>
    <ul class="space-y-1 text-center font-semibold mb-2">
      <li
        v-for=" header in profileHeaders "
        :key="header.id"
        class="text-lg"
      >
        {{ header.title }}
      </li>
    </ul>
    <!--  -->
    <ul
      v-if="isLoading"
      class="max-w-[580px] w-[calc(100%-1rem)] mx-auto grid gap-4"
    >
      <PlaceholderLoading
        class="h-[56px]"
        v-for="index in 3"
      />
    </ul>
    <ul
      v-else
      class="links max-w-[580px] w-[calc(100%-1rem)] mx-auto"
    >
      <li
        class="duration-150 transition-transform hover:scale-105 ease-out"
        :class="[ link.layout, link.layout === 'classic' ? 'h-[56px]' : 'aspect-[2/1]', theme.link || 'bg-white' ]"
        v-for=" link in profileLinks "
        :key="link.id"
        :style="[
          theme.link?.startsWith('link') ? '' :
            {
              backgroundColor: theme.link?.endsWith('line') ? '' : theme.linkClr,
              border: `1px solid ${theme.link?.endsWith('hard') ? theme.shadowlinkClr : theme.linkClr}`,
              color: theme.fontLinkClr,
              boxShadow:
                theme.link?.endsWith('hard') ? '4px 4px 0 0 ' + theme.shadowlinkClr : theme.link?.endsWith('soft') ? '0 4px 4px 0 ' + theme.shadowlinkClr : '',
            }
        ]"
      >
        <a
          :href="link.link"
          target="_blank"
          class="py-4 px-5 h-full"
          :class="{ 'flex items-center': link.layout === 'classic' }"
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
          <div class="pos-end font-semibold">{{ link.title }}</div>
          <div class="pos-end">
            <div
              class="rounded-full size-8 grid place-content-center duration-300 ease-out hover:backdrop-contrast-[.8]"
            >
              <appIcon
                name="more"
                size="20px"
              />
            </div>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Theme } from '@/types/interfacesTheme';

const store = useStore();
const router = useRouter();

const props = defineProps({
  username: String as PropType<string>,
});

const isLoading = ref(false);
const APP_URL = ref(process.env.VUE_APP_URL);

const profileInfo = computed(() => store.getters[ "user/profileInfo" ]);
const profileLinks = computed(() => store.getters[ "user/profileLinks" ]);
const profileHeaders = computed(() => store.getters[ "user/profileHeaders" ]);
const theme = computed<Theme>(() => store.getters[ 'user/theme' ]);

const fetchUserProfile = async (username: string | undefined) => {
  isLoading.value = true;
  try {
    await store.dispatch("user/fetchUserProfile", username);
  } catch (err) {
    console.error((err as Error).message);
    router.push({ name: 'home' })
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchUserProfile(props.username));
</script>

<style scoped lang="scss">
.featured {
  .pos-end {
    @apply flex items-end
  }
}
</style>
