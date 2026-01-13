import { defineStore } from 'pinia'
import { computed } from 'vue'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { TrainingSkillsEnum } from '@/domain/enums'
import { container } from '@/infrastructure/container'

export const useAdventureZoneStore = defineStore('adventureZone', () => {
  const {
    adventureService,
    adventurePlayerService,
    adventureZoneService,
    skillsService,
    tickAdventureUseCase,
    playerAttackUseCase,
  } = container

  const adventure = adventureService.getAdventure()
  const adventurePlayer = adventurePlayerService.getAdventurePlayer()

  const currentEnemy = computed(() => adventure.currentEnemy)
  const adventureZone = computed(() => {
    return adventureZoneService.getAdventureZone(adventure.zoneId)
  })

  const adventureZones = computed(() => adventureZoneService.getAllAdventureZones())

  const onGameTick = (deltaTime: number) => {
    tickAdventureUseCase.execute(deltaTime)
  }

  gameLoop.subscribe(onGameTick)

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
