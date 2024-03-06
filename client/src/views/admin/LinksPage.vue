<template>
  <section class="admin-page relative">
    <!-- ADD LINK -->
    <transition name="test">
      <AddLink v-if="linkPage" @set-close-AddLink="closeAddLink" />
    </transition>
    <!-- ADD ICON || IMG TO LINKS -->
    <transition name="test">
      <AddThumbnail
        v-if="thumbnail"
        :link-id="id"
        @set-close-Thumbnail="closeThumbnail"
      />
    </transition>
    <h1>Links</h1>
    <header class="flex justify-between pb-4 border-b-[1px] border-border mb-4">
      <base-button mode="white-btn" @click="handledAddeHeader">
        <appIcon name="header" />
        add headers
      </base-button>
      <base-button mode="white-btn" @click="openAddLinkPage">
        <appIcon name="add" />
        add link
      </base-button>
    </header>
    <!-- HEADERS -->
    <transition-group
      v-if="!thumbnail && !linkPage"
      tag="ul"
      appear
      name="animated-headers"
      @after-enter="focusInput"
      class="link-container-style headers-container"
      :style="checkMarginBottom"
      @dragover.prevent="dropDragElementHeaders"
      @drop="changeElementOrders($event)"
    >
      <li
        v-for="header in headers"
        :key="header.id"
        :id="header.id"
        draggable="true"
        class="link-content-style"
        :class="{ dragging: header.isDrag }"
        @dragstart="startDragElement(header)"
        @dragend="endDragElement(header)"
      >
        <div class="flex justify-between items-center gap-2 relative">
          <span v-if="header.isEdit" class="absolute bottom-1 left-8 text-sm">
            {{ header.title.length }}/20
          </span>
          <div class="drager cursor-grab" title="move">
            <appIcon name="dotes" size="20px" />
          </div>
          <div class="flex gap-2 font-semibold text-xl">
            <div v-if="!header.isEdit">
              {{ header.title }}
              <span v-if="!header.title" class="text-border"
                >Headline title</span
              >
            </div>
            <input
              v-else
              :value="header.title"
              type="text"
              class="input-header text-center outline-none w-full"
              @keydown.enter.prevent="handledUpdateHeaderKey($event, header)"
              @blur.prevent="
                handledUpdateHeaderBlur($event, header, header.oldTitle)
              "
              @input="InputValue($event, header)"
              maxlength="20"
            />
            <appIcon
              v-if="!header.isEdit"
              name="edit"
              size="20px"
              class="cursor-pointer"
              @click="editHeader(header)"
            />
          </div>
          <div class="checkbox-style grid gap-4 place-items-center">
            <input
              type="checkbox"
              v-model="header.isDisable"
              class="hidden"
              :id="`disable-${header.id}`"
              :disabled="!header.title"
              @change="hideHeader($event, header.id)"
            />
            <label
              class="relative block w-10 h-5 rounded-full bg-gray-200 shadow"
              :for="`disable-${header.id}`"
            ></label>
            <base-button
              mode="err"
              class="disabled:hidden"
              :disabled="header.isOpenDelete"
              @click="openDeleteHeader(header)"
            >
              <BaseActionHover title="delete" />
              <appIcon name="delete" size="20px" />
            </base-button>
          </div>
        </div>
        <div
          class="delete-header"
          :class="{ 'open-delete': header.isOpenDelete }"
        >
          <div>
            <h3 class="text-center">Delete this forever?</h3>
            <div class="columns-2 gap-4 mt-4 [&_button]:w-full">
              <base-button @click="header.isOpenDelete = false"
                >cancel</base-button
              >
              <base-button mode="err" @click="handledDeleteHeader(header.id)"
                >delete</base-button
              >
            </div>
          </div>
        </div>
      </li>
    </transition-group>
    <!-- LINKS -->
    <ul
      v-if="!thumbnail && !linkPage"
      class="link-container-style links-container"
      @dragover.prevent="dropDragElementLinks"
    >
      <linksSection
        v-for="link in links"
        :key="link.id"
        :link-id="link.id"
        :link-title="link.title"
        :link="link.link"
        :link-checked="link.isDisable"
        :link-layout="link.layout"
        @set-thumbnail="openThumbnail"
      ></linksSection>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick } from "vue";
