<template>
  <div
    class="col-span-1 flex items-center justify-center h-16 uppercase w-16 border border-gray-500 rounded transition duration-500 ease-in-out"
    :class="{
      'bg-green-500 border-2 border-green-600 text-white font-bold': color == 'green',
      'bg-yellow-500 border-2 border-yellow-600 text-white font-bold': color == 'yellow',
      'bg-gray-500 border-2 border-gray-400 text-white font-bold': color == 'gray',
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
});
</script>

<style scoped></style>
