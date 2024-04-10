<template>
  <div class="base-card-style absolute w-full h-[50vh] shadow z-10">
    <div class="flex items-center justify-between">
      <h3>Enter URL</h3>
      <base-button
        mode="close"
        title="close"
        @click="closeAddLink()"
      >
        <appIcon name="close" />
      </base-button>
    </div>
    <div class="add-link-conatiner flex gap-4 mt-4">
      <input
        type="text"
        class="bg-bg h-[44px] px-4 rounded"
        placeholder="URL"
        v-model.trim="urlLink"
        @input="linkInput($event)"
      />
      <base-button
        mode="full"
        :disabled="!checkUrlValidation || processing"
        @click="addLink"
      >
        <p v-if="!processing">add</p>
        <LoadingButton
          v-else
          class="scale-[0.6]"
        />
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { Link } from "@/types/interfacesLink";

const emit = defineEmits([ "set-close-AddLink" ]);

const store = useStore();

const urlLink = ref<string>("");
const processing = ref<boolean>(false);
const urlPattern =
  /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.(com|net|org|info|io)\b/i;

const checkUrlValidation = computed(() =>
  Boolean(urlLink.value.match(urlPattern)) ? true : false
);

const closeAddLink = () => emit("set-close-AddLink", false);

const linkInput = (e: Event) => {
  let input = (e.target as HTMLInputElement).value.trim();

  if (!input.startsWith("https://") && !input.startsWith("http://")) {
    input = "https://" + input;
    urlLink.value = input;
  }
};

function extractDomainName(url: string): string {
  let domain;

  if (url.indexOf("://") > -1) {
    domain = url.split("/")[ 2 ];
  } else {
    domain = url.split("/")[ 0 ];
  }

  domain = domain.split(":")[ 0 ];
  domain = domain.split("?")[ 0 ];

  if (url.includes("www.")) {
    return domain.replace(/\./g, " ").split(" ")[ 1 ];
  } else {
    return domain.replace(/\./, " ").split(" ")[ 0 ];
  }
}

const addLink = async () => {
  if (!checkUrlValidation.value) return;
  const name = extractDomainName(urlLink.value);

  const link: Link = {
    id: Date.now().toString(),
    link: urlLink.value,
    title: name,
    dataIndex: 0,
    isDisable: true,
    layout: "classic",
    icon: name,
  };

  processing.value = true;

  try {
    await store.dispatch("links/addLink", link);
    closeAddLink();
  } catch (err) {
    (err as Error).message;
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped lang="scss">
@import "@/scss/helpers/mixins";

.add-link-conatiner {
  input {
    width: 100%;
  }

  button {
    width: 100px !important;
    font-weight: bold;
  }

  @include breakpoint("sm") {
    display: grid;

    button {
      width: 100% !important;
    }
  }
}
</style>
