<template>
  <section
    class="phone-containe border-l-[1px] border-border p-4 flex justify-center max-[1000px]:p-0"
  >
    <div
      ref="zaba"
      class="phone fixed top-1/2 -translate-y-1/2 rounded-3xl border-black2 border-8"
    ></div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
const zaba = ref();

onMounted(() => {
  window.addEventListener("resize", function () {
    var height = zaba.value.offsetHeight;
    var width = zaba.value.offsetWidth;

    if (height < width) {
      // zaba.value.style.width = height + "px";
      // zaba.value.style.width = height - 100 + "px";
    } else {
      zaba.value.style.width = height / 2 + "px";
    }
  });
});
</script>

<style scoped lang="scss">
.phone-containe {
  .phone {
    background-color: white;
    width: 250px;
    height: min(500px, 90%);

    &:before {
      @apply content-[''] absolute left-1/2 -top-1
          -translate-x-1/2 bg-black2 w-32 h-5 rounded-bl-lg rounded-br-lg;
    }
  }
}
</style>
