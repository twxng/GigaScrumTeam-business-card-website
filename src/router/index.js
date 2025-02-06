import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

// Попереднє завантаження компонентів
const TeamView = () => import('../views/TeamView.vue')
const ProjectsView = () => import('../views/ProjectsView.vue')
const ContactView = () => import('../views/ContactView.vue')

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
			meta: { keepAlive: true }
		},
		{
			path: '/team',
			name: 'team',
			component: () => import('../views/TeamView.vue'),
			meta: { keepAlive: true }
		},
		{
			path: '/projects',
			name: 'projects',
			component: () => import('../views/ProjectsView.vue'),
			meta: { keepAlive: true }
		},
		{
			path: '/contact',
			name: 'contact',
			component: () => import('../views/ContactView.vue'),
			meta: { keepAlive: true }
		}
	]
})

router.beforeEach((to, from, next) => {
	if (to.matched.length > 0) {
		const component = to.matched[0].components.default
		if (typeof component === 'function') {
			component()
		}
	}
	next()
})

export default router
