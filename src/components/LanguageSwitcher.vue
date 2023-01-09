<template>
  <div>
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
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const renderLine = ref<boolean>(true);

function a() {
  renderLine.value = !renderLine.value;
}

function changeLocale(newLocale: string) {
  console.log("locale", newLocale);
  locale.value = newLocale;
}
</script>

<style scoped lang="scss"></style>
