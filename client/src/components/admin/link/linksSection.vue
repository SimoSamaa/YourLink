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
      <div
        class="drager cursor-grab"
        title="move"
      >
        <appIcon
          name="dotes"
          size="20px"
        />
      </div>
      <div class="ml-8 max-[650px]:m-2">
        <!-- TITLE LINK -->
        <div>
          <div
            v-if="!isEditModeTitle"
            class="flex font-semibold gap-2 items-center"
          >
            <p v-if="linkTitle">{{ props.linkTitle }}</p>
            <p
              v-else
              class="text-border"
            >Title</p>
            <div
              @click="openEditModeTitleLink(props.linkTitle)"
              class="mb-1 cursor-pointer"
            >
              <appIcon
                name="edit"
                size="20px"
              />
            </div>
          </div>
          <input
            v-else
            @blur="handledInputLinkTitleBlur($event, props.linkId)"
            @keydown.enter.prevent="
              handledInputLinkTitleBlur($event, props.linkId)
              "
            type="text"
            :value="props.linkTitle"
            ref="inputTitleLink"
            class="outline-none w-1/2 h-[28px] font-semibold"
            maxlength="15"
          />
        </div>
        <!-- LINK -->
        <div>
          <div
            v-if="!isEditModeLink"
            class="flex gap-2 items-center"
          >
            <p
              v-if="link"
              class="text-ellipsis text-nowrap overflow-hidden max-w-[300px] max-[650px]:max-w-[200px]"
            >
              {{ props.link }}
            </p>
            <p
              v-else
              class="text-border font-semibold"
            >URL</p>
            <div
              @click="openEditModeLink(props.link)"
              class="mb-1 cursor-pointer"
            >
              <appIcon
                name="edit"
                size="20px"
              />
            </div>
          </div>
          <input
            v-else
            @blur="handledInputLinkBlur($event, props.linkId)"
            @keydown.enter.prevent="handledInputLinkBlur($event, props.linkId)"
            type="text"
            :value="props.link"
            ref="inputLink"
            class="outline-none w-1/2 h-[28px]"
          />
        </div>
        <ol class="links-actions flex gap-8 mt-2">
          <div
            :class="{ 'action-act': actionAct === 1 }"
            @click="activateAction(1)"
          >
            <appIcon
              name="appearance"
              size="20px"
            />
            <BaseActionHover title="layout" />
          </div>
          <div
            :class="{ 'action-act': actionAct === 2 }"
            @click="activateAction(2)"
          >
            <appIcon
              name="image"
              size="20px"
            />
            <BaseActionHover title="thumbnail" />
          </div>
          <div
            :class="{ 'action-act': actionAct === 3 }"
            @click="activateAction(3)"
          >
            <appIcon
              name="share"
              size="20px"
            />
            <BaseActionHover title="share" />
          </div>
          <div
            :class="{ 'action-act': actionAct === 4 }"
            @click="activateAction(4)"
          >
            <appIcon
              name="delete"
              size="20px"
            />
            <BaseActionHover title="delete" />
          </div>
        </ol>
      </div>
      <div class="checkbox-style">
        <input
          type="checkbox"
          class="hidden"
          :id="`disable-${props.linkId}`"
          :disabled="!props.linkTitle"
          :checked="props.linkChecked"
          @change="hideLink($event, props.linkId)"
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
      <transition
        name="opacity-animated"
        mode="out-in"
      >
        <!-- LAYOUT -->
        <template v-if="actionAct === 1">
          <div class="layout space-y-3">
            <div class="flex justify-between items-center">
              <h3>LAYOUT</h3>
              <base-button
                mode="close"
                @click="closeActions"
              >
                <appIcon
                  name="close"
                  size="20px"
                />
              </base-button>
            </div>
            <p class="text-text2">Choose a layout for your link</p>
            <label
              :for="`classic-${linkId}`"
              :class="{ 'checked-layout': props.linkLayout === 'classic' }"
            >
              <input
                type="radio"
                :id="`classic-${linkId}`"
                :name="`layout-${props.linkId}`"
                value="classic"
                @change="chooseLayout('classic', props.linkId)"
                :checked="props.linkLayout === 'classic' ? true : false"
              />
              <span></span>
              <div class="mr-auto max-[650px]:m-0">
                <strong>Classic</strong>
                <p class="text-text2">Efficient, direct and compact.</p>
              </div>
              <div
                class="h-8 w-[150px] max-[650px]:w-full bg-seconder rounded-full flex items-center justify-between p-2"
              >
                <div class="size-5 bg-white rounded-full"></div>
                <appIcon
                  name="more"
                  size="20px"
                  class="text-white"
                />
              </div>
            </label>
            <label
              :for="`featured-${linkId}`"
              :class="{ 'checked-layout': props.linkLayout === 'featured' }"
            >
              <input
                type="radio"
                :id="`featured-${linkId}`"
                :name="`layout-${props.linkId}`"
                @change="chooseLayout('featured', props.linkId)"
                :checked="props.linkLayout === 'featured' ? true : false"
              />
              <span></span>
              <div class="mr-auto max-[650px]:m-0 max-w-[300px]">
                <strong>Featured</strong>
                <p class="text-text2">
                  Make your link stand out with a larger, more attractive
                  display.
                </p>
              </div>
              <div class="bg-seconder flex flex-col justify-between rounded-lg w-[150px] max-[650px]:w-full h-20 p-2">
                <div class="size-5 bg-white rounded-full"></div>
                <div class="flex items-center justify-between text-white text-[10px]">
                  <p>this is your link</p>
                  <appIcon
                    name="more"
                    size="20px"
                  />
                </div>
              </div>
            </label>
          </div>
        </template>
        <!-- THUMBNAIL -->
        <template v-else-if="actionAct === 2">
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3>THUMBNAIL</h3>
              <base-button
                mode="close"
                @click="closeActions"
              >
                <appIcon
                  name="close"
                  size="20px"
                />
              </base-button>
            </div>
            <p class="text-text2 mb-4">Add a Thumbnail or Icon to this Link.</p>
            <base-button
              @click="setThumbnail(props.linkId)"
              mode="full"
            >set Thumbnail</base-button>
          </div>
        </template>
        <!-- SHARE -->
        <template v-else-if="actionAct === 3">
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3>SHARE</h3>
              <base-button
                mode="close"
                @click="closeActions"
              >
                <appIcon
                  name="close"
                  size="20px"
                />
              </base-button>
            </div>
            <div class="flex justify-center">
              <ShareSocials />
            </div>
          </div>
        </template>
        <!-- DELETE -->
        <template v-else-if="actionAct === 4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3>DELETE</h3>
              <base-button
                mode="close"
                @click="closeActions"
              >
                <appIcon
                  name="close"
                  size="20px"
                />
              </base-button>
            </div>
            <base-button
              mode="full err"
              :disabled="processing"
              @click="deleteLink(props.linkId)"
            >
              <p v-if="!processing">delete link</p>
              <LoadingButton v-else />
            </base-button>
          </div>
        </template>
      </transition>
    </section>
  </li>
