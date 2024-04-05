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
        <h1 class="font-bold">Join YourLink</h1>
        <p class="text-text2 mt-4">Sign up now!</p>
      </div>
      <form
        @submit.prevent="submitSignup"
        class="auth-form"
      >
        <div
          class="auth-input"
          :class="{ 'input-checked-err': !signup.email.isValid }"
        >
          <input
            type="text"
            id="email"
            placeholder="Email"
            autocomplete="off"
            @blur="clearValidity()"
            v-model.trim="signup.email.value"
          />
          <label for="email">Email</label>
          <appIcons
            v-if="!signup.email.isValid"
            name="error"
          />
        </div>
        <transition name="input-mess">
          <p
            v-show="actErrMess"
            v-if="!signup.email.isValid"
            class="text-red-500 text-sm -mt-4"
          >
            {{ errMess }}
          </p>
        </transition>
        <div
          class="auth-input"
          :class="{ 'input-checked-err': !signup.username.isValid }"
        >
          <input
            type="text"
            id="username"
            placeholder="username"
            autocomplete="off"
            v-model.trim="signup.username.value"
            @blur="clearValidity()"
          />
          <label for="username">username</label>
          <appIcons
            v-if="!signup.username.isValid"
            name="error"
          />
        </div>
        <transition name="input-mess">
          <p
            v-show="actErrMess"
            v-if="!signup.username.isValid"
            class="text-red-500 text-sm -mt-4"
          >
            username must be min 5 max 10 characters
          </p>
        </transition>
        <div class="auth-input">
          <input
            type="password"
            id="password"
            placeholder="password"
            autocomplete="off"
            ref="inputPass"
            v-model.trim="signup.password.value"
          />
          <label for="password">password</label>
          <svg
            @click="handledShowPass()"
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
        <div class="pass-val flex gap-2 w-fit ml-auto">
          <span :class="{ 'weak': weakPassword }"></span>
          <span :class="{ 'medium': mediumPassword }"></span>
          <span :class="{ 'strong': strongPassword }"></span>
        </div>
        <base-button
          :disabled="processing"
          mode="full"
          class="flex items-center h-[55px]"
          @click="stopErrorMessageRemoval()"
        >
          <div v-if="!processing">create account</div>
          <LoadingButton v-else />
        </base-button>
      </form>
      <div class="text-center mt-4">
        <p>OR</p>
        <p>
          Already have an account?
          <router-link
            to="/auth/login"
            class="text-blue-500 underline"
          >
            Login
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

<script
  lang="ts"
  setup
>
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useInputType } from "@/hooks/helpers";
import { Signup } from "@/types/interfacesAuth";

const store = useStore();
const router = useRouter();

const [ showPass, checkInputType ] = useInputType();

const inputPass = ref<HTMLInputElement | null>(null);
const processing = ref<boolean>(false);
const formValidation = ref<boolean>(true);
const actErrMess = ref<boolean>(false);
const errMess = ref<string>("");
const loading = ref(true);

const signup = reactive<Signup>({
  email: {
    value: "",
    isValid: true,
  },
  username: {
    value: "",
    isValid: true,
  },
  password: {
    value: "",
    isValid: true,
  },
});

const bgImg = new Image();
bgImg.onload = () => loading.value = false;
bgImg.src = require('@/assets/login.png');

const handledShowPass = () => {
  if (typeof checkInputType === "function")
    checkInputType(inputPass.value as HTMLInputElement);
};

const passwordValidation = computed<string[]>(() => {
  const regExpWeak = /[a-zA-Z]/;
  const regExpMedium = /\d/;
  const regExpStrong = /[!@#$%^&*?_~\-()]/;

  const value = signup.password.value;

  const weakMatch = value.match(regExpWeak);
  const mediumMatch = value.match(regExpMedium);
  const strongMatch = value.match(regExpStrong);

  if (weakMatch && mediumMatch && strongMatch && value.length > 8) {
    return [ "weak", "medium", "strong" ];
  } else if (
    (weakMatch && mediumMatch) ||
    (weakMatch && strongMatch) ||
    (mediumMatch && strongMatch)
  ) {
    return [ "weak", "medium" ];
  } else if (weakMatch || mediumMatch || strongMatch) {
    return [ "weak" ];
  } else {
    return [];
  }
});

const weakPassword = computed(() => passwordValidation.value.includes('weak') ? 'weak' : '');
const mediumPassword = computed(() => passwordValidation.value.includes('medium') ? 'medium' : '');
const strongPassword = computed(() => passwordValidation.value.includes('strong') ? 'strong' : '');

const clearValidity = () => {
  checkInputValidation();
  Object.values(signup).forEach((input) => {
    input.isValid = !input.isValid ? false : true;
  });
};

let timeoutId: number;
const checkInputValidation = () => {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  formValidation.value = true;

  if (!signup.email.value.match(emailRegExp)) {
    signup.email.isValid = false;
    formValidation.value = false;
    errMess.value = "Please enter a valid email";
    actErrMess.value = true;
  } else {
    signup.email.isValid = true;
  }

  if (signup.username.value.length < 5 || signup.username.value.length > 10) {
    signup.username.isValid = false;
    formValidation.value = false;
    actErrMess.value = true;
  } else {
    signup.username.isValid = true;
  }

  if (passwordValidation.value.length !== 3) {
    signup.password.isValid = false;
    formValidation.value = false;
  }

  clearTimeout(timeoutId)
  timeoutId = setTimeout(() => (actErrMess.value = false), 5000);
};

const submitSignup = async () => {
  checkInputValidation();

  if (!formValidation.value) return;

  formValidation.value = true;

  const signupData = {
    email: signup.email.value,
    username: signup.username.value,
    password: signup.password.value,
  };

  processing.value = true;
  try {
    await store.dispatch("auth/signup", signupData);
    router.replace("/auth/login");
  } catch (err) {
    errMess.value = (err as Error).message;
    actErrMess.value = true;
    signup.email.isValid = false;
  } finally {
    processing.value = false;
  }
};

const stopErrorMessageRemoval = () => clearTimeout(timeoutId);
</script>

<style
  scoped
  lang="scss"
>
@import '@/scss/helpers/mixins';

.bg-img {
  background: url("@/assets/signup.png") center / cover;
}

.pass-val {
  span {
    @apply block h-2 w-14 border-border border rounded-full bg-white duration-300 ease-out transition-all;
    background-size: 0 auto;

    $passStrength: (
      "weak": 'colors.red.500',
      "medium": 'colors.yellow.500',
      "strong": 'colors.green.500',
    );

  @each $Strength, $clr in $passStrength {
    &.#{$Strength} {
      background:
        linear-gradient(to right,
          theme($clr) 100%,
          transparent);
      background-size: 100% auto;
      background-repeat: no-repeat;
    }
  }
}
}

@include setAnimation("input-mess", null, null, "opacity");
</style>
