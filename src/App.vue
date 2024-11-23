<script setup>
import { computed, provide, ref } from 'vue'
import { useRoute } from 'vue-router'

import Footer from './components/commons/Footer.vue'
import HeaderHome from './components/commons/HeaderHome.vue'
import HeaderPage from './components/commons/HeaderPage.vue'

const isModalShown = ref(false)
provide('isModalShown', isModalShown)

const route = useRoute()

const showLayout = computed(() => route.meta.layout !== 'none')

const isHomeHeader = computed(() => route.meta.header == 'home')
</script>

<template>
  <div class="align-center" :class="{ 'is-modal-open': isModalShown }">
    <div class="container">
      <header v-if="showLayout && isHomeHeader">
        <HeaderHome />
      </header>
      <header v-else-if="showLayout">
        <HeaderPage />
      </header>

      <RouterView v-slot="{ Component }">
        <Transition>
          <component :is="Component" />
        </Transition>
      </RouterView>

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

.is-modal-open {
  height: 100vh;
  overflow: hidden;
}

.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from {
  opacity: 0;
}
</style>
