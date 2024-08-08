<template>
  <div class="main">
    <video :src="themeVideo" autoplay muted loop preload="auto" playsinline class="theme-video"/>

    <div class="subtitle-pic">
      <img :src="homeSubTitle">
    </div>
    <div class="home-wrapper">
      <div class="home-logo">
        <img :src="homeLogo">
      </div>

      <div class="countdown" v-if="isShowCountdown">
        <VueCountdown :time="countdownTime" :interval="100" v-slot="{days, hours, minutes, seconds, milliseconds}" @end="handleEndOfCountdown">
          还剩：{{ days }} 天 {{ hours }} 小时 {{ minutes }} 分钟 {{ seconds }}.{{ Math.floor(milliseconds / 100) }} 秒
        </VueCountdown>
      </div>

      <div class="to-play-btn" v-else @click="toPlay">
        现在去玩
      </div>
    </div>
  </div>
</template>

<script setup>
import themeVideo from '@/assets/videos/theme-video.mp4'
import homeLogo from '@/assets/images/home-logo.png'
import homeSubTitle from '@/assets/images/home-subtitle.png'
import VueCountdown from '@chenfengyuan/vue-countdown';
import {computed, onMounted, ref} from "vue";

const isShowCountdown = ref(true)
const now = new Date()
const playTime = new Date(2024, 7, 20, 0, 0, 0, 0)
const countdownTime = computed(() => {
  return playTime - now
})

const handleEndOfCountdown = () => {
  isShowCountdown.value = false
}

const toPlay = () => {
  window.location.href = 'steam://launch/2358720'
}

onMounted(() => {
  if (now.getTime() >= playTime.getTime()) {
    handleEndOfCountdown()
  }
})
</script>

<style scoped>
.main {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.theme-video {
  width: 100%;
}

.home-wrapper {
  position: absolute;
  top: 156px;
  right: 268px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-logo {
  width: 626px;
  height: 454px;
  margin-bottom: 80px;
}

.subtitle-pic {
  position: absolute;
  width: 34px;
  height: 93px;
  top: 145.94px;
  right: 130px;
}

.countdown {
  color: white;
  font-size: 32px;
}

.to-play-btn {
  width: 226px;
  height: 106px;
  background: linear-gradient(#77B322, #588A1B);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #000;
  border-radius: 1px;
  font-size: 30px;
  cursor: pointer;
}

@media only screen and (min-width: 900px){

}
</style>
