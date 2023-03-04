<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

import { shuffle } from "../helpers";

import { useQuizStore } from "../store/quiz";
import QuizButton from "./QuizButton.vue";
import QuizFinished from "./QuizFinished.vue";

const quizStore = useQuizStore();

const { currentFlashcard, flashcards, game, settings } = storeToRefs(quizStore);

const { answerChoiceAmount, showSettings } = quizStore;

onMounted(() => {
  resetGame();
  preloadQuizImages();
});

const preloadQuizImages = () => {
  game.value.flashcards.forEach((flashcard) => {
    const imageObject = new Image();
    imageObject.src = flashcard.imageUrl;
  });
};
const setCurrentQuestionFlashcards = () => {
  const nonAnswerFlashcards = flashcards.value.filter(
    (flashcard) => flashcard.vocabulary !== currentFlashcard.value.vocabulary
  );
  const questionFlashcards = shuffle(nonAnswerFlashcards).slice(
    0,
    answerChoiceAmount - 1
  );
  questionFlashcards.push(currentFlashcard.value);
  game.value.currentQuestionFlashcards = shuffle(questionFlashcards);
};
const processAnswer = (answer) => {
  if (game.value.isShowAnswer === false) {
    if (answer === currentFlashcard.value.vocabulary) {
      game.value.score++;
      game.value.answerHistory.correctAnswers.push(currentFlashcard.value);
    } else {
      game.value.answerHistory.incorrectAnswers.push(currentFlashcard.value);
    }

    game.value.isShowAnswer = true;
    setTimeout(() => {
      game.value.isShowAnswer = false;
      game.value.currentQuestionIndex++;
      if (game.value.currentQuestionIndex < settings.value.questionAmount) {
        setCurrentQuestionFlashcards();
      }
    }, 2000);
  }
};
const resetGame = () => {
  game.value.currentQuestionIndex = 0;
  game.value.score = 0;
  game.value.answerHistory = { correctAnswers: [], incorrectAnswers: [] };
  game.value.flashcards = shuffle(flashcards.value).slice(
    0,
    settings.value.questionAmount
  );
  setCurrentQuestionFlashcards();
};
const playAgain = () => {
  resetGame();
};
const handleBackButton = () => {
  resetGame();
  showSettings();
};
</script>

<template>
  <div>
    <div v-if="game.currentQuestionIndex < settings.questionAmount">
      <header class="quiz-header">
        <p class="text-center">
          Question: {{ game.currentQuestionIndex + 1 }} of
          {{ settings.questionAmount }}
        </p>
        <p class="text-center">Score: {{ game.score }}</p>
      </header>
      <div v-if="currentFlashcard" class="text-center">
        <img
          v-if="currentFlashcard"
          height="150"
          width="150"
          class="quiz-image"
          :src="currentFlashcard.imageUrl"
        />
        <p class="quiz-answer">
          <span v-if="game.isShowAnswer"
            ><b>{{ currentFlashcard.vocabulary }}</b></span
          >
        </p>
        <div
          class="quiz-buttons"
          :class="{
            'quiz-buttons-difficult': settings.level === 'difficult',
            'quiz-buttons-normal': settings.level === 'normal',
          }"
        >
          <div
            v-for="flashcard in game.currentQuestionFlashcards"
            :key="flashcard.vocabulary"
            class="quiz-button-item"
          >
            <QuizButton
              v-on:click="processAnswer(flashcard.vocabulary)"
              :correct="
                game.isShowAnswer &&
                flashcard.vocabulary === currentFlashcard.vocabulary
              "
              :incorrect="
                game.isShowAnswer &&
                flashcard.vocabulary !== currentFlashcard.vocabulary
              "
            >
              {{ flashcard.vocabulary }}
            </QuizButton>
          </div>
        </div>
      </div>
      <button class="quiz-back-button" v-on:click="handleBackButton()">
        <img
          alt="back to settings"
          src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f519.svg"
          height="20"
          width="20"
        />
      </button>
    </div>
    <QuizFinished
      v-else
      :score="game.score"
      :answer-history="game.answerHistory"
      @play-again="playAgain"
    />
  </div>
</template>

<style scoped>
.quiz-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-width: 500px;
  margin: 0 auto;
}
@media (max-width: 480px) {
  .quiz-header {
    font-size: 20px;
  }
}
.quiz-image {
  margin: 20px auto;
}
.quiz-answer {
  height: 10px;
}
.quiz-buttons {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.quiz-buttons-normal {
  width: 200px;
}
.quiz-buttons-difficult {
  width: 400px;
}
@media (max-width: 480px) {
  .quiz-buttons-difficult {
    width: 200px;
  }
}
.quiz-button-item {
  width: 192px;
  margin: 4px;
}
.quiz-back-button {
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  -webkit-animation: all 0.2s linear infinite;
}
.quiz-back-button:hover {
  margin-left: -2px;
}
</style>
