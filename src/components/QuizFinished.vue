<template>
  <div class="text-center">
    <h2>Finished!</h2>
    <p>You scored {{ score }} out of {{ settings.questionAmount }}</p>
    <br />
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
    <h4>Correct answers</h4>
    <ul>
      <li
        v-for="flashcard in answerHistory.correctAnswers"
        :key="flashcard.vocabulary"
      >
        {{ flashcard.vocabulary }}
      </li>
    </ul>
    <h4>Incorrect answers</h4>
    <ul>
      <li
        v-for="flashcard in answerHistory.incorrectAnswers"
        :key="flashcard.vocabulary"
      >
        {{ flashcard.vocabulary }}
      </li>
    </ul>
  </div>
</template>

<script>
import AppButton from './AppButton';

export default {
  components: { AppButton },
  props: ["score", "answerHistory"],
  inject: ["settings"],
};
</script>

<style></style>
