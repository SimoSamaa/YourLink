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
    <ul class="grid gap-4 mt-4">
      <li
        v-for="header in headers"
        :key="header.id"
        draggable="true"
        class="bg-white p-4 rounded-xl border-border border shadow-sm flex justify-between items-center gap-2"
      >
        <appIcon name="dotes" class="cursor-grab" />
        <div class="flex gap-2 font-semibold text-xl">
          <div v-if="!header.isEdit">{{ header.title }}</div>
          <input
            v-else
            :value="header.title"
            type="text"
            class="inputHeader text-center outline-none w-full"
            @blur="header.isEdit = false"
          />
          <appIcon
            v-if="!header.isEdit"
            name="edit"
            class="cursor-pointer"
            @click="editHeader(header)"
          />
        </div>
        <div class="grid gap-4 place-items-center">
          <input type="checkbox" id="disable" class="hidden" />
          <label
            class="relative block w-10 h-5 rounded-full bg-gray-400 shadow"
            for="disable"
          ></label>
          <appIcon name="delete" />
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onUpdated } from "vue";
import { useStore } from "vuex";

const store = useStore();
const headers = computed(() => store.getters["links/headers"]);

const editHeader = (header: any) => {
  header.isEdit = !header.isEdit;
};

onUpdated(() => {
  const inputHeader = document.querySelector(".inputHeader");
  if (inputHeader instanceof HTMLInputElement) {
    inputHeader.focus();
  }
});
</script>

<style scoped lang="scss">
label {
  &:before {
    @apply content-[''] w-5 h-5 rounded-full cursor-pointer
    top-0 left-0 absolute transition-[left] duration-300
    ease-out bg-white border-gray-400 border-2;
  }
}

#disable:checked ~ label {
  @apply bg-sky-500;
}

#disable:checked ~ label::before {
  @apply left-5 border-sky-500;
}
</style>
