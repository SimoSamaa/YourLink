<template>
  <section>
    <NavigationVisitor v-if="!removeNavVis" />
    <RouterView />
  </section>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import NavigationVisitor from "@/components/layouts/NavigationVisitor.vue";

const route = useRoute();
const router = useRouter();
const store = useStore();

const removeNavVis = computed<boolean>(
  () =>
    route.name === "dashboard" ||
    route.name === "linksPage" ||
    route.name === "AppearancePage" ||
    route.name === "account" ||
    route.name === "preview" ||
    route.name === "loginPage" ||
    route.name === "signupPage" ||
    route.name === "userProfile" ||
    route.name === "notFound"
);

const didAutoLogout = computed(() => store.getters[ 'auth/didAutoLogout' ]);

const autoLogin = () => store.dispatch("auth/autoLogin");
autoLogin();

watch(didAutoLogout, (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    router.replace({ name: 'home' })
  }
});
</script>
