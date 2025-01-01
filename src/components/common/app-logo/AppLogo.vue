<script setup lang="ts">
import { defineProps, ref } from 'vue'

interface AppLogoProps {
  variant: 'short' | 'long'
}

const { variant } = defineProps<AppLogoProps>()
</script>

<template>
  <div class="app-logo">
    <p :class="['font-righteous text-2xl']">{{ variant === 'long' ? 'mynote.' : 'my.' }}</p>
  </div>
</template>
