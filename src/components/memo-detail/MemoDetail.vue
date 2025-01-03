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
  <div class="flex-1 relative min-h-screen overflow-y-auto">
    <ul class="w-full h-8 flex bg-white">
      <li
        v-for="tab in openedTabs"
        :key="tab.id + tab.title"
        :class="[
          'bg-gray-200 pl-3 flex justify-center items-center',
          openedTabs.length > 6 ? 'flex-1' : 'w-56',
        ]"
      >
        <router-link
          :to="{ name: 'memo-detail', params: { id: tab.id } }"
          class="w-full h-full px-2"
          active-class="bg-soft-blue-800 text-white"
          exact-active-class="font-bold"
        >
          {{ tab.title }}
        </router-link>
      </li>
    </ul>

    <div class="pl-3">
      <div v-if="selectedMemo">
        <h2>{{ selectedMemo.title }}</h2>
        <p>{{ selectedMemo.content }}</p>
      </div>
      <div v-else>
        <p>Loading...</p>
      </div>
    </div>
  </div>
</template>
