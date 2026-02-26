<template>
  <button
    @click="selectAttack(props.skill.id)"
    style="width: 50px; height: 50px; position: relative"
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
    <span v-if="!props.skill.attackOnCooldown()"
      ><v-icon
        style="color: black"
        :name="
          props.skill.skillType === SkillType.Attack
            ? Icons.Sword
            : Icons.Shield
        "
    /></span>
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
