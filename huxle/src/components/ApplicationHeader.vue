<script setup lang="ts">
import LanguageSwitcher from "./LanguageSwitcher.vue";
</script>


<template>
  <header>
    <div class="flex items-center justify-between h-16 w-full drop-shadow-md absolute bg-slate-200">
      <p class="font-bold text-2xl pl-4">Huxle</p>
      <div class="pr-4 font-medium text-lg">
        <LanguageSwitcher />
      </div>
    </div>
  </header>
</template>
