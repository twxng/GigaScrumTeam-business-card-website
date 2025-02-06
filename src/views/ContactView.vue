<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true

  // Імітація відправки форми
  await new Promise(resolve => setTimeout(resolve, 1500))

  showSuccess.value = true
  isSubmitting.value = false

  // Очистка форми
  form.value = {
    name: '',
    email: '',
    message: ''
  }

  // Ховаємо повідомлення про успіх через 3 секунди
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
onMounted(() => {
  // Анімація заголовка
  gsap.from('.contact-info h1', {
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power4.out'
  })

  // Анімація методів контакту
  gsap.from('.contact-method', {
    x: -50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power4.out'
  })

  // Анімація форми
  gsap.from('.contact-form', {
    y: 50,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power4.out'
  })

  // Анімація полів форми
  gsap.from('.form-group', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    delay: 1,
    ease: 'power4.out'
  })
})
</script>

<template>
  <div class="contact">
    <div class="contact-content">
      <div class="contact-info">
        <h1>Get in Touch</h1>
        <p>Have a project? Let's discuss it!</p>

        <div class="contact-methods">
          <div class="contact-method">
            <i class="fas fa-envelope"></i>
            <div>
              <h3>Email</h3>
              <p>contact@gigascrumteam.com</p>
            </div>
          </div>

          <div class="contact-method">
            <i class="fas fa-phone"></i>
            <div>
              <h3>Phone</h3>
              <p>+380 99 123 45 67</p>
            </div>
          </div>

          <div class="contact-method">
            <i class="fas fa-map-marker-alt"></i>
            <div>
              <h3>Address</h3>
              <p>Kyiv, Ukraine</p>
            </div>
          </div>
        </div>
      </div>

      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" v-model="form.message" required></textarea>
        </div>

        <button type="submit" :disabled="isSubmitting" class="submit-btn">
          <span v-if="!isSubmitting">Send</span>
          <i v-else class="fas fa-spinner fa-spin"></i>
        </button>

        <div v-if="showSuccess" class="success-message">
          <i class="fas fa-check-circle"></i>
          Thank you! We will contact you shortly.
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.contact {
  padding: 6rem 2rem 2rem;
  min-height: 100vh;
}

.contact-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-info h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-info > p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 3rem;
}

.contact-methods {
  display: grid;
  gap: 2rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-method i {
  font-size: 1.5rem;
  color: #3498db;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 50%;
}

.contact-method h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.contact-method p {
  color: #666;
}

.contact-form {
  background: rgba(255, 255, 255, 0.055);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.form-group input,
.form-group textarea {
  width: 100%;
  background: #ffffff2f;
  padding: 0.75rem;
  border: 1px solid #e9ecef3d;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.form-group textarea {
  height: 150px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #2980b9;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success-message {
  margin-top: 1rem;
  padding: 1rem;
  background: #d4edda;
  color: #155724;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
