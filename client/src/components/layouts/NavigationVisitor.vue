<template>
  <header
    class="p-4 bg-white border-b border-border flex items-center justify-between"
  >
    <router-link to="/admin/links">
      <img src="../../assets/logo.webp" alt="logo" id="logo" />
    </router-link>
    <div class="flex gap-4">
      <router-link
        class="btn-auth border text-text2 border-border duration-300 ease-out transition-all hover:bg-bg"
        to="/auth/login"
      >
        Login
      </router-link>
      <router-link class="btn-auth bg-black2 text-white" to="/auth/signup">
        Signup
      </router-link>
    </div>
  </header>
</template>

<style scoped lang="scss">
.btn-auth {
  @apply px-4 py-2 rounded;
}
</style>
