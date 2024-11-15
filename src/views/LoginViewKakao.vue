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
  <h1>카카오 인가코드 확인 페이지</h1>
</template>

<style scoped></style>
