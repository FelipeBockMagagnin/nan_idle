<template>
  <div>
    <h2 class="page-title">Training</h2>

    <div style="display: flex; padding: 0px 10px; margin-bottom: 10px">
      <EnergyIndicator />
      <AttackIndicator />
      <DefenceIndicator />
    </div>

    <div style="position: absolute; top: 5px; left: 10px">
      <button
        :style="{
          borderWidth: energyAllocationValue.equals(100) ? '1px' : '0',
        }"
        @click="setEnergyAllocationValue(100)"
      >
        100
      </button>
      <button
        :style="{
          borderWidth: energyAllocationValue.equals(250) ? '1px' : '0',
        }"
        @click="setEnergyAllocationValue(250)"
      >
        250
      </button>
    </div>

    Regular Attack
    <br />

    <div class="training-item-container">
      <TimerIndicator
        :progress="
          trainingStore.getskillProgressPercent(
            TrainingSkillsEnum.RegularAttack
          )
        "
        width="200px"
        :innerText="
          formatDecimal(
            trainingStore.getLevelValue(TrainingSkillsEnum.RegularAttack)
          )
        "
      />
      <div>
        <button @click="increaseRegularAttackEnergy">+</button>
        <span>{{
          formatDecimal(
            trainingStore.getAllocatedEnergyValue(
              TrainingSkillsEnum.RegularAttack
            )
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
        :progress="
          trainingStore.getskillProgressPercent(TrainingSkillsEnum.BlockDefence)
        "
        width="200px"
        :innerText="
          formatDecimal(
            trainingStore.getLevelValue(TrainingSkillsEnum.BlockDefence)
          )
        "
        barColor="#3e3eb5"
      />
      <div>
        <button @click="increaseBlockDefenceEnergy">+</button>
        <span>{{
          formatDecimal(
            trainingStore.getAllocatedEnergyValue(
              TrainingSkillsEnum.BlockDefence
            )
          )
        }}</span>
        <button @click="decreaseBlockDefenceEnergy">-</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EnergyIndicator from '@/presentation/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/presentation/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/presentation/components/indicators/DefenceIndicator.vue'
import { useTrainingStore } from '@/presentation/stores/trainingStore'
import { formatDecimal } from '@/presentation/utils/formatDecimal'
import TimerIndicator from '@/presentation/components/indicators/TimerIndicator.vue'
import Decimal from 'break_infinity.js'
import { TrainingSkillsEnum } from '@/domain/enums'
import { ref } from 'vue'

const trainingStore = useTrainingStore()
const energyAllocationValue = ref<Decimal>(new Decimal(250))

function setEnergyAllocationValue(value: number) {
  energyAllocationValue.value = new Decimal(value)
}

function increaseRegularAttackEnergy(): void {
  trainingStore.allocateTrainingEnergy(
    TrainingSkillsEnum.RegularAttack,
    energyAllocationValue.value
  )
}

function decreaseRegularAttackEnergy(): void {
  trainingStore.reclaimEnergy(
    TrainingSkillsEnum.RegularAttack,
    energyAllocationValue.value
  )
}

function increaseBlockDefenceEnergy(): void {
  trainingStore.allocateTrainingEnergy(
    TrainingSkillsEnum.BlockDefence,
    energyAllocationValue.value
  )
}

function decreaseBlockDefenceEnergy(): void {
  trainingStore.reclaimEnergy(
    TrainingSkillsEnum.BlockDefence,
    energyAllocationValue.value
  )
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
