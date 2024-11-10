<script setup></script>

<template>
  <div class="header-container">
    <img class="main-logo" src="@/assets/images/main-logo.png" alt="메인로고" />

    <nav>
      <img class="nav-icon" src="@/assets/icons/bell.png" alt="알림" />
      <img class="nav-icon" src="@/assets/icons/hamberger.png" alt="메뉴" />
    </nav>
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background-color: #f2f2f2;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
}

.main-logo {
  width: 2.25rem;
  height: 2.25rem;
}

nav {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-icon {
  width: 1.5625rem;
  height: 1.5625rem;
}
</style>
