<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMemoStore } from '../../stores/memo/memoStore'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { openedTabs, memos } = useMemoStore()

const selectedMemo = computed(() => {
  return memos.find((memo) => memo.id === id.value) || null
})
</script>

<template>
  <div class="pl-3 pt-8">
    <div v-if="selectedMemo">
      <h2>{{ selectedMemo.title }}</h2>
      <p>{{ selectedMemo.content }}</p>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>
