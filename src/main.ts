import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import { data } from "./data";

const pinia = createPinia();

const app = createApp(App, {
  flashcards: data.flashcards,
  languageVariety: data.languageVariety,
  category: data.category,
  languageVarietyEmojiCode: data.languageVarietyEmojiCode,
  categoryEmojiCode: data.categoryEmojiCode,
});

app.use(pinia);
app.mount("#app");
