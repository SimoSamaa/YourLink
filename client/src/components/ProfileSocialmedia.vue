<template>
  <transition name="share-link-backdrop">
    <div
      class="fixed inset-0 z-10 bg-black bg-opacity-50"
      v-if="toggleShareLink"
      @click="closeShareLink()"
    ></div>
  </transition>
  <transition name="share-link">
    <div
      v-if="toggleShareLink"
      class="share-link bg-white fixed w-[500px] max-w-full p-4 rounded-lg z-30 space-y-4 inset-0 m-auto h-[min-content]"
    >
      <div class="flex items-center justify-between">
        <h4>Share this YOURLINK</h4>
        <base-button
          mode="close"
          @click="closeShareLink()"
        >
          <appIcon
            name="close"
            size="20px"
          />
        </base-button>
      </div>
      <ul>
        <li
          v-for="(sharedLink, ind) in shareSocialMedia"
          :key="ind"
        >
          <a
            :href="sharedLink.link"
            target="_blank"
            class="flex justify-between hover:bg-bg duration-300 ease-out p-4 rounded-md"
          >
            <div class="flex gap-4 font-semibold">
              <appIcon :name="sharedLink.platform" />
              <p>Share on <span class="capitalize">{{ sharedLink.platform.split('-')[ 0 ] }}</span></p>
            </div>
            <appIcon
              name="chevron-r"
              size="20px"
            />
          </a>
        </li>
      </ul>
      <div
        class="p-4 border-border border rounded-md duration-300 ease-in-out cursor-pointer transition-colors hover:bg-bg flex justify-between font-semibold"
      >
        <div class="flex items-center gap-3 text-md">
          <img
            src="@/assets/icon.png"
            alt="logo"
            class="w-8"
          >
          <div class="w-[150px] overflow-hidden text-ellipsis">{{ `${name}/${linkId}` }}</div>
        </div>
        <button
          :class="[ 'px-2', { 'text-green-700': alert } ]"
          @click="copyLink(`${name}/?id=${props.linkId}`)"
        >{{ !alert ? 'Copy' : 'Copied!' }}</button>
      </div>
      <div class="space-y-3">
        <h3>Create your own YOURLINK</h3>
        <base-button
          mode="full"
          @click="$router.push({ name: 'signupPage' })"
        >join us</base-button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, watchEffect, reactive } from 'vue';
import { useCopyLink } from '@/hooks/helpers';

const emit = defineEmits([ 'set-closeShareLink' ]);
const props = defineProps<{
  toggleShareLink: boolean,
  name: string,
  linkId: string
}>();

const closeShareLink = () => emit('set-closeShareLink');

const { copyLink, alert } = useCopyLink();

const appOriginUrl = computed(() => {
  if (!props.name) return ''; // Return empty string if props.name is undefined
  return `${window.location.origin}/${props.name}`;
});

interface SocialMediaType {
  platform: string,
  link: string
}
let shareSocialMedia: SocialMediaType[] = reactive([]);

watchEffect(() => {
  if (!props.name) return; // Skip updating shareSocials if props.name is undefined
  shareSocialMedia = [
    {
      platform: 'whatsapp-p',
      link: `whatsapp://send?text=${appOriginUrl.value}/${encodeURI(`?id=${props.linkId}`)}`
    },
    {
      platform: 'facebook-p',
      link: `https://www.facebook.com/sharer/sharer.php?u=${appOriginUrl.value}/${encodeURI(`?id=${props.linkId}`)}`
    },
    {
      platform: 'linkedin-p',
      link: `https://www.linkedin.com/shareArticle?url=${appOriginUrl.value}/${encodeURI(`?id=${props.linkId}`)}`
    },
    {
      platform: 'x-p',
      link: `https://twitter.com/intent/tweet?url=${appOriginUrl.value}/${encodeURI(`?id=${props.linkId}`)}`
    },
    {
      platform: 'email-p',
      link: `mailto:someone@example.com?body=${appOriginUrl.value}/${encodeURI(`?id=${props.linkId}`)}`
    },
  ];
});
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

@include breakpoint('sm') {
  .share-link {
    @apply w-full rounded-b-none mb-[unset];
  }
}

@include setAnimation("share-link", (translate: 0 100px, opacity: 0, ), (opacity: 1, translate: 0, ), null);
@include setAnimation("share-link-backdrop", null, null, 'opacity');
</style>
