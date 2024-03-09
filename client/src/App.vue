<template>
  <section>
    <NavigationVisitor v-if="!removeNavVis" />
    <router-view></router-view>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import NavigationVisitor from "@/components/layouts/NavigationVisitor.vue";

const route = useRoute();

const removeNavVis = computed<boolean>(
  () =>
    route.name === "dashboard" ||
    route.name === "linksPage" ||
    route.name === "AppearancePage" ||
    route.name === "account" ||
    route.name === "preview" ||
    route.name === "loginPage" ||
    route.name === "signupPage"
);
</script>
