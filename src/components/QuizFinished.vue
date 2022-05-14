<template>
  <div>
    <h2>Finished!</h2>
    <p>You scored {{ score }} out of {{ settings.questionAmount }}</p>
    <br />
    <div>
      <button v-on:click="$emit('playAgain')">Play again</button>
      <button v-on:click="settings.isShowSettings = true">Settings</button>
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
export default {
  props: ["score", "answerHistory"],
  inject: ["settings"],
};
</script>

<style></style>
