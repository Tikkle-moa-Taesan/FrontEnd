<script setup>
import { useRoute } from 'vue-router'
import Footer from './components/commons/Footer.vue'
import Header from './components/commons/Header.vue'
import { computed } from 'vue'

const route = useRoute()

const showLayout = computed(() => {
  return route.meta.layout !== 'none'
})
</script>

<template>
  <div class="align-center">
    <div class="container">
      <header v-if="showLayout">
        <Header />
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
}

.container {
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
