<template>
  <div class="absolute w-full h-[89vh] z-10 bg-bg">
    <div class="base-card-style flex items-center justify-between">
      <base-button
        title="back"
        mode="btn-icon"
        @click="backToChooseBtn"
        v-if="actionIcons || actionUpload"
      >
        <appIcon
          name="chevron-l"
          size="20px"
        />
      </base-button>
      <p>Add Thumbnail</p>
      <base-button
        @click="closeThumbnail"
        mode="close"
        title="close"
      >
        <appIcon
          name="close"
          size="20px"
        />
      </base-button>
    </div>
    <div class="base-card-style mt-4">
      <div
        class="space-y-4"
        v-if="!actionIcons && !actionUpload"
      >
        <!-- UPLOAD IMG BUTTON -->
        <button
          class="choose-method-upload-img"
          @click="openUploadImg()"
        >
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
        <button
          class="choose-method-upload-img"
          @click="openListIcons"
        >
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
      <!-- UPLOAD IMAGE -->
      <div v-if="actionUpload">
        <input
          v-if="checkUploadProgress"
          @input="uploadImgFile($event)"
          :id="linkId"
          type="file"
          accept="image/xml+s, image/jpg, image/jpeg, image/png"
          class="hidden"
        >
        <label
          v-if="checkUploadProgress"
          @dragover.prevent="startDragFile()"
          @dragleave="endDragFile()"
          @drop.prevent="dropImgFile($event)"
          :class="isDrop === true ? 'outline-double  bg-lightSeconder' : ''"
          :for="linkId"
          class="outline-2 outline-dashed outline-seconder duration-300 ease-out transition-all p-4 rounded-xl aspect-video mb-4 grid place-content-center cursor-pointer hover:bg-lightSeconder hover:outline"
        >
          <div>
            <div
              class="pointer-events-none"
              v-if="!isUploading"
            >
              <div class="w-fit mx-auto mb-4">
                <appIcon name="upload" />
              </div>
              <div class="max-w-[300px] text-center">Select file to upload, or drag-and-drop file, allow png
                jpg svg</div>
            </div>
            <div
              v-else
              class="flex items-center font-semibold gap-2"
            >
              <progress
                :value="uploadProgress"
                max="100"
              ></progress>
              <div>{{ uploadProgress }}%</div>
            </div>
          </div>
        </label>
        <div
          class="max-w-sm"
          v-else
        >
          <img
            :src="APP_URL + link.icon"
            alt=""
          >
        </div>
        <base-button
          v-if="!checkUploadProgress"
          @click="deleteUploadedImg(linkId)"
          mode="full err"
        >remove</base-button>
      </div>
      <!-- CHOOSE IMAGE -->
      <div v-if="actionIcons">
        <strong>
          Icons by
          <a
            class="text-blue-500 underline"
            href="https://boxicons.com/"
            target="_blank"
          >Boxicons</a>
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
        <ul class="flex flex-wrap gap-4 justify-center overflow-y-scroll max-h-[340px]">
          <h3 v-if="iconNotFound">No icon found</h3>
          <button
            class="size-[70px] rounded-md border hover:bg-lightSeconder outline-none focus:bg-purple-100"
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
import { Link } from '@/types/interfacesLink';

const emit = defineEmits([ "set-close-Thumbnail" ]);

const props = defineProps<{ linkId: string }>();

const store = useStore();

const actionIcons = ref<boolean>(false);
const actionUpload = ref<boolean>(false);
const isDrop = ref<boolean>(false);
const searchIcons = ref<string>("");
const boxIcons = ref<BoxIcons[]>([]);
const isUploading = ref<boolean>(false);
const APP_URL = ref(process.env.VUE_APP_URL)

const closeThumbnail = () => emit("set-close-Thumbnail");
const openListIcons = () => (actionIcons.value = true);
const openUploadImg = () => (actionUpload.value = true);

const backToChooseBtn = () => {
  actionIcons.value = false
  actionUpload.value = false;
};

const iconNotFound = computed<boolean>(() => icons.value && icons.value.length === 0);
const uploadProgress = computed<number>(() => store.getters[ 'links/uploadProgress' ]);
const link = computed<Link>(() => {
  return store.getters[ 'links/links' ].find((link: Link) => link.id === props.linkId)
});
const checkUploadProgress = computed<boolean>(() => {
  const uploadProgressFunc = store.getters[ 'links/checkUploadProgress' ];
  return uploadProgressFunc(props.linkId) && !link.value.icon.includes('icons/');
});

const icons = computed(() => {
  if (boxIcons.value) {
    return boxIcons.value.filter((icon) =>
      icon.name.toLowerCase().startsWith(searchIcons.value)
    );
  } else {
    return [];
  }
});

const startDragFile = () => isDrop.value = true;
const endDragFile = () => isDrop.value = false;

const uploadImgFile = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const imgInputFile = input.files[ 0 ];
    submitUploadFile(imgInputFile);
  }
};

const dropImgFile = (e: DragEvent) => {
  if (!checkUploadProgress.value) return
  const imgFile = e.dataTransfer?.files[ 0 ];
  if (imgFile) submitUploadFile(imgFile);
};

const submitUploadFile = async (data: File) => {
  try {
    isUploading.value = true;
    await store.dispatch('links/uploadLinkImg', { data: data, id: props.linkId });
  } catch (err) {
    console.log((err as Error).message);
    isUploading.value = false;
  }
};

const deleteUploadedImg = async (id: string) => {
  try {
    await store.dispatch('links/deleteUploadedImg', { id: id, title: link.value.title })
  } catch (err) {
    console.log((err as Error).message);
  }
};

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
  @apply flex items-center justify-between gap-4 w-full p-2 border rounded-md duration-300 ease-out transition-all hover:bg-lightSeconder;
}

progress {
  -webkit-appearance: none;
  @apply bg-bg h-2 w-[300px] max-[1000px]:w-[200px] border border-border rounded-full;
}

progress::-webkit-progress-bar {
  @apply bg-bg rounded-full;
}

progress::-webkit-progress-value {
  @apply bg-seconder rounded-full;
}

progress::-moz-progress-bar {
  @apply bg-seconder rounded-full;
}
</style>
