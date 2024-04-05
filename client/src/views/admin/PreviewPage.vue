<template>
  <PhonePreview isLoading />
</template>

<script
  setup
  lang="ts"
>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import useMediaQuery from "@/hooks/matchMedia";
import PhonePreview from "@/components/admin/PhonePreview.vue";

const router = useRouter();

onMounted(() => {
  return useMediaQuery(
    () => null,
    () => router.replace("/admin/links")
  );
});
</script>
