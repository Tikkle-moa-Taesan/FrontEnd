<script setup>
import router from '@/router'
import instance from '@/utils/instance'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const code = ref(route.query.code)

onMounted(async () => {
  try {
    await instance.get(`/api/oauth/kakao/login/${code.value}`)
  } catch (error) {
    console.error(error)
  }

  router.push({ name: 'home' })
})
</script>

<template>
  <h1>카카오 인가코드 확인 페이지</h1>
</template>

<style scoped></style>
