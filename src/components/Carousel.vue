<template>
  <div class="gallery">
    <img
      v-for="(item,idx) in imgsArr.slice(0, 19)"
      :key="idx"
      :src="`/albums/${item}.jpg`"
      alt=""
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
function getShuffleArray() {
  let array = new Array(136).fill(1).map((i, idx) => idx + 1);
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const imgsArr = ref(getShuffleArray());



onMounted(() => {
  setInterval(() => {
    imgsArr.value = getShuffleArray();
    console.log(imgsArr.value);
  }, 60000);
});
</script>

<style lang="scss">
$n: 10; /* number of images*/

.gallery {
  --d: 60s; /* duration */

  display: grid;
  width: 34vw;
  min-width: 600px
}
.gallery > img {
  grid-area: 1/1;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border: 10px solid #f2f2f2;
  box-shadow: 0 0 4px #0007;
  animation: slide var(--d) infinite;
  border-radius: 15px;
}
.gallery img:last-child {
  animation-name: slide-last;
}

@for $i from 1 to ($n + 1) {
  .gallery > img:nth-child(#{$i}) {
    animation-delay: calc(#{(1 - $i) / $n}* var(--d));
    --r: #{(-20 + random(40)) * 1deg};
  }
}
@keyframes slide {
  0%,
  100%,
  #{100.01 - 100/$n}% {
    transform: translateX(0%) rotate(var(--r));
    z-index: 3;
  }
  #{50/$n}% {
    transform: translateX(-120%) rotate(var(--r));
    z-index: 3;
  }
  #{50/$n + .01}% {
    transform: translateX(-120%) rotate(var(--r));
    z-index: -3;
  }
  #{100/$n}%,
  #{100 - 100/$n}% {
    transform: translateX(0%) rotate(var(--r));
    z-index: -3;
  }
}

@keyframes slide-last {
  0%,
  100%,
  #{100.01 - 50/$n}% {
    transform: translateX(0%) rotate(var(--r));
    z-index: 3;
  }
  #{50/$n}% {
    transform: translateX(120%) rotate(var(--r));
    z-index: 3;
  }
  #{50/$n + .01}% {
    transform: translateX(120%) rotate(var(--r));
    z-index: -3;
  }
  #{100/$n}%,
  #{100 - 50/$n}% {
    transform: translateX(0%) rotate(var(--r));
    z-index: -3;
  }
}
</style>
