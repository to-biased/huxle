<script setup lang="ts">
import { provide, reactive, ref, watch } from "vue";
import { useEncryption } from "../composables/encryption";
import ShareLinkModal from "../components/ShareLinkModal.vue";
import { useI18n } from "vue-i18n";

const formState = reactive({
  germanword: "",
  englishword: "",
});

const germanError = ref<string>("");
const englishError = ref<string>("");

const { locale } = useI18n();

var errorCount: number = 0;

const { encrypt } = useEncryption();

const showLinkModal = ref<boolean>(false);
provide("showLinkModal", showLinkModal);

async function onSubmit(e: MouseEvent) {
  e.preventDefault();
  errorCount=0;
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

  var combination: string =
    formState.germanword + formState.englishword + locale.value;
  var encryptedMessage = encrypt(combination);
  localStorage.setItem("inviteLink", encryptedMessage);
  showLinkModal.value = true;
}

watch(
  () => formState.germanword,
  (germanWord) => {
    if (germanError.value) {
      germanError.value = "";
    } 
  }
);

watch(
  () => formState.englishword,
  (englishWord) => {
    if (englishError.value) {
      englishError.value = "";
    }
  }
);
</script>

<template>
  <div>
    <ShareLinkModal />
    <div class="flex flex-col h-screen max-w-md mx-auto pt-28 px-2">
      <p>
        {{$t("adminForm.description.label")}}
      </p>
      <form
        @submit.prevent="async () => onSubmit"
        class="flex flex-col gap-4 mt-5"
      >
        <div>
          <label for="germanword">{{$t("adminForm.de.label")}}</label>
          <input
            id="germanword"
            type="text"
            v-model="formState.germanword"
            class="w-full border border-gray-500 rounded px-2 py-1"
          />
          <p class="a text-red-600">{{ germanError }}</p>
        </div>

        <div>
          <label for="englishword">{{$t("adminForm.en.label")}}</label>
          <input
            id="englishword"
            type="text"
            v-model="formState.englishword"
            class="w-full border border-gray-500 rounded px-2 py-1"
          />
          <p class="a text-red-600">{{ englishError }}</p>
        </div>

        <button
          @click="onSubmit"
          type="submit"
          class="rounded border border-gray-500 px-2 py-1 bg-blue-500 hover:bg-blue-700 text-white"
        >
          {{$t("adminForm.create.label")}}
        </button>
      </form>
    </div>
  </div>
</template>
