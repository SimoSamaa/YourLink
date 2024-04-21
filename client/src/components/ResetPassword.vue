<template>
  <section class="fixed z-[200]">
    <Teleport to="body">
      <base-modal
        statuse="border-l-green-400"
        :showing="toggleModal"
        mess="email reset password sent"
        @set-close-modal="closeModal()"
      ></base-modal>
    </Teleport>
    <Transition name="backdrop">
      <div
        v-if="open"
        @click="closeResetPass()"
        class="bg-black bg-opacity-50 fixed inset-0"
      ></div>
    </Transition>
    <Transition name="reset-animation">
      <form
        v-if="open"
        @submit.prevent="emailResetPass()"
        class="bg-white max-w-[400px] w-[90%] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg shadow"
      >
        <base-button
          @click="closeResetPass()"
          mode="close"
          title="close"
          class="ml-auto"
          type="button"
        >
          <appIcon
            name="close"
            size="20px"
          />
        </base-button>
        <div class="relative my-4">
          <p class="text-red-500 absolute -top-6">{{ error }}</p>
          <input
            type="text"
            placeholder="E-mail"
            v-model.trim="email"
            class="bg-bg border-border border-2 px-4 h-[44px] block w-full rounded"
            :class="{ 'border-red-500 border-[1px] focus:outline-red-500 bg-red-100 transition-all duration-300 ease-out': !!error }"
          >
          <appIcon
            v-if="!!error"
            name="error"
            class="absolute right-4 top-1/2 -translate-y-1/2"
          />
        </div>
        <base-button
          mode="full"
          :disabled="processing"
        >
          <p v-if="!processing">reset password</p>
          <LoadingButton v-else />
        </base-button>
      </form>
    </Transition>
  </section>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useStore } from 'vuex';

const emit = defineEmits([ 'set-reset-pass' ]);
defineProps<{ open: boolean }>();

const store = useStore();

const email = ref<string>('');
const error = ref<string>('');
const emailResetSend = ref<boolean>(false);
const processing = ref<boolean>(false);
const toggleModal = ref<boolean>(false);

const closeResetPass = () => emit('set-reset-pass');

const closeModal = () => toggleModal.value = false;

const emailResetPass = async () => {
  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.value) {
    return error.value = 'please enter email';
  } else if (!email.value.match(emailRegExp)) {
    return error.value = 'please enter a valid email';
  }

  processing.value = true;
  try {
    await store.dispatch('auth/resetPassword', { email: email.value });
    email.value = '';
    emailResetSend.value = false;
    closeResetPass();
    toggleModal.value = true;
  } catch (err: Error) {
    error.value = err.message;
    toggleModal.value = false;
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

@include setAnimation("backdrop", null, null, 'opacity');

.reset-animation-enter-active {
  animation: reset-animation 300ms ease;
}

.reset-animation-leave-active {
  animation: reset-animation 150ms ease reverse;
}

@keyframes reset-animation {
  from {
    @apply opacity-0 top-[300px]
  }

  to {
    @apply opacity-100 top-1/2
  }
}
</style>
