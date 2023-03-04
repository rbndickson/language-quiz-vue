<script setup>
import { useQuizStore } from "../store/quiz";
import QuizSettings from "./QuizSettings.vue";
import QuizGame from "./QuizGame.vue";

const quizStore = useQuizStore();
</script>

<template>
  <div class="quiz-page">
    <h1 class="text-center">
      {{ quizStore.languageVariety.name }} {{ quizStore.category.name }} Quiz
    </h1>
    <QuizSettings v-if="quizStore.isShowSettings" />
    <QuizGame v-else />
  </div>
</template>

<style scoped>
.quiz-page {
  position: relative;
  background-color: #fff;
  max-width: 580px;
  margin: 60px auto 20px auto;
  border-radius: 5px;
  padding: 20px;
}
@media (max-width: 480px) {
  .quiz-page {
    max-width: 320px;
    margin: 20px auto 20px auto;
  }
}
</style>
