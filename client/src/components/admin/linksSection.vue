<template>
  <li
    class="link-content-style"
    :class="{ dragging: isDrag }"
    :id="linkId"
    draggable="true"
    @dragstart="startDragElement()"
    @dragend="endDragElement()"
  >
    <section class="sec-one grid items-center">
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
        <ol class="links-actions flex gap-8 mt-2">
          <div
            :class="{ 'action-act': actionAct === 1 }"
            @click="activateAction(1)"
          >
            <appIcon name="appearance" size="20px" />
            <BaseActionHover title="layout" />
          </div>
          <div
            :class="{ 'action-act': actionAct === 2 }"
            @click="activateAction(2)"
          >
            <appIcon name="image" size="20px" />
            <BaseActionHover title="thumbnail" />
          </div>
          <div
            :class="{ 'action-act': actionAct === 3 }"
            @click="activateAction(3)"
          >
            <appIcon name="share" size="20px" />
            <BaseActionHover title="share" />
          </div>
          <div
            :class="{ 'action-act': actionAct === 4 }"
            @click="activateAction(4)"
          >
            <appIcon name="delete" size="20px" />
            <BaseActionHover title="delete" />
          </div>
        </ol>
      </div>
      <div class="checkbox-style">
        <input
          type="checkbox"
          v-model="props.linkChecked"
          class="hidden"
          :id="`disable-${props.linkId}`"
          :disabled="!props.linkTitle"
        />
        <label :for="`disable-${props.linkId}`"></label>
      </div>
    </section>

    <!-- LINK FUNCTIONS -->
    <section
      ref="sectionActions"
      class="sec-two grid"
      :class="{ 'open-sec-func': actionAct }"
    >
      <transition name="zaba" mode="out-in">
        <!-- LAYOUT -->
        <template v-if="actionAct === 1">
          <div class="layout">
            <div class="flex justify-between items-center mb-2">
              <h3>LAYOUT</h3>
              <base-button mode="close" @click="closeActions">
                <appIcon name="close" size="20px" />
              </base-button>
            </div>
            <p class="text-text2">Choose a layout for your link</p>
            <label
              for="classic"
              class="block p-4 rounded-xl border-border border-2"
            >
              <input type="radio" id="classic" class="hidden" />
              <span
                class="size-[30px] border-purple-500 border-2 relative rounded-full grid place-items-center"
              ></span>
            </label>
          </div>
        </template>
        <!-- THUMBNAIL -->
        <template v-else-if="actionAct === 2">
          <div class="flex justify-between items-center mb-2">
            <h3>THUMBNAIL</h3>
            <base-button mode="close" @click="closeActions">
              <appIcon name="close" size="20px" />
            </base-button>
          </div>
        </template>
        <!-- SHARE -->
        <template v-else-if="actionAct === 3">
          <div class="flex justify-between items-center mb-2">
            <h3>SHARE</h3>
            <base-button mode="close" @click="closeActions">
              <appIcon name="close" size="20px" />
            </base-button>
          </div>
        </template>
        <!-- DELETE -->
        <template v-else-if="actionAct === 4">
          <div class="flex justify-between items-center mb-2">
            <h3>DELETE</h3>
            <base-button mode="close" @click="closeActions">
              <appIcon name="close" size="20px" />
            </base-button>
          </div>
        </template>
      </transition>
    </section>
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
const sectionActions = ref<HTMLElement>();
const actionAct = ref<number | null>(1);
const isDrag = ref<boolean>(false);

// OPEN EDIT LINK TITLE
const openEditModeTitleLink = () => {
  isEditModeTitle.value = true;
  nextTick(() => (inputTitleLink.value as HTMLInputElement).focus());
};

const handledInputLinkTitleBlur = () => {
  isEditModeTitle.value = false;
};
// END

// OPEN EDIT LINK
const openEditModeLink = () => {
  isEditModeLink.value = true;
  nextTick(() => (inputLink.value as HTMLInputElement).focus());
};

const handledInputLinkBlur = () => (isEditModeLink.value = false);
// END

// OPEN ACTIONS
const activateAction = (numAct: number) => (actionAct.value = numAct);

// CLOSE ACTIONS
const closeActions = () => {
  (sectionActions.value as HTMLElement).classList.remove("open-sec-func");
  setTimeout(() => (actionAct.value = 0), 200);
};

const startDragElement = () => (isDrag.value = true);

const endDragElement = () => (isDrag.value = false);
</script>

<style scoped lang="scss">
@import "@/scss//helpers/mixins";

li {
  section {
    margin-top: 0 !important;
  }
  .sec-one {
    grid-template-columns: 30px 1fr auto;
    .links-actions div {
      @apply cursor-pointer transition-all
    duration-300 ease-out p-1 rounded-md relative text-text2;

      &:hover {
        @apply bg-bg;
      }
      &.action-act {
        @apply bg-purple-500 text-white;
        &:hover #title-hover {
          @apply hidden;
        }
      }
    }
  }

  .sec-two {
    grid-template-rows: 0fr;
    transition: grid-template-rows ease-out 300ms;
    &.open-sec-func {
      grid-template-rows: 1fr;
      margin-top: 1rem !important;
      @apply border-t pt-4;
    }

    div {
      @apply overflow-hidden;
    }

    .layout {
      label {
        @apply cursor-pointer;

        span::before {
          content: "";
          position: absolute;
          transform: scale(0);
          display: block;
          width: 15px;
          aspect-ratio: 1 / 1;
          border-radius: 50%;
          transition: 300ms ease transform;
          @apply bg-purple-500;
        }

        input[type="radio"]:checked ~ span::before {
          transform: scale(1);
        }
      }
    }
  }
}

@include setAnimation("zaba", null, null, "opacity");
</style>
