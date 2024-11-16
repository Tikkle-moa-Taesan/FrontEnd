<script setup>
import router from '@/router'

const handleBackClick = () => {
  router.go(-1)
}
</script>

<template>
  <div class="header-container">
    <div class="arrow-container">
      <img
        @click="handleBackClick"
        class="arrow-left"
        src="@/assets/icons/arrow-left.png"
        alt="화살표"
      />
    </div>

    <nav>
      <img class="nav-icon" src="@/assets/icons/search.png" alt="검색" />
      <img class="nav-icon" src="@/assets/icons/bell.png" alt="알림" />
      <img class="nav-icon" src="@/assets/icons/hamburger.png" alt="메뉴" />
    </nav>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background-color: #f2f2f2;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.arrow-container {
  display: flex;
  align-items: center;
}

.arrow-left {
  height: 1.25rem;
}

.main-logo {
  width: 2.25rem;
  height: 2.25rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 2.25rem;
}

.nav-icon {
  width: 1.5625rem;
  height: 1.5625rem;
}
</style>
