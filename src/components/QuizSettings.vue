<template>
  <div>
    <section class="pure-u-1 pure-u-md-1-2">
      <p>Questions: {{ settings.questionAmount }}</p>
      <div>
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
      <div>
        <p>Level</p>
        <input
          id="standard"
          type="radio"
          value="standard"
          v-model="settings.level"
        />
        <label htmlFor="standard">Standard</label>
        <input id="extra" type="radio" value="extra" v-model="settings.level" />
        <label htmlFor="extra">Extra</label>
      </div>
    </section>
    <section class="pure-u-1 pure-u-md-1-2">
      <div>
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

<style lang="scss"></style>
