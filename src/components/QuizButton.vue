<template>
  <button
    class="quiz-button-base"
    :class="{
      'quiz-button-correct': correct,
      'quiz-button-incorrect': incorrect,
    }">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    correct: {
      type: Boolean,
      default: false
    },
    incorrect: {
      type: Boolean,
      default: false
    },
  },
};
</script>

<style scoped>
.quiz-button-base {
  display: block;
  width: 100%;
  margin: 3px 0;
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
