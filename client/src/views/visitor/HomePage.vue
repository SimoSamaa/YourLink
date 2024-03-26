<template>
  <section class="min-h-[calc(100dvh-74.4px)] grid">
    <div class="hero-sec p-10 grid place-content-center">
      <div class="max-w-xl text-[#9BA4CD]">
        <h1 class="text-pretty font-bold">Everything you are. In one, simple link in
          bio.</h1>
        <p class="mt-4 font-semibold">Join to people using
          <span class="bg-[#9ba4cd57] px-2 py-1 rounded-md">YOURLINK</span>
          for their link in bio. One link to help you share everything you create, curate
          and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
        </p>
      </div>
    </div>
    <div class="phone-container pr-11 max-[1000px]:pr-9 max-[650px]:p-0 grid place-content-center">
      <div
        ref="homePagePhone"
        class="phone rounded-2xl w-[300px] h-[500px] pt-4 p-8"
      >
        <img
          class="size-14 rounded-full mx-auto mb-20"
          src="@/assets/avatar.webp"
          alt="profile"
        >
        <div class="links space-y-4 text-center font-semibold text-border">
          <div>New article</div>
          <div>Buy my prints</div>
          <div>Travel vlog</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script
  lang="ts"
  setup
>
import { ref, onMounted } from 'vue';

const homePagePhone = ref<HTMLElement | null>(null);

onMounted(() => {
  const phone = (homePagePhone.value as HTMLDivElement)
  document.addEventListener("mousemove", (e) => contentMove(e, phone));

  function contentMove(event: MouseEvent | Touch, element: HTMLElement) {
    const x = event.clientX;
    const y = event.clientY;

    const middleX = window.innerWidth / 2;
    const middleY = window.innerHeight / 2;

    const offsetX = ((x - middleX) / middleX) * 30;
    const offsetY = ((y - middleY) / middleY) * 30;

    element.style.setProperty("--rotateX", offsetX + "deg");
    element.style.setProperty("--rotateY", -1 * offsetY + "deg");
  }

  document.addEventListener("touchmove", (e) => {
    [ ...e.changedTouches ].forEach((e: Touch) => contentMove(e, phone));
  });
})
</script>

<style
  scoped
  lang="scss"
>
@import '@/scss/helpers/mixins';

section {
  grid-template-columns: 2fr 1.5fr;

  h1 {
    text-shadow: 5px 5px 1px #d6cece;
    font-size: clamp(25px, 5vw, 60px);
    line-height: 1.2;
  }

  .phone {
    background: url('@/assets/bg.webp') no-repeat center /cover;
    transform-style: preserve-3d;
    transform:
      perspective(5000px) rotateY(var(--rotateX)) rotateX(var(--rotateY));

    &::before {
      @apply content-[''] blur-[15px] absolute bg-[#504b4b] inset-2 opacity-50;
      transform: translateZ(-50px);
    }

    img {
      transform: translateZ(20px);
    }

    .links {
      transform-style: preserve-3d;
    }

    .links>* {
      @apply px-4 py-2 rounded-full border-border border bg-[#ffffff33] backdrop-blur-[20px];
      transform: translateZ(20px);
    }

    @include breakpoint('md') {
      scale: .8;
    }

    @include breakpoint('sm') {
      scale: .6;
    }
  }

  @include breakpoint('sm') {
    @apply flex flex-col-reverse justify-end pt-0 p-8;

    .hero-sec {
      @apply p-0 text-center mx-auto max-w-full w-[350px];
    }

    .phone-container {
      @apply h-[400px]
    }
  }
}
</style>
