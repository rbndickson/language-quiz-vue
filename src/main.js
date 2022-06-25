import { createApp } from "vue";
import App from "./App.vue";

import { data } from "./data";

const app = createApp(App, {
  flashcards: data.flashcards,
  languageVariety: data.languageVariety,
  category: data.category,
  languageVarietyEmojiCode: data.languageVarietyEmojiCode,
  categoryEmojiCode: data.categoryEmojicode,
});

app.mount("#app");
