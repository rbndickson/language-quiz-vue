<template lang="">
  <div>
    <div v-if="currentQuestionIndex < settings.questionAmount">
      <header class="quiz-header">
        <p class="text-center">
          Question: {{ currentQuestionIndex + 1 }} of
          {{ settings.questionAmount }}
        </p>
        <p class="text-center">Score: {{ score }}</p>
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
          <span v-if="isShowAnswer"
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
            v-for="flashcard in currentQuestionFlashcards"
            :key="flashcard.vocabulary"
            class="quiz-button-item"
          >
            <QuizButton
              v-on:click="processAnswer(flashcard.vocabulary)"
              :correct="
                isShowAnswer &&
                flashcard.vocabulary === this.currentFlashcard.vocabulary
              "
              :incorrect="
                isShowAnswer &&
                flashcard.vocabulary !== this.currentFlashcard.vocabulary
              "
            >
              {{ flashcard.vocabulary }}
            </QuizButton>
          </div>
        </div>
      </div>
      <button
        class="quiz-back-button"
        v-on:click="settings.isShowSettings = true"
      >
        <img
          alt="back to settings"
          src="https://twemoji.maxcdn.com/2/svg/1f519.svg"
          height="20"
          width="20"
        />
      </button>
    </div>
    <QuizFinished
      v-else
      :score="score"
      :answer-history="answerHistory"
      @play-again="playAgain"
    />
  </div>
</template>

<script>
import QuizButton from "./QuizButton.vue";
import QuizFinished from "./QuizFinished.vue";
import { shuffle } from "../helpers";

export default {
  components: { QuizFinished, QuizButton },
  data() {
    return {
      gameFlashcards: [],
      currentQuestionIndex: 0,
      currentQuestionFlashcards: [],
      score: 0,
      isShowAnswer: false,
      answerHistory: { correctAnswers: [], incorrectAnswers: [] },
    };
  },
  inject: ["flashcards", "settings"],
  mounted() {
    this.gameFlashcards = shuffle(this.flashcards).slice(
      0,
      this.settings.questionAmount
    );
    this.setCurrentQuestionFlashcards();
    this.preloadQuizImages();
  },
  computed: {
    currentFlashcard() {
      return this.gameFlashcards[this.currentQuestionIndex];
    },
  },
  methods: {
    preloadQuizImages() {
      this.gameFlashcards.forEach((flashcard) => {
        let imageObject = new Image();
        imageObject.src = flashcard.imageUrl;
      });
    },
    setCurrentQuestionFlashcards() {
      const answerAmount = this.settings.level === "normal" ? 3 : 6;
      let nonAnswerFlashcards = this.flashcards.filter(
        (flashcard) => flashcard.vocabulary !== this.currentFlashcard.vocabulary
      );
      let questionFlashcards = shuffle(nonAnswerFlashcards).slice(
        0,
        answerAmount - 1
      );
      questionFlashcards.push(this.currentFlashcard);
      this.currentQuestionFlashcards = shuffle(questionFlashcards);
    },
    processAnswer(answer) {
      if (this.isShowAnswer === false) {
        if (answer === this.currentFlashcard.vocabulary) {
          this.score++;
          this.answerHistory.correctAnswers.push(this.currentFlashcard);
        } else {
          this.answerHistory.incorrectAnswers.push(this.currentFlashcard);
        }

        this.isShowAnswer = true;
        setTimeout(() => {
          this.isShowAnswer = false;
          this.currentQuestionIndex++;
          if (this.currentQuestionIndex < this.settings.questionAmount) {
            this.setCurrentQuestionFlashcards();
          }
        }, 2000);
      }
    },
    playAgain() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.answerHistory = { correctAnswers: [], incorrectAnswers: [] };
      this.gameFlashcards = shuffle(this.flashcards).slice(
        0,
        this.settings.questionAmount
      );
      this.setCurrentQuestionFlashcards();
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
