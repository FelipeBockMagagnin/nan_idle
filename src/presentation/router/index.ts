import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import TrainingView from '@/presentation/views/TrainingView.vue'
import FightBossView from '@/presentation/views/FightBossView.vue'
import AdventureZoneView from '@/presentation/views/AdventureZoneView.vue'

const routes: RouteRecordRaw[] = [
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
  {
    path: '/adventure',
    name: 'Adventure',
    component: AdventureZoneView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
