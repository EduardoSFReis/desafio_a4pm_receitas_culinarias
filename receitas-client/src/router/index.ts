import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Category from '../pages/Category.vue'
import RecipeDetails from '../pages/RecipeDetails.vue'
import MyRecipes from '../pages/MyRecipes.vue'
import CreateRecipe from '../pages/CreateRecipe.vue'
import EditRecipe from '../pages/EditRecipe.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/categoria/:id(\\d+)', name: 'category', component: Category, props: true },
    { path: '/receita/:id(\\d+)', name: 'recipe', component: RecipeDetails, props: true },

    { path: '/entrar', name: 'login', component: Login },
    { path: '/cadastrar', name: 'register', component: Register },

    { path: '/minhas-receitas', name: 'my', component: MyRecipes, meta: { requiresAuth: true } },
    { path: '/criar', name: 'create', component: CreateRecipe, meta: { requiresAuth: true } },
    { path: '/editar/:id(\\d+)', name: 'edit', component: EditRecipe, props: true, meta: { requiresAuth: true } },

    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior() { return { top: 0 } }
})

router.beforeEach((to) => {
  const store = useAuthStore()
  if (!store.user) store.restore()

  if (to.meta.requiresAuth && !store.user) {
    return { name: 'login', query: { r: to.fullPath } }
  }
})

export default router
