<template>
  <div>
    <h2 class="page-title">Training</h2>

    <div style="display: flex; padding: 0px 10px; margin-bottom: 10px">
      <EnergyIndicator />
      <AttackIndicator />
      <DefenceIndicator />
    </div>

    Regular Attack
    <br />

    <div class="training-item-container">
      <TimerIndicator
        :progress="progress"
        width="200px"
        :innerText="
          formatDecimal(
            trainingStore.getLevelValue(TrainingSkills.RegularAttack)
          )
        "
      />
      <div>
        <button @click="increaseRegularAttackEnergy">+</button>
        <span>{{
          formatDecimal(
            trainingStore.getAllocatedEnergyValue(TrainingSkills.RegularAttack)
          )
        }}</span>
        <button @click="decreaseRegularAttackEnergy">-</button>
      </div>
    </div>

    <br />
    Block Defence
    <br />

    <div class="training-item-container">
      <TimerIndicator
        :progress="progress"
        width="200px"
        :innerText="
          formatDecimal(
            trainingStore.getLevelValue(TrainingSkills.RegularAttack)
          )
        "
        barColor="#3e3eb5"
      />
      <div>
        <button @click="increaseBlockDefenceEnergy">+</button>
        <span>{{
          formatDecimal(
            trainingStore.getAllocatedEnergyValue(TrainingSkills.BlockDefence)
          )
        }}</span>
        <button @click="decreaseBlockDefenceEnergy">-</button>
      </div>
    </div>
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

<style scoped>
.training-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
