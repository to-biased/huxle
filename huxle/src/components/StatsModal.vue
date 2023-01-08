<template>
    <h1 class="text-4xl">Stats</h1>
    <p>Guesses: </p>
    <p>Time: </p>
    <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded m-4" @click="copyToClipboard">
    Share
    </button>
       
</template>
  
<script setup lang="ts">
const copyToClipboard = async () => {
    const text = props.result.toString();
    try {
        await navigator.clipboard.writeText(text);
        alert("Ergebnis in Zwischenablage kopiert!");
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

const props = defineProps({
    result: {
    type: Array,
    default: () => [""]
  }
});
</script>

<style scoped lang="postcss">
</style>
