<script setup>
import { computed, onMounted, ref, watch } from 'vue'

const model = defineModel()

const props = defineProps({
  totalBudget: Number,
})

const emits = defineEmits(['submit'])

const labels = [
  '식비',
  '생활',
  '주거/통신',
  '금융',
  '교통',
  '육아',
  '문화/여가',
  '반려동물',
  '경조/선물',
]

const previousBudget = JSON.stringify({ ...model.value })

const budgetString = ref({})

const sumOfInput = computed(() => {
  return Object.values(model.value).reduce((sum, budget) => sum + budget, 0)
})

const isSame = ref(true)
const isBigger = computed(() => {
  return sumOfInput.value > props.totalBudget
})

const handleInput = (e, key) => {
  model.value[key] = Number(e.target.value.replace(/,/g, ''))

  budgetString.value[key] = Number(model.value[key]).toLocaleString()
}

const handleBudgetFormSubmit = () => {
  if (isSame.value || isBigger.value) return

  emits('submit')
}

watch(
  model,
  (newValue) => {
    isSame.value = JSON.stringify(newValue) === previousBudget
  },
  { deep: true },
)

onMounted(() => {
  Object.keys(model.value).forEach((key) => {
    budgetString.value[key] = Number(model.value[key]).toLocaleString()
  })
})
</script>

<template>
  <div class="form-container">
    <h2>카테고리 별 예산을 설정해주세요.</h2>

    <form class="category-budget-form" @submit.prevent="handleBudgetFormSubmit">
      <div v-for="(value, key, idx) in model" class="category">
        <label :for="key">{{ labels[idx] }}</label>
        <div class="input-container">
          <input
            :id="key"
            :value="budgetString[key]"
            placeholder="0"
            type="text"
            @input="handleInput($event, key)"
          />원
        </div>
      </div>

      <button
        class="submit-btn"
        :class="{ 'is-same': isSame, 'is-bigger': isBigger }"
        type="submit"
      >
        <div v-if="!isBigger">
          <span>예산 확정</span> (남은 예산: {{ (totalBudget - sumOfInput).toLocaleString() }})
        </div>
        <div v-else>
          <span>예산 초과</span> (초과 금액: {{ (sumOfInput - totalBudget).toLocaleString() }})
        </div>
      </button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
  padding: 2rem 1.5rem;
  background-color: white;
  border-radius: 10px;
}

h2 {
  font-weight: 600;
}

.category-budget-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.category {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category .input-container {
  display: flex;
  gap: 0.5rem;
  color: #646464;
  border-bottom: 1px solid #646464;
}

.category input {
  border: none;
  text-align: end;
  color: #646464;
  width: 6rem;
}

.category input:focus {
  outline: none;
  color: black;
  font-weight: 600;
}

.category input:focus + span {
  color: black;
}

.category input:focus ~ .input-container {
  border-color: black;
}

.category .input-container:focus-within {
  color: black;
  border-color: black;
}

.submit-btn {
  margin-top: 2rem;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #3396f4;
  color: white;
}

.submit-btn span {
  font-weight: 700;
}

.is-same {
  background-color: #a5a5a5;
}

.is-bigger {
  background-color: #ff4a4a;
}
</style>
