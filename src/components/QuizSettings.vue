<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuizStore } from "../store/quiz";

import AppButton from "./AppButton.vue";

import { emojiSvgUrl } from "@/helpers";

const quizStore = useQuizStore();

const { category, flashcards, isShowSettings, languageVariety, settings } =
  storeToRefs(quizStore);
</script>

<template>
  <div class="quiz-settings">
    <section class="pure-u-1 pure-u-md-1-2">
      <div class="quiz-settings-label text-center">Questions:</div>

      <div class="quiz-settings-question-amount text-center">
        {{ settings.questionAmount }}
      </div>

      <div class="question-amount-buttons text-center">
        <AppButton
          v-if="flashcards.length >= 5"
          @click="settings.questionAmount = 5"
          x-small
          inline
        >
          5
        </AppButton>

        <AppButton
          v-if="flashcards.length >= 10"
          @click="settings.questionAmount = 10"
          x-small
          inline
        >
          10
        </AppButton>

        <AppButton
          v-if="flashcards.length > 10"
          @click="settings.questionAmount = flashcards.length"
          x-small
          inline
        >
          max
        </AppButton>
      </div>

      <div class="text-center">
        <div class="quiz-settings-label">Level:</div>

        <input
          id="normal"
          class="quiz-input"
          type="radio"
          value="normal"
          v-model="settings.level"
        />

        <label htmlFor="normal">Normal</label>

        <input
          id="difficult"
          class="quiz-input"
          type="radio"
          value="difficult"
          v-model="settings.level"
        />

        <label htmlFor="difficult">Difficult</label>
      </div>
    </section>

    <section class="pure-u-1 pure-u-md-1-2">
      <div class="quiz-start-images">
        <img
          :src="emojiSvgUrl(languageVariety.emojiCode)"
          height="100"
          width="100"
          :alt="`${languageVariety.name} icon`"
        />

        <img
          :src="emojiSvgUrl(category.emojiCode)"
          height="100"
          width="100"
          :alt="`${category.name} icon`"
        />
      </div>

      <div>
        <AppButton @click="isShowSettings = false" green> Start! </AppButton>
      </div>
    </section>
  </div>
</template>

<style scoped>
.quiz-settings {
  font-size: 18px;
}

.quiz-settings-label {
  margin: 5px 0;
}

.quiz-settings-question-amount {
  font-size: 64px;
  margin: 10px 0 15px 0;
}

.question-amount-buttons {
  margin: 0 0 20px 0;
}

.quiz-input {
  margin: 20px 2px 20px 10px;
}

.quiz-start-images {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.quiz-start-images img {
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .quiz-start-images {
    display: none;
  }
}
</style>
