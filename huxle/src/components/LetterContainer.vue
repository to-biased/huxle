<template>
  <div
    class="col-span-1 flex items-center justify-center h-16 uppercase w-16 min-w-full border border-gray-500 rounded"
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
});
</script>

<style scoped></style>