</template>

<script lang="ts" setup>
import { ref, PropType, nextTick, defineAsyncComponent } from "vue";
import { useStore } from "vuex";
import BaseActionHover from "@/components/UI/BaseActionHover.vue";
import LoadingSpinner from '../../UI/LoadingSpinner.vue'
const ShareSocials = defineAsyncComponent({
  loader: () => import('./ShareSocials.vue'),
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 3000
});

const props = defineProps({
  linkId: {
    type: String as PropType<string>,
    default: "",
  },
  linkTitle: {
    type: String as PropType<string>,
    default: "",
  },
  link: {
    type: String as PropType<string>,
    default: "",
  },
  linkChecked: Boolean as PropType<boolean>,
  linkLayout: String as PropType<string>,
});

const emit = defineEmits([ "set-thumbnail", "zaba-zaba" ]);

const store = useStore();

const isEditModeTitle = ref<boolean>(false);
const isEditModeLink = ref<boolean>(false);
const inputTitleLink = ref<HTMLElement | null>(null);
const inputLink = ref<HTMLElement | null>(null);
const sectionActions = ref<HTMLElement>();
const actionAct = ref<number | null>(null);
const isDrag = ref<boolean>(false);
const oldValue = ref<string>("");
const processing = ref<boolean>(false);