import { useStore } from "vuex";
import linksSection from "@/components/admin/linksSection.vue";
import { HeaderLinks, Header, HeaderWithId } from "@/types/interfacesHeader";
import { link } from "@/types/interfacesLink";
import BaseActionHover from "@/components/UI/BaseActionHover.vue";
import AddThumbnail from "@/components/admin/AddThumbnail.vue";
import AddLink from "@/components/admin/AddLink.vue";

const store = useStore();

const headers = computed<HeaderLinks[]>(() =>
  store.getters["links/headers"].sort(
    (a: { dataIndex: number }, b: { dataIndex: number }) =>
      a.dataIndex - b.dataIndex
  )
);
const links = computed<link[]>(() =>
  store.getters["links/links"].sort(
    (a: { dataIndex: number }, b: { dataIndex: number }) =>
      a.dataIndex - b.dataIndex
  )
);

const checkMarginBottom = computed<{ marginBottom: string }>(() => {
  return { marginBottom: `${headers.value.length === 0 ? "0" : "1rem"}` };
});

// ADD LINK (PAGE)
const linkPage = ref<boolean>(false);

const openAddLinkPage = () => (linkPage.value = true);
const closeAddLink = (close: boolean) => (linkPage.value = close);

// BOXICONS & UPLOAD LOGOG LINK (PAGE)
const id = ref<string>("");
const thumbnail = ref<boolean>(false);
const openThumbnail = ({ linkId, open }: { linkId: string; open: boolean }) => {
  thumbnail.value = open;
  id.value = linkId;
};
const closeThumbnail = () => (thumbnail.value = false);

const editHeader = (header: HeaderLinks) => {
  header.isEdit = true;
  header.oldTitle = header.title;
  if (header.isEdit) focusInput();
};

const focusInput = () => {
  nextTick(() => {
    const inputHeader = document.querySelector(".input-header");
    if (inputHeader instanceof HTMLInputElement) {
      inputHeader.focus();
    }
  });
};

// UPDATE HEADER
// USE KEY EVENT
const handledUpdateHeaderKey = async (e: Event, header: HeaderLinks) => {
  if (header.isEdit === true) {
    header.isEdit = false;
    return checkHeaderIFDisable(e, header);
  }
};

// USE BLUR EVENT
const handledUpdateHeaderBlur = async (
  e: Event,
  header: HeaderLinks,
  oldValue: string
) => {
  header.isEdit = false;
  checkHeaderIFDisable(e, header);

  const updatedValue = (e.target as HTMLInputElement).value;
  if (updatedValue === oldValue || updatedValue.length > 20) return;

  const updatedHeader: HeaderWithId = {
    id: header.id,
    title: updatedValue,
    isDisable: header.isDisable,
    dataIndex: header.dataIndex,
  };

  try {
    await store.dispatch("links/updateHeader", updatedHeader);
  } catch (err) {
    (err as Error).message;
  }
};

const checkHeaderIFDisable = (e: Event, header: HeaderLinks) => {
  if (e.target instanceof HTMLInputElement) {
    !header.title ? (header.isDisable = false) : (header.isDisable = true);
  }
};

const hideHeader = async (e: Event, id: string) => {
  const checkedValue = (e.target as HTMLInputElement).checked;
  try {
    await store.dispatch("links/updateHideHeader", {
      id: id,
      isDisable: checkedValue,
    });
  } catch (err) {
    (err as Error).message;
  }
};

