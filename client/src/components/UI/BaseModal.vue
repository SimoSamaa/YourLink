<template>
  <Teleport to="body">
    <transition name="modal-animation">
      <div
        :class="statuse"
        v-if="showing"
        class="fixed top-4 right-0 z-[100] w-[350px] shadow-md border-border border bg-white p-4 rounded-l-lg border-l-[8px]"
      >
        <div class="flex justify-between items-center gap-4">
          <p class="max-w-sm p-2">{{ mess }}</p>
          <base-button
            mode="close"
            @click="closeModal()"
          >
            <appIcon
              name="close"
              size="20px"
            />
          </base-button>
        </div>
        <div v-if="actions">
          <slot></slot>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
defineProps<{ mess: string, showing: boolean, actions: boolean, statuse: string }>();
const emit = defineEmits([ 'set-close-modal' ]);

const closeModal = () => emit('set-close-modal');
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

@include setAnimation("modal-animation",
  (transform: translateX(200px),
    opacity: 0,
  ),
  (opacity: 1,
    transform: translateX(0),
  ),
  null);
</style>