// OPEN EDIT LINK TITLE
const openEditModeTitleLink = (value: string) => {
  isEditModeTitle.value = true;
  oldValue.value = value;
  nextTick(() => (inputTitleLink.value as HTMLInputElement).focus());
};

const handledInputLinkTitleBlur = async (e: Event, id: string) => {
  isEditModeTitle.value = false;
  const linkTitle = (e.target as HTMLInputElement).value;
  if (linkTitle === oldValue.value || linkTitle.length > 15) return;
  if (linkTitle === "") hideLink(e, id);
  try {
    await store.dispatch("links/updateLinkTitle", {
      id: id,
      title: linkTitle,
    });
  } catch (err) { }
};
// END

// OPEN EDIT LINK
const openEditModeLink = (value: string) => {
  isEditModeLink.value = true;
  oldValue.value = value;
  nextTick(() => (inputLink.value as HTMLInputElement).focus());
};

const handledInputLinkBlur = async (e: Event, id: string) => {
  isEditModeLink.value = false;
  const link = (e.target as HTMLInputElement).value.trim();
  if (link === oldValue.value) return;
  if (link === "") hideLink(e, id);
  try {
    await store.dispatch("links/updateLink", {
      id: id,
      link: link,
    });
  } catch (err) { }
};
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

const setThumbnail = (id: string) => {
  emit("set-thumbnail", { linkId: id, open: true });
};

const hideLink = async (e: Event, id: string) => {
  const inputState = (e.target as HTMLInputElement).checked;
  const updatedHideLink = {
    id: id,
    isDisable: inputState,
  };

  try {
    await store.dispatch("links/updateHideLink", updatedHideLink);
  } catch (err) {
    (err as Error).message;
  }
};

// CHOOSE LAYOUT
const chooseLayout = async (layout: string, id: string) => {
  try {
    await store.dispatch("links/updateLayout", { id: id, layout: layout });
  } catch (err) {
    (err as Error).message;
  }
};

// DELETE LINK
const deleteLink = async (id: string) => {
  processing.value = true;
  try {
    await store.dispatch("links/deleteLink", id);
  } catch (err) {
    (err as Error).message;
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

li {
  section {
    margin-top: 0 !important;
  }

  .sec-one {
    grid-template-columns: 30px 1fr auto;

    .links-actions div {
      @apply cursor-pointer transition-all duration-300 ease-out p-1 rounded-md relative text-text2;

      &:hover {
        @apply bg-bg;
      }

      &.action-act {
        @apply bg-seconder text-white;

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
        @apply cursor-pointer flex gap-4 items-center justify-between p-4 rounded-xl border-border border duration-300 transition-all ease-out hover:bg-lightSeconder;

        &.checked-layout {
          @apply border-seconder border bg-lightSeconder;
        }

        @include breakpoint("sm") {
          @apply flex-col text-center;
        }

        input {
          @apply hidden;
        }

        span {
          @apply min-w-[30px] max-w-[30px] h-[30px] border-seconder border-2 relative rounded-full grid place-items-center max-[650px]:hidden;

          &::before {
            @apply content-[''] absolute size-4 rounded-full bg-seconder;
            transform: scale(0);
            transition: transform 300ms ease;
          }
        }

        input:checked ~ span::before {
          transform: scale(1);
        }
      }
    }
  }
}

@include setAnimation("opacity-animated", null, null, "opacity");
</style>
