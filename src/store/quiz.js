import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useQuizStore = defineStore("quiz", () => {
  const category = ref({ name: "", emojiCode: "" });
  const languageVariety = ref({ name: "", emojiCode: "" });
  const flashcards = ref([]);

  const isShowSettings = ref(true);
  const settings = ref({
    questionAmount: 0,
    level: "normal",
  });

  const game = ref({
    flashcards: [],
    score: 0,
    currentQuestionIndex: 0,
    currentQuestionFlashcards: [],
    isShowAnswer: false,
    answerHistory: { correctAnswers: [], incorrectAnswers: [] },
  });

  const answerChoiceAmount = computed(() => {
    return settings.value.level === "normal" ? 3 : 6;
  });

  const currentFlashcard = computed(() => {
    return game.value.flashcards[game.value.currentQuestionIndex];
  });

  function setInitialData(data) {
    category.value.name = data.category;
    category.value.emojiCode = data.categoryEmojiCode;
    languageVariety.value.name = data.languageVariety;
    languageVariety.value.emojiCode = data.languageVarietyEmojiCode;
    flashcards.value = data.flashcards;

    settings.value.questionAmount =
      data.flashcards.length > 5 ? 5 : data.flashcards.length;
  }
  function showSettings() {
    isShowSettings.value = true;
  }

  return {
    category,
    languageVariety,
    flashcards,
    isShowSettings,
    settings,
    game,

    answerChoiceAmount,
    currentFlashcard,

    setInitialData,
    showSettings,
  };
});
