import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Categories from '@/views/Categories.vue'
import NewCategory from '@/components/categories/NewCategory.vue'
import EditarCategory from '@/components/categories/EditarCategory.vue'
import Paymodes from '@/views/Paymodes.vue'
import NewPaymode from '@/components/paymodes/NewPaymode.vue'
import EditarPaymode from '@/components/paymodes/EditarPaymode.vue'
import Products from '@/views/Products.vue'
import NewProduct from '@/components/products/NewProduct.vue'
import EditarProduct from '@/components/products/EditarProduct.vue'
import Customers from '@/views/Customers.vue'
import NewCustomer from '@/components/customers/NewCustomer.vue'
import EditarCustomer from '@/components/customers/EditarCustomer.vue'

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
    path: '/paymodes',
    name: 'Paymodes',
    component: Paymodes
  },
  {
    path: '/add-paymode',
    name: 'NewPaymode',
    component: NewPaymode
  },
  {
    path: '/editar-paymode/:id',
    name: 'EditarPaymode',
    component: EditarPaymode
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/add-product',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/editar-product/:id',
    name: 'EditarProduct',
    component: EditarProduct
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/add-customer',
    name: 'NewCustomer',
    component: NewCustomer
  },
  {
    path: '/editar-customer/:id',
    name: 'EditarCustomer',
    component: EditarCustomer
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
