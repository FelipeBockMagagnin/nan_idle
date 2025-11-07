import { createRouter, createWebHistory } from 'vue-router'

import TrainingView from '../views/TrainingView.vue'
import FightBossView from '../views/FightBossView.vue'

const routes = [
  {
    path: '/',
    name: 'Training',
    component: TrainingView,
  },
  {
    path: '/fight-boss',
    name: 'Fight Boss',
    component: FightBossView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
