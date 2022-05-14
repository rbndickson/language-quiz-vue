<template>
  <div id="quiz" class="quiz">
    <h1 class="text-center">{{ languageVariety }} {{ category }} Quiz</h1>
    <QuizSettings v-if="settings.isShowSettings" />
    <QuizGame v-else />
  </div>
</template>

<script>
import QuizSettings from "./QuizSettings.vue";
import QuizGame from "./QuizGame.vue";

export default {
  name: "QuizPage",
  components: { QuizSettings, QuizGame },
  inject: ["category", "languageVariety", "settings"],
};
</script>

<style>
.quiz {
  position: relative;
  background-color: #fff;
  max-width: 580px;
  margin: 60px auto 20px auto;
  border-radius: 5px;
  padding: 10px;
}
</style>
