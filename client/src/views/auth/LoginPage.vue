<template>
  <section class="auth-page">
    <div class="px-10 py-8">
      <router-link to="/">
        <img src="../../assets/logo.webp" alt="logo" id="logo" />
      </router-link>
      <div class="my-10 text-center">
        <h1 class="font-bold">Welcome back</h1>
        <p class="text-text2 mt-4">Login to YourLink</p>
      </div>
      <form @submit.prevent class="auth-form">
        <div class="auth-input">
          <input
            type="text"
            id="email"
            placeholder="Email"
            autocomplete="off"
          />
          <label for="email">Email</label>
        </div>
        <div class="auth-input">
          <input
            type="password"
            id="password"
            placeholder="password"
            autocomplete="off"
          />
          <label for="password">password</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <!-- act -->
            <path
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
        <base-button mode="full" class="flex items-center h-[55px]">
          login
        </base-button>
      </form>
      <div class="text-center mt-4">
        <p>OR</p>
        <p>
          Don't have an account?
          <router-link to="/auth/signup" class="text-blue-500 underline">
            signup
          </router-link>
        </p>
      </div>
    </div>
    <div class="bg-img"></div>
  </section>
</template>

<script lang="ts" setup></script>

<style scoped>
.bg-img {
  background: url("../../assets/login.png") center / cover;
}
</style>
