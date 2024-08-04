<script setup lang="ts">
import { ref, computed, defineEmits, type InputHTMLAttributes } from 'vue'

const props = defineProps<{
  maxTotalSize?: number
  maxSingleSize?: number
  noPopupError?: boolean
  placeholder?: InputHTMLAttributes['placeholder']
  text?: string
  name?: InputHTMLAttributes['name']
  error?: string
  modelValue?: string
  required?: InputHTMLAttributes['required']
  multiple?: InputHTMLAttributes['multiple']
  accept?: InputHTMLAttributes['accept']
}>()

const localError = ref<string | undefined | null>(undefined)
const files = ref<FileList | null>(null)

const fileNames = computed(() => {
  if (files.value) {
    return Array.from(files.value)
      .map((file) => file.name)
      .join(', ')
  }
  return ''
})
const emit = defineEmits(['change'])

function getMaxSize(files: FileList | null): number {
  if (!files) return 0
  let maxSize = 0
  Array.from(files).forEach((file) => {
    if (file.size > maxSize) {
      maxSize = file.size
    }
  })
  return maxSize
}
function getTotalSize(files: FileList | null): number {
  if (!files) return 0

  let totalSize = 0
  Array.from(files).forEach((file) => {
    totalSize += file.size
  })
  return totalSize
}

function filesChanged(event: Event) {
  if (event?.target instanceof HTMLInputElement) {
    if (props.maxSingleSize && getMaxSize(event.target.files) > props.maxSingleSize) {
      localError.value = `Max ${props.maxSingleSize / 1024} KB/File`
      emit('change', undefined)
      files.value = null
      return
    } else {
      localError.value = null
    }

    if (props.maxTotalSize && getTotalSize(event.target.files) > props.maxTotalSize) {
      localError.value = `Max ${props.maxTotalSize / 1024} KB Total`
      emit('change', undefined)
      files.value = null
      return
    } else {
      localError.value = null
    }

    files.value = event.target.files
    emit('change', event.target.files)
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
  <div class="container">
    <label class="label" :class="{ error: props.error || localError }">
      <input
        @invalid="writeError"
        @change="filesChanged"
        type="file"
        :required="props.required"
        :multiple="props.multiple"
        :name="props.name"
        :accept="props.accept"
      />
      <span class="upload" role="button" type="button" :class="{ upload_error: error }">{{
        text
      }}</span>
      <span class="filename" :class="{ filename_filed: files }">{{
        files ? fileNames : placeholder
      }}</span>
    </label>
    <aside>{{ localError ? localError : props.error }}</aside>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  position: relative;

  .label {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 54px;

    border: 1px solid #d0cfcf;
    border-radius: 4px;

    font-family: 'Nunito';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    cursor: pointer;

    input {
      display: none;
    }
    .upload {
      border: 1px solid rgba(0, 0, 0, 0.87);
      border-radius: 4px 0px 0px 4px;

      color: rgba(0, 0, 0, 0.87);

      padding: 14px;
      box-sizing: border-box;

      margin: -1px 0 0 -1px;
      height: calc(100% + 2px);

      &__error {
        margin: -2px 0 0 -2px;
        height: calc(100% + 4px);
        border: 2px solid #cb3d40;
      }
    }
    .filename {
      padding: 14px;
      box-sizing: border-box;
      color: #7e7e7e;

      height: 100%;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &_filed {
        color: rgba(0, 0, 0, 0.87);
      }
    }
    .error {
      border: 2px solid #cb3d40;
    }
    &_file {
      font-family: 'Nunito';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 26px;

      color: rgba(0, 0, 0, 0.87);
    }
  }

  aside {
    font-family: 'Asap';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;

    color: #cb3d40;
    position: absolute;
    top: calc(100% + 2 * 2px + 4px);
    left: 16px;
  }
}
</style>
