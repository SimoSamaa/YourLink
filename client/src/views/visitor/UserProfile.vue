<template>
  <section v-if="profileInfo" class="p-8 max-w-lg mx-auto">
    <div class="text-center mb-8 grid place-items-center">
      <div
        :class="!profileInfo.userImg ? 'bg-black2' : 'bg-transparent'"
        class="border-border border-2 rounded-full text-white overflow-hidden grid place-content-center size-[150px]"
      >
        <img
          v-if="profileInfo.userImg"
          class="size-[150px] object-cover object-center"
          :src="'http://localhost:2024/' + profileInfo.userImg"
          alt="user-img"
        />
        <p v-else class="font-semibold text-3xl">
          {{ (profileInfo.username as string)?.charAt(0).toUpperCase() }}
        </p>
      </div>
      <h1 class="mt-4">{{ profileInfo.username }}</h1>
      <div class="max-w-sm mt-2">{{ profileInfo.bio }}</div>
    </div>
    <ul class="space-y-1 text-center font-semibold mb-2">
      <li v-for="header in profileHeaders" :key="header.id" class="text-lg">
        {{ header.title }}
      </li>
    </ul>
    <ul class="links">
      <li
        class="bg-[#ddd] duration-150 transition-transform hover:scale-105 ease-out"
        :class="link.layout"
        v-for="link in profileLinks"
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
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, PropType } from "vue";
import { useStore } from "vuex";

const store = useStore();

const props = defineProps({
  username: String as PropType<string>,
});

const profileInfo = computed(() => store.getters["user/profileInfo"]);
const profileLinks = computed(() => store.getters["user/profileLinks"]);
const profileHeaders = computed(() => store.getters["user/profileHeaders"]);

const fetchUserProfile = async (username: string | undefined) => {
  try {
    await store.dispatch("user/fetchUserProfile", username);
  } catch (err) {
    console.log((err as Error).message);
  }
};

onMounted(() => fetchUserProfile(props.username));
</script>
