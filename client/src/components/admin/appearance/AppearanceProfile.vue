<template>
  <form
    @submit.prevent="submitProfileUser"
    class="base-card-style mt-2 space-y-4"
  >
    <div class="flex items-center gap-4">
      <div
        class="min-w-24 h-24 rounded-full overflow-hidden bg-black2 grid place-content-center text-white border-border border"
      >
        <img
          v-if="userProfile.userimg.value"
          class="size-24 object-cover object-center"
          :src="userProfile.userimg.value"
          alt="user-img"
        />
        <p v-else class="font-semibold text-4xl">
          {{ (user.username as string)?.charAt(0) }}
        </p>
      </div>
      <div class="w-full">
        <div class="flex gap-4">
          <base-button mode="full" type="button" @click="activeInputFile"
            >upload image</base-button
          >
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref="inputFile"
            class="hidden"
            @change="uploadImgUser($event)"
          />
          <base-button
            mode="err"
            class="w-full"
            type="button"
            @click="removeImgUser"
          >
            remove
          </base-button>
        </div>
        <p class="text-text2 mt-2 ml-2">Allowed JPG, or PNG. Max size of 1MB</p>
      </div>
    </div>
    <div class="auth-input">
      <input
        type="text"
        id="username"
        placeholder="Profile Title"
        class="bg-bg"
        v-model.trim="userProfile.username.value"
        autocomplete="off"
        maxlength="10"
      />
      <label for="username">Profile Title</label>
    </div>
    <div class="relative">
      <textarea
        class="w-full bg-bg border-border border rounded h-24 px-4 pt-8"
        id="bio"
        v-model.trim="userProfile.userbio.value"
        maxlength="80"
      ></textarea>
      <label class="absolute left-4 top-2 text-text2 font-semibold" for="bio"
        >Profile Title</label
      >
      <span class="text-sm absolute right-0 -bottom-4">
        {{ userProfile.userbio.value?.length }}/80</span
      >
    </div>

    <base-button :disabled="processing">
      <p v-if="!processing">save</p>
      <LoadingButton v-else />
    </base-button>
  </form>
</template>

<script lang="ts" setup>
import { ref, computed, reactive, watch } from "vue";
import { useStore } from "vuex";

const store = useStore();

const inputFile = ref<HTMLElement | null>(null);
const processing = ref<boolean>(false);
const imageFile = ref<File | null>(null);

const user = computed(() => store.getters["user/user"]);

interface User {
  userimg: {
    value: string;
    isValid: boolean;
  };
  username: {
    value: string;
    isValid: boolean;
  };
  userbio: {
    value: string;
    isValid: boolean;
  };
}

const userProfile = reactive<User>({
  userimg: {
    value: user.value.userImg,
    isValid: true,
  },
  username: {
    value: user.value.username,
    isValid: true,
  },
  userbio: {
    value: user.value.bio,
    isValid: true,
  },
});

const activeInputFile = () => (inputFile.value as HTMLInputElement).click();

const uploadImgUser = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const inputFile = input.files[0];
    imageFile.value = inputFile;
    const imgSize = inputFile.size / 1024; // size in KB

    if (imgSize > 1024) {
      // If image size is greater than 1MB (1024KB)
      console.log("Image size is too large. Please select an image smaller.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      userProfile.userimg.value = reader.result as string;
    };

    reader.readAsDataURL(inputFile);
  }
};

const removeImgUser = async () => {
  userProfile.userimg.value = "";
  await store.dispatch("user/removeImgUser");
};

const submitProfileUser = async () => {
  const data = {
    userImg: imageFile.value,
    username: userProfile.username.value,
    bio: userProfile.userbio.value,
  };

  processing.value = true;
  try {
    await store.dispatch("user/updateProfil", data);
  } catch (err) {
    (err as Error).message;
  } finally {
    processing.value = false;
  }
};

watch(
  () => user.value,
  (newValue) => {
    userProfile.userimg.value = newValue.userImg;
    userProfile.username.value = newValue.username;
    userProfile.userbio.value = newValue.bio;
  }
);
</script>

<style scoped lang="scss">
.auth-input {
  @apply h-[55px] relative;

  label {
    @apply absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-text2 duration-150 ease-in-out cursor-text select-none;
  }

  input {
    @apply w-full h-full px-4 border-border border rounded pt-3 duration-150 ease-out;
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    @apply top-[8px] translate-y-0 text-[12px];
  }

  input::placeholder {
    @apply text-transparent select-none;
  }
}
</style>
