<template>
  <QuizPage />
</template>

<script>
import QuizPage from "./components/QuizPage.vue";
import { reactive } from "vue";

export default {
  name: "App",
  components: {
    QuizPage,
  },
  props: {
    flashcards: { type: Array, required: true },
    languageVariety: { type: String, required: true },
    category: { type: String, required: true },
    languageVarietyEmojiCode: { type: String, required: true },
    categoryEmojiCode: { type: String, required: true },
  },
  provide() {
    const defaultQuestionAmount = this.flashcards.length > 5 ? 5 : this.flashcards.length;

    let settings = reactive({
      isShowSettings: true,
      questionAmount: defaultQuestionAmount,
      level: "standard",
    });

    return {
      languageVariety: this.languageVariety,
      category: this.category,
      languageVarietyEmojiCode: this.languageVarietyEmojiCode,
      categoryEmojiCode: this.categoryEmojiCode,
      flashcards: this.flashcards,
      settings,
    };
  },
};
</script>

<style>
#app {
  font-family: "Varela Round", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(#88c9f9, #88c9f9 60%, #fff);
  padding: 1px 0 100px 0;
}
.text-center {
  text-align: center;
}
</style>
