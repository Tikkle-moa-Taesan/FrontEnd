<script setup>
const BASE_FE_URL = import.meta.env.VITE_BASE_FE_URL
const KAKAO_KEY = import.meta.env.VITE_KAKAO_KEY

const kakaoRedirectUri = `${BASE_FE_URL}/login/kakao/code`

const handleKakaoBtnClick = () => {
  location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_KEY}&redirect_uri=${kakaoRedirectUri}&scope=openid`
}
</script>

<template>
  <div class="container">
    <div class="img-container">
      <img class="logo" src="@/assets/images/TmT.png" alt="logo" />
      <img class="ghost" src="@/assets/images/ghost.png" alt="유령" />
    </div>

    <div class="btn-container">
      <button @click="handleKakaoBtnClick" class="kakao-btn">
        <img src="@/assets/images/kakao-logo.png" alt="카카오" />
        <span>카카오 로그인</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 8rem 5rem;
  height: 100vh;
  background-image: url('@/assets/images/login-background.png');
  background-size: cover;
}

.img-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.img-container .logo {
  width: 10rem;
}

.img-container .ghost {
  width: 15rem;
}

.kakao-btn {
  display: flex;
  align-items: center;
  width: 18rem;
  height: 3.75rem;
  padding: 1.25rem;
  border: none;
  border-radius: 10px;
  background-color: #fee500;
  font-size: 1rem;
  font-weight: 500;
}

.kakao-btn > img {
  width: 1.5rem;
  height: 1.5rem;
}

.kakao-btn > span {
  width: 100%;
}
</style>
