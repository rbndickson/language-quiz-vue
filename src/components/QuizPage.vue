<template>
  <div class="quiz-page">
    <h1 class="text-center">
      {{ languageVariety.name }} {{ category.name }} Quiz
    </h1>
    <QuizSettings v-if="isShowSettings" />
    <QuizGame v-else />
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useQuizStore } from "../store/quiz";
import QuizSettings from "./QuizSettings.vue";
import QuizGame from "./QuizGame.vue";

export default {
  name: "QuizPage",
  components: { QuizSettings, QuizGame },
  computed: {
    ...mapState(useQuizStore, [
      "languageVariety",
      "category",
      "isShowSettings",
    ]),
  },
};
</script>

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
