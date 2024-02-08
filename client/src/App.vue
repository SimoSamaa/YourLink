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

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const removeNavVis = computed<boolean>(
      () =>
        route.name === "dashboard" ||
        route.name === "linksPage" ||
        route.name === "AppearancePage" ||
        route.name === "account"
    );

    const zaba = ref();

    console.log(zaba.value);

    return { removeNavVis };
  },
});
</script>
