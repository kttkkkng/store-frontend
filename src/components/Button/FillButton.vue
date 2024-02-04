<template>
  <button
    class="fill-button rounded-lg px-4 py-2 text-white"
    :style="ButtonStyle()"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps(['background'])

function ButtonStyle () {
  return {
    backgroundColor: `var(--${props.background ?? 'main-primary'})`,
  }
}
</script>

<style lang="scss" scoped>
.fill-button {
  transition: background-color 200ms linear;

  &:disabled {
    background-color: var(--gray-secondary) !important;
    cursor: not-allowed;
  }
}
</style>