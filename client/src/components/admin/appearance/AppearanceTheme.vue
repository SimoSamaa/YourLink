<template>
  <div class="base-card-style theme">
    <div class="selected">
      <button class="selected-theme p-2 border-black2 border-2">
        <div
          class="border-dotted border-black2 border-2 h-full rounded-lg grid place-content-center font-semibold text-lg p-4"
        >
          CREATE YOUR OWN
        </div>
      </button>
      <p class="bg-test font-semibold">Custom</p>
    </div>
    <div
      v-for="theme in themes"
      class="selected"
    >
      <button
        @click="selectedTheme(theme)"
        :class="[ 'selected-theme', actTheme(theme.name) ]"
        :id="theme.name"
      >
        <div
          :class="[ 'h-full grid place-items-center rounded-md duration-150 ease-out transition-transform', theme.page ]"
        >
          <div class="w-full grid gap-4 px-4">
            <span
              v-for="ind in 3"
              :class="[ 'h-8 rounded-full', theme.link ]"
            ></span>
          </div>
        </div>
      </button>
      <p class="font-semibold capitalize">{{ theme.name }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Theme } from "@/types/interfacesTheme";

const store = useStore();

const themes = computed<Theme[]>(() => store.getters[ 'theme/themes' ]);

const currentTheme = ref<string>('');

const actTheme = computed(() => {
  return (themeName: string) => {
    const theme: Theme = store.getters[ 'theme/theme' ];
    if (theme.bgClr == undefined) {
      return {
        'act': themeName === currentTheme.value || String(theme.name) === themeName,
      };
    }
  }
});

const selectedTheme = async (theme: Theme) => {
  currentTheme.value = theme.name
  try {
    await store.dispatch('theme/selectedTheme', { ...theme });
  } catch (err) {
    console.error((err as Error).message);
  }
};
</script>

<style lang="scss" scoped>
.theme {
  @apply mt-2 mb-4 grid gap-4 justify-between;
  grid-template-columns: repeat(auto-fit, minmax(min(150px, 100%), 1fr));

  .selected {
    @apply text-center;

    &-theme {
      @apply aspect-[1.4/2] rounded-md mb-2 w-full;

      &.act {
        @apply border-black2 border-2;
      }

      &.act > div {
        @apply scale-90
      }
    }
  }
}
</style>
