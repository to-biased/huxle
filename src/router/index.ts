import { useEncryption } from "@/composables/encryption";
import { createRouter, createWebHistory } from "vue-router";
import { i18n } from "../i18n";
import AdminView from "../components/AdminView.vue";
import GameView from "../components/GameView.vue";

const { decrypt } = useEncryption();
const { locale } = i18n.global;


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: AdminView,
    },
    {
      path: "/:hash",
      component: GameView,
    },
  ],
});

router.beforeEach((to, from) => {
  if (to.fullPath == "/") {
    return true;
  }
  var hash = to.fullPath.substring(1);
  if (!hash) {
    return false;
  }
  var decryptedHash: string = decrypt(hash);
  if (decryptedHash.length != 12) {
    return false;
  }
  var germanWord = decryptedHash.substring(0, 5);
  var englishWord = decryptedHash.substring(5, 10);
  var lang = decryptedHash.substring(10, 12);
  locale.value = lang;
  localStorage.setItem("promts", JSON.stringify({
    "en":englishWord,
    "de":germanWord
  }));
  return true;
});

export default router;
