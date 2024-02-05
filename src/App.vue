<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
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

.gallery {
  display: grid;
  grid-template-columns: repeat(var(--gallery-column, 1), 1fr);
  grid-auto-rows: min-content;
}

@media (min-width: 540px) {
  .gallery {
    --gallery-column: 2;
  }
}

@media (min-width: 768px) {
  .gallery {
    --gallery-column: 3;
  }
}

@media (min-width: 1024px) {
  .gallery {
    --gallery-column: 4;
  }
}

@media (min-width: 1440px) {
  .gallery {
    --gallery-column: 5;
  }
}
</style>
