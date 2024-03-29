import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Ref } from "vue";
import type { ApiData } from "@/data";
import type { Flashcard } from "@/types/flashcard";

export interface Settings {
  questionAmount: number;
  level: "normal" | "difficult";
}

export interface AnswerHistory {
  correctAnswers: Flashcard[];
  incorrectAnswers: Flashcard[];
}

export interface Game {
  flashcards: Flashcard[];
  score: number;
  currentQuestionIndex: number;
  currentQuestionFlashcards: Flashcard[];
  isShowAnswer: boolean;
  answerHistory: AnswerHistory;
}

export const useQuizStore = defineStore("quiz", () => {
  const category = ref({ name: "", emojiCode: "" });
  const languageVariety = ref({ name: "", emojiCode: "" });
  const flashcards: Ref<Flashcard[]> = ref([]);

  const isShowSettings = ref(true);

  const initialSettings: Settings = {
    questionAmount: 0,
    level: "normal",
  };

  const settings: Ref<Settings> = ref(initialSettings);

  const game: Ref<Game> = ref({
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

  const currentFlashcard = computed((): Flashcard => {
    return game.value.flashcards[game.value.currentQuestionIndex];
  });

  function setInitialData(data: ApiData) {
    category.value.name = data.category;
    category.value.emojiCode = data.categoryEmojiCode;
    languageVariety.value.name = data.languageVariety;
    languageVariety.value.emojiCode = data.languageVarietyEmojiCode;
    flashcards.value = data.flashcards;

    settings.value.questionAmount =
      data.flashcards.length > 5 ? 5 : data.flashcards.length;
  }

  function resetGame() {
    game.value.currentQuestionIndex = 0;
    game.value.score = 0;
    game.value.answerHistory = { correctAnswers: [], incorrectAnswers: [] };
    game.value.flashcards = [];
  }

  function showSettingsScreen() {
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
    resetGame,
    showSettingsScreen,
  };
});
