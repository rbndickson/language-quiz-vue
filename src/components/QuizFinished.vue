<template>
  <div class="text-center">
    <h2>Finished!</h2>
    <h3>You scored {{ score }} out of {{ settings.questionAmount }}</h3>
    <QuizResultImage :score="score"></QuizResultImage>
    <div>
      <AppButton
        v-on:click="$emit('playAgain')"
        medium
      >
        Play again
      </AppButton>
      <AppButton
        v-on:click="settings.isShowSettings = true"
        medium
      >
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
        <img height=25 width=25 class='quiz-answer-item-emoji' :src="flashcard.imageUrl" />{{ flashcard.vocabulary }}
      </li>
    </ul>
    <h4>Words you answered incorrectly:</h4>
    <ul class="quiz-answer-list">
      <li
        class="quiz-answer-list-item"
        v-for="flashcard in answerHistory.incorrectAnswers"
        :key="flashcard.vocabulary"
      >
        <img height=25 width=25 class='quiz-answer-item-emoji' :src="flashcard.imageUrl" /> {{ flashcard.vocabulary }}
      </li>
    </ul>
  </div>
</template>

<script>
import AppButton from './AppButton';
import QuizResultImage from './QuizResultImage';

export default {
  components: { AppButton, QuizResultImage },
  props: ["score", "answerHistory"],
  inject: ["settings"],
};
</script>

<style>
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
