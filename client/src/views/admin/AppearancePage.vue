<template>
  <section>
    <h1>Profile</h1>
    <AppearanceProfile />
    <h1>Theme</h1>
    <AppearanceTheme />
    <h1>Backgrounds</h1>
    <section class="base-card-style mt-2">
      <div class="flex gap-4">
        <input
          type="color"
          id="input-color"
          @input="backgroundClr($event)"
          :value="color || bgClr"
        />
        <input
          type="text"
          placeholder="color"
          class="bg-bg pl-4 rounded-md border-border border"
          :value="color || bgClr"
          @input="backgroundClr($event)"
          maxlength="9"
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

const store = useStore();

const color = ref<string>('');
const bgClr = computed<string>(() => store.getters[ 'theme/theme' ].bgClr);

const backgroundClr = async (e: Event) => {
  color.value = (e.target as HTMLInputElement).value;
  try {
    await store.dispatch('theme/changeBgClr', color.value);
  } catch (err) {
    console.error((err as Error).message);
  }
}
</script>

<style scoped lang="scss">
#input-color {
  @apply size-[50px] cursor-pointer bg-transparent appearance-none;

  &::-webkit-color-swatch {
    @apply rounded-md border-none;
  }

  &::-moz-color-swatch {
    @apply rounded-md border-none
  }
}
</style>
