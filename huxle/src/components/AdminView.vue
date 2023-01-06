<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import ApplicationHeader from "../components/ApplicationHeader.vue";

const formState = reactive({
  germanword: "",
  englishword: "",
});

const germanError = ref<string>("");
const englishError = ref<string>("");

var errorCount: number = 0;

function onSubmit() {
  console.log("Submit Event happened.");

  if (!formState.germanword) {
    germanError.value = "German field must not be empty.";
    errorCount++;
  }

  if (!formState.englishword) {
    englishError.value = "English field must not be empty.";
    errorCount++;
  }

  if (formState.germanword.length != 5) {
    if (!germanError.value) {
      germanError.value = "German word must have 5 letters.";
    }
    errorCount++;
  }

  if (formState.englishword.length != 5) {
    if (!englishError.value) {
      englishError.value = "English word must have 5 letters.";
    }
    errorCount++;
  }

  if (errorCount != 0) {
    return;
  }
}

watch(() => formState.germanword, (germanWord) => {
    if (germanError.value) {
        germanError.value = "";
    };
});

watch(() => formState.englishword, (englishWord) => {
    if (englishError.value) {
        englishError.value = "";
    };
});

</script>

<template>
  <div class="flex flex-col h-screen max-w-md mx-auto pt-28">
    <p>
      To start a german game, please change the language on the right side of
      the header
    </p>
    <form @submit.prevent="onSubmit" class="flex flex-col gap-4 mt-5">
      <div>
        <label for="germanword">German Word</label>
        <input
          id="germanword"
          type="text"
          v-model="formState.germanword"
          class="w-full border border-gray-500 rounded px-2 py-1"
        />
        <p class="a text-red-600">{{ germanError }}</p>
      </div>

      <div>
        <label for="englishword">English Word</label>
        <input
          id="englishword"
          type="text"
          v-model="formState.englishword"
          class="w-full border border-gray-500 rounded px-2 py-1"
        />
        <p class="a text-red-600">{{ englishError }}</p>
      </div>

      <button
        @click="onSubmit()"
        type="submit"
        class="rounded border border-gray-500 px-2 py-1 hover:opacity-60"
      >
        Create Link
      </button>
    </form>
  </div>
</template>
