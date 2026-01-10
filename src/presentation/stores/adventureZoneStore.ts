import { defineStore } from 'pinia'
import { computed, ref, triggerRef } from 'vue'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { AdventureRepository } from '@/infrastructure/repositories/AdventureRepository'
import { PlayerRepository } from '@/infrastructure/repositories/PlayerRepository'
import { TrainingRepository } from '@/infrastructure/repositories/TrainingRepository'
import { TickAdventureUseCase } from '@/application/use-cases/adventure/TickAdventureUseCase'
import { EnterZoneUseCase } from '@/application/use-cases/adventure/EnterZoneUseCase'
import { SetSelectedAttackUseCase } from '@/application/use-cases/adventure/SetSelectedAttackUseCase'
import { GetAdventureZonesUseCase } from '@/application/use-cases/adventure/GetAdventureZonesUseCase'
import { TrainingSkillsEnum } from '@/domain/enums'

export const useAdventureZoneStore = defineStore('adventureZone', () => {
  const adventureRepository = new AdventureRepository()
  const playerRepository = new PlayerRepository()
  const trainingRepository = new TrainingRepository()

  const tickUseCase = new TickAdventureUseCase(
    adventureRepository,
    playerRepository
  )
  const enterZoneUseCase = new EnterZoneUseCase(adventureRepository)
  const setSelectedAttackUseCase = new SetSelectedAttackUseCase(
    adventureRepository,
    trainingRepository
  )
  const getAdventureZonesUseCase = new GetAdventureZonesUseCase(adventureRepository)

  const adventure = ref(adventureRepository.getAdventure())

  const adventureZoneId = computed(() => adventure.value.zoneId)
  const currentEnemy = computed(() => adventure.value.currentEnemy)

  const adventureZone = computed(() => {
    return adventureRepository.getAdventureZone(adventureZoneId.value)
  })
  
  const adventureZones = computed(() => getAdventureZonesUseCase.execute())

  const onGameTick = (deltaTime: number) => {
    tickUseCase.execute(deltaTime)
    triggerRef(adventure)
  }

  gameLoop.subscribe(onGameTick)

  function setAdventureZone(id: number) {
    enterZoneUseCase.execute(id)
    triggerRef(adventure)
  }

  function setSelectedAttack(skill: TrainingSkillsEnum) {
    setSelectedAttackUseCase.execute(skill)
    triggerRef(adventure)
  }

  return {
    adventure,
    adventureZone,
    adventureZones,
    currentEnemy,
    setAdventureZone,
    setSelectedAttack,
  }
})
