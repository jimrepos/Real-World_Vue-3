import { createRouter, createWebHistory } from 'vue-router'
// import EventList from '@/views/EventList.vue'
// import EventLayout from '@/views/event/Layout.vue'
// import EventDetails from '@/views/event/Details.vue'
// import EventRegister from '@/views/event/Register.vue'
// import EventEdit from '@/views/event/Edit.vue'
// import About from '@/views/About.vue'
import NotFound from '@/views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService.js'
import GStore from '@/store'

const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')
const EventList = () => import (/* webpackChunkName: "events" */ '../views/EventList.vue')
const EventLayout = () => import (/* webpackChunkName: "event" */ '../views/event/Layout.vue')
const EventDetails = () => import (/* webpackChunkName: "event" */ '../views/event/Details.vue')
const EventEdit = () => import (/* webpackChunkName: "event" */ '../views/event/Edit.vue')
const EventRegister = () => import (/* webpackChunkName: "event" */ '../views/event/Register.vue')

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
    path: '/events/:id',
    name: 'EventLayout',
    props: true,
    component: EventLayout,
    beforeEnter: to => {
      return EventService.getEvent(to.params.id)
        .then(response => {
          GStore.event = response.data
        })
        .catch(error => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: {
                resource: 'event'
              }
            };
          } else {
            return {
              name: 'NetworkError'
            };
          }
        });
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: {
          requireAuth: true
        }
      }
    ]
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return {
        path: '/events/' + to.params.afterEvent
      }
    }
  },
  {
    path: '/about-us',
    name: 'About',
    component: About
  },
  {
    path: '/about',
    redirect: {
      name: 'About'
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetworkError
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  NProgress.start()

  const notAuthorized = true;
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000);

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
