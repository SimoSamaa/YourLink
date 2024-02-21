<template>
  <PhonePreview />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import useMediaQuery from "@/hooks/matchMedia";
import PhonePreview from "@/components/admin/PhonePreview.vue";

const router = useRouter();

const store = useStore();

const loadHeaders = async () => {
  try {
    await store.dispatch("links/featchHeaders");
  } catch (err) {
    (err as Error).message;
  }
};

loadHeaders();

onMounted(() => {
  return useMediaQuery(
    () => null,
    () => router.replace("/yourLink/admin/links")
  );
});
</script>
