<template>
  <button @click="selectAttack(props.skill.id)" style="width: 150px">
    <span v-if="!props.skill.attackOnCooldown()">{{ props.skill.name }}</span>
    <span v-else>{{ props.skill.getPlayerAttackCooldown() }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Skill } from '@/domain/entities/Skill'
import { TrainingSkillsEnum } from '@/domain/enums'

type SelectAttackCallback = (id: TrainingSkillsEnum) => void

interface Props {
  skill: Skill
  selectAttack: SelectAttackCallback
}

const props = defineProps<Props>()
</script>

<style scoped></style>
