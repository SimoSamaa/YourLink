<template>
  <div class="absolute w-full h-[89vh] z-10 bg-bg">
    <div class="base-card-style flex items-center justify-between">
      <base-button
        title="back"
        mode="btn-icon"
        @click="backToChooseBtn"
        v-if="!actionIcons"
      >
        <appIcon name="chevron-l" size="20px" />
      </base-button>
      <p>Add Thumbnail</p>
      <base-button @click="closeThumbnail" mode="close" title="close">
        <appIcon name="close" size="20px" />
      </base-button>
    </div>
    <div class="base-card-style mt-4">
      <div class="space-y-4" v-if="actionIcons">
        <!-- UPLOAD IMG BUTTON -->
        <button class="choose-method-upload-img">
          <img
            class="rounded-lg"
            src="@/assets/68048.234e19732c3d9860b519.webp"
            alt="upload-thumbnail"
          />
          <div class="mr-auto">
            <h3>Upload your own thumbnail</h3>
            <p class="text-text2 text-left">
              Choose an image or SVG from your device.
            </p>
          </div>
          <appIcon name="chevron-r" />
        </button>
        <!-- CHOOSE ICON BUTTON -->
        <button class="choose-method-upload-img" @click="openListIcons">
          <img
            class="rounded-lg"
            src="@/assets/99760.7140b8ce4fef09ee976f.webp"
            alt="upload-thumbnail"
          />
          <div class="mr-auto">
            <h3>Choose your icon link</h3>
            <p class="text-text2 text-left">Choose from Boxicons</p>
          </div>
          <appIcon name="chevron-r" />
        </button>
      </div>
      <!--  -->
      <div v-if="!actionIcons">
        <strong>
          Icons by
          <a
            class="text-blue-500 underline"
            href="https://boxicons.com/"
            target="_blank"
            >Boxicons</a
          >
        </strong>
        <div class="my-4 relative">
          <appIcon
            name="search"
            class="absolute left-2 top-1/2 -translate-y-1/2"
          />
          <input
            class="bg-bg pl-10 h-[40px] rounded w-full"
            type="text"
            v-model="searchIcons"
            placeholder="Search icons"
          />
        </div>
        <!-- BOXICON LIST (JUST LOGO) -->
        <ul
          class="flex flex-wrap gap-4 justify-center overflow-y-scroll max-h-[340px]"
        >
          <h3 v-if="iconNotFound">No icon found</h3>
          <button
            class="size-[70px] rounded-md border hover:bg-purple-100 outline-none focus:bg-purple-100"
            v-for="icon in icons"
            :key="icon._id"
            @click="chooseBoxicon(icon.name)"
          >
            <box-icon
              :type="icon.type_of_icon.toLowerCase()"
              :name="icon.name"
              size="lg"
              color="#676B5F"
            ></box-icon>
          </button>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { pageProps, BoxIcons } from "@/types/interfacesLink";
import { useStore } from "vuex";

const emit = defineEmits(["set-close-Thumbnail"]);

const props = defineProps({
  linkId: String,
});

const store = useStore();

const actionIcons = ref<boolean>(true);
const searchIcons = ref<string>("");
const boxIcons = ref<BoxIcons[]>([]);

const closeThumbnail = () => emit("set-close-Thumbnail");

const openListIcons = () => (actionIcons.value = false);

const backToChooseBtn = () => (actionIcons.value = true);

const iconNotFound = computed(() => icons.value && icons.value.length === 0);

const icons = computed(() => {
  if (boxIcons.value) {
    return boxIcons.value.filter((icon) =>
      icon.name.toLowerCase().startsWith(searchIcons.value)
    );
  } else {
    return [];
  }
});

const chooseBoxicon = async (boxiconName: string) => {
  try {
    await store.dispatch("links/updateChooseBoxicon", {
      id: props.linkId,
      icon: boxiconName,
    });
  } catch (err) {
    (err as Error).message;
  }
};

async function getBoxIcon() {
  const res = await fetch(
    "https://boxicons.com/_next/data/DNHfRjsQaNmPABrOMCg7E/index.json"
  );
  const resIcons: pageProps = await res.json();

  boxIcons.value = resIcons.pageProps.icons.filter(
    (icon) => icon.type_of_icon === "LOGO"
  );
}

onMounted(() => getBoxIcon());
</script>

<style scoped>
.choose-method-upload-img {
  @apply flex items-center justify-between gap-4 w-full p-2 border rounded-md
  duration-300 ease-out transition-all hover:bg-purple-100;
}
</style>
