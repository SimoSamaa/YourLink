<template>
  <form
    @submit.prevent="updatePassword()"
    class="bg-white max-w-lg w-[90%] mx-auto p-4 rounded-xl shadow mt-10"
  >
    <div
      v-if="!resetPassSuccess"
      class="grid gap-4"
    >
      <h2>set a new password</h2>
      <div class="input-container">
        <input
          type="password"
          placeholder="password"
          v-model.trim="updatePass.password.val"
          :class="{ 'not-valid': !updatePass.password.isValid }"
        >
        <appIcon
          name="error"
          v-if="!updatePass.password.isValid"
        />
      </div>
      <div class="input-container">
        <input
          type="password"
          placeholder="confirm password"
          v-model.trim="updatePass.confirmPass.val"
          :class="{ 'not-valid': !updatePass.confirmPass.isValid }"
        >

        <appIcon
          name="error"
          v-if="!updatePass.confirmPass.isValid"
        />
      </div>
      <p
        v-if="!formValidate"
        class="text-red-500"
      >{{ error }}</p>

      <base-button
        :disabled="processing"
        mode="full"
      >
        <p v-if="!processing">update password</p>
        <LoadingButton v-else />
      </base-button>
    </div>
    <div
      class="grid place-content-center h-[241px]"
      v-else
    >
      <div class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="-1 0 55 52"
        >
          <g>
            <path
              d="M26,0C11.664,0,0,11.663,0,26s11.664,26,26,26s26-11.663,26-26S40.336,0,26,0z M26,50C12.767,50,2,39.233,2,26   S12.767,2,26,2s24,10.767,24,24S39.233,50,26,50z"
            />
            <path
              d="M38.252,15.336l-15.369,17.29l-9.259-7.407c-0.43-0.345-1.061-0.274-1.405,0.156c-0.345,0.432-0.275,1.061,0.156,1.406   l10,8C22.559,34.928,22.78,35,23,35c0.276,0,0.551-0.114,0.748-0.336l16-18c0.367-0.412,0.33-1.045-0.083-1.411   C39.251,14.885,38.62,14.922,38.252,15.336z"
            />
          </g>
        </svg>
        <h2>Password Changed!</h2>
        <p>Your password has been changed successfully</p>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
const props = defineProps<{ token: string }>();

const updatePass = reactive({
  password: {
    val: '',
    isValid: true,
  },
  confirmPass: {
    val: '',
    isValid: true,
  }
});

const formValidate = ref<boolean>(true);
const processing = ref<boolean>(false);
const resetPassSuccess = ref(false);
const error = ref<string>('');

const validateResetPassForm = () => {
  if (!updatePass.password.val || !updatePass.confirmPass.val) {
    updatePass.password.isValid = false;
    updatePass.confirmPass.isValid = false;
    formValidate.value = false;
    error.value = 'fields cannot be empty'
  } else if (updatePass.password.val.length < 8 || updatePass.confirmPass.val.length < 8) {
    updatePass.password.isValid = false;
    updatePass.confirmPass.isValid = false;
    formValidate.value = false;
    error.value = 'min 8 characters in each fields'
  } else if (updatePass.password.val !== updatePass.confirmPass.val) {
    updatePass.password.isValid = false;
    updatePass.confirmPass.isValid = false;
    error.value = 'password not matching'
  } else {
    updatePass.password.isValid = true;
    updatePass.confirmPass.isValid = true;
    formValidate.value = true;
  }
}

const updatePassword = async () => {
  validateResetPassForm();
  if (!formValidate.value) return;
  formValidate.value = true;
  processing.value = true;

  try {
    await store.dispatch('auth/newPassword', {
      token: props.token,
      newPass: updatePass.password.val,
    })
  } catch (err) {
    console.log((err as Error).message);
    resetPassSuccess.value = false;
  } finally {
    processing.value = false;
    resetPassSuccess.value = true;
  }
}
</script>

<style scoped lang="scss">
.input-container {
  @apply relative;

  input {
    @apply bg-bg h-[44px] border-border border rounded px-4 w-full;

    &.not-valid {
      @apply bg-red-100 border-red-500 border outline-red-500 transition-all duration-300 ease-out;
    }
  }

  .icons:last-child {
    @apply absolute right-4 top-1/2 -translate-y-1/2
  }
}

svg {
  @apply size-[100px] fill-green-400 stroke-green-400 mx-auto mb-4;
}
</style>
