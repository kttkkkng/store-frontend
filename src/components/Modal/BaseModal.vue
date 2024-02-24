<template>
  <div
    class="backdrop"
    :class="{ 'show-backdrop': props.modelValue }"
    :style="{ zIndex: zIndex }"
    @click="Close"
  ></div>
  <div
    class="modal"
    :class="{ 'slide-up': props.slideUp, 'show-content': props.modelValue }"
    :style="{ zIndex: zIndex + 1 }"
    @click="Close"
  >
    <slot>
      <div style="width: 400px; height: 100%; background: white;"></div>
    </slot>
  </div>
  <i
    @click="Close"
    class="pi pi-times absolute right-5 top-5 cursor-pointer"
    style="color: white;"
    :style="{ zIndex: zIndex }"
  />
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  slideUp: {
    type: Boolean,
  },
})

const emits = defineEmits(['update:modelValue'])
const zIndex = ref(-1)

watch(() => props.modelValue, () => {
  if (props.modelValue) {
    zIndex.value = 100
  } else {
    setTimeout(() => zIndex.value = -1, 300)
  }
})

function Close () {
  emits('update:modelValue', false)
}
</script>

<style scoped>
.backdrop {
  position: absolute;

  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  background: black;
  scale: 1.5;  

  transition: opacity var(--modal-duration) linear;
}

.show-backdrop {
  opacity: 0.5;
}

.modal {
  position: absolute;

  left: 50%;
  top: 0%;
  translate: -50% 5vh 0;
  opacity: 0;

  height: calc(100% - 10vh);
  overflow: auto;

  transition: translate var(--modal-duration) linear, opacity var(--modal-duration) linear;
}

.slide-up {
  translate: -50% 10vh 0;
}

.show-content {
  translate: -50% 5vh 0;
  opacity: 1;
}
</style>