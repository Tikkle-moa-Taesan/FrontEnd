<script setup>
import router from '@/router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const headerType = computed(() => route.meta.header)
const hasSearch = computed(() => route.meta.hasSearch)

const handleBackClick = () => {
  router.go(-1)
}
</script>

<template>
  <div class="header-container">
    <div v-if="headerType === 'home'">
      <RouterLink :to="{ name: 'home' }">
        <img class="main-logo" src="@/assets/images/TmT-logo.webp" alt="메인로고" />
      </RouterLink>
    </div>
    <div v-else class="arrow-container">
      <img
        @click="handleBackClick"
        class="arrow-left"
        src="@/assets/icons/arrow-left.png"
        alt="화살표"
      />
    </div>

    <nav>
      <img v-if="hasSearch" class="nav-icon" src="@/assets/icons/search.png" alt="검색" />
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

.main-logo {
  height: 2.25rem;
}

.arrow-container {
  display: flex;
  align-items: center;
  height: 2.25rem;
}

.arrow-left {
  height: 1.25rem;
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
