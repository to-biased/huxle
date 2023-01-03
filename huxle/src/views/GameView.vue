<template>
  <div class="flex flex-col h-screen max-w-md mx-auto jsutify-evenly">
    <h1 class="text-center font-bold text-xl">Huxle!</h1>
    <word-row
      v-for="(guess, i) in state.guesses"
      :key="i"
      :value="guess"
      :prompt="state.prompt"
      :submitted="i < state.guessIndex"
    />
    <simple-keyboard @onKeyPress="handleInput" :letters="state.letters"/>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive } from "vue";
import SimpleKeyboard from "../components/SimpleKeyboard.vue";
import WordRow from "../components/WordRow.vue";

// object for current game state
const state = reactive({
  prompt: "hallo",
  guesses: ["", "", "", "", "", ""],
  guessIndex: 0,
  letters: {
    gray: [""], // letters not in prompt
    yellow: [""], // letters in prompt
    green: [""], // letters in prompt and guessed correctly
  },
});

// add event listener to also utilize hardware keyboard input
onMounted(() => {
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
  if (state.guessIndex >= 6) {
    return;
  }
  const currentGuess = state.guesses[state.guessIndex];
  // handle backspace and enter
  if (key == "{bksp}") {
    state.guesses[state.guessIndex] = currentGuess.slice(0, -1);
  } else if (key == "{enter}") {
    // submit guess if size is 5
    if (currentGuess.length == 5) {
      state.guessIndex++;
      //loop over currenGuess and check letter per letter with prompt
      //if it is same in prompt, add it to state.letters.green
      //else if it is in prompt, add it to state.letters.yellow
      //else if it is not in prompt, add it to state.letters.gray
      for (let i = 0; i < currentGuess.length; i++) {
        let letter = currentGuess.charAt(i);
        if (letter == state.prompt.charAt(i)) {
          state.letters.green.push(letter);
          console.log("green");
        } else if (state.prompt.includes(letter)) {
          state.letters.yellow.push(letter);
          console.log("yellow");
        } else if (!state.prompt.includes(letter)) {
          state.letters.gray.push(letter);
          console.log("gray");
        }
      }
    }
  } else if (currentGuess.length < 5) {
    // check and handle letter input
    const isLetter = /[a-zA-Z]/;
    if (isLetter.test(key)) {
      state.guesses[state.guessIndex] += key;
    }
  }
};
</script>
<style scoped></style>
