<template>
  <section class="admin-page">
    <h1>Links</h1>
    <header class="flex justify-between pb-4 border-b-[1px] border-border">
      <base-button mode="white-btn">
        <appIcon name="header" />
        headers
      </base-button>
      <base-button mode="white-btn add">
        <appIcon name="add" />
        add link
      </base-button>
    </header>
    <ul
      class="headers-container grid gap-4 mt-4"
      @dragover.prevent="dropDragElement"
    >
      <li
        v-for="header in headers"
        :key="header.id"
        draggable="true"
        class="bg-white space-y-2 p-4 rounded-xl border-border border shadow-sm"
        :class="{ dragging: header.isDrag }"
        @dragstart="startDragElement(header)"
        @dragend="endDragElement(header)"
      >
        <div class="flex justify-between items-center gap-2 relative">
          <span v-if="header.isEdit" class="absolute bottom-4 left-24 text-sm">
            {{ header.title.length }}/25
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
              class="inputHeader text-center outline-none w-full"
              @blur="handledHeaderEmpty(header)"
              maxlength="25"
              @input="zaba($event, header)"
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
            />
            <label
              class="relative block w-10 h-5 rounded-full bg-gray-400 shadow"
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
              <base-button mode="err">delete</base-button>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onUpdated, onMounted } from "vue";
import { useStore } from "vuex";
import { HeaderLinks } from "../../types/interfaces";

const store = useStore();

const isDrag = ref<boolean>(false);

const headers = computed<HeaderLinks[]>(() => store.getters["links/headers"]);

const editHeader = (header: HeaderLinks) => {
  header.isEdit = !header.isEdit;
};

const handledHeaderEmpty = (header: HeaderLinks) => {
  header.isEdit = false;
};

const zaba = (e: Event, header: HeaderLinks) => {
  if (e.target instanceof HTMLInputElement) {
    // if (e.target.value.length <= 25) {
    //   console.log("yes");
    // } else {
    //   console.log("no");
    // }
    header.title = e.target.value;
  }
};

const openDeleteHeader = (header: HeaderLinks) => {
  header.isOpenDelete = true;
};

const startDragElement = (header: HeaderLinks) => {
  console.log("start");
  header.isDrag = true;
};

const endDragElement = (header: HeaderLinks) => {
  console.log("end");
  header.isDrag = false;
};

const dropDragElement = (e: any) => {
  const headersContainer = document.querySelector(".headers-container");
  const draggingItem = document.querySelector(".dragging");

  const afterElement = getDragAfterElement(headersContainer, e.clientY);
  if (afterElement == null) {
    headersContainer.appendChild(draggingItem);
  } else {
    headersContainer.insertBefore(draggingItem, afterElement);
  }
};

function getDragAfterElement(container: any, y: any) {
  let draggableElements = Array.from(
    container.querySelectorAll("li:not(.dragging)")
  );
  draggableElements = draggableElements.find((element) => {
    const { top, bottom } = element.getBoundingClientRect();
    const offset = y - (top + bottom) / 2;
    return offset < 0;
  });

  return draggableElements;
}

onUpdated(() => {
  const inputHeader = document.querySelector(".inputHeader");
  if (inputHeader instanceof HTMLInputElement) {
    inputHeader.focus();
  }
});

onMounted(() => {
  // const a = document.querySelectorAll<Element>("ul li input") as NodeList;
  // a.forEach((b) => {
  //   b.addEventListener("input", () => {
  //     if (b instanceof HTMLInputElement) {
  //       console.log(b.id, b.checked);
  //     }
  //   });
  // });
});
</script>

<style scoped lang="scss">
.actions {
  label {
    &:before {
      @apply content-[''] w-5 h-5 rounded-full cursor-pointer
    top-0 left-0 absolute transition-[left] duration-300
    ease-out bg-white border-gray-400 border-2;
    }
  }

  input:checked ~ label {
    @apply bg-sky-500;
  }

  input:checked ~ label::before {
    @apply left-5 border-sky-500;
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
    overflow: hidden;
  }
}
</style>
