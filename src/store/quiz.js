import { defineStore } from "pinia";

export const useQuizStore = defineStore("quiz", {
  state: () => {
    return {
      category: { name: "", emojiCode: "" },
      languageVariety: { name: "", emojiCode: "" },
      flashcards: [],
      level: "normal",
    };
  },
  getters: {
    answerChoiceAmount() {
      return this.level === "normal" ? 3 : 6;
    },
  },
  actions: {
    setInitialData(data) {
      this.category.name = data.category;
      this.category.emojiCode = data.categoryEmojiCode;
      this.languageVariety.name = data.languageVariety;
      this.languageVariety.emojiCode = data.languageVarietyEmojiCode;
      this.flashcards = data.flashcards;
    },
  },
});
