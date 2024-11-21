<script setup>
defineProps({
  msg: String,
})
</script>

<template>
  <div class="loading-container">
    <img class="ghost-img" src="@/assets/images/ghost.png" alt="유령" />
    <span class="msg">{{ msg }}</span>
  </div>
</template>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.ghost-img {
  width: 10rem;
}

.msg {
  color: #646464;
}
</style>
