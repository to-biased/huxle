<script setup lang="ts">
import { inject, Ref, ref, watch } from "vue";

const show: Ref<boolean> = inject("showLinkModal");
const text: Ref<string> = ref<string>("");

function copy() {
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
    <div class="grid grid-cols-3 gap-4 rounded-lg border border-black bg-white">
      <div class="col-span-2 m-1">
        <p>Link to share:</p>
      </div>
      <div class="m-1 text-right pr-2">
        <button @click="toggleModal">X</button>
      </div>
      <div class="col-span-2 m-2 border border-slate-500">
        <input ref="myinput" readonly :value="text" />
      </div>
      <div class="">
        <button class="border border-slate-500 p-1 rounded bg-blue-500 hover:bg-blue-700 text-white" @click="copy">
          📋
        </button>
      </div>
    </div>
  </div>
</template>
