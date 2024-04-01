<template>
  <section class="space-y-4">
    <div class="info base-card-style leading-[2] divide-y divide-border">
      <div>
        <span>name</span>
        <h3>{{ userInfo.username }}</h3>
      </div>
      <div>
        <span>email</span>
        <h3>{{ userInfo.email }}</h3>
      </div>
      <div>
        <span>Created at</span>
        <h3> {{
          new Date(userInfo.createdAt)
            .toLocaleDateString('en-us')
        }}</h3>
      </div>
    </div>
    <div class="base-card-style grid gap-2">
      <base-button>reset password</base-button>
      <base-button @click="accountLogout()">logout</base-button>
      <base-button
        @click="deleteAccount()"
        mode=err
      >delete acount</base-button>
    </div>
  </section>
</template>

<script
  lang="ts"
  setup
>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { User } from '@/types/interfacesAuth';

const store = useStore();
const router = useRouter();

const userInfo = computed<User>(() => store.getters[ 'user/user' ]);

const accountLogout = () => {
  store.dispatch("auth/logout");
  router.replace({ name: 'home' });
};

const deleteAccount = async () => {
  try {
    await store.dispatch('user/deleteUserAccount');
    accountLogout();
  } catch (err) {
    console.log((err as Error).message);
  }
};
</script>

<style
  scoped
  lang="scss"
>
.info {
  &>* {
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
