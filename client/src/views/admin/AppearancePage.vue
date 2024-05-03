<template>
  <section>
    <base-modal
      statuse="border-l-orange-500"
      :showing="!!error"
      :mess="error"
      @set-close-modal="closeModal()"
    ></base-modal>
    <h1>Profile</h1>
    <AppearanceProfile />
    <h1>Theme</h1>
    <AppearanceTheme
      :checkTheme
      @set-selectedTheme="selectedTheme()"
    />
    <h1>Backgrounds</h1>
    <section
      id="custom-section"
      class="base-card-style mt-2 mb-4"
    >
      <div class="flex gap-4">
        <input
          type="color"
          id="input-color"
          @input="backgroundClr($event)"
          :value="color || theme.bgClr"
        />
        <input
          type="text"
          placeholder="color"
          id="input-text"
          :value="color || theme.bgClr"
          @input="backgroundClr($event)"
          maxlength="9"
        >
      </div>
    </section>
    <h1>Buttons</h1>
    <section class="base-card-style mt-2">
      <h3>Fill</h3>
      <div class='link-container'>
        <button
          v-for="link in linksStyle[ 0 ]"
          :class="[ link.fill, currentStyle(link.fill) ]"
          @click="selecteLinkStyle(link)"
        >
        </button>
      </div>
      <h3>Outline</h3>
      <div class="link-container">
        <button
          v-for="link in linksStyle[ 1 ]"
          :class="[ link.outline, currentStyle(link.outline) ]"
          @click="selecteLinkStyle(link)"
        >
        </button>
      </div>
      <h3>Soft shadow</h3>
      <div class="link-container">
        <button
          v-for="link in linksStyle[ 2 ]"
          :class="[ link.softShadow, currentStyle(link.softShadow) ]"
          @click="selecteLinkStyle(link)"
        >
        </button>
      </div>
      <h3>Hard shadow</h3>
      <div class="link-container">
        <button
          v-for="link in linksStyle[ 3 ]"
          :class="[ link.hardShadow, currentStyle(link.hardShadow) ]"
          @click="selecteLinkStyle(link)"
        >
        </button>
      </div>
      <strong>Link color</strong>
      <div class="flex gap-4 my-4">
        <input
          type="color"
          id="input-color"
          @input="backgroundLinkClr($event)"
          :value="colorLink || theme.linkClr"
        />
        <input
          type="text"
          placeholder="color"
          id="input-text"
          @input="backgroundLinkClr($event)"
          :value="colorLink || theme.linkClr"
          maxlength="9"
        >
      </div>
      <strong>Link font color</strong>
      <div class="flex gap-4 my-4">
        <input
          type="color"
          id="input-color"
          @input="fontLinkClr($event)"
          :value="colorLinkFont || theme.fontLinkClr"
        />
        <input
          type="text"
          placeholder="color"
          id="input-text"
          maxlength="9"
          @input="fontLinkClr($event)"
          :value="colorLinkFont || theme.fontLinkClr"
        >
      </div>
      <strong>Shadow Color</strong>
      <div class="flex gap-4 my-4">
        <input
          type="color"
          id="input-color"
          @input="shadowLinkClr($event)"
          :value="colorLinkShadow || theme.shadowlinkClr"
        />
        <input
          type="text"
          placeholder="color"
          @input="shadowLinkClr($event)"
          id="input-text"
          maxlength="9"
          :value="colorLinkShadow || theme.shadowlinkClr"
        >
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import AppearanceProfile from "@/components/admin/appearance/AppearanceProfile.vue";
import AppearanceTheme from "@/components/admin/appearance/AppearanceTheme.vue";
import { LinksStyleArray, LinkStyle, Theme } from '@/types/interfacesTheme';
import { Link } from '@/types/interfacesLink';

const store = useStore();

const color = ref<string>('');
const colorLink = ref<string>('');
const colorLinkFont = ref<string>('');
const colorLinkShadow = ref<string>('');
const error = ref<string>('');
const checkTheme = ref<boolean>(true)
const errMess = 'Before you custom your link set a theme and select a link style'

const theme = computed<Theme>(() => store.getters[ 'theme/theme' ]);
const links = computed<Link[]>(() => store.getters[ 'links/links' ]);

const linksStyle = computed<LinksStyleArray>(() => store.getters[ 'theme/linksStyle' ]);

const currentStyle = computed(() => {
  return (style: string) => {
    return { 'current-style': style === theme.value.link }
  }
});

const selectedTheme = () => checkTheme.value = true;

const closeModal = () => error.value = '';

const backgroundClr = async (e: Event) => {
  color.value = (e.target as HTMLInputElement).value;
  try {
    await store.dispatch('theme/changeBgClr', color.value);
  } catch (err) {
    console.error((err as Error).message);
    error.value = errMess;
  }
};

const selecteLinkStyle = async (link: LinkStyle) => {
  if (links.value.length === 0) return error.value = 'No link to custom it';
  const styles = link.fill || link.outline || link.softShadow || link.hardShadow;
  checkTheme.value = false

  try {
    await store.dispatch('theme/changeBtnStyle', styles);
  } catch (err) {
    console.error((err as Error).message);
    error.value = errMess;
  }
}

const backgroundLinkClr = async (e: Event) => {
  if (links.value.length === 0) return error.value = 'No link to custom it';
  colorLink.value = (e.target as HTMLInputElement).value;

  try {
    await store.dispatch('theme/backgroundLinkClr', colorLink.value);
  } catch (err) {
    console.error((err as Error).message);
    error.value = errMess;
  }
}

const fontLinkClr = async (e: Event) => {
  if (links.value.length === 0) return error.value = 'No link to custom it';
  colorLinkFont.value = (e.target as HTMLInputElement).value;
  try {
    await store.dispatch('theme/fontLinkClr', colorLinkFont.value);
  } catch (err) {
    console.error((err as Error).message);
  }
}

const shadowLinkClr = async (e: Event) => {
  if (links.value.length === 0) return error.value = 'No link to custom it';
  colorLinkShadow.value = (e.target as HTMLInputElement).value;

  try {
    await store.dispatch('theme/shadowLinkClr', colorLinkShadow.value);
  } catch (err) {
    console.error((err as Error).message);
  }
}
</script>

<style scoped lang="scss">
#input-text {
  @apply bg-bg pl-4 rounded-md border-border border;
}

#input-color {
  @apply size-[50px] cursor-pointer bg-transparent appearance-none;

  &::-webkit-color-swatch {
    @apply rounded-md border-none;
  }

  &::-moz-color-swatch {
    @apply rounded-md border-none
  }
}

.link-container {
  @apply grid gap-4 my-4;
  grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));

  button {
    @apply h-[40px]
  }

  .current-style {
    @apply scale-75 outline-black outline outline-offset-[8px] duration-300 ease-out transition-transform;
  }
}
</style>
