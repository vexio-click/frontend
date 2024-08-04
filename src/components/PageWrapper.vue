<script setup lang="ts"></script>

<template>
  <div class="container">
    <div class="page"><slot></slot></div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  .page {
    width: 100%;
    max-width: 1170px;
  }
}
</style>
