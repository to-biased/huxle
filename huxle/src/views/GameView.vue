<template>
  <div class="flex flex-col h-screen max-w-md mx-auto jsutify-evenly">
    <word-row
      v-for="(guess, i) in state.guesses"
      :key="i"
      :value="guess"
      :prompt="state.prompt"
      :submitted="i < state.guessIndex"
    />
    <simple-keyboard @onKeyPress="handleInput" />
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
    state.guessIndex++;
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
