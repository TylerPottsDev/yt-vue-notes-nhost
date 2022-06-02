import { createRouter, createWebHistory } from 'vue-router'
import nhost from '../utils/nhost'

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('../views/Home.vue'),
		meta: {
			protected: true
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/Login.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.protected)) {
		const isAuthenticated = nhost.auth.isAuthenticated()
		
		if (isAuthenticated) {
			next()
		} else {
			next('/login')
		}
	} else {
		next()
	}
})

export default router