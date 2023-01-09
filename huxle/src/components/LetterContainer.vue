<template>
  <div
    class="col-span-1 flex items-center uppercase font-bold justify-center border border-gray-500 rounded transition duration-500 ease-in-out"
    :class="{
      'h-16 w-16': size == 'lg',
      'h-8 w-8': size == 'sm',
      'bg-green-500 border-2 border-green-600 text-white':
        color == 'green',
      'bg-yellow-500 border-2 border-yellow-600 text-white':
        color == 'yellow',
      'bg-gray-500 border-2 border-gray-400 text-white':
        color == 'gray',
    }"
  >
    {{ letter }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  letter: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
