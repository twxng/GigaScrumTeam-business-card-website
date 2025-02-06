<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FAQSection from '../components/FAQSection.vue'

gsap.registerPlugin(ScrollTrigger)

let scene, camera, renderer, controls
const particles = []
const particlesCount = 100

const scrollToServices = (e) => {
  e.preventDefault()
  const servicesSection = document.getElementById('services')
  servicesSection.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })
}

const init3D = () => {
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  })
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
  document.querySelector('.hero-3d').appendChild(renderer.domElement)

  const geometry = new THREE.SphereGeometry(0.01, 32, 32)
  const material = new THREE.MeshPhongMaterial({
    color: 0x3498db,
    specular: 0xffffff,
    shininess: 200,
    transparent: true,
    opacity: 0.8,
  })

  for (let i = 0; i < particlesCount; i++) {
    const particle = new THREE.Mesh(geometry, material)
    particle.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
    particle.velocity = new THREE.Vector3(
      Math.random() * 0.02 - 0.01,
      Math.random() * 0.02 - 0.01,
      Math.random() * 0.02 - 0.01,
    )
    particles.push(particle)
    scene.add(particle)
  }

  // Додаємо світло
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(5, 5, 5)
  scene.add(light)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)

  camera.position.z = 5

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enableZoom = false

  window.addEventListener('resize', onWindowResize)

  animate()
}

const animate = () => {
  requestAnimationFrame(animate)

  particles.forEach((particle) => {
    particle.position.add(particle.velocity)

    if (Math.abs(particle.position.x) > 5) particle.velocity.x *= -1
    if (Math.abs(particle.position.y) > 5) particle.velocity.y *= -1
    if (Math.abs(particle.position.z) > 5) particle.velocity.z *= -1
  })

  controls.update()
  renderer.render(scene, camera)
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2)
}

const testimonials = ref([
  {
    text: "The GigaScrumTeam exceeded all our expectations. Their professionalism and attention to detail is impressive.",
    author: "Maria Petrenko",
    position: "CEO, TechStart"
  },
  {
    text: "The best solution for our business. Fast, high-quality and on time.",
    author: "Alexander Kovalchuk",
    position: "Founder, Digital Solutions"
  },
  {
    text: "Innovative approach and modern technologies. Exactly what we were looking for for our project.",
    author: "Iryna Melnyk",
    position: "CTO, Innovation Hub"
  }
])

const currentTestimonial = ref(0)

const runningText = ref([
  'React', 'Vue.js', 'Node.js', 'TypeScript', 'Python', 'Docker',
  'AWS', 'Azure', 'MongoDB', 'PostgreSQL', 'GraphQL', 'REST API'
])

onMounted(() => {
  init3D()
  // Анімація для статистики
  // gsap.from('.stat-item', {
  //   scrollTrigger: {
  //     trigger: '.stats',
  //     start: 'top center+=100',
  //     toggleActions: 'play none none reverse'
  //   },
  //   y: 50,
  //   opacity: 0,
  //   duration: 1,
  //   stagger: 0.2
  // })

  // Автоматична зміна відгуків
  setInterval(() => {
    gsap.to('.testimonial-content', {
      opacity: 0,
      y: -20,
      duration: 0.5,
      onComplete: () => {
        currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.value.length
        gsap.to('.testimonial-content', {
          opacity: 1,
          y: 0,
          duration: 0.5
        })
      }
    })
  }, 9000)

  // Анімація бігаючої стрічки
  const marquee = document.querySelector('.marquee-content')
  gsap.to(marquee, {
    x: '-50%',
    duration: 15,
    ease: 'none',
    repeat: -1
  })
})

onUnmounted(() => {
  if (renderer) {
    renderer.dispose()
    window.removeEventListener('resize', onWindowResize)
  }
})
</script>

<template>
  <div class="home">
    <section class="hero">
      <div data-speed="2" class="hero-content">
        <h1>GigaScrumTeam</h1>
        <p>We create innovative web solutions</p>
        <div class="hero-buttons">
          <RouterLink to="/projects" class="btn primary">Our projects</RouterLink>
          <RouterLink to="/contact" class="btn secondary">Contact</RouterLink>
        </div>
      </div>
      <div class="hero-3d"></div>
    </section>

    <div class="scroll-btn-wrapper">
      <a href="#services" class="scroll-btn">
        <span class="text">Explore more about us</span>
        <span class="arrow">
          <i class="fas fa-chevron-down"></i>
        </span>
      </a>
    </div>

    <section id="services" class="services">
      <h2>Our services</h2>
      <div class="services-grid">
        <div class="service-card">
          <i class="fas fa-code"></i>
          <h3>Web development</h3>
          <p>Developing modern web applications using React and .NET</p>
        </div>
        <div class="service-card">
          <i class="fas fa-mobile-alt"></i>
          <h3>Mobile development</h3>
          <p>Development of native and cross-platform mobile applications</p>
        </div>
        <div class="service-card">
          <i class="fas fa-cloud"></i>
          <h3>Cloud solutions</h3>
          <p>Deploy and maintain applications in cloud environments</p>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stat-item">
        <h3>10+</h3>
        <p>Successful projects</p>
      </div>
      <div class="stat-item">
        <h3>8+</h3>
        <p>Satisfied customers</p>
      </div>
      <div class="stat-item">
        <h3>5+</h3>
        <p>Years of experience</p>
      </div>
    </section>

    <!-- Бігаюча стрічка -->
    <div class="marquee">
      <div class="marquee-content">
        <span v-for="(text, index) in runningText" :key="index">
          {{ text }}
          <i class="fas fa-circle"></i>
        </span>
      </div>
    </div>

    <section class="why-us">
      <h2>Why choose us</h2>
      <div class="features-grid">
        <div class="feature-card">
          <i class="fas fa-rocket"></i>
          <h3>Fast development</h3>
          <p>We use Scrum methodology for efficient and fast project development</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-code"></i>
          <h3>Modern technologies</h3>
          <p>Development on React, Vue.js, Node.js and other advanced technologies</p>
        </div>
        <div class="feature-card">
          <i class="fas fa-shield-alt"></i>
          <h3>Reliability</h3>
          <p>We guarantee quality and support after the project launch</p>
        </div>
      </div>
    </section>

    <!-- Секція з відгуками -->
    <section class="testimonials">
      <h2>What people say about us</h2>
      <div class="testimonial-slider">
        <div class="testimonial-content">
          <p>{{ testimonials[currentTestimonial].text }}</p>
          <div class="testimonial-author">
            <h4>{{ testimonials[currentTestimonial].author }}</h4>
            <span>{{ testimonials[currentTestimonial].position }}</span>
          </div>
        </div>
      </div>
    </section>

    <FAQSection />
  </div>
