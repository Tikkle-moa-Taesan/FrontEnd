<script setup>
import router from '@/router'
import { getLogin } from '@/utils/api'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const code = ref(route.query.code)

onMounted(async () => {
  try {
    await getLogin(code.value)
    router.push({ name: 'home' })
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <div class="login-loading-container">
    <img class="ghost-img" src="@/assets/images/ghost.webp" alt="유령" />
    <span class="loading-msg">잠시만 기다려주세요</span>
  </div>
</template>

<style scoped>
.login-loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  height: 100vh;
  padding-top: 50%;
  background-color: #f2f2f2;
}

.loading-msg {
  font-weight: 600;
}

.ghost-img {
  width: 13rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
}
</style>
