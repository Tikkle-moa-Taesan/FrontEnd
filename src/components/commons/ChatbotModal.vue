<script setup>
import { ref, watch } from 'vue'

import BotMessage from './BotMessage.vue'
import BotSelectMessage from './BotSelectMessage.vue'
import { getChatbotForLatest, getChatbotForWhole } from '@/utils/api'
import UserMessage from './UserMessage.vue'

const isLoading = ref(false)

const selectedOption = ref(null)

const answerOfChatbot = ref(null)

watch(selectedOption, async (newValue) => {
  isLoading.value = true

  switch (newValue) {
    case '최근 6개월에 대한 자산 분석':
      const res = await getChatbotForLatest()
      answerOfChatbot.value = res.text
      break
    // case 'whole':
    //   answerOfChatbot.value = await getChatbotForWhole()
    //   break
    default:
      answerOfChatbot.value = null
  }

  isLoading.value = false
})
</script>

<template>
  <div class="modal-container">
    <BotMessage msg="안녕하세요. 저는 당신의 AI 비서 Teemo라고 해요!" />
    <BotMessage msg="원하시는 자산 분석 서비스를 선택해주세요." />

    <BotSelectMessage v-model="selectedOption" />

    <UserMessage v-if="selectedOption" :msg="selectedOption" />

    <BotMessage v-if="isLoading" msg="데이터 분석중입니다. 잠시만 기다려주세요." />
    <BotMessage v-if="answerOfChatbot && !isLoading" :msg="answerOfChatbot" />
  </div>
</template>

<style scoped>
.modal-container {
  height: 60vh;
  background-color: #d2e2f1;
  overflow-y: scroll;
}
</style>
