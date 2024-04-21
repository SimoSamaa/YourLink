<template>
  <section>
    <ResetPassword
      :open="isResetPass"
      @set-reset-pass="toggleResetPass()"
    />
    <base-modal
      statuse="border-l-orange-500"
      :showing="toggleModal"
      :actions="true"
      mess="are you sure want to delete your account"
      @set-close-modal="closeModal()"
    >
      <span
        @click="deleteAccount()"
        class="text-orange-500 underline ml-2 cursor-pointer"
      >confirm</span>
    </base-modal>
    <div class="info base-card-style leading-[2] divide-y divide-border">
      <div>
        <span>name</span>
        <PlaceholderLoading
          v-if="isLoading"
          class="w-[100px] h-[28px]"
        />
        <h3 v-else>{{ userInfo.username }}</h3>
      </div>
      <div>
        <span>email</span>
        <PlaceholderLoading
          v-if="isLoading"
          class="w-[220px] h-[28px]"
        />
        <h3 v-else>{{ userInfo.email }}</h3>
      </div>
      <div>
        <span>Created at</span>
        <PlaceholderLoading
          v-if="isLoading"
          class="w-[89.31px] h-[28px]"
        />
        <h3 v-else> {{
          new Date(userInfo.createdAt)
            .toLocaleDateString('en-us')
        }}</h3>
      </div>
    </div>
    <div class="base-card-style grid gap-2 mt-4">
      <base-button @click="toggleResetPass()">reset password</base-button>
      <base-button @click="accountLogout()">logout</base-button>
      <base-button
        @click="toggleDeleteAccount()"
        :disabled="toggleModal"
        mode=err
      >delete acount</base-button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, defineAsyncComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { User } from '@/types/interfacesAuth';

const ResetPassword = defineAsyncComponent(() =>
  import('@/components/ResetPassword.vue')
);

const store = useStore();
const router = useRouter();

defineProps<{ isLoading: boolean }>();

const toggleModal = ref<boolean>(false);
const isResetPass = ref<boolean>(false);

const userInfo = computed<User>(() => store.getters[ 'user/user' ]);

const toggleResetPass = () => isResetPass.value = !isResetPass.value;

const accountLogout = () => {
  store.dispatch("auth/logout");
  router.replace({ name: 'home' });
};

const closeModal = () => toggleModal.value = false;

const toggleDeleteAccount = () => toggleModal.value = true;

const deleteAccount = async () => {
  try {
    await store.dispatch('user/deleteUserAccount');
    accountLogout();
  } catch (err) {
    console.error((err as Error).message);
  }
};
</script>

<style scoped lang="scss">
.info {
  & > * {
    @apply px-4 py-2;
  }

  span {
    @apply text-text2 text-sm;
  }

  h3 {
    @apply text-[16px] w-fit px-2 bg-bg rounded-md shadow;
  }
}
</style>
