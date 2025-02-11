<script setup>
import { ref, onMounted, onActivated, onDeactivated } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projectImages } from '@/assets/projects'

gsap.registerPlugin(ScrollTrigger)

const projects = ref([
  {
    title: 'E-commerce Platform',
    description: 'Modern e-commerce platform using React and .NET',
    image: projectImages.landing,
    technologies: ['React', '.NET', 'SQL Server', 'Azure'],
    link: '#',
    github: 'https://github.com/gigascrumteam/ecommerce'
  },
  {
    title: 'CRM System',
    description: 'Customer relationship management system',
    // image: 'https://picsum.photos/800/600?random=2',
    image: projectImages.crm,
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Docker'],
    link: '#',
    github: 'https://github.com/gigascrumteam/crm'
  },
  {
    title: 'Banking System',
    description: 'Web-based banking system for secure transactions',
    image: projectImages.banking,
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Docker'],
    link: '#',
    github: 'https://github.com/gigascrumteam/banking-system'
  },
  {
    title: 'Healthcare Portal',
    description: 'Web portal for healthcare services',
    image: projectImages.health,
    technologies: ['Angular', 'TypeScript', 'MongoDB', 'AWS'],
    link: '#',
    github: 'https://github.com/gigascrumteam/healthcare'
  }
])

let scrollTriggers = []

// Прелоад зображень
const preloadImages = () => {
  projects.value.forEach(project => {
    if (project.image) {
      const img = new Image()
      img.src = project.image
    }
  })
}

const initializeAnimations = () => {
  // Очищаємо попередні анімації
  scrollTriggers.forEach(trigger => trigger.kill())
  scrollTriggers = []

  // Анімація заголовка
  scrollTriggers.push(
    gsap.from('h1', {
      y: 50,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: 'h1',
        start: 'top 80%'
      }
    })
  )

  // Анімація проектів
  const projectElements = document.querySelectorAll('.project-card')
  projectElements.forEach((el, index) => {
    scrollTriggers.push(
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%'
        }
      })
    )
  })
}

onMounted(() => {
  preloadImages()
  initializeAnimations()

  // Паралакс ефект для зображень
  const projectImages = document.querySelectorAll('.project-image')
  projectImages.forEach(img => {
    gsap.to(img, {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    })
  })

  // Анімація технологій при наведенні
  const techTags = document.querySelectorAll('.tech-tag')
  techTags.forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      gsap.to(tag, {
        scale: 1.1,
        duration: 0.3,
        ease: 'power2.out'
      })
    })

    tag.addEventListener('mouseleave', () => {
      gsap.to(tag, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      })
    })
  })
})

onActivated(() => {
  console.log('ProjectsView activated')
  initializeAnimations()
})

onDeactivated(() => {
  console.log('ProjectsView deactivated')
  // Очищаємо ScrollTrigger при деактивації
  scrollTriggers.forEach(trigger => trigger.kill())
  scrollTriggers = []
})
</script>

<template>
  <div class="projects">
    <h1>Our Projects</h1>

    <div class="projects-grid">
      <div v-for="project in projects" :key="project.title" class="project-card">
        <div class="project-image">
          <img :src="project.image" :alt="project.title" loading="lazy" style="object-position: top;">
          <div class="project-overlay">
            <a :href="project.github" target="_blank" class="github-link">
              <i class="fab fa-github"></i>
              View Code
            </a>
          </div>
        </div>
        <div class="project-content">
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-technologies">
            <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
              {{ tech }}
            </span>
          </div>
          <a :href="project.link" class="project-link">
            Learn More
            <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects {
  padding: 6rem 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.projects h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: rgba(255, 255, 255, 0.027);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
}

.project-card:hover {
  transform: translateY(-10px);
}

.project-image {
  position: relative;
  overflow: hidden;
  height: 250px;
  border-radius: 15px 15px 0 0;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.github-link {
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid white;
  border-radius: 50px;
  transition: all 0.3s ease;
}

.github-link:hover {
  background: rgba(255, 255, 255, 0.041);
  color: black;
}

.project-content {
  padding: 1.5rem;
}

.project-content h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tech-tag {
  background: #e9ecef09;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s ease;
  transform-origin: center;
}

.tech-tag:hover {
  background: #3498db;
  color: white;
  transform: scale(1.1) rotate(-2deg);
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #3498db;
  text-decoration: none;
  font-weight: 600;
  transition: gap 0.3s ease;
}

.project-link:hover {
  gap: 1rem;
}

@media (max-width: 768px) {
  .projects {
    padding: 4rem 1rem 1rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
