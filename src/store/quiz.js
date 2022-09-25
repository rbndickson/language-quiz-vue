import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => {
    return {
      category: { name: "", emojiCode: "" },
      languageVariety: { name: "", emojiCode: "" },
      flashcards: [],
      isShowSettings: true,
      settings: {
        questionAmount: 0,
        level: "normal",
      },
      game: {
        flashcards: [],
        score: 0,
        currentQuestionIndex: 0,
        currentQuestionFlashcards: [],
        isShowAnswer: false,
        answerHistory: { correctAnswers: [], incorrectAnswers: [] },
      },
    };
  },
  getters: {
    answerChoiceAmount() {
      return this.settings.level === "normal" ? 3 : 6;
    },
  },
  actions: {
    setInitialData(data) {
      this.category.name = data.category;
      this.category.emojiCode = data.categoryEmojiCode;
      this.languageVariety.name = data.languageVariety;
      this.languageVariety.emojiCode = data.languageVarietyEmojiCode;
      this.flashcards = data.flashcards;

      this.settings.questionAmount =
        data.flashcards.length > 5 ? 5 : data.flashcards.length;
    },
  },
});
