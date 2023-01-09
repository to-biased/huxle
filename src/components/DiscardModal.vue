<script setup lang="ts">
import { inject, provide, Ref, ref, watch } from "vue";

const show: Ref<boolean> = inject("showDiscardModal");

const props = defineProps({
  reset: {
    type: Function,
    required: true,
  },
});

function toggleModal() {
  show.value = !show.value;
}

function discard() {
  props.reset();
  toggleModal();
}
</script>

<template>
  <div
    v-show="show"
    class="flex fixed top-0 left-0 items-center justify-center w-screen h-screen z-1 bg-gray-500 bg-opacity-75 transition-opacity"
  >
    <div
      class="grid grid-cols-3 gap-4 rounded-lg border z-2 border-black bg-white m-2 p-2"
    >
      <div class="col-span-2 m-1">
        <p>Are you sure you want to discard your progress?</p>
      </div>
      <div class="m-1 text-right pr-2">
        <button @click="toggleModal">X</button>
      </div>
      <div></div>
      <div class="m-1 text-right pr-2 justify-self-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded m-4"
          @click="toggleModal"
        >
          No
        </button>
      </div>
      <div class="m-1 text-right pr-2 justify-self-center">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded m-4"
          @click="discard"
        >
          Yes
        </button>
      </div>
    </div>
  </div>
</template>
