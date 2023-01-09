<template>
  <div v-if="finished" class="w-full h-full bg-[rgba(0,0,0,0.3)]">
    <div class="modal">
      <div v-if="stats === false">
        <div v-if="win">
          <h1 class="text-4xl">🎉</h1>
          <p>{{$t("victoryModal.win")}}</p>
        </div>
        <div v-else>
          <h1 class="text-4xl">😢</h1>
          <p>{{$t("victoryModal.lose")}}</p>
        </div>
        <p>{{$t("victoryModal.thanks")}}</p>
      </div>
      <div v-else>
        <StatsModal :result="result"></StatsModal>
      </div>
      <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded m-4">
        <a href=".">{{$t("victoryModal.button")}}</a>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatsModal from './StatsModal.vue';

const props = defineProps({
  win: {
    type: Boolean,
    default: false,
  },
  finished: {
    type: Boolean,
    default: false,
  },
  stats: {
    type: Boolean, 
    default: false,
  },
  result: {
    type: Array,
    default: () => [""]
  }
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
