<template>
  <div
    class="grid max-w-[21rem] grid-cols-5 mx-auto"
    :class="{
      'gap-[4px] mb-2': size == 'lg',
      'gap-[4px] mb-1': size == 'sm',
    }"
  >
    <letter-container
      v-for="i in 5"
      :key="i"
      :letter="value![i - 1]"
      :color="colors[i - 1]"
      :size="size"
    />
  </div>
</template>

<script setup lang="ts">
import { inject, Ref, ref, watch } from "vue";
import LetterContainer from "./LetterContainer.vue";

const props = defineProps({
  value: String,
  prompt: String,
  submitted: Boolean,
  size: String,
});
const colors = ref(["", "", "", "", ""]);

const forceRedraw: Ref<boolean> = inject("forceRedraw");
watch(forceRedraw, (newV, oldV) => {
  if (newV) {
    reset();
  }
});

function reset() {
  colors.value = ["", "", "", "", ""];
}

watch(
  () => props.submitted,
  async (submitted) => {
    // watch for changes in submitted
    if (submitted) {
      let solution = props.prompt;
      let guess = props.value;
      let temp = ["gray", "gray", "gray", "gray", "gray"]; // default for not found is gray
      let letterPool = []; // guessed letters that are not correct in the solution
      for (let i = 0; i < 5; i++) {
        // loop over guess and solution and check for correct letters
        if (solution?.charAt(i) == guess?.charAt(i)) {
          temp[i] = "green";
        } else {
          letterPool.push(solution?.charAt(i));
        }
      }
      for (let i = 0; i < 5; i++) {
        // loop over uncorrect letters and check if they are in the solution
        if (temp[i] == "gray") {
          if (letterPool.includes(guess?.charAt(i))) {
            temp[i] = "yellow";
            letterPool.splice(letterPool.indexOf(guess?.charAt(i)), 1); // remove letter from pool to avoid duplicate hints
          }
        }
        colors.value[i] = temp[i];
        await new Promise((resolve) => setTimeout(resolve, 300)); // wait 300ms to slow the reveal
      }
    } else {
      reset();
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
