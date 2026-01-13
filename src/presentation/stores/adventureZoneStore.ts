import { defineStore } from 'pinia'
import { computed, ref, triggerRef } from 'vue'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { AdventureRepository } from '@/infrastructure/repositories/AdventureRepository'
import { TrainingRepository } from '@/infrastructure/repositories/TrainingRepository'
import { TickAdventureUseCase } from '@/application/use-cases/adventure/TickAdventureUseCase'
import { EnterZoneUseCase } from '@/application/use-cases/adventure/EnterZoneUseCase'
import { GetAdventureZonesUseCase } from '@/application/use-cases/adventure/GetAdventureZonesUseCase'
import { TrainingSkillsEnum } from '@/domain/enums'
import { AdventurePlayerRepository } from '@/infrastructure/repositories/AdventurePlayerRepository'
import { PlayerAttackUseCase } from '@/application/use-cases/adventure/PlayerAttackUseCase'
import { GetPlayerAttackCooldownUseCase } from '@/application/use-cases/adventure/GetPlayerAttackCooldownUseCase'
import { GetAdventureUseCase } from '@/application/use-cases/adventure/GetAdventureUseCase'
import { GetAdventurePlayerUseCase } from '@/application/use-cases/adventure/GetAdventurePlayerUseCase'
import { GetAdventureZoneUseCase } from '@/application/use-cases/adventure/GetAdventureZoneUseCase'
import { GetPlayerSkillUseCase } from '@/application/use-cases/adventure/GetPlayerSkillUseCase'

export const useAdventureZoneStore = defineStore('adventureZone', () => {
  const adventureRepository = new AdventureRepository()
  const adventurePlayerRepository = new AdventurePlayerRepository()
  const trainingRepository = new TrainingRepository()

  const tickUseCase = new TickAdventureUseCase(
    adventureRepository,
    adventurePlayerRepository,
    trainingRepository
  )
  const enterZoneUseCase = new EnterZoneUseCase(adventureRepository)
  const playerAttackUseCase = new PlayerAttackUseCase(
    adventureRepository,
    adventurePlayerRepository,
    trainingRepository
  )
  const getPlayerAttackCooldownUseCase = new GetPlayerAttackCooldownUseCase(
    trainingRepository
  )
  const getPlayerSkillUseCase = new GetPlayerSkillUseCase(trainingRepository)
  const getAdventureZonesUseCase = new GetAdventureZonesUseCase(
    adventureRepository
  )
  const getAdventureUseCase = new GetAdventureUseCase(adventureRepository)
  const getAdventurePlayerUseCase = new GetAdventurePlayerUseCase(
    adventurePlayerRepository
  )
  const getAdventureZoneUseCase = new GetAdventureZoneUseCase(
    adventureRepository
  )

  const adventure = ref(getAdventureUseCase.execute())
  const adventurePlayer = ref(getAdventurePlayerUseCase.execute())

  const adventureZoneId = computed(() => adventure.value.zoneId)
  const currentEnemy = computed(() => adventure.value.currentEnemy)

  const adventureZone = computed(() => {
    return getAdventureZoneUseCase.execute(adventureZoneId.value)
  })

  const adventureZones = computed(() => getAdventureZonesUseCase.execute())

  const onGameTick = (deltaTime: number) => {
    tickUseCase.execute(deltaTime)
    triggerRef(adventure)
    triggerRef(adventurePlayer)
    triggerRef(currentEnemy)
  }

  gameLoop.subscribe(onGameTick)

  function setAdventureZone(id: number) {
    enterZoneUseCase.execute(id)
  }

  function playerAttack(skill: TrainingSkillsEnum) {
    playerAttackUseCase.execute(skill)
  }

  function getPlayerAttackCooldown(skill: TrainingSkillsEnum) {
    return getPlayerAttackCooldownUseCase.execute(skill)
  }

  function getPlayersSkill(skill: TrainingSkillsEnum) {
    return getPlayerSkillUseCase.execute(skill)
  }

  return {
    adventure,
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
