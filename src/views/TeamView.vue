<script setup>
import { ref, onMounted, onActivated } from 'vue'
import * as THREE from 'three'
import TeamMember3D from '@/components/TeamMember3D.vue'
// import { teamAvatars } from '@/assets/avatars'

const teamMembers = ref([
  {
    name: 'BARANOVSKYI YEVHEN',
    role: 'Scrum Master, Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=eugene',
    social: {
      linkedin: '#',
      github: '#',
      telegram: '#'
    }
  },
  {
    name: 'KISHCHUK MYKHAILO',
    role: 'Backend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
    social: {
      linkedin: '#',
      github: '#',
      telegram: '#'
    }
  },
  // {
  //   name: 'SHUMAKOVA OKSANA',
  //   role: 'Fullstack Developer',
  //   avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=oksana',
  //   social: {
  //     linkedin: '#',
  //     github: '#',
  //     telegram: '#'
  //   }
  // },
  {
    name: 'SHUMAKOVA OKSANA',
    role: 'Fullstack Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=xenia',
    social: {
      linkedin: '#',
      github: '#',
      telegram: '#'
    }
  },
  {
    name: 'AIRAPETIAN ROBERT',
    role: 'Frontend Developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robert',
    social: {
      linkedin: '#',
      github: '#',
      telegram: '#'
    }
  },
  {
    name: 'BABIIENKO OLEH',
    role: 'Tester',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=oleg',
    social: {
      linkedin: '#',
      github: '#',
      telegram: '#'
    }
  }
])

const initializeComponent = () => {
  console.log('Team component initialized/activated')
}

onMounted(() => {
  initializeComponent()
})

onActivated(() => {
  initializeComponent()
})
</script>

<template>
  <div class="team-container">
    <h2 class="team-title">Our Team</h2>

    <div class="team-grid">
      <div v-for="member in teamMembers" :key="member.name" class="team-member">
        <div class="member-avatar">
          <Suspense>
            <TeamMember3D :avatar="member.avatar" />
            <template #fallback>
              <div class="loading-avatar">Loading...</div>
            </template>
          </Suspense>
        </div>
        <h3>{{ member.name }}</h3>
        <p>{{ member.role }}</p>
        <div class="member-social">
          <a :href="member.social.linkedin" target="_blank">
            <i class="fab fa-linkedin"></i>
          </a>
          <a :href="member.social.github" target="_blank">
            <i class="fab fa-github"></i>
          </a>
          <a :href="member.social.telegram" target="_blank">
            <i class="fab fa-telegram"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.team-container {
  max-width: 1200px;
  margin: 6rem auto 2rem;
  padding: 0 1rem;
}

.team-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  background: linear-gradient(45deg, #3498db, #2ecc71);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.team-grid {
  display: grid;
grid-template-columns: repeat(3, 1fr);  gap: 2rem;
}

.team-member {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0);
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
}

.team-member:hover {
  transform: translateY(-10px);
   border-color: rgba(52, 152, 219, 0.5);
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.2);
}

.team-member:nth-child(n+4) {
  grid-column: span 1;
}

.member-avatar {
  width: 150px;
  height: 150px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #3498db;
}

.member-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-social {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.member-social a {
  color: #666;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.member-social a:hover {
  color: #3498db;
}
</style>
