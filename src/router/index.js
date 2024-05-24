import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Categories from '@/views/Categories.vue'
import NewCategory from '@/components/categories/NewCategory.vue'
import EditarCategory from '@/components/categories/EditarCategory.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/categories',
    name: 'Categories',
    component: Categories
  },
  {
    path: '/add-category',
    name: 'NewCategory',
    component: NewCategory
  },
  {
    path: '/editar-category/:id',
    name: 'EditarCategory',
    component: EditarCategory
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
