<template>
  <header class="p-4 bg-white border-b border-border flex items-center justify-between">
    <router-link to="/">
      <img
        src="../../assets/logo.webp"
        alt="logo"
        id="logo"
      />
    </router-link>
    <div
      class="flex gap-4"
      v-if="!isAuth"
    >
      <router-link
        class="btn-auth border text-text2 border-border duration-300 ease-out transition-all hover:bg-bg"
        to="/auth/login"
      >
        Login
      </router-link>
      <router-link
        class="btn-auth bg-black2 text-white"
        to="/auth/signup"
      >
        Signup
      </router-link>
    </div>
    <div
      v-else
      class="flex gap-4"
    >
      <base-button
        link
        to="/admin/links"
      >
        admin
        <appIcon name="admin" />
      </base-button>
      <base-button
        mode="err"
        @click="logout"
      >
        logout
        <appIcon name="logout" />
      </base-button>
    </div>
  </header>
</template>

<script
  lang="ts"
  setup
>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const isAuth = computed<boolean>(() => store.getters[ "auth/isAuth" ]);

const logout = () => {
  store.dispatch("auth/logout");
};
</script>

<style
  scoped
  lang="scss"
>
.btn-auth {
  @apply px-4 py-2 rounded;
}
</style>
