import { defineStore } from 'pinia'
import { container } from '@/infrastructure/container'
import { computed } from 'vue'

export const useFightBossStore = defineStore('fightBoss', () => {
  const { bossFightRepo } = container

  const bossFight = bossFightRepo.getBossFight()
  const enemy = computed(() => bossFight.boss)

  function changeFightState(): void {
    bossFight.changeFightingState(!bossFight.isFighting())
  }

  function isFighting(): boolean {
    return bossFight.isFighting()
  }

  return {
    enemy,
    isFighting,
    changeFightState,
  }
})
