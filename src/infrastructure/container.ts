import { AdventureRepository } from '@/infrastructure/repositories/AdventureRepository'
import { AdventurePlayerRepository } from '@/infrastructure/repositories/AdventurePlayerRepository'
import { AdventureZoneRepository } from '@/infrastructure/repositories/AdventureZoneRepository'
import { TrainingRepository } from '@/infrastructure/repositories/TrainingRepository'
import { EnergyRepository } from '@/infrastructure/repositories/EnergyRepository'
import { PlayerRepository } from '@/infrastructure/repositories/PlayerRepository'
import { BossRepository } from '@/infrastructure/repositories/BossRepository'
import { LocalStorageService } from '@/infrastructure/services/LocalStorageService'

import { AdventureZoneService } from '@/application/services/AdventureZoneService'
import { AdventurePlayerService } from '@/application/services/AdventurePlayerService'
import { AdventureService } from '@/application/services/AdventureService'
import { SkillsService } from '@/application/services/SkillsService'
import { PlayerXpService } from '@/application/services/PlayerXpService'

import { TickAdventureUseCase } from '@/application/use-cases/adventure/TickAdventureUseCase'
import { PlayerAttackUseCase } from '@/application/use-cases/adventure/PlayerAttackUseCase'
import { RespawnEnemyUseCase } from '@/application/use-cases/adventure/RespawnEnemyUseCase'
import { RegenEnergyUseCase } from '@/application/use-cases/energy/RegenEnergyUseCase'
import { GetAvaliableEnergyUseCase } from '@/application/use-cases/energy/GetAvaliableEnergyUseCase'
import { FightBossTickUseCase } from '@/application/use-cases/boss/FightBossTickUseCase'
import { SaveGameUseCase } from '@/application/use-cases/game/SaveGameUseCase'
import { LoadGameUseCase } from '@/application/use-cases/game/LoadGameUseCase'
import { RegenHealthUseCase } from '@/application/use-cases/player/RegenHealthUseCase'
import { TickTrainingUseCase } from '@/application/use-cases/training/TickTrainingUseCase'
import { AllocateEnergyUseCase } from '@/application/use-cases/training/AllocateEnergyUseCase'
import { ReclaimEnergyUseCase } from '@/application/use-cases/training/ReclaimEnergyUseCase'
import { BossFightRepository } from './repositories/BossFightRepository '
import { ItemRepository } from './repositories/ItemRepository'
import { InventoryRepository } from './repositories/InventoryRepository'

// 1. Instantiate Repositories (Singletons)
const adventureRepo = new AdventureRepository()
const adventurePlayerRepo = new AdventurePlayerRepository()
const zoneRepo = new AdventureZoneRepository()
const trainingRepo = new TrainingRepository()
const energyRepo = new EnergyRepository()
const playerRepo = new PlayerRepository()
const bossRepo = new BossRepository()
const bossFightRepo = new BossFightRepository()
const itemRepo = new ItemRepository()
const inventoryRepo = new InventoryRepository()

// 2. Instantiate Services
const storageService = new LocalStorageService()
const adventureZoneService = new AdventureZoneService(zoneRepo)
const adventurePlayerService = new AdventurePlayerService(adventurePlayerRepo)
const skillsService = new SkillsService(trainingRepo)
const adventureService = new AdventureService(adventureRepo, zoneRepo)
const playerXpService = new PlayerXpService(playerRepo, energyRepo)

// 3. Instantiate Use Cases
const respawnEnemyUseCase = new RespawnEnemyUseCase(adventureRepo, zoneRepo)

const tickAdventureUseCase = new TickAdventureUseCase(
  adventureRepo,
  adventurePlayerRepo,
  trainingRepo,
  zoneRepo,
  respawnEnemyUseCase
)

const playerAttackUseCase = new PlayerAttackUseCase(
  adventureRepo,
  adventurePlayerRepo,
  trainingRepo,
  inventoryRepo,
  itemRepo
)

const regenEnergyUseCase = new RegenEnergyUseCase(energyRepo)
const getAvaliableEnergyUseCase = new GetAvaliableEnergyUseCase(energyRepo)

const fightBossTickUseCase = new FightBossTickUseCase(
  playerRepo,
  bossRepo,
  bossFightRepo
)

const saveGameUseCase = new SaveGameUseCase(
  storageService,
  playerRepo,
  trainingRepo,
  energyRepo,
  bossFightRepo
)

const loadGameUseCase = new LoadGameUseCase(
  storageService,
  playerRepo,
  trainingRepo,
  energyRepo,
  bossFightRepo
)

const regenHealthUseCase = new RegenHealthUseCase(playerRepo)

const tickTrainingUseCase = new TickTrainingUseCase(trainingRepo, playerRepo)
const allocateEnergyUseCase = new AllocateEnergyUseCase(
  trainingRepo,
  energyRepo
)
const reclaimEnergyUseCase = new ReclaimEnergyUseCase(trainingRepo, energyRepo)

// 4. Export the container
export const container = {
  // Repositories
  energyRepo,
  playerRepo,
  trainingRepo,
  bossRepo,
  bossFightRepo,
  itemRepo,
  inventoryRepo,

  // Services
  adventureZoneService,
  adventurePlayerService,
  skillsService,
  adventureService,
  storageService,
  playerXpService,

  // Use Cases
  tickAdventureUseCase,
  playerAttackUseCase,
  regenEnergyUseCase,
  getAvaliableEnergyUseCase,
  fightBossTickUseCase,
  saveGameUseCase,
  loadGameUseCase,
  regenHealthUseCase,
  tickTrainingUseCase,
  allocateEnergyUseCase,
  reclaimEnergyUseCase,
}
