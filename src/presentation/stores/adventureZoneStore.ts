import { defineStore } from 'pinia'
import { computed } from 'vue'
import { TrainingSkillsEnum } from '@/domain/enums'
import { container } from '@/infrastructure/container'

export const useAdventureZoneStore = defineStore('adventureZone', () => {
  const {
    adventureService,
    adventurePlayerService,
    adventureZoneService,
    skillsService,
    playerAttackUseCase,
  } = container

  const adventure = adventureService.getAdventure()
  const adventurePlayer = adventurePlayerService.getAdventurePlayer()

  const currentEnemy = computed(() => adventure.currentEnemy)
  const adventureZone = computed(() => {
    return adventureZoneService.getAdventureZone(adventure.zoneId)
  })
  const skills = computed(() => {
    return skillsService.getAllSkills()
  })

  const adventureZones = computed(() =>
    adventureZoneService.getAllAdventureZones()
  )

  function goToNextZone() {
    adventureService.enterAdventureZone((adventureZone.value?.id || 0) + 1)
  }

  function goBackZone() {
    adventureService.enterAdventureZone((adventureZone.value?.id || 0) - 1)
  }

  function playerAttack(skill: TrainingSkillsEnum) {
    playerAttackUseCase.execute(skill)
  }

  return {
    skills,
    adventureZone,
    adventureZones,
    currentEnemy,
    adventurePlayer,
    playerAttack,
    goBackZone,
    goToNextZone,
  }
})
