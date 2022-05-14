<template lang="">
  <div>
    <div v-if="currentQuestionIndex < settings.questionAmount">
      <p>
        Question: {{ currentQuestionIndex + 1 }} of
        {{ settings.questionAmount }}
      </p>
      <p>Score: {{ score }}</p>
      <div v-if="currentFlashcard">
        <img
          v-if="currentFlashcard"
          class="quiz-image"
          :src="currentFlashcard.imageUrl"
        />
        <p class="answer"><span v-if="isShowAnswer">{{ currentFlashcard.vocabulary }}</span></p>
        <div>
          <button
            v-for="flashcard in currentQuestionFlashcards"
            :key="flashcard.vocabulary"
            v-on:click="processAnswer(flashcard.vocabulary)"
          >
            {{ flashcard.vocabulary }}
          </button>
        </div>
      </div>
      <button class="settings-button" v-on:click="settings.isShowSettings = true">
        Settings
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
import QuizFinished from "./QuizFinished.vue";
import { shuffle } from "../helpers";

export default {
  components: { QuizFinished },
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
.quiz-image {
  height: 200px;
  width: 200px;
  margin: 20px auto;
}
.answer {
  height: 10px;
}
.settings-button {
  float: left;
}
</style>
