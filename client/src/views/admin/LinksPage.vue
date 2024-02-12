<template>
  <section class="admin-page">
    <h1>Links</h1>
    <header class="flex justify-between pb-4 border-b-[1px] border-border">
      <base-button mode="white-btn">
        <appIcon name="header" />
        headers
      </base-button>
      <base-button mode="white-btn add">
        <appIcon name="add" />
        add link
      </base-button>
    </header>
    <ul class="grid gap-4 mt-4">
      <li
        v-for="header in headers"
        :key="header.id"
        class="bg-white p-4 rounded-xl border-border border shadow-sm"
      >
        {{ header.title }}
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const headers = computed(() => store.getters["links/headers"]);

console.log("hello", headers.value);
</script>

<style scoped lang="scss"></style>
