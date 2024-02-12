<template>
  <section>
    <header v-if="!removeNavVis" class="p-4 bg-black text-white">
      <ul>
        <li>
          <router-link to="/yourLink/admin/links">admin</router-link>
        </li>
      </ul>
    </header>
    <router-view></router-view>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const removeNavVis = computed<boolean>(
  () =>
    route.name === "dashboard" ||
    route.name === "linksPage" ||
    route.name === "AppearancePage" ||
    route.name === "account" ||
    route.name === "preview"
);
</script>
