<template>
  <div>
    <LanguageSwitcher />
    {{$t('adminForm.title.label')}}
  </div>
  <div>
    <GameView />
  </div>
</template>
<script setup lang="ts">
import GameView from "./views/GameView.vue";
import LanguageSwitcher from "./components/LanguageSwitcher.vue";
</script>
<style scoped></style>
