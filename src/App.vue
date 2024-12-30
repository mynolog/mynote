<script setup lang="ts">
import { ref } from 'vue'

const title = ref('mynote')
</script>

<template>
  <div id="app">{{ title }}</div>
</template>

<style scoped></style>
