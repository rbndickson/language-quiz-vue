<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useQuizStore } from "../store/quiz";

import { sample, emojiSvgUrl } from "../helpers";

const quizStore = useQuizStore();

const { game, settings } = storeToRefs(quizStore);

const generateImageLink = () => {
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

  const scorePercentage =
    (game.value.score / settings.value.questionAmount) * 100;

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

  return emojiSvgUrl(resultEmojiCode);
};
</script>

<template>
  <img
    height="150"
    width="150"
    class="quiz-result-image"
    alt=""
    :src="generateImageLink()"
  />
</template>

<style scoped>
.quiz-result-image {
  padding: 30px 0;
}
</style>
