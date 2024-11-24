<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'

import BotMessage from './BotMessage.vue'
import UserMessage from './UserMessage.vue'

import { getChatbotForLatest, getChatbotForWhole } from '@/utils/api'

const conversation = defineModel()

const isLoading = ref(false)

const containerRef = ref(null)

const selectedOption = ref(null)
const answerOfChatbot = ref(null)

const initialOptionsMessage = [
  { type: 'bot', modalType: 'text', msg: '원하시는 자산 분석 서비스를 선택해주세요.' },
  { type: 'bot', modalType: 'select' },
]

watch(selectedOption, async (newValue) => {
  if (newValue == null) return

  isLoading.value = true

  await nextTick()
  containerRef.value.scrollTop = containerRef.value.scrollHeight

  conversation.value.push({
    type: 'user',
    msg: newValue,
  })

  conversation.value.push({
    type: 'bot',
    modalType: 'text',
    msg: '데이터 분석중입니다. 잠시만 기다려주세요.',
  })

  await nextTick()
  containerRef.value.scrollTop = containerRef.value.scrollHeight

  switch (newValue) {
    case '최근 6개월에 대한 자산 분석':
      const latestData = await getChatbotForLatest()
      answerOfChatbot.value = latestData.text
      break
    case '전체 기간에 대한 자산 분석':
      const wholeData = await getChatbotForWhole()
      answerOfChatbot.value = wholeData.text
      break
  }

  if (!answerOfChatbot.value)
    answerOfChatbot.value = '아직 가계부가 생성되지 않아 자산을 분석할 수 없어요ㅠㅠ'

  isLoading.value = false

  if (answerOfChatbot.value) {
    conversation.value.push({
      type: 'bot',
      modalType: 'text',
      msg: answerOfChatbot.value,
    })
  }

  await nextTick()
  containerRef.value.scrollTop = containerRef.value.scrollHeight

  conversation.value.push(...initialOptionsMessage)
  selectedOption.value = null
})

onMounted(() => {
  containerRef.value.scrollTop = containerRef.value.scrollHeight
})
</script>

<template>
  <div class="modal-container" ref="containerRef">
    <div class="render-container" v-for="(message, idx) in conversation" :key="idx">
      <UserMessage v-if="message.type === 'user'" :msg="message.msg" />
      <BotMessage
        v-if="message.type === 'bot' && message.modalType === 'text'"
        :modal-type="message.modalType"
        :msg="message.msg"
      />
      <BotMessage
        v-if="message.type === 'bot' && message.modalType === 'select'"
        :modal-type="message.modalType"
        v-model="selectedOption"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-container {
  height: 60vh;
  background-color: #d2e2f1;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

.render-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
