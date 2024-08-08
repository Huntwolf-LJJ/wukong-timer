<template>
  <div class="main">
    <video v-if="!isPhone" :src="themeVideo" autoplay muted loop preload="auto" playsinline class="theme-video"/>

    <div v-else class="theme-bg">
      <img :src="themeBg"/>
    </div>

    <div :class="isPhone ? 'subtitle-pic-phone' : 'subtitle-pic'">
      <img :src="homeSubTitle">
    </div>

    <div :class="isPhone ? 'home-wrapper-phone' : 'home-wrapper'">
      <template v-if="!isPhone">
        <div class="home-logo">
          <img :src="homeLogo">
        </div>

        <div class="countdown" v-if="isShowCountdown">
          <VueCountdown :time="countdownTime" :interval="100" v-slot="{days, hours, minutes, seconds, milliseconds}" @end="handleEndOfCountdown">
            还剩：{{ days }} 天 {{ hours }} 小时 {{ minutes }} 分钟 {{ seconds }}.{{ Math.floor(milliseconds / 100) }} 秒
          </VueCountdown>
        </div>

        <div class="to-play-btn" v-else-if="!isPhone" @click="toPlay">
          现在去玩
        </div>
      </template>

      <template v-else>
        <div class="home-logo-phone">
          <img :src="homeLogoPhone"/>
        </div>

        <div class="home-time-phone">
          <img :src="timePhone">
        </div>

        <div class="countdown-phone">
          <VueCountdown :time="countdownTime" :interval="100" v-slot="{days, hours, minutes, seconds, milliseconds}" @end="handleEndOfCountdown">
            还剩：{{ days }} 天 {{ hours }} 小时 {{ minutes }} 分钟 {{ seconds }}.{{ Math.floor(milliseconds / 100) }} 秒
          </VueCountdown>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import themeVideo from '@/assets/videos/theme-video.mp4'
import themeBg from '@/assets/images/theme-bg.png'
import homeLogo from '@/assets/images/home-logo.png'
import homeLogoPhone from '@/assets/images/phone-home-logo.png'
import timePhone from '@/assets/images/phone-time.png'
import homeSubTitle from '@/assets/images/home-subtitle.png'
import VueCountdown from '@chenfengyuan/vue-countdown';
import {computed, onMounted, ref} from "vue";

const isShowCountdown = ref(true)
const isPhone = ref(false)
const now = new Date()
const playTime = new Date(2024, 7, 20, 10, 0, 0, 0)
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
  window.onresize = () => {
    isPhone.value = window.matchMedia("(max-width: 900px)").matches;
  }
  isPhone.value = window.matchMedia("(max-width: 900px)").matches;

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
  background: #000;
}

.theme-video {
  width: 100%;
}

.theme-bg {
  position: absolute;
  width: 100%;
  //height: 100%;
}

.home-wrapper {
  position: absolute;
  top: 156px;
  right: 268px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-wrapper-phone {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-logo {
  width: 626px;
  height: 454px;
  margin-bottom: 80px;
}

.home-logo-phone {
  width: 980px;
  //height: 454px;
  margin-top: 400px;
}

.home-time-phone {
  margin-top: 880px;
  width: 70%;
}

.subtitle-pic {
  position: absolute;
  width: 34px;
  top: 145.94px;
  right: 130px;
}

.subtitle-pic-phone {
  position: absolute;
  width: 114px;
  top: 310px;
  left: 100px;
}

.countdown {
  color: white;
  font-size: 32px;
  text-align: center;
}

.countdown-phone {
  color: white;
  //width: 70%;
  font-size: 88px;
  text-align: center;
  margin-top: 90px;
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
</style>