const InputValue = (e: Event, header: HeaderLinks) => {
  const inputHeader = (e.target as HTMLInputElement).value.trim();
  if (inputHeader == "") header.isDisable = false;
  header.title = inputHeader;
};

const openDeleteHeader = (header: HeaderLinks) => (header.isOpenDelete = true);

const startDragElement = (header: HeaderLinks) => (header.isDrag = true);

const endDragElement = (header: HeaderLinks) => (header.isDrag = false);

const dropDragElementHeaders = (e: DragEvent) => {
  const headersContainer = document.querySelector(
    ".headers-container"
  ) as HTMLElement;

  const draggingItem = document.querySelector(".dragging") as HTMLElement;
  const afterElement = getDragAfterElement(headersContainer, e.clientY);

  if (afterElement == null) {
    headersContainer.appendChild(draggingItem);
  } else {
    headersContainer.insertBefore(draggingItem, afterElement);
  }
};

const dropDragElementLinks = (e: DragEvent) => {
  const linksContainer = document.querySelector(
    ".links-container"
  ) as HTMLElement;

  const draggingItem = document.querySelector(".dragging") as HTMLElement;
  const afterElement = getDragAfterElement(linksContainer, e.clientY);

  if (afterElement == null) {
    linksContainer.appendChild(draggingItem);
  } else {
    linksContainer.insertBefore(draggingItem, afterElement);
  }
};

function getDragAfterElement(
  container: HTMLElement,
  y: number
): HTMLElement | undefined {
  let draggableElements = Array.from(
    container.querySelectorAll("li:not(.dragging)")
  ) as HTMLElement[];

  const foundElement = draggableElements.find((element) => {
    const { top, bottom } = element.getBoundingClientRect();
    const offset = y - (top + bottom) / 2;
    return offset < 0;
  });

  return foundElement;
}

// CHANGE ORDERS ELEMENT IN DRAG
const changeElementOrders = async (e: DragEvent) => {
  const target = e.currentTarget as Element;
  const items = [...target.querySelectorAll("li")];
  const updatedHeaders = items.map((item, index) => ({
    ...headers.value.find((header) => header.id === item.id),
    dataIndex: index,
  }));

  try {
    await store.dispatch("links/updateHeaderOrder", updatedHeaders);
  } catch (err) {
    (err as Error).message;
  }
};

// CREATE HEADER
const handledAddeHeader = async () => {
  const header: Header = {
    title: "",
    isDisable: false,
    dataIndex: 0,
  };

  try {
    await store.dispatch("links/addHeaderLink", header);
  } catch (err) {
    (err as Error).message;
  }
};

// DELETE HEADER
const handledDeleteHeader = async (id: string) => {
  await store.dispatch("links/deleteHeaderLink", id);
};

const loadData = async () => {
  try {
    // LOAD HEADERS DATA
    await store.dispatch("links/featchHeaders");
    // LOAD LINKS DATA
    await store.dispatch("links/fetchLinks");
  } catch (err) {
    console.log((err as Error).message);
  }
};

loadData();
</script>

<style scoped lang="scss">
@import "../../scss/helpers/mixins";

li {
  transition: opacity 300ms ease, border 300ms ease-in;
  &.dragging {
    opacity: 0;
    border: 3px solid var(--text2) !important;
  }

  .delete-header {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows ease-out 300ms;

    &.open-delete {
      grid-template-rows: 1fr;
      @apply border-t p-4;
    }

    div {
      @apply overflow-hidden;
    }
  }
}

@include setAnimation(
  "animated-headers",
  (
    transform: scaleY(0.6) translateX(-200px),
    opacity: 0,
  ),
  (
    opacity: 1,
    transform: scaleY(1) translateX(0),
  ),
  null
);

@include setAnimation(
  "test",
  (
    transform: translateY(-200px),
    opacity: 0,
  ),
  (
    opacity: 1,
    transform: translateX(0),
  ),
  null
);
</style>
