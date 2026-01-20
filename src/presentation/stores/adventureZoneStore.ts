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

  const adventureZones = computed(() => adventureZoneService.getAllAdventureZones())

  function setAdventureZone(id: number) {
    adventureService.enterAdventureZone(id)
  }

  function playerAttack(skill: TrainingSkillsEnum) {
    playerAttackUseCase.execute(skill)
  }

  function getPlayerAttackCooldown(skill: TrainingSkillsEnum) {
    return skillsService.getPlayerAttackCooldown(skill)
  }

  function getPlayersSkill(skill: TrainingSkillsEnum) {
    return skillsService.getSkill(skill)
  }

  return {
    adventureZone,
    adventureZones,
    currentEnemy,
    adventurePlayer,
    getPlayerAttackCooldown,
    getPlayersSkill,
    setAdventureZone,
    playerAttack,
  }
})
