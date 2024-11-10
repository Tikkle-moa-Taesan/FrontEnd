<script setup></script>

<template>
  <div class="footer-container">
    <img src="@/assets/icons/wallet.png" alt="자산" />
    <img src="@/assets/icons/home.png" alt="홈" />
    <img src="@/assets/icons/calendar.png" alt="가계부" />
  </div>
</template>

<style scoped>
.footer-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.25rem;
  background-color: #74b7f8;
}

.footer-container > img {
  width: 1.875rem;
  height: 1.875rem;
}
</style>
