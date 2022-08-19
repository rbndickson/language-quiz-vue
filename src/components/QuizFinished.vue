<template>
  <div class="text-center">
    <h2>Finished!</h2>
    <h3>You scored {{ score }} out of {{ questionAmount }}</h3>
    <QuizResultImage :score="score"></QuizResultImage>
    <div>
      <AppButton v-on:click="$emit('playAgain')" medium> Play again </AppButton>
      <AppButton v-on:click="settings.isShowSettings = true" medium>
        Settings
      </AppButton>
    </div>
    <br />
    <h3>Review</h3>
    <h4>Words you answered correctly:</h4>
    <ul>
      <li
        class="quiz-answer-list-item"
        v-for="flashcard in answerHistory.correctAnswers"
        :key="flashcard.vocabulary"
      >
        <img
          height="30"
          width="30"
          class="quiz-answer-item-emoji"
          :src="flashcard.imageUrl"
        />{{ flashcard.vocabulary }}
      </li>
    </ul>
    <h4>Words you answered incorrectly:</h4>
    <ul class="quiz-answer-list">
      <li
        class="quiz-answer-list-item"
        v-for="flashcard in answerHistory.incorrectAnswers"
        :key="flashcard.vocabulary"
      >
        <img
          height="30"
          width="30"
          class="quiz-answer-item-emoji"
          :src="flashcard.imageUrl"
        />
        {{ flashcard.vocabulary }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useQuizStore } from "../store/quiz";
import AppButton from "./AppButton.vue";
import QuizResultImage from "./QuizResultImage.vue";

export default {
  components: { AppButton, QuizResultImage },
  props: ["score", "answerHistory"],
  computed: {
    ...mapState(useQuizStore, ["questionAmount"]),
  },
};
</script>

<style scoped>
.quiz-answer-list-item {
  display: flex;
  align-items: center;
  max-width: 260px;
  margin: 0 auto 6px auto;
}
.quiz-answer-item-emoji {
  margin-right: 10px;
}
</style>
