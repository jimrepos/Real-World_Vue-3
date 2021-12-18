import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'
import EventDetails from '@/views/EventDetails.vue'
import About from '@/views/About.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({
      page: parseInt(route.query.page, 10) || 1,
      perPage: parseInt(route.query.perPage, 10) || 2
    })
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    props: true,
    component: EventDetails
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