</template>

<style scoped>
.home {
  padding-top: 0px;
  overflow-x: hidden;
}

.hero {
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 0 4rem;
}

.hero-content {
  margin-top: -100px;
  padding: 0;
  z-index: 10;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: -1;
}

.hero-content p {
  font-size: 1.5rem;
  color: #e2e2e2;
  margin-bottom: 2rem;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: transform 0.3s ease;
}

.btn:hover {
  transform: translateY(-3px);
}

.btn.primary {
  background: #3498db;
  color: white;
}

.btn.secondary {
  border: 2px solid #3498db;
  color: #3498db;
}

.hero-3d {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.services {
  padding: 10rem 4rem;
  margin-top: 100px;
  margin-bottom: 100px;
}

.services h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.service-card {
  background: rgba(255, 255, 255, 0.03);
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(52, 152, 219, 0.3);
}

.service-card i {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.service-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

@media (max-width: 1200px) {
  .hero {
    padding: 0 2rem;
  }

  .services,
  .testimonials {
    padding: 6rem 2rem;
  }

  .stats {
    padding: 4rem 2rem;
  }
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 0 1.5rem;
  }

  .hero-content h1 {
    font-size: 3rem;
  }

  .hero-3d {
    height: 50vh;
  }

  .services,
  .testimonials {
    padding: 4rem 1.5rem;
  }

  .testimonial-content {
    padding: 3rem 1.5rem;
  }

  .testimonial-content p {
    font-size: 1.2rem;
  }

  .stats {
    grid-template-columns: 1fr;
    padding: 3rem 1.5rem;
  }

  .service-card,
  .feature-card,
  .stat-item {
    padding: 2rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
    gap: 1rem;
  }

  .testimonial-content {
    padding: 2rem 1rem;
  }

  .testimonial-content p {
    font-size: 1.1rem;
  }
}

.scroll-btn-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 350px;
  margin-top: -200px;
}

.scroll-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #ffffff;
  transition: all 0.3s ease;
}

.scroll-btn .text {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.scroll-btn .arrow {
  width: 40px;
  height: 40px;
  background: rgba(52, 152, 219, 0.2);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll-btn .arrow i {
  font-size: 1.2rem;
  color: #3498db;
  transition: transform 0.3s ease;
}

.scroll-btn:hover {
  color: #3498db;
}

.scroll-btn:hover .arrow {
  background: rgba(52, 152, 219, 0.3);
}

.scroll-btn:hover .arrow i {
  transform: translateY(3px);
}

html {
  scroll-behavior: smooth;
}

/* Стилі для бігаючої стрічки */
.marquee {
  overflow: hidden;
  width: 100%;
  background: rgba(52, 152, 219, 0.1);
  padding: 1rem 0;
  margin: 2rem 0;
}

.marquee-content {
  display: flex;
  white-space: nowrap;
  gap: 2rem;
}

.marquee-content span {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3498db;
  font-weight: 500;
}

.marquee-content i {
  font-size: 0.5rem;
  opacity: 0.5;
}

/* Стилі для відгуків */
.testimonials {
  padding: 8rem 4rem;
  position: relative;
  background: none;
  box-shadow: none;
}

.testimonials h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.testimonial-slider {
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
}

.testimonial-content {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 30px;
  padding: 4rem;
  position: relative;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.testimonial-content::before {
  content: '"';
  position: absolute;
  top: 2rem;
  left: 2rem;
  font-size: 6rem;
  color: rgba(52, 152, 219, 0.2);
  font-family: serif;
}

.testimonial-content p {
  font-size: 1.5rem;
  line-height: 1.8;
  color: #e2e2e2;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.testimonial-author h4 {
  color: #3498db;
  font-size: 1.3rem;
  margin: 0;
}

.testimonial-author span {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
}

.why-us {
  padding: 4rem 2rem;
  text-align: center;
}

.why-us h2 {
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.feature-card {
  padding: 3rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-card i {
  font-size: 2.5rem;
  color: #3498db;
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8rem;
  max-width: 1400px;
  margin: 4rem auto;
  padding: 6rem 4rem;
}



.stat-item h3 {
  font-size: 3rem;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat-item p {
  color: #666;
  font-size: 1.1rem;
}
</style>
