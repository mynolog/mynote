<script setup lang="ts">
interface AppLogoProps {
  variant: 'short' | 'long'
}

const { variant } = defineProps<AppLogoProps>()
</script>

<template>
  <div class="flex items-center">
    <p class="font-righteous text-2xl text-soft-blue-900">
      {{ variant === 'long' ? 'mynote.' : 'my.' }}
    </p>
  </div>
</template>
