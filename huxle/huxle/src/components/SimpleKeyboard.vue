<template>
  <div class="simple-keyboard"></div>
</template>
<script setup lang="ts">
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import { ref, onMounted, watch } from "vue";

const emit = defineEmits(["onKeyPress"]);

const props = defineProps({
  letters: Object,
});

/*
interface SimpleKeyboard {
  value: Keyboard;
  onKeyPress?: (button: string) => void;
}
*/

const keyboard = ref<Keyboard>();

const onKeyPress = (button: string) => {
  emit("onKeyPress", button);
};

onMounted(() => {
  keyboard.value = new Keyboard("simple-keyboard", {
    layout: {
      default: [
        "q w e r t z u i o p",
        "a s d f g h j k l",
        "{enter} y x c v b n m {bksp}",
      ],
    },
    display: {
      "{bksp}": "⌫",
      "{enter}": "Enter",
    },
    onKeyPress: onKeyPress,
  });
});
// watch for changes in props.letters and update keyboard theme to colors in props.letters
watch(
  () => props.letters,
  (letters) => {
    if (keyboard.value != null && keyboard.value != null) {
      keyboard.value.addButtonTheme(letters?.gray.join(" "), "gray"),
        keyboard.value.addButtonTheme(letters?.yellow.join(" "), "yellow"),
        keyboard.value.addButtonTheme(letters?.green.join(" "), "green");
    }
  },
  { deep: true }
);
</script>
<style lang="postcss">
div.green {
  @apply bg-green-500 !important;
  @apply text-white !important;
}
div.yellow:not(.green) {
  @apply bg-yellow-500 !important;
  @apply text-white !important;
}
div.gray {
  @apply bg-gray-500 !important;
  @apply text-white !important;
}
div.simple-keyboard {
  @apply font-bold text-xl !important;
  @apply text-gray-600 text-lg !important;
  @apply bg-white !important;
}
</style>
