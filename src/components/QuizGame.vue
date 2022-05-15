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
          class="quiz-image"
          :src="currentFlashcard.imageUrl"
        />
        <p class="answer"><span v-if="isShowAnswer">{{ currentFlashcard.vocabulary }}</span></p>
        <div class="quiz-buttons"
          :class="{
            'quiz-buttons-extra': settings.level === 'extra',
            'quiz-buttons-standard': settings.level === 'standard',
          }"
        >
          <div
            v-for="flashcard in currentQuestionFlashcards"
            :key="flashcard.vocabulary" class="quiz-button-item"
          >
            <QuizButton
              v-on:click="processAnswer(flashcard.vocabulary)"
              :correct="isShowAnswer && flashcard.vocabulary === this.currentFlashcard.vocabulary"
              :incorrect="isShowAnswer && flashcard.vocabulary !== this.currentFlashcard.vocabulary"
            >
              {{ flashcard.vocabulary }}
            </QuizButton>
          </div>
        </div>
      </div>
      <button
        src="https://twemoji.maxcdn.com/2/svg/1f519.svg"
        alt="Back button"
        class="quiz-back-button"
        v-on:click="settings.isShowSettings = true"
      />
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
    this.gameFlashcards = [...this.flashcards];
    shuffle(this.gameFlashcards);
    this.setCurrentQuestionFlashcards();
  },
  computed: {
    currentFlashcard() {
      return this.gameFlashcards[this.currentQuestionIndex];
    },
  },
  methods: {
    setCurrentQuestionFlashcards() {
      const answerAmount = this.settings.level === "standard" ? 3 : 6;
      let filteredFlashcards = this.gameFlashcards.filter(
        (questionFlashcards) => questionFlashcards.vocabulary !== this.currentFlashcard.vocabulary
      );
      let questionFlashcards = filteredFlashcards.slice(0, answerAmount - 1);
      questionFlashcards.push(this.currentFlashcard);
      shuffle(questionFlashcards);

      this.currentQuestionFlashcards = questionFlashcards;
    },
    processAnswer(answer) {
      if(this.isShowAnswer === false) {
        if (answer === this.currentFlashcard.vocabulary) {
          this.score++;
          this.answerHistory.correctAnswers.push(this.currentFlashcard);
        } else {
          this.answerHistory.incorrectAnswers.push(this.currentFlashcard);
        }

        this.isShowAnswer = true;
        setTimeout(()=>{
          this.isShowAnswer = false;
          this.currentQuestionIndex++;
          this.setCurrentQuestionFlashcards();
        }, 2000)
      }
    },
    playAgain() {
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.answerHistory = { correctAnswers: [], incorrectAnswers: [] };
      shuffle(this.gameFlashcards);
      this.setCurrentQuestionFlashcards();
    },
  },
};
</script>

<style>
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
  width: 150px;
  margin: 20px auto;
}
.answer {
  height: 10px;
}
.quiz-buttons {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.quiz-buttons-standard {
  width: 160px;
}
.quiz-buttons-extra {
  width: 320px;
}
.quiz-button-item {
  width: 152px;
  margin: 0 4px;
}
.quiz-back-button {
  width: 20px;
  height: 20px;
  border: none;
  background: url('https://twemoji.maxcdn.com/2/svg/1f519.svg');
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  -webkit-animation: all 0.2s linear infinite;
}
.quiz-back-button:hover {
  margin-left: -2px;
}
</style>
