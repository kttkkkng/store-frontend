<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SlipModal from './components/Modal/SlipModal.vue';
</script>

<template>
  <SlipModal />
  <RouterView />
</template>

<style lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
