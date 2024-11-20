<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import Footer from './components/commons/Footer.vue'
import HeaderHome from './components/commons/HeaderHome.vue'
import HeaderPage from './components/commons/HeaderPage.vue'

const route = useRoute()

const showLayout = computed(() => route.meta.layout !== 'none')

const isHome = computed(() => route.meta.isHome == true)
</script>

<template>
  <div class="align-center">
    <div class="container">
      <header v-if="showLayout && isHome">
        <HeaderHome />
      </header>
      <header v-else-if="showLayout">
        <HeaderPage />
      </header>

      <RouterView />

      <footer v-if="showLayout">
        <Footer />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.align-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
}

header {
  z-index: 10;
  position: sticky;
  top: 0;
  width: 100%;
}

footer {
  position: sticky;
  bottom: 0;
  width: 100%;
}
</style>
