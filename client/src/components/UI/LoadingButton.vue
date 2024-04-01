<template>
  <div class="flex items-center gap-2">
    <div class="loading-spin border-border border-4 rounded-full relative animate-spin size-6"></div>
    <p>Processing...</p>
  </div>
</template>

<style scoped>
.loading-spin::before {
  @apply content-[''] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-6 border-4 border-white border-l-transparent border-t-transparent;
}
</style>
