import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

import TrainingView from '@/presentation/views/TrainingView.vue'
import FightBossView from '@/presentation/views/FightBossView.vue'
import AdventureZoneView from '@/presentation/views/AdventureZoneView.vue'
import SpendXpView from '@/presentation/views/SpendXpView.vue'
import InventoryView from '../views/InventoryView.vue'

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
  {
    path: '/spend-xp',
    name: 'Spend XP',
    component: SpendXpView,
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: InventoryView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
