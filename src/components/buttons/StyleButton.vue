<script setup lang="ts">
import { defineProps } from 'vue'
import { type ButtonHTMLAttributes } from 'vue'

const props = defineProps<{
  disabled?: ButtonHTMLAttributes['disabled']
  pretendDisabled?: boolean
  type?: ButtonHTMLAttributes['type']
}>()
</script>

<template>
  <button
    :disabled="props.disabled"
    :type="props.type"
    :class="props.pretendDisabled ? 'disabled' : ''"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button {
  outline: none;
  border: none;
  width: 100px;
  height: 34px;

  cursor: pointer;

  background: #f4e041;
  border-radius: 80px;

  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
  color: black;

  &:hover {
    background: #ffe302;
  }

  &.disabled,
  &:disabled {
    background: #b4b4b4;
    color: rgba(255, 255, 255, 0.87);
    cursor: unset;
  }
}
</style>
