<script setup>
import QuizPage from "./components/QuizPage.vue";
import { useQuizStore } from "./store/quiz";
import { onMounted } from "vue";

const props = defineProps({
  flashcards: { type: Array, required: true },
  languageVariety: { type: String, required: true },
  category: { type: String, required: true },
  languageVarietyEmojiCode: { type: String, required: true },
  categoryEmojiCode: { type: String, required: true },
});

onMounted(() => {
  const quizStore = useQuizStore();

  quizStore.setInitialData({
    category: props.category,
    categoryEmojiCode: props.categoryEmojiCode,
    languageVariety: props.languageVariety,
    languageVarietyEmojiCode: props.languageVarietyEmojiCode,
    flashcards: props.flashcards,
  });
});
</script>

<template>
  <QuizPage />
</template>

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
