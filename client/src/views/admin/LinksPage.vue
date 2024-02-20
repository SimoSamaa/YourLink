<template>
  <section class="admin-page">
    <h1>Links</h1>
    <header class="flex justify-between pb-4 border-b-[1px] border-border">
      <base-button mode="white-btn" @click="handledAddeHeader">
        <appIcon name="header" />
        add headers
      </base-button>
      <base-button mode="white-btn add">
        <appIcon name="add" />
        add link
      </base-button>
    </header>
    <transition-group
      tag="ul"
      appear
      name="animated-headers"
      @after-enter="focusInput"
      class="relative headers-container grid gap-4 mt-4"
      @dragover.prevent="dropDragElement"
      @drop="changeElementOrders($event)"
    >
      <li
        v-for="(header, ind) in headers"
        :data-index="ind"
        :key="header.id"
        :id="header.id"
        draggable="true"
        class="bg-white space-y-2 p-4 rounded-xl border-border border shadow-sm w-full"
        :class="{ dragging: header.isDrag }"
        @dragstart="startDragElement(header)"
        @dragend="endDragElement(header)"
      >
        <div class="flex justify-between items-center gap-2 relative">
          <span v-if="header.isEdit" class="absolute bottom-1 left-8 text-sm">
            {{ header.title.length }}/20
          </span>
          <div class="drager cursor-grab">
            <appIcon name="dotes" />
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
              @blur="handledHeaderEmpty($event, header)"
              @keydown.enter.prevent.stop="handledHeaderEmpty($event, header)"
              @input="InputValue($event, header)"
              maxlength="20"
            />
            <appIcon
              v-if="!header.isEdit"
              name="edit"
              class="cursor-pointer"
              @click="editHeader(header)"
            />
          </div>
          <div class="actions grid gap-4 place-items-center">
            <input
              type="checkbox"
              :id="`disable-${header.id}`"
              class="hidden"
              :disabled="!header.title"
              v-model="header.isDisable"
            />
            <label
              class="relative block w-10 h-5 rounded-full bg-gray-200 shadow"
              :for="`disable-${header.id}`"
            ></label>
            <base-button
              mode="err"
              :disabled="header.isOpenDelete"
              @click="openDeleteHeader(header)"
            >
              <appIcon name="delete" />
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
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, nextTick, onMounted } from "vue";
import { useStore } from "vuex";
import { HeaderLinks } from "../../types/interfaces";

const store = useStore();

const headers = computed<HeaderLinks[]>(() => store.getters["links/headers"]);

const editHeader = (header: HeaderLinks) => {
  header.isEdit = !header.isEdit;
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
const handledHeaderEmpty = async (e: Event, header: HeaderLinks) => {
  header.isEdit = false;
  checkHeaderIFDisable(e, header);

  const updatedHeaders = {
    id: header.id,
    title: header.title,
    isDisable: header.isDisable,
  };
  // if (e.target.value.length <= 25) return;
  console.log(updatedHeaders); // if title empty stop

  // await store.dispatch("links/updateHeader", updatedHeaders);
};

const checkHeaderIFDisable = (e: Event, header: HeaderLinks) => {
  if (e.target instanceof HTMLInputElement) {
    // if (e.target.value.length <= 25) {
    //   console.log("yes");
    // } else {
    //   console.log("no");
    // }
    !header.title ? (header.isDisable = false) : (header.isDisable = true);
  }
};

const InputValue = (e: any, header: any) => {
  header.title = e.target.value;
};

const openDeleteHeader = (header: HeaderLinks) => {
  header.isOpenDelete = true;
};

headers.value.sort((a, b) => a.dataIndex - b.dataIndex);

const startDragElement = (header: HeaderLinks) => {
  console.log("start");
  header.isDrag = true;
};

const endDragElement = (header: HeaderLinks) => {
  console.log("end");
  header.isDrag = false;
};

const dropDragElement = (e: DragEvent) => {
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
const changeElementOrders = (e: DragEvent) => {
  const target = e.currentTarget as Element;
  const items = [...target.querySelectorAll("li")];
  const updatedHeaders = items.map((item, index) => ({
    ...headers.value.find((header) => header.id === item.id),
    dataIndex: index,
  }));

  store.dispatch("links/UpdateHeaderOrder", updatedHeaders);
};

// CREATE HEADER
const handledAddeHeader = async () => {
  interface headerData {
    title: string;
    isDisable: boolean;
    dataIndex: number;
  }

  const header: headerData = {
    title: "",
    isDisable: false,
    dataIndex: headers.value.length,
  };

  await store.dispatch("links/addHeaderLink", header);
};

// DELETE HEADER
const handledDeleteHeader = async (id: string) => {
  await store.dispatch("links/deleteHeaderLink", id);
};

// LOAD HEADERS DATA
const loadHeaders = async () => {
  await store.dispatch("links/featchHeaders");
};

loadHeaders();

onMounted(() => {
  const a = document.querySelectorAll<Element>("ul li input") as NodeList;
  a.forEach((b) => {
    b.addEventListener("input", () => {
      if (b instanceof HTMLInputElement) {
        console.log(b.id, b.checked);
      }
    });
  });
});
</script>

<style scoped lang="scss">
@import "../../scss/helpers/mixins";

li {
  transition: opacity 300ms ease, border 300ms ease-in;
  &.dragging {
    @apply border-text2 border opacity-0;
  }
  .actions {
    label {
      &:before {
        @apply content-[''] w-5 h-5 rounded-full cursor-pointer
        top-0 left-0 absolute transition-[left] duration-300
        ease-out bg-white border-gray-200 border-2;
      }
    }

    input:checked ~ label {
      @apply bg-sky-500;
    }

    input:checked ~ label::before {
      @apply left-5 border-sky-500;
    }

    input:disabled ~ :is(label::before, label) {
      @apply cursor-no-drop bg-opacity-50;
    }
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
</style>
