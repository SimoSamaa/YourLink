<template>
  <section>
    <base-modal
      statuse="border-l-orange-500"
      :showing="error"
      mess="Before you custom your link set a theme"
      @set-close-modal="closeModal()"
    ></base-modal>
    <h1>Profile</h1>
    <AppearanceProfile />
    <h1>Theme</h1>
    <AppearanceTheme />
    <h1>Backgrounds</h1>
    <section class="base-card-style mt-2 mb-4">
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
    <!--  -->
    <h1>Buttons</h1>
    <section class="base-card-style mt-2">
      <h3>Fill</h3>
      <div class='link-container'>
        <button
          v-for="link in linksStyle[ 0 ]"
          :class="link.fill"
          @click="selecteLinkStyle(link)"
        >
        </button>
      </div>
      <h3>Outline</h3>
      <div class="link-container">
        <button
          v-for="link in linksStyle[ 1 ]"
          :class="link.outline"
          @click="selecteLinkStyle(link)"
        >
        </button>
      </div>
      <h3>Soft shadow</h3>
      <div class="link-container">
        <button
          v-for="link in linksStyle[ 2 ]"
          :class="link.softShadow"
          @click="selecteLinkStyle(link)"
        >
        </button>
      </div>
      <h3>Hard shadow</h3>
      <div class="link-container">
        <button
          v-for="link in linksStyle[ 3 ]"
          :class="link.hardShadow"
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
          :value="colorLinkFont"
        />
        <input
          type="text"
          placeholder="color"
          id="input-text"
          maxlength="9"
          @input="fontLinkClr($event)"
          :value="colorLinkFont"
        >
      </div>
      <strong>Shadow Color</strong>
      <div class="flex gap-4 my-4">
        <input
          type="color"
          id="input-color"
          @input="shadowLinkClr($event)"
          :value="colorLinkShadow"
        />
        <input
          type="text"
          placeholder="color"
          @input="shadowLinkClr($event)"
          id="input-text"
          maxlength="9"
          :value="colorLinkShadow"
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

const store = useStore();

const color = ref<string>('');
const colorLink = ref<string>('');
const colorLinkFont = ref<string>('');
const colorLinkShadow = ref<string>('');
const error = ref<boolean>(false);

const theme = computed<Theme>(() => store.getters[ 'theme/theme' ]);

const linksStyle = computed<LinksStyleArray>(() => store.getters[ 'theme/linksStyle' ]);

const closeModal = () => error.value = false;

const backgroundClr = async (e: Event) => {
  color.value = (e.target as HTMLInputElement).value;
  try {
    await store.dispatch('theme/changeBgClr', color.value);
  } catch (err) {
    console.error((err as Error).message);
    error.value = true;
  }
};

const selecteLinkStyle = async (link: LinkStyle) => {
  try {
    await store.dispatch('theme/changeBtnStyle', link.fill || link.outline || link.softShadow || link.hardShadow);
  } catch (err) {
    console.error((err as Error).message);
    error.value = true;
  }
}

const backgroundLinkClr = async (e: Event) => {
  colorLink.value = (e.target as HTMLInputElement).value;
  try {
    await store.dispatch('theme/backgroundLinkClr', colorLink.value);
  } catch (err) {
    console.error((err as Error).message);
    error.value = true;
  }
}

const fontLinkClr = async (e: Event) => {
  colorLinkFont.value = (e.target as HTMLInputElement).value;
  try {
    await store.dispatch('theme/fontLinkClr', colorLinkFont.value);
  } catch (err) {
    console.error((err as Error).message);
  }
}

const shadowLinkClr = async (e: Event) => {
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
}
</style>
