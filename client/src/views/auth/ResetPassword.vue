<template>
  <form
    @submit.prevent="updatePassword()"
    class="bg-white max-w-lg w-[90%] mx-auto p-4 rounded-xl shadow mt-10 grid gap-4"
  >
    <h2>set a new password</h2>
    <div class="input-container">
      <input
        type="text"
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
        type="text"
        placeholder="confirm password"
        v-model.trim="updatePass.confirmPass.val"
        :class="{ 'not-valid': !updatePass.confirmPass.isValid }"
      >

      <appIcon
        name="error"
        v-if="!updatePass.confirmPass.isValid"
      />
    </div>
    <base-button mode="full">update password</base-button>
  </form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
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

const error = ref<string>('');

const updatePassword = async () => {
  if (!updatePass.password.val || !updatePass.confirmPass.val) {
    updatePass.password.isValid = false;
    updatePass.confirmPass.isValid = false;
    return;
  } else if (updatePass.password.val !== updatePass.confirmPass.val) {
    updatePass.password.isValid = false;
    updatePass.confirmPass.isValid = false;
    return;
  } else {
    updatePass.password.isValid = true;
    updatePass.confirmPass.isValid = true;
  }

  try {
    // await fetch(`http://localhost:2024/auth/new-password/${props.token}`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ newPass: updatePass.password.val })
    // })
    await store.dispatch('auth/newPassword', {
      token: props.token,
      newPass: updatePass.password.val,
    })

  } catch (err) {
    console.log((err as Error).message);
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
</style>
