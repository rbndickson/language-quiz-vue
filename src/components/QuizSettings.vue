<template>
  <div class="quiz-settings">
    <section class="pure-u-1 pure-u-md-1-2">
      <p class="text-center">Questions:</p>
      <div class="quiz-settings-question-amount text-center">{{ settings.questionAmount }}</div>
      <div class="question-amount-buttons text-center">
        <button
          v-if="flashcards.length >= 5"
          v-on:click="settings.questionAmount = 5"
        >
          5
        </button>
        <button
          v-if="flashcards.length >= 10"
          v-on:click="settings.questionAmount = 10"
        >
          10
        </button>
        <button
          v-if="flashcards.length > 10"
          v-on:click="settings.questionAmount = flashcards.length"
        >
          max
        </button>
      </div>
      <div class="text-center">
        <p>Level:</p>
        <input
          id="standard"
          class="quiz-input"
          type="radio"
          value="standard"
          v-model="settings.level"
        />
        <label htmlFor="standard">Standard</label>
        <input id="extra" class="quiz-input" type="radio" value="extra" v-model="settings.level" />
        <label htmlFor="extra">Extra</label>
      </div>
    </section>
    <section class="pure-u-1 pure-u-md-1-2">
      <div class="quiz-start-images">
        <img
          :src="languageEmojiUrl"
          height="100"
          width="100"
          :alt="`${languageVariety} icon`"
        />
        <img
          :src="categoryEmojiUrl"
          height="100"
          width="100"
          :alt="`${category} icon`"
        />
      </div>
      <div>
        <button v-on:click="settings.isShowSettings = false">Start!</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  inject: [
    "settings",
    "languageVariety",
    "category",
    "languageVarietyEmojiCode",
    "categoryEmojiCode",
    "flashcards",
  ],
  computed: {
    languageEmojiUrl() {
      return `https://twemoji.maxcdn.com/2/svg/${this.languageVarietyEmojiCode}.svg`;
    },
    categoryEmojiUrl() {
      return `https://twemoji.maxcdn.com/2/svg/${this.categoryEmojiCode}.svg`;
    },
  },
};
</script>

<style>
.quiz-settings {
  font-size: 18px;
}
.quiz-settings p {
  margin: 0;
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
.quiz-start-images img {
  height: 90px;
  width: 90px;
  padding: 10px;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  .quiz-start-images {
    display: none;
  }
}
</style>
