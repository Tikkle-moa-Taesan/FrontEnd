<script setup>
import router from '@/router'
import { postBudgetCreate } from '@/utils/api'
import { ref } from 'vue'

const totalBudgetString = ref()
const totalBudgetNumber = ref()

const handleInput = (e) => {
  totalBudgetNumber.value = e.target.value.replace(/,/g, '')

  totalBudgetString.value = Number(totalBudgetNumber.value).toLocaleString()
}

const fetchBudgetCreate = async () => {
  try {
    await postBudgetCreate(totalBudgetNumber.value)

    router.replace({ name: 'financial-ledger-budget' })
  } catch (error) {
    console.error('가계부 생성에 실패하였습니다.', error)
  }
}
</script>

<template>
  <div class="form-container">
    <form class="budget-set-form" @submit.prevent="fetchBudgetCreate">
      <div class="input-container">
        <label for="budget">이번 달 예산을 설정해주세요</label>
        <div class="input">
          <input
            @input="handleInput"
            :value="totalBudgetString"
            type="text"
            id="budget"
            placeholder="0"
          />원
        </div>
      </div>

      <div class="btn-container">
        <button class="submit-btn" type="submit">예산 설정</button>
        <button class="same-btn" type="button">지난 달 예산 그대로</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding: 4rem;
  background-color: white;
  border-radius: 10px;
}

.budget-set-form {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

.input-container > label {
  font-weight: 700;
}

.input-container .input {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: fit-content;
  border-bottom: 1px solid black;
}

.input-container input {
  border: none;
  font-size: 1rem;
  font-weight: 700;
  text-align: end;
}

.input-container input:focus {
  outline: none;
}

.btn-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-container > button {
  border-radius: 10px;
  padding: 0.75rem;
  font-weight: 700;
  text-align: center;
}

.submit-btn {
  border: none;
  background-color: #3396f4;
  color: white;
}

.same-btn {
  border: 1px solid #646464;
  background-color: white;
  color: #646464;
}
</style>
