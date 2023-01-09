<template>
  <div>
    <discard-modal :reset="gameState.reset"></discard-modal>
    <ul class="flex gap-2 text-sm">
      <li v-for="availableLocale in availableLocales" :key="availableLocale">
        <button
          class="rounded-full secondary"
          :class="{ 'active font-bold': availableLocale === locale }"
          @click="changeLocale(availableLocale)"
        >
          {{ $t("languages." + availableLocale) }}
        </button>
        <span v-if="renderLine" class="w-3 inline-block text-right">|</span>
        {{ a() }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { availableLocales } from "@/i18n";
import { provide, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useGameStore } from "../store/game";
import DiscardModal from "../components/DiscardModal.vue";

const { locale } = useI18n();
const renderLine = ref<boolean>(true);

const showDiscardModal = ref<boolean>(false);
provide("showDiscardModal", showDiscardModal);

function a() {
  renderLine.value = false;
}

const gameState = useGameStore();

function changeLocale(newLocale: string) {
  console.log("locale", newLocale);
  locale.value = newLocale;
  if(gameState.getGuesses[0].length > 0){
    showDiscardModal.value = true;
  }
}
</script>

<style scoped lang="scss"></style>
