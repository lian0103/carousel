<template>
  <div class="typingWrapper">
    🐲🌱🎊 
    <h1 class="typing" id="typing"></h1>
     🌱🎊🐲
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const greeting = ['三峽北大夜騎隊', '揮揮手隊', '歲末聯合感恩聚會'];
let currentGreetingIndex = 0;
let currentCharacterIndex = 0;
let isDeleting = false;
let isPaused = false;
let pauseEnd = 0;

function typeWriterEffect() {
  const greetingElement = document.getElementById('typing');

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
  greetingElement.innerText = greeting[currentGreetingIndex].substring(
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

<style>
.typingWrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 3vw;
  margin: 0;
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
