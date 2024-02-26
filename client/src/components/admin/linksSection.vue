<template>
  <li class="link-content-style grid items-center" draggable="true">
    <div class="drager cursor-grab">
      <appIcon name="dotes" size="20px" />
    </div>
    <div class="ml-8">
      <!-- TITLE LINK -->
      <div>
        <div
          v-if="!isEditModeTitle"
          class="flex font-semibold gap-2 items-center"
        >
          <p>{{ props.linkTitle }}</p>
          <div @click="openEditModeTitleLink" class="mb-1 cursor-pointer">
            <appIcon name="edit" size="20px" />
          </div>
        </div>
        <input
          v-else
          @blur="handledInputLinkTitleBlur"
          type="text"
          v-model="props.linkTitle"
          ref="inputTitleLink"
          class="outline-none w-1/2 h-[28px] font-semibold"
          maxlength="20"
        />
      </div>
      <!-- LINK -->
      <div>
        <div v-if="!isEditModeLink" class="flex gap-2 items-center">
          <p>{{ props.link }}</p>
          <div @click="openEditModeLink" class="mb-1 cursor-pointer">
            <appIcon name="edit" size="20px" />
          </div>
        </div>
        <input
          v-else
          @blur="handledInputLinkBlur"
          type="text"
          v-model="props.link"
          ref="inputLink"
          class="outline-none w-1/2 h-[28px]"
        />
      </div>
      <ul class="links-actions flex gap-8 mt-2">
        <li>
          <appIcon name="appearance" size="20px" />
          <BaseActionHover title="layout" />
        </li>
        <li>
          <appIcon name="image" size="20px" />
          <BaseActionHover title="thumbnail" />
        </li>
        <li>
          <appIcon name="share" size="20px" />
          <BaseActionHover title="share" />
        </li>
        <li>
          <appIcon name="delete" size="20px" />
          <BaseActionHover title="delete" />
        </li>
      </ul>
    </div>
    <div class="checkbox-style">
      <input
        type="checkbox"
        v-model="props.linkChecked"
        class="hidden"
        :id="`disable-${props.linkId}`"
        :disabled="!props.linkTitle"
      />
      <!-- @change="hideHeader($event, props.linkId)" -->
      <label :for="`disable-${props.linkId}`"></label>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { ref, PropType, nextTick } from "vue";
import BaseActionHover from "@/components/UI/BaseActionHover.vue";

const props = defineProps({
  linkId: String as PropType<string>,
  linkTitle: String as PropType<string>,
  link: String as PropType<string>,
  linkChecked: Boolean as PropType<boolean>,
});

const isEditModeTitle = ref<boolean>(false);
const isEditModeLink = ref<boolean>(false);
const inputTitleLink = ref<HTMLElement | null>(null);
const inputLink = ref<HTMLElement | null>(null);

// OPEN EDIT LINK TITLE
const openEditModeTitleLink = () => {
  isEditModeTitle.value = true;
  nextTick(() => (inputTitleLink.value as HTMLInputElement).focus());
};

const handledInputLinkTitleBlur = () => {
  isEditModeTitle.value = false;
};
// OPEN EDIT LINK
const openEditModeLink = () => {
  isEditModeLink.value = true;
  nextTick(() => (inputLink.value as HTMLInputElement).focus());
};

const handledInputLinkBlur = () => {
  isEditModeLink.value = false;
};
</script>

<style scoped lang="scss">
li {
  grid-template-columns: 30px 1fr auto;
  div {
    margin-top: 0 !important;
  }

  .links-actions li {
    @apply cursor-pointer transition-all
    duration-300 ease-out p-1 rounded-md relative;

    &:hover {
      @apply bg-bg;
    }
  }
}
</style>
