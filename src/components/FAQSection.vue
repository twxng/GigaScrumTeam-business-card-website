<script setup>
import { ref } from 'vue'

const openItem = ref(4) // Index 4 corresponds to "What's the difference..."

const faqItems = [
  {
    question: "I have an app idea. Where do I start?",
    answer: "Start with a conversation! Give us a call and we can answer any questions you have and recommend next steps."
  },
  {
    question: "Can I get a ballpark quote?",
    answer: "Of course! As a young and dynamic team with fresh perspectives, we are eager to help you bring your vision to life. We will carefully review your requirements and provide you with a ballpark estimate that reflects our commitment to transparency. Your project is important to us, and we’re dedicated to delivering accurate and reliable estimates."
  },
  {
    question: "Can I get a fixed price quote?",
    answer: "Yes! Assuming our ballpark quote works for you, we’ll then move on to a full itemized breakdown of all tasks and features of your project and ultimately provide a detailed proposal and fixed price budget to ensure you have cost-certainty throughout the project."
  },
  {
    question: "What kind of information do I need to provide to get a quote?",
    answer: "To provide an accurate quote, we need details about your project’s goals, target audience, core features, desired platforms (e.g., web, mobile), and any specific design or technical requirements. If you’re unsure where to start, we can guide you through the process—just reach out to us, and we’ll ask the right questions to gather all the necessary information."
  },
  {
    question: "What's the difference between a mobile app and a web app?",
    answer: "A mobile application is designed specifically for use on touch screen devices like iPhones or tablets. Typically mobile applications are developed for both Apple iOS devices (iPhones, iPads) and Android devices (Samsung galaxy, Google Pixel) simultaneously. A web application is designed for use on a traditional computer monitor or laptop screen, and is accessed through a web browser."
  },
  {
    question: "When my project is completed, do I own the code?",
    answer: "Yes, upon project completion, you will own the source code and all associated intellectual property. While many of our clients choose to continue working with us for post-deployment support and maintenance, we are more than willing to deploy your code to any location you prefer. Your ownership and control over your project are our top priorities."
  },
  {
    question: "What programming languages do you use?",
    answer: "Here’s the translation of the text into English: We use a variety of programming languages for software development. The main languages we employ are JavaScript (JS) and TypeScript (TS) for front-end development, as well as C# and Python for back-end development. In web development, JavaScript is a key language that enables the creation of interactive web applications, while TypeScript extends JavaScript's capabilities with static typing. For mobile applications, we can use React Native or Ionic, allowing us to write cross-platform code in JavaScript. Additionally, we work with frameworks such as ASP.NET for C# and React, Vue, and Angular for JavaScript."
  }
]

const toggleItem = (index) => {
  openItem.value = openItem.value === index ? null : index
}
</script>

<template>
  <section class="faq">
    <h2>Got a Question?</h2>
    <h3>We might have the answer...</h3>

    <div class="faq-container">
      <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
        <button class="faq-question" @click="toggleItem(index)">
          <span>{{ item.question }}</span>
          <span class="icon">
            <i v-if="openItem === index" class="fas fa-minus"></i>
            <i v-else class="fas fa-plus"></i>
          </span>
        </button>

        <div v-if="openItem === index" class="faq-answer">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.faq h2 {
  text-align: center;
  font-size: 2.5rem;
  color: #d8d7d7;
  margin-bottom: 1rem;
}

.faq h3 {
  text-align: center;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  font-size: 1.125rem;
  font-weight: 500;
}

.faq-question:hover {
  color: #3498db;
}

.icon {
  margin-left: 1rem;
  flex-shrink: 0;
}

.icon i {
  font-size: 1.25rem;
  transition: transform 0.3s ease;
}

.faq-answer {
  padding: 0 0 1.5rem;
  line-height: 1.6;
  color: #666;
}

@media (max-width: 768px) {
  .faq {
    padding: 2rem 1rem;
  }

  .faq h2 {
    font-size: 2rem;
  }

  .faq h3 {
    font-size: 2.5rem;
  }
}
</style>