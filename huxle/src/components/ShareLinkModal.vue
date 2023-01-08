<script setup lang="ts">
import { inject, Ref, ref, watch } from "vue";

const show: Ref<boolean> = inject("showLinkModal");
const text: Ref<string> = ref<string>("");

function copy() {
  //this.$refs.myinput.focus();
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text.value)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        alert("Copy failed.. Check console for error log.");
        console.error(err);
      });
  } else {
    alert("Browser is not supported!");
  }
}

watch(show, (newV, oldV) => {
  if (newV) {
    var hashedLink = localStorage.getItem("inviteLink");
    if (hashedLink) {
      text.value = `${window.location.origin}/${hashedLink}`;
    }
  }
});

function toggleModal() {
  show.value = !show.value;
}
</script>

<template>
  <div
    v-show="show"
    class="flex absolute items-center justify-center w-full h-full bg-gray-500 bg-opacity-75 transition-opacity"
  >
    <div class="rounded-lg bg-white">
      <p>Link to share:</p>
      <button @click="toggleModal">X</button>
      <input ref="myinput" readonly :value="text" />
      <button @click="copy">Copy</button>
    </div>
  </div>
</template>
