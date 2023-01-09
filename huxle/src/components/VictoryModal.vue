<template>
  <div v-if="finished" class="w-full h-full bg-[rgba(0,0,0,0.3)]">
    <div class="modal">
      <div v-if="win">
        <h1 class="text-4xl">🎉</h1>
        <p>Genius! You did it!</p>
      </div>
      <div v-else>
        <h1 class="text-4xl">😢</h1>
        <p>Oh no, you've lost!</p>
      </div>
      <p>Thanks for playing. You can play again by reloading.</p>
      <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded m-4">
        <a href=".">reload</a>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  win: {
    type: Boolean,
    default: false,
  },
  finished: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped lang="postcss">
div.modal {
  @apply fixed w-1/2 mx-auto inset-x-0 top-1/3 text-center p-4;
  @apply bg-white border border-gray-300 rounded-lg shadow-lg;
}
p {
  @apply text-gray-700 text-sm;
}
</style>
