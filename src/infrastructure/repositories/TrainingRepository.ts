import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { Skill } from '@/domain/entities/Skill'
import { getInitialSkills } from '@/infrastructure/data/skills'
import { TrainingSaveData } from '@/domain/types/saveData'
import { TrainingSkillsEnum } from '@/domain/enums'
import Decimal from 'break_infinity.js'
import { reactive } from 'vue'

let skillsInstance: Skill[] = []

export class TrainingRepository implements ITrainingRepository {
  getSkills(): Skill[] {
    if (skillsInstance.length === 0) {
      skillsInstance = reactive(getInitialSkills()) as Skill[]
    }
    
    return skillsInstance
  }

  getSkill(id: TrainingSkillsEnum): Skill | undefined {
    return this.getSkills().find((skill) => skill.id === id)
  }

  exportData(): TrainingSaveData {
    const skills = this.getSkills()
    const serializedSkills: TrainingSaveData = []

    for (const key in skills) {
      const s = skills[key]
      serializedSkills[key] = {
        level: s.level.toString(),
        allocatedEnergy: s.allocatedEnergy.toString(),
        progress: s.progress.toString(),
      }
    }
    return serializedSkills
  }

  importData(data: TrainingSaveData): void {
    const skills = this.getSkills()
    if (!data || !Array.isArray(data)) return

    data.forEach((savedSkill, index) => {
      if (index >= skills.length) return
      const skill = skills[index]
      skill.level = new Decimal(savedSkill.level)
      skill.allocatedEnergy = new Decimal(savedSkill.allocatedEnergy)
      skill.progress = new Decimal(savedSkill.progress)
    })
  }
}
