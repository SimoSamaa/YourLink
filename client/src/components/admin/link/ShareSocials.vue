<template>
  <div class="w-full flex gap-4 pt-1 justify-around max-[650px]:justify-between">
    <div
      v-for="social in shareSocials"
      class="grid place-items-center"
    >
      <a
        :href="social.linkToShare"
        target="_blank"
        class="hover:scale-110 duration-300 ease-out transition-transform"
      >
        <appIcon :name="social.platform" />
      </a>
      <p class="capitalize mt-2 font-semibold">{{ social.platform }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const profileName = computed<string>(() =>
  store.getters[ "user/user" ].username
);

const appOriginUrl = `${window.location.origin}/${profileName.value}`;

const shareMessages = encodeURIComponent("I've just updated my YOURLINK with my latest content - check it out here!");

const shareSocials = reactive([
  {
    platform: 'facebook',
    linkToShare: `https://www.facebook.com/sharer/sharer.php?u=${appOriginUrl}&quote=${shareMessages}`
  },
  {
    platform: 'whatsapp',
    linkToShare: `whatsapp://send?text=${appOriginUrl}%20${shareMessages}`
  },
  {
    platform: 'linkedin',
    linkToShare: `https://www.linkedin.com/shareArticle?url=${appOriginUrl}&title=${shareMessages}`
  },
  {
    platform: 'x',
    linkToShare: `https://twitter.com/intent/tweet?url=${appOriginUrl}&text=${shareMessages}`
  },
  {
    platform: 'messenger',
    linkToShare: `fb://messaging/compose/new`
  }
]);
</script>
