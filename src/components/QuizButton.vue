<script setup lang="ts">
type Props = {
  correct?: boolean;
  incorrect?: boolean;
};

defineProps<Props>();
</script>

<template>
  <button
    class="quiz-button-base"
    :class="{
      'quiz-button-correct': correct,
      'quiz-button-incorrect': incorrect,
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.quiz-button-base {
  display: block;
  width: 100%;
  height: 100%;
  padding: 10px 5px;
  border: solid 4px #bdddf4;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  color: #000;
  background: #fff;
}
.quiz-button-base:hover {
  background: #eef6fc;
}

.quiz-button-correct {
  background-color: #d9ffbd;
}
.quiz-button-correct:hover {
  background-color: #d9ffbd;
}

.quiz-button-incorrect {
  background-color: #ffbdd3;
}
.quiz-button-incorrect:hover {
  background-color: #ffbdd3;
}
</style>
