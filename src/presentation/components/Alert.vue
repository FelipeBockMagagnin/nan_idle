<template>
  <div class="alert-stack-container">
    <TransitionGroup name="fade" tag="div">
      <div
        v-for="alert in standardAlerts"
        :key="alert.id"
        class="window alert-container"
      >
        <div
          class="title-bar"
          :style="{ backgroundColor: getAlertBackgroundColor(alert) }"
        >
          <div class="title-bar-text">{{ alert.title || 'Alert' }}</div>
        </div>
        <div class="window-body alert-message">
          {{ alert.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>

  <div v-if="confirmAlerts.length > 0" class="confirm-modal-overlay">
    <TransitionGroup name="modal" tag="div" class="modal-content-container">
      <div
        v-for="alert in confirmAlerts"
        :key="alert.id"
        class="window centered-alert"
      >
        <div
          class="title-bar"
          :style="{ backgroundColor: getAlertBackgroundColor(alert) }"
        >
          <div class="title-bar-text">{{ alert.title || 'Confirmation Required' }}</div>
        </div>
        <div class="window-body alert-message">
          <p>{{ alert.message }}</p>
          <div class="button-container">
            <button @click="alertStore.removeAlert(alert.id)">OK</button>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { AlertTypeEnum } from '@/application/services/AlertService'
import { Alert, useAlertStore } from '@/presentation/stores/alertStore'

const alertStore = useAlertStore()

const standardAlerts = computed(() =>
  alertStore.alerts.filter((alert) => alert.type !== AlertTypeEnum.Confirm),
)
const confirmAlerts = computed(() =>
  alertStore.alerts.filter((alert) => alert.type === AlertTypeEnum.Confirm),
)

function getAlertBackgroundColor(alert: Alert) {
  switch (alert.type) {
    case AlertTypeEnum.Error:
      return 'red'
    case AlertTypeEnum.Success:
      return '#4caf50'
    case AlertTypeEnum.Warning:
      return 'yellow'
    case AlertTypeEnum.Confirm:
      return '#000080'
    default:
      return '#000080'
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

.confirm-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
}

.centered-alert {
  width: 400px;
  max-width: 90%;
  position: absolute;
}

.alert-message {
  font-weight: bold;
}

.button-container {
  margin-top: 15px;
  text-align: right;
}

.button-container button {
  min-width: 80px;
  padding: 4px 12px;
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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
