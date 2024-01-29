<template>
  <HeadTitle />
  <div class="wrapper">
    <Carousel />
  </div>
</template>

<script setup>
import Carousel from './components/Carousel.vue';
import HeadTitle from './components/HeadTitle.vue';
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #000000;
  min-height: 100vh;
  background-image: url('./assets/bg1.png'),url('./assets/bg2.png'),url('./assets/bg3.png');
  background-color: #333;
  font-family: helvetica, arial;
  animation: snow 20s linear infinite;
}

@keyframes snow {
  0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
  100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}


#app{
  display: flex;
  flex-direction: column;
}

.wrapper {
  margin: 0;
  width: 100vw;
  min-height: 85vh;
  display: flex;
  justify-content: center;
  padding-top: 50px;
}
</style>
