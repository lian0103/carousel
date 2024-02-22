<template>
  <div class="gallery">
    <div
      class="bg-img"
      v-for="(item, idx) in imgsArr.slice(0, 10)"
      :key="idx"
      :style="{
        'background-image': `url(
          ${isProd ? `/carousel/albums/${item}.jpg` : `/albums/${item}.jpg`}
        )`,
        display: idx > curIndex ? 'none' : 'block',
        'z-index': idx > curIndex ? -1 : 1,
      }"
      :class="{
        fadeOutEffect1: idx >= curIndex && curIndex % 2 == 0,
        fadeOutEffect2: idx >= curIndex && curIndex % 2 == 1,
      }"
    ></div>
    <!-- <img
      v-for="(item, idx) in imgsArr.slice(0, 10)"
      :key="idx"
      :src="isProd ? `/carousel/albums/${item}.jpg` : `/albums/${item}.jpg`"
      :style="{
        display: idx > curIndex ? 'none' : 'block',
        'z-index': idx > curIndex ? -1 : 1
      }"
      :class="{
        fadeOutEffect1: idx >= curIndex && curIndex % 2 == 0,
        fadeOutEffect2: idx >= curIndex && curIndex % 2 == 1,
      }"
      alt=""
    /> -->
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
function getShuffleArray() {
  let array = new Array(138).fill(1).map((i, idx) => idx + 1);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const imgsArr = ref(getShuffleArray());
const curIndex = ref(10);

const isProd = import.meta.env.VITE_ENV === 'prod';

console.log('isProd', isProd);
let timeInterval = null;

function animationInit() {
  timeInterval = setInterval(() => {
    // console.log('curIndex.value',curIndex.value)
    if (curIndex.value - 1 < 0) {
      imgsArr.value = getShuffleArray();
      curIndex.value = 10;
    } else {
      curIndex.value = curIndex.value - 1;
    }
  }, 5000);
}

onMounted(() => {
  animationInit();
});

onUnmounted(() => {
  clearInterval(timeInterval);
});
</script>

<style lang="scss">
$n: 10; /* number of images*/

.gallery {
  position: relative;
  width: 90vw;
  // max-width: 800px;
}
.gallery img , .gallery .bg-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  max-height: 90vh;
  aspect-ratio: auto 3/4;
  object-fit: contain;
  border: 10px solid #f2f2f2;
  box-shadow: 1px 1px 6px #0007;
  border-radius: 15px;
  background-color: rgba(255, 255, 255, 0.8);
}

.gallery .bg-img{
  background-size: contain;
  background-repeat: repeat;
}

@for $i from 1 to ($n + 1) {
  .gallery > img:nth-child(#{$i}) , .gallery > .bg-img:nth-child(#{$i})  {
    --r: #{(-5 + random(5)) * 1deg};
    transform: rotate(var(--r));
  }
}

.fadeOutEffect1 {
  opacity: 1;
  animation: fadeOut1 2s forwards;
}

.fadeOutEffect2 {
  opacity: 1;
  animation: fadeOut2 2s forwards;
}

@keyframes fadeOut1 {
  0% {
    left: 0;
    opacity: 1;
  }
  100% {
    opacity: 0;
    left: -20%;
  }
}

@keyframes fadeOut2 {
  0% {
    left: 0;
    opacity: 1;
  }
  100% {
    opacity: 0;
    left: 20%;
  }
}
</style>
