<template>
  <section>
    <h1>Profile</h1>
    <AppearanceProfile />
    <h1>Theme</h1>
    <AppearanceTheme />
  </section>
</template>

<script setup lang="ts">
import AppearanceProfile from "@/components/admin/appearance/AppearanceProfile.vue";
import AppearanceTheme from "@/components/admin/appearance/AppearanceTheme.vue";
</script>
