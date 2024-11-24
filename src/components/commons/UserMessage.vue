<script setup>
defineProps({
  msg: String,
})
</script>

<template>
  <div class="message-container">
    <div class="img-container">
      <img src="@/assets/images/ghost.webp" alt="유령" />
    </div>
    <div class="text">{{ msg }}</div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.text {
  flex: 1;
  padding: 1rem;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  color: black;
  line-height: 1.25rem;
  font-size: 0.875rem;
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
