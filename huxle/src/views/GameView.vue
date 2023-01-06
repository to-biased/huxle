<template>
  <div class="flex flex-col h-screen max-w-md mx-auto jsutify-evenly">
    <h1 class="text-center font-bold text-xl">Huxle!</h1>
    <word-row
      v-for="(guess, i) in gameStore.getGuesses"
      :key="i"
      :value="guess"
      :prompt="gameStore.getPrompt"
      :submitted="i < gameStore.getGuessIndex"
    />
    <simple-keyboard
      @onKeyPress="handleInput"
      :letters="gameStore.getLetters"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import SimpleKeyboard from "../components/SimpleKeyboard.vue";
import WordRow from "../components/WordRow.vue";
import { useGameStore } from "../store/game";

const gameStore = useGameStore();

// add event listener to also utilize hardware keyboard input
onMounted(() => {
  // handle input from hardware keyboard
  window.addEventListener("keyup", (e) => {
    e.preventDefault();
    let key =
      e.keyCode == 13
        ? "{enter}"
        : e.keyCode == 8
        ? "{bksp}"
        : String.fromCharCode(e.keyCode).toLowerCase();
    handleInput(key);
  });
});

// handle input from software and hardware keyboard
const handleInput = (key: string) => {
  console.log(key);
  //TODO: set input to state for game
  if (gameStore.getGuessIndex >= 6) {
    return;
  }
  const currentGuess = gameStore.getCurrentGuess() ?? "";
  // handle backspace and enter
  if (key == "{bksp}") {
    gameStore.backspace();
  } else if (key == "{enter}") {
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
