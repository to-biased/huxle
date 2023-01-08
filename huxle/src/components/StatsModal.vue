<template>
    <h1 class="text-4xl">Stats</h1>
    <p>Guesses: {{ gameStore.getGuessIndex }}</p>
    <div v-for="(guess, index) in gameStore.getGuesses">{{guess}}</div>
    <div>
        <word-row 
            v-for="(guess, i) in gameStore.getGuesses"
            :key="i"
            :value="guess"
            :prompt="gameStore.getPrompt"
            :submitted="i < gameStore.getGuessIndex"
        />
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded m-4" @click="copyToClipboard">
    Share
    </button>
       
</template>
  
<script setup lang="ts">
import GameView from "@/views/GameView.vue";
import { useGameStore, type GameState } from "../store/game";
import WordRow from "../components/WordRow.vue";

const gameStore = useGameStore();

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
