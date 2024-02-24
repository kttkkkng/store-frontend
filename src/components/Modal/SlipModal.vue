<template>
  <BaseModal
    v-model="modalStore.open_slip_modal"
    slide-up
  >
    <iframe
      :src="modalStore.slip"
      height="100%"
      width="100%"
      frameborder="0"
    />
  </BaseModal>
</template>

<script setup>
import { useModalStore } from '@/stores/ModalStore.js';
import BaseModal from './BaseModal.vue';

const modalStore = useModalStore()
</script>