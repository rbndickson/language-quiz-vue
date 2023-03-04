<template>
  <img
    height="150"
    width="150"
    class="quiz-result-image"
    alt=""
    :src="generateImageLink()"
  />
</template>

<script>
import { mapState } from "pinia";
import { useQuizStore } from "../store/quiz";
import { sample } from "../helpers";

export default {
  props: {
    score: {
      type: Number,
    },
  },
  computed: {
    ...mapState(useQuizStore, ["settings"]),
  },
  methods: {
    generateImageLink() {
      const oneHundredEmojiCode = "1f4af",
        partyPopperEmojiCode = "1f389",
        starEmojiCode = "1f4ab",
        highFiveEmojiCode = "1f64c",
        rocketEmojiCode = "1f680",
        smileyCatEmojiCode = "1f63a",
        writingEmojiCode = "270d",
        cloverEmojiCode = "1f340",
        booksEmojiCode = "1f4da",
        seedlingEmojiCode = "1f340";

      const resultEmojiCodes = {
        perfect: [oneHundredEmojiCode, partyPopperEmojiCode],
        great: [starEmojiCode, highFiveEmojiCode],
        good: [smileyCatEmojiCode, rocketEmojiCode],
        ok: [writingEmojiCode, cloverEmojiCode],
        studyTime: [seedlingEmojiCode, booksEmojiCode],
      };

      const scorePercentage = (this.score / this.settings.questionAmount) * 100;

      let resultEmojiCode;

      if (scorePercentage === 100) {
        resultEmojiCode = sample(resultEmojiCodes["perfect"]);
      } else if (scorePercentage >= 75) {
        resultEmojiCode = sample(resultEmojiCodes["great"]);
      } else if (scorePercentage >= 50) {
        resultEmojiCode = sample(resultEmojiCodes["good"]);
      } else if (scorePercentage >= 25) {
        resultEmojiCode = sample(resultEmojiCodes["ok"]);
      } else {
        resultEmojiCode = sample(resultEmojiCodes["studyTime"]);
      }

      return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${resultEmojiCode}.svg`;
    },
  },
};
</script>

<style scoped>
.quiz-result-image {
  padding: 30px 0;
}
</style>
