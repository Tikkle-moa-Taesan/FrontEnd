<script setup></script>

<template>
  <div class="footer-container">
    <img src="@/assets/icons/wallet.png" alt="자산" />
    <RouterLink class="link" :to="{ name: home }">
      <img src="@/assets/icons/home.png" alt="홈" />
    </RouterLink>
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

.link {
  width: 1.875rem;
  height: 1.875rem;
}

.footer-container > img {
  width: 1.875rem;
  height: 1.875rem;
}

.link > img {
  width: 100%;
  height: 100%;
}
</style>
