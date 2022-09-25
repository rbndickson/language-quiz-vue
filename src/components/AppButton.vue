<script setup>
defineProps({
  xSmall: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  medium: {
    type: Boolean,
    default: false,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  blue: {
    type: Boolean,
    default: false,
  },
  green: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    class="app-button-base"
    :class="{
      'app-button-x-small': xSmall,
      'app-button-small': small,
      'app-button-medium': medium,
      'app-button-inline': inline,
      'app-button-blue': blue,
      'app-button-green': green,
    }"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
.app-button-base {
  display: block;
  width: 100%;
  padding: 10px 0;
  border: none;
  border-bottom: 4px solid #ffac33;
  border-radius: 5px;
  font-size: 24px;
  text-align: center;
  color: #000;
  background-color: #ffe8b6;
  cursor: pointer;
}
.app-button-base:hover {
  background-color: #ffe09e;
}

.app-button-x-small {
  width: 60px;
  margin: 6px auto;
  font-size: 16px;
}

.app-button-small {
  width: 100px;
  margin: 10px auto;
  font-size: 16px;
}

.app-button-medium {
  width: 250px;
  margin: 10px auto;
  font-size: 18px;
}

.app-button-inline {
  display: inline-block;
  margin: 5px;
}

.app-button-blue {
  background-color: #a5d6fa;
  border-bottom: 4px solid #55acee;
}
.app-button-blue:hover {
  background-color: #91cdf8;
}

.app-button-green {
  background-color: #d2eac2;
  border-bottom: 4px solid #77b255;
}
.app-button-green:hover {
  background-color: #c6e5b3;
}
</style>
