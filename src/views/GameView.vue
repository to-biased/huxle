<template>
  <div>
    <victory-modal
      :finished="gameStore.isFinished"
      :win="gameStore.isWin"
      :stats="gameStore.getStats"
      :result="gameStore.getResult"
    />
    <div class="flex flex-col h-screen max-w-md mx-auto pt-28">
      <word-row
        v-for="(guess, i) in gameStore.getGuesses"
        :key="i"
        :value="guess"
        :prompt="gameStore.getPrompt"
        :submitted="i < gameStore.getGuessIndex"
        size="lg"
      />
      <simple-keyboard
        @onKeyPress="handleInput"
        :letters="gameStore.getLetters"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, provide, ref, Ref, watch } from "vue";
import SimpleKeyboard from "../components/SimpleKeyboard.vue";
import VictoryModal from "../components/VictoryModal.vue";
import WordRow from "../components/WordRow.vue";
import { useGameStore, type GameState } from "../store/game";

const gameStore = useGameStore();

const visualReset: Ref<boolean> = ref<boolean>(false);
provide("forceRedraw", visualReset);

// onload actions and listener for hardware keyboard input
onMounted(() => {
  // handle input from hardware keyboard
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    handleInput(e.key);
  });
  //if localstorage has game, set it to gameStore
  const game = localStorage.getItem("game");
  if (game != null) {
    let safeGame = JSON.parse(game) as GameState;
    console.log(safeGame);
    gameStore.setGameState(safeGame);
  }

  // Locate prompts in the local storage.
  const promts = JSON.parse(localStorage.getItem("promts") ?? "{}");
  const savedPrompts = gameStore.getPrompts;
  // Check if prompt is set correctly.
  if (promts.de) {
    // Check if we got new prompts.
    if (promts.de !== savedPrompts[0] && promts.en !== savedPrompts[1]) {
      console.log("resetting");
      // Reset the game if we get new prompts.
      gameStore.reset();
      gameStore.setPrompt(promts.en, promts.de);

      // Make sure to reset the localStorage entry aswell since
      // mounted is not established yet.
      const game = localStorage.getItem("game");
      if (game != null) {
        localStorage.setItem("game", JSON.stringify(gameStore.getGameState));
      }
    }
  }
});

// watch and persist the game state to the local storage whenever it changes
watch(
  gameStore,
  (gameStore) => {
    if (gameStore.isFinished) {
      setTimeout(() => {
        gameStore.showStats();
      }, 2000);
      return;
    }
    localStorage.setItem("game", JSON.stringify(gameStore.getGameState));
  },
  { deep: true }
);

// handle input from software and hardware keyboard
const handleInput = (key: string) => {
  console.log(key);
  //Guard clause if game is finished or Guesses are full
  if (gameStore.getGuessIndex >= 6 || gameStore.isFinished) {
    return;
  }
  const currentGuess = gameStore.getCurrentGuess() ?? "";
  // handle backspace and enter
  if (key == "Backspace") {
    gameStore.backspace();
  } else if (key == "Enter") {
    // submit guess if size is 5
    if (currentGuess.length == 5) {
      gameStore.incGuessIndex();
      //loop over currenGuess and check letter per letter with prompt
      //if it is same in prompt, add it to letters.green
      //else if it is in prompt, add it to letters.yellow
      //else if it is not in prompt, add it to letters.gray
      for (let i = 0; i < currentGuess.length; i++) {
        let letter = currentGuess.charAt(i);
        if (letter == gameStore.getPrompt.charAt(i)) {
          gameStore.addGreenLetter(letter);
          console.log("green");
        } else if (gameStore.getPrompt.includes(letter)) {
          gameStore.addYellowLetter(letter);
          console.log("yellow");
        } else if (!gameStore.getPrompt.includes(letter)) {
          gameStore.addGrayLetter(letter);
          console.log("gray");
        }
      }
      // check if game has endet -> won or lost
      if (currentGuess == gameStore.getPrompt) {
        gameStore.win();
        localStorage.removeItem("game");
        console.log("You won!");
      } else if (
        gameStore.getGuessIndex == 6 &&
        currentGuess != gameStore.getPrompt
      ) {
        gameStore.lose();
        localStorage.removeItem("game");
        console.log("You lost!");
      }
      gameStore.addNewLine();
    }
  } else if (currentGuess.length < 5) {
    // check and handle letter input
    const isLetter = new RegExp(/[a-zA-Z]/);
    if (isLetter.test(key) && key.length == 1) {
      gameStore.appendGuess(key);
    }
  }
};
</script>
<style scoped></style>
