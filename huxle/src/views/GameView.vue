<template>
  <div>
    <victory-modal :finished="gameStore.isFinished" :win="gameStore.isWin" />
    <div class="flex flex-col h-screen max-w-md mx-auto pt-28">
      <h1 class="text-center font-bold text-xl">Huxle!</h1>
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
import { onMounted, watch } from "vue";
import SimpleKeyboard from "../components/SimpleKeyboard.vue";
import VictoryModal from "../components/VictoryModal.vue";
import WordRow from "../components/WordRow.vue";
import { useGameStore, type GameState } from "../store/game";

const gameStore = useGameStore();
gameStore.setPrompt("sicki"); // later get this from link by dehashing

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
});

// watch and persist the game state to the local storage whenever it changes
watch(
  gameStore,
  (gameStore) => {
    if (gameStore.isFinished) return;
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
    }
  } else if (currentGuess.length < 5) {
    // check and handle letter input
    const isLetter = /[a-zA-Z]/;
    if (isLetter.test(key)) {
      gameStore.appendGuess(key);
    }
  }
};
</script>
<style scoped></style>
