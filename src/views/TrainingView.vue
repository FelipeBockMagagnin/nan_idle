<template>
  <div>
    <h2 class="page-title">Training</h2>

    <div style="display: flex; padding: 0px 10px; margin-bottom: 5px">
      <EnergyIndicator />
      <AttackIndicator />
      <DefenceIndicator />
    </div>

    Regular Attack
    <br />
    {{
      formatDecimal(
        trainingStore.getAllocatedEnergyValue(TrainingSkills.RegularAttack)
      )
    }}
    energy allocated
    <br />

    <TimerIndicator :progress="progress" />
    <button @click="increaseRegularAttackEnergy">+</button>
    <button @click="decreaseRegularAttackEnergy">-</button>

    <br />
    <br />
    Block Defence
    <br />
    {{
      formatDecimal(
        trainingStore.getAllocatedEnergyValue(TrainingSkills.BlockDefence)
      )
    }}
    energy allocated
    <br />
    <TimerIndicator :progress="progress" />
    <button @click="increaseBlockDefenceEnergy">+</button>
    <button @click="decreaseBlockDefenceEnergy">-</button>
  </div>
</template>

<script setup lang="ts">
import EnergyIndicator from '@/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/components/indicators/DefenceIndicator.vue'

import Decimal from 'break_infinity.js'

import { useEnergyStore } from '@/stores/energyStore'
import { useTrainingStore } from '@/stores/trainingStore'
import { formatDecimal } from '@/utils/formatDecimal'
import { TrainingSkills } from '@/enums'
import TimerIndicator from '@/components/indicators/TimerIndicator.vue'
import { onMounted, ref } from 'vue'

const energyStore = useEnergyStore()
const trainingStore = useTrainingStore()

let progress = ref(0)
onMounted(() => {
  setInterval(() => {
    if (progress.value >= 100) {
      progress.value = 0
      return
    }

    progress.value += 1
  }, 100)
})

function increaseRegularAttackEnergy(): void {
  if (energyStore.allocateEnergy(new Decimal(1))) {
    trainingStore.allocateTrainingEnergy(
      TrainingSkills.RegularAttack,
      new Decimal(1)
    )
  }
}

function decreaseRegularAttackEnergy(): void {
  if (energyStore.reclaimEnergy(new Decimal(1))) {
    trainingStore.allocateTrainingEnergy(
      TrainingSkills.RegularAttack,
      new Decimal(-1)
    )
  }
}

function increaseBlockDefenceEnergy(): void {
  if (energyStore.allocateEnergy(new Decimal(1))) {
    trainingStore.allocateTrainingEnergy(
      TrainingSkills.BlockDefence,
      new Decimal(1)
    )
  }
}

function decreaseBlockDefenceEnergy(): void {
  if (energyStore.reclaimEnergy(new Decimal(1))) {
    trainingStore.allocateTrainingEnergy(
      TrainingSkills.BlockDefence,
      new Decimal(-1)
    )
  }
}
</script>

<style scoped></style>
