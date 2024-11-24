<script setup>
const model = defineModel()
</script>

<template>
  <div class="message-container">
    <div class="option-container">
      <div>
        <input v-model="model" type="radio" id="latest" value="최근 6개월에 대한 자산 분석" />
        <label for="latest"> 최근 6개월에 대한 자산 분석 </label>
      </div>
      <div>
        <input v-model="model" type="radio" id="whole" value="전체 기간에 대한 자산 분석" />
        <label for="whole"> 전체 기간에 대한 자산 분석 </label>
      </div>
    </div>
    <div class="img-container">
      <img src="@/assets/images/ghost.webp" alt="유령" />
    </div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.option-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  color: black;
  font-size: 0.875rem;
}

.option-container input {
  display: none;
}

.option-container label {
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  background-color: #74b7f8;
  color: white;
}

.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  background-color: rgba(255, 255, 255, 0.6);
  overflow: hidden;
}

.img-container img {
  width: 70%;
}
</style>
