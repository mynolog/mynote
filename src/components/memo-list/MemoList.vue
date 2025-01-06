<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useMemoStore } from '../../stores/memo/memoStore'

const router = useRouter()
const { memos, openTab } = useMemoStore()

const handleSelectMemo = (id: string) => {
  openTab(id)
  router.push({ name: 'memo-detail', params: { id } })
}
</script>

<template>
  <div class="w-[210px] relative min-h-screen overflow-y-auto">
    <ul class="fixed w-[210px] top-6 flex flex-col pt-8 px-2 h-full bg-gray-200">
      <li
        v-for="memo in memos"
        :key="memo.id"
        @click="handleSelectMemo(memo.id)"
        class="px-2 py-1 hover:bg-gray-300 cursor-pointer rounded-md"
      >
        <router-link :to="{ name: 'memo-detail', params: { id: memo.id } }">
          {{ memo.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
