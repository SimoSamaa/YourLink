<template>
  <section class="auth-page">
    <div class="px-10 py-8">
      <router-link to="/">
        <img
          src="../../assets/logo.webp"
          alt="logo"
          id="logo"
        />
      </router-link>
      <div class="hero my-10 text-center">
        <h1 class="font-bold">Welcome back</h1>
        <p class="text-text2 mt-4">Login to YourLink</p>
      </div>
      <form
        @submit.prevent="submitLogin"
        class="auth-form"
      >
        <div
          class="auth-input"
          :class="{ 'input-checked-err': !login.email.isValid }"
        >
          <input
            type="text"
            id="email"
            placeholder="Email"
            autocomplete="off"
            v-model="login.email.value"
          />
          <label for="email">Email</label>
          <appIcon
            v-if="!login.email.isValid"
            name="error"
          />
        </div>
        <transition name="input-mess">
          <p
            v-show="actErrMess"
            v-if="!login.email.isValid"
            class="text-red-500 text-sm -mt-4"
          >
            Please enter a valid email
          </p>
        </transition>
        <div
          class="auth-input"
          :class="{ 'input-checked-err': !login.password.isValid }"
        >
          <input
            type="password"
            id="password"
            placeholder="password"
            autocomplete="off"
            ref="inputPass"
            v-model="login.password.value"
          />
          <label for="password">password</label>
          <svg
            @click="handledShowPass"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path
              v-if="!showPass"
              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </div>
        <transition name="input-mess">
          <p
            v-show="actErrMess"
            v-if="!login.password.isValid"
            class="text-red-500 text-sm -mt-4"
          >
            please enter a password
          </p>
        </transition>
        <base-button
          mode="full"
          :disabled="processing"
          class="flex items-center h-[55px]"
        >
          <p v-if="!processing">login</p>
          <LoadingButton v-else />
        </base-button>
        <p class="text-red-500 text-center">{{ errMess }}</p>
      </form>
      <div class="text-center mt-4">
        <p>OR</p>
        <p>
          Don't have an account?
          <router-link
            to="/auth/signup"
            class="text-blue-500 underline"
          >
            signup
          </router-link>
        </p>
      </div>
    </div>
    <div
      class="bg-img relative"
      :class="{ 'loading': loading }"
    ></div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useInputType } from "@/hooks/helpers";
import LoadingButton from "@/components/UI/LoadingButton.vue";
import { Login } from "@/types/interfacesAuth";

const store = useStore();
const router = useRouter();

const [ showPass, checkInputType ] = useInputType();

const inputPass = ref<HTMLInputElement | null>(null);
const errMess = ref<string>("");
const processing = ref<boolean>(false);
const login = reactive<Login>({
  email: {
    value: "",
    isValid: true,
  },
  password: {
    value: "",
    isValid: true,
  },
});

const loginFormValidation = ref<boolean>(true);
const actErrMess = ref<boolean>(false)
const loading = ref<boolean>(true);

const bgImg = new Image();
bgImg.onload = () => loading.value = false;
bgImg.src = require('@/assets/login.png');

const handledShowPass = () => {
  if (typeof checkInputType === "function")
    checkInputType(inputPass.value as HTMLInputElement);
};

let timeoutId: number;
const checkEmailValidation = () => {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  loginFormValidation.value = true;

  if (!login.email.value.match(emailRegExp)) {
    login.email.isValid = false;
    loginFormValidation.value = false;
    actErrMess.value = true;
  } else {
    login.email.isValid = true;
  }

  if (!login.password.value) {
    login.password.isValid = false;
    loginFormValidation.value = false;
    actErrMess.value = true;
  } else {
    login.password.isValid = true;
  }

  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => (actErrMess.value = false), 5000);
};

const submitLogin = async () => {
  checkEmailValidation();

  if (!loginFormValidation.value) return;
  loginFormValidation.value = true;

  const loginData = {
    email: login.email.value,
    password: login.password.value,
  };

  processing.value = true;

  try {
    await store.dispatch("auth/login", loginData);
    router.replace("/admin/links");
  } catch (err) {
    errMess.value = (err as Error).message;
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped lang="scss">
@import '@/scss/helpers/mixins';

.bg-img {
  background: url("@/assets/login.png") center / cover;
}

@include setAnimation("input-mess", null, null, "opacity");
</style>
