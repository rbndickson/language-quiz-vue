<template lang="">
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
                flashcard.vocabulary === this.currentFlashcard.vocabulary
              "
              :incorrect="
                game.isShowAnswer &&
                flashcard.vocabulary !== this.currentFlashcard.vocabulary
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

<script>
import { mapState, mapWritableState } from "pinia";
import { useQuizStore } from "../store/quiz";
import QuizButton from "./QuizButton.vue";
import QuizFinished from "./QuizFinished.vue";
import { shuffle } from "../helpers";

export default {
  components: { QuizFinished, QuizButton },
  mounted() {
    this.resetGame();
    this.preloadQuizImages();
  },
  computed: {
    ...mapState(useQuizStore, ["flashcards", "settings", "answerChoiceAmount"]),
    ...mapWritableState(useQuizStore, ["game", "isShowSettings"]),
    currentFlashcard() {
      return this.game.flashcards[this.game.currentQuestionIndex];
    },
  },
  methods: {
    preloadQuizImages() {
      this.game.flashcards.forEach((flashcard) => {
        let imageObject = new Image();
        imageObject.src = flashcard.imageUrl;
      });
    },
    setCurrentQuestionFlashcards() {
      let nonAnswerFlashcards = this.flashcards.filter(
        (flashcard) => flashcard.vocabulary !== this.currentFlashcard.vocabulary
      );
      let questionFlashcards = shuffle(nonAnswerFlashcards).slice(
        0,
        this.answerChoiceAmount - 1
      );
      questionFlashcards.push(this.currentFlashcard);
      this.game.currentQuestionFlashcards = shuffle(questionFlashcards);
    },
    processAnswer(answer) {
      if (this.game.isShowAnswer === false) {
        if (answer === this.currentFlashcard.vocabulary) {
          this.game.score++;
          this.game.answerHistory.correctAnswers.push(this.currentFlashcard);
        } else {
          this.game.answerHistory.incorrectAnswers.push(this.currentFlashcard);
        }

        this.game.isShowAnswer = true;
        setTimeout(() => {
          this.game.isShowAnswer = false;
          this.game.currentQuestionIndex++;
          if (this.game.currentQuestionIndex < this.settings.questionAmount) {
            this.setCurrentQuestionFlashcards();
          }
        }, 2000);
      }
    },
    resetGame() {
      this.game.currentQuestionIndex = 0;
      this.game.score = 0;
      this.game.answerHistory = { correctAnswers: [], incorrectAnswers: [] };
      this.game.flashcards = shuffle(this.flashcards).slice(
        0,
        this.settings.questionAmount
      );
      this.setCurrentQuestionFlashcards();
    },
    playAgain() {
      this.resetGame();
    },
    handleBackButton() {
      this.resetGame();
      this.isShowSettings = true;
    },
  },
};
</script>

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
