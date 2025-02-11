<script setup>
import { ref, provide, onMounted, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const route = useRoute()

// Забезпечуємо кешування компонентів
provide('keepAlive', true)

const cachedViews = computed(() => ['HomeView', 'TeamView', 'ProjectsView', 'ContactView'])

const beforeLeave = (el) => {
  // Анімація виходу
  el.style.opacity = 0
  el.style.transform = 'translateY(20px)'
}

const enter = (el) => {
  // Анімація входу
  setTimeout(() => {
    el.style.opacity = 1
    el.style.transform = 'translateY(0)'
  }, 50)
}

onMounted(() => {
  // Ініціалізація при монтуванні
  console.log('App mounted')
})
</script>

<template>
  <div class="app-wrapper">
    <header class="header">
      <nav class="nav-container">
        <div class="logo">
          <h1>GigaScrumTeam</h1>
        </div>

        <button class="menu-toggle" @click="isMenuOpen = !isMenuOpen">
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div class="nav-links" :class="{ active: isMenuOpen }" @click="isMenuOpen = false">
          <RouterLink to="/" :class="{ active: $route.path === '/' }">Home</RouterLink>
          <RouterLink to="/team" :class="{ active: $route.path === '/team' }">Team</RouterLink>
          <RouterLink to="/projects" :class="{ active: $route.path === '/projects' }">Projects</RouterLink>
          <RouterLink to="/contact" :class="{ active: $route.path === '/contact' }">Contacts</RouterLink>
        </div>
      </nav>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <Transition name="fade" mode="out-in" @before-leave="beforeLeave" @enter="enter">
            <component :is="Component" :key="$route.fullPath" v-if="Component" />
          </Transition>
        </keep-alive>
      </RouterView>
    </main>

    <footer class="footer">
      <div class="foot-content">
        <div class="social-links">
          <a href="#" target="_blank" rel="noopener">
            <i class="fab fa-github"></i>
          </a>
          <a href="#" target="_blank" rel="noopener">
            <i class="fab fa-telegram"></i>
          </a>
          <a href="#" target="_blank" rel="noopener">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="#" target="_blank" rel="noopener">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" target="_blank" rel="noopener">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
        <p>&copy; 2025 GigaScrumTeam. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  background-repeat: no-repeat;
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-content {
  flex: 1;
  padding-top: 80px;
  width: 100%;
}

.header {
  background-color: rgba(79, 79, 80, 0.007);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #3498db;
}

.menu-toggle {
  display: none;
}

.footer {
  margin-bottom: -30px;
  padding-bottom: 0;
}

.foot-content {
  color: white;
  padding: 2rem 20px;
  text-align: center;
  width: 100%;
}

.foot-content {
  padding-top: 300px;
  background: radial-gradient(circle at bottom,
      rgba(54, 175, 165, 0.301) 5%,
      rgba(24, 177, 194, 0.2) 10%,
      rgba(28, 76, 78, 0.11) 30%,
      rgba(179, 13, 13, 0) 35%,
      rgba(28, 76, 78, 0.021) 35%,
      rgba(0, 0, 0, 0) 35%);
  color: white;
  text-align: center;
  width: 100%;
  position: relative;
}

.foot-content::before {
  content: '';
  position: absolute;
  background: linear-gradient(180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(24, 177, 194, 0.1) 50%,
      rgba(24, 177, 194, 0.2) 100%);
  pointer-events: none;
}

.social-links {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.footer p {
  position: relative;
  z-index: 1;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.social-links a {
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #3498db;
}

@media (min-width: 1441px) {
  .app-wrapper {
    padding: 0 40px;
  }

  .nav-container {
    padding: 1rem 40px;
  }
}

@media (max-width: 1024px) {
  .app-wrapper {
    padding: 0 15px;
  }

  .nav-container {
    padding: 1rem 15px;
  }

  .nav-links {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }

  .menu-toggle span {
    display: block;
    width: 25px;
    height: 3px;
    background: #ffffff;
    margin: 5px 0;
    transition: 0.3s;
  }

  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(26, 26, 26, 0.95);
    padding: 1rem;
    flex-direction: column;
    text-align: center;
  }

  .nav-links.active {
    display: flex;
  }

  .main-content {
    padding-top: 70px;
  }
}

@media (max-width: 480px) {
  .app-wrapper {
    padding: 0 10px;
  }

  .nav-container {
    padding: 0.8rem 10px;
  }

  .logo h1 {
    font-size: 1.2rem;
  }

  .social-links {
    gap: 1rem;
  }

  .social-links a {
    font-size: 1.2rem;
  }
}

/* Додаємо стилі для анімації переходів */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Активний стан для посилань навігації */
.nav-links a.active {
  color: #3498db;
}

/* Оптимізація для мобільного меню */
.nav-links.active {
  display: flex;
  animation: slideDown 0.3s ease forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-avatar {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 50%;
}
</style>
