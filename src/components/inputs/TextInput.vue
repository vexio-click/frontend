<script setup lang="ts">
import { defineProps, defineEmits, ref } from 'vue'
import { type InputHTMLAttributes } from 'vue'

const props = defineProps<{
  noPopupError?: boolean
  placeholder?: InputHTMLAttributes['placeholder']
  error?: string
  type: InputHTMLAttributes['type']
  modelValue: string
  required?: InputHTMLAttributes['required']
  name?: InputHTMLAttributes['name']
}>()

const localError = ref('')

const emit = defineEmits(['update:modelValue'])

const emitValue = (event: Event) => {
  if (event?.target instanceof HTMLInputElement) {
    event.target.reportValidity()
    localError.value = ''
    emit('update:modelValue', event.target.value)
  }
}
function writeError(event: Event) {
  if (props.noPopupError && event.currentTarget instanceof HTMLInputElement) {
    event.preventDefault()
    const message = event.currentTarget.validationMessage
    localError.value = message
  }
}
</script>

<template>
  <label>
    <input
      @invalid="writeError"
      @input="emitValue"
      :value="modelValue"
      :required="props.required"
      :class="{ error: props.error || localError }"
      :type="props.type"
      :name="props.name"
      placeholder=" "
    />
    <span :class="{ error: error }">{{ placeholder }}</span>
    <aside>{{ localError ? localError : props.error }}</aside>
  </label>
</template>

<style lang="scss" scoped>
label {
  position: relative;
  width: 100%;
  input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    outline: none;
    border: 1px solid #d0cfcf;
    border-radius: 4px;
    background: inherit;
    &.error {
      border-color: #cb3d40;
    }
  }

  span {
    position: absolute;
    pointer-events: none;
    background: white;

    left: 10px;
    top: 50%;
    transform: translate(0, -50%);

    transition: 0.2s;

    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;

    color: #7e7e7e;
  }

  input:focus + span,
  input:not(:placeholder-shown) + span {
    top: 0;

    font-weight: 500;
    font-size: 12px;
    line-height: 14px;
    &.error {
      color: #cb3d40;
    }
  }
  aside {
    position: absolute;
    pointer-events: none;

    left: 10px;
    top: 100%;
    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #cb3d40;
  }
}
</style>
