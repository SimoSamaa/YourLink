<template>
  <ProfileSocialmedia
    :toggleShareLink
    :linkId
    :name=profileInfo.username
    @set-closeShareLink="closeShareLink()"
  />
  <base-modal
    :showing="alert"
    mess="Link copied to clipboard!"
    statuse="border-l-green-400"
    @set-close-modal="closeModal()"
  ></base-modal>
  <section
    v-if="profileInfo"
    :class="[ 'pt-8 pb-[48.18px] px-4 mx-auto min-h-screen', theme.page || 'bg-base' ]"
    :style="{ background: theme.bgClr }"
  >
    <div
      v-if="!isLoading"
      :class="[ 'nav fixed top-4 left-1/2 -translate-x-1/2 max-w-[580px] w-[calc(100%-1rem)] p-3 rounded-full flex items-center justify-between  duration-300 ease-out transition-all', { 'activeNav': activeNav } ]"
    >
      <div
        :class="[ !profileInfo.userImg ? 'bg-black2' : 'bg-transparent', theme.bgImg || 'text-white' ]"
        class="border-border border-2 rounded-full overflow-hidden grid place-content-center size-[44px]"
      >
        <img
          v-if="profileInfo.userImg"
          class="size-[150px] object-cover object-center"
          :src="APP_URL + profileInfo.userImg"
          alt="user-img"
        />
        <p
          v-else
          class="font-semibold text-md"
        >
          {{ (profileInfo.username as string)?.charAt(0).toUpperCase() }}
        </p>
      </div>

      <div :class="[ 'bg-transparent font-semibold', theme.bgImg ]">{{ profileInfo.username }}</div>

      <button
        @click="copyLink(profileInfo.username)"
        :class="[ 'size-[40px] rounded-full grid place-content-center active:scale-95 bg-black2 text-white', theme.bgImg ]"
      >
        <appIcon
          name="link"
          size="20px"
        />
      </button>
    </div>
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
        class="border-border border-2 rounded-full overflow-hidden grid place-content-center size-[150px]"
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
      <div
        v-if="currentLink && sharedLink(String($route.query.id))"
        class="fixed inset-0 bg-black bg-opacity-50"
      ></div>
      <li
        class="duration-150 transition-transform hover:scale-105 ease-out cursor-pointer select-none"
        :class="[ link.layout, link.layout === 'classic' ? 'h-[56px]' : 'aspect-[2/1]', theme.link || 'bg-white', sharedLink(String(link.id)) ]"
        v-for=" link in profileLinks "
        :key="link.id"
        :style="linkStyle(theme)"
      >
        <a
          class="py-4 px-5 h-full"
          :class="{ 'flex items-center': link.layout === 'classic' }"
          @click.prevent="handleLinkClick($event, link.link, String(link.id))"
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
              class="more rounded-full size-8 grid place-content-center duration-300 ease-out hover:backdrop-brightness-[.8]"
            >
              <appIcon
                name="more"
                size="20px"
                class="pointer-events-none"
              />
            </div>
          </div>
        </a>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { Theme } from '@/types/interfacesTheme';
import { linkTheme } from '@/hooks/helpers';
import { useCopyLink } from '@/hooks/helpers';
import { Link } from '@/types/interfacesLink';
import { HeaderWithId } from '@/types/interfacesHeader';
import { User } from '@/types/interfacesAuth';

const ProfileSocialmedia = defineAsyncComponent({
  loader: () => import('@/components/ProfileSocialmedia.vue'),
  delay: 200,
  timeout: 3000
});

const store = useStore();
const router = useRouter();
const route = useRoute();
const linkStyle = linkTheme();
const { copyLink, alert } = useCopyLink();

const props = defineProps({
  username: String as PropType<string>,
});

const isLoading = ref<boolean>(false);
const toggleShareLink = ref<boolean>(false);
const APP_URL = ref<string>(String(process.env.VUE_APP_URL));
const currentLink = ref<boolean>(false);
const linkId = ref<string>('');
const activeNav = ref<boolean>(false)

const profileInfo = computed<User>(() => store.getters[ "user/profileInfo" ]);
const profileLinks = computed<Link[]>(() => store.getters[ "user/profileLinks" ]);
const profileHeaders = computed<HeaderWithId[]>(() => store.getters[ "user/profileHeaders" ]);
const theme = computed<Theme>(() => store.getters[ 'user/theme' ]);

const closeModal = () => alert.value = false;

const closeShareLink = () => {
  toggleShareLink.value = !toggleShareLink.value;
  document.body.style.overflow = String(toggleShareLink.value ? 'hidden' : 'auto');
};

const handleLinkClick = (e: Event, href: string, id: string) => {
  if ((e.target as HTMLElement).classList.contains('more')) {
    closeShareLink();
    linkId.value = id;
  } else {
    window.open(href, '_blank');
  }
};

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

const sharedLink = computed(() => (id: string) => route.query.id === id ? { 'current-link': currentLink.value } : '');

onMounted(() => {
  fetchUserProfile(props.username);
  setTimeout(() => currentLink.value = true, 1000);
  setTimeout(() => currentLink.value = false, 2000);

  window.addEventListener('scroll', () => {
    Math.round(scrollY) >= 240 ? activeNav.value = true : Math.round(scrollY) === 0 ? activeNav.value = false : null;
  });
});
</script>

<style scoped lang="scss">
.featured {
  .pos-end {
    @apply flex items-end
  }
}

.current-link {
  @apply scale-105 transition-transform duration-1000 ease-out;
}

.nav {
  &.activeNav {
    @apply bg-[#ffffff80] border-[1px] border-[#ebeef1] backdrop-blur-sm;
  }

  & div:is(:nth-child(1), :nth-child(2)) {
    @apply opacity-0;
  }

  &.activeNav div:is(:nth-child(1), :nth-child(2)) {
    @apply opacity-100;
  }
}
</style>
