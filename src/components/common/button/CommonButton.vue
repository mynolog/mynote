<template>
  <button
    :style="{ width, height }"
    class="text-xs font-bold text-white font-noto rounded-lg bg-soft-blue-600"
    @click="navigateTo(path)"
  >
    {{ title }}
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  width: {
    type: String,
    default: '80px',
  },
  height: {
    type: String,
    default: '20px',
  },
  path: {
    type: String,
    required: true,
  },
})

const navigateTo = (path: string) => {
  if (path) {
    router.push(path)
  }
}

const { title, width, height, path } = props
</script>
