<template>
  <button
    @click="selectAttack(props.skill.id)"
    style="width: 150px; position: relative"
    :style="{
      borderColor:
        props.skill.skillType === SkillType.Attack ? 'greenyellow' : '#646cff',
    }"
  >
    <div
      v-if="!props.skill.unlocked"
      style="
        position: absolute;
        width: 100%;
        background-color: #000000b8;
        left: 0;
        top: 0;
        border-radius: 10px;
        height: 100%;
      "
    >
      <v-icon style="margin-top: 2px" :name="Icons.Lock" />
    </div>
    <span v-if="!props.skill.attackOnCooldown()">{{ props.skill.name }}</span>
    <span v-else>{{ props.skill.getPlayerAttackCooldown() }}</span>
  </button>
</template>

<script setup lang="ts">
import type { Skill } from '@/domain/entities/Skill'
import { Icons, SkillType, TrainingSkillsEnum } from '@/domain/enums'

type SelectAttackCallback = (id: TrainingSkillsEnum) => void

interface Props {
  skill: Skill
  selectAttack: SelectAttackCallback
}

const props = defineProps<Props>()
</script>

<style scoped></style>
