<template>
  <div class="typingWrapper">
    <span>🐲🌱🎊 </span>
    <h1 class="typing" id="typing">{{ curText }}</h1>
    <span>🌱🎊🐲</span>
  </div>
</template>

<script setup>
import { onMounted , ref } from 'vue';

const greeting = ['三峽北大夜騎隊', '揮揮手隊', '歲末聯合感恩聚會!'];
let currentGreetingIndex = 0;
let currentCharacterIndex = 0;
let isDeleting = false;
let isPaused = false;
let pauseEnd = 0;
const curText = ref('');

function typeWriterEffect() {
  if (isPaused && Date.now() > pauseEnd) {
    isPaused = false;
    if (isDeleting) {
      currentGreetingIndex = (currentGreetingIndex + 1) % greeting.length;
      isDeleting = false;
    } else {
      isDeleting = true;
    }
  }

  if (
    !isPaused &&
    !isDeleting &&
    currentCharacterIndex === greeting[currentGreetingIndex].length
  ) {
    isPaused = true;
    pauseEnd = Date.now() + 4000;
    return setTimeout(typeWriterEffect, 50);
  }

  if (!isPaused && isDeleting && currentCharacterIndex === 0) {
    isPaused = true;
    pauseEnd = Date.now() + 200;
    return setTimeout(typeWriterEffect, 50);
  }

  const timeout = isDeleting ? 100 : 200;
  curText.value = greeting[currentGreetingIndex].substring(
    0,
    currentCharacterIndex
  );
  currentCharacterIndex = isDeleting
    ? currentCharacterIndex - 1
    : currentCharacterIndex + 1;
  setTimeout(typeWriterEffect, timeout);
}

onMounted(() => {
  typeWriterEffect();
});
</script>

<style lang="scss">
.typingWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 3vw;
  margin: 0;
  span {
    font-size: 44px;
    letter-spacing: 10px;
  }
  @media (max-width: 440px) {
    span {
      font-size: 32px;
      letter-spacing: 2px;
    }
  }
}

.typing {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15vh;
  color: white;
  font-family: 'Open Sans', sans-serif;
  margin: 0;
}

#typing::after {
  content: '|';
  position: relative;
  right: 0;
  animation: blink 2s step-end infinite;
}

@keyframes blink {
  from,
  to {
    color: transparent;
  }
  50% {
    color: yellow;
  }
}
</style>
