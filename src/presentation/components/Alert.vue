<template>
  <div class="alert-stack-container">
    <TransitionGroup name="fade" tag="div">
      <div
        v-for="alert in alertStore.alerts"
        :key="alert.id"
        class="window alert-container"
      >
        <div class="title-bar" :style="{ backgroundColor: getAlertBackgroundColor(alert) }">
          <div class="title-bar-text">Alert</div>
        </div>
        <div class="window-body alert-message">
          {{ alert.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { AlertTypeEnum } from '@/application/services/AlertService'
import { Alert, useAlertStore } from '@/presentation/stores/alertStore'

const alertStore = useAlertStore()

function getAlertBackgroundColor(alert: Alert) {
  switch (alert.type) {
    case AlertTypeEnum.Error:
      return 'red'
    case AlertTypeEnum.Success:
      return '#4caf50'
    case AlertTypeEnum.Warning:
      return 'yellow'
  }
}
</script>

<style scoped>
.alert-stack-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alert-container {
  margin-bottom: 5px;
  width: 300px;
}

.alert-message {
  font-weight: bold;
}

/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
