<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>

<template>
  <div class="w-4/5">MemoDetail: {{ id }}</div>
</template>
