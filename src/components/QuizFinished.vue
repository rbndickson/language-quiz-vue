<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuizStore } from "../store/quiz";
import AppButton from "./AppButton.vue";
import QuizResultImage from "./QuizResultImage.vue";

const quizStore = useQuizStore();

const { game, isShowSettings, settings } = storeToRefs(quizStore);
</script>

<template>
  <div class="text-center">
    <h2>Finished!</h2>
    <h3>You scored {{ game.score }} out of {{ settings.questionAmount }}</h3>

    <QuizResultImage :score="game.score"></QuizResultImage>

    <div>
      <AppButton @click="$emit('playAgain')" medium> Play again </AppButton>
      <AppButton @click="isShowSettings = true" medium> Settings </AppButton>
    </div>

    <br />

    <h3>Review</h3>
    <h4>Words you answered correctly:</h4>

    <ul>
      <li
        class="quiz-answer-list-item"
        v-for="flashcard in game.answerHistory.correctAnswers"
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
        v-for="flashcard in game.answerHistory.incorrectAnswers"
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
