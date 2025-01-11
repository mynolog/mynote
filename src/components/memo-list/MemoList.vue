<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useMemoStore } from '../../stores/memo/memoStore'
import { RoutePath } from '../../types/path/paths'

const router = useRouter()
const { memos, openTab, closeTab, deleteMemo } = useMemoStore()

const handleSelectMemo = (id: string) => {
  openTab(id)
  router.push({ name: 'memo-detail', params: { id } })
}

const handleDeleteMemo = (id: string) => {
  deleteMemo(id)
  closeTab(id)
  router.replace(RoutePath.Home)
}
</script>

<template>
  <div class="w-[210px] relative min-h-screen overflow-y-auto">
    <ul class="fixed w-[210px] top-6 flex flex-col mt-8 px-2 h-full bg-gray-200">
      <li
        v-for="memo in memos"
        :key="memo.id"
        @click="handleSelectMemo(memo.id)"
        class="flex justify-between items-center px-2 py-1 hover:bg-gray-300 cursor-pointer rounded-md group"
      >
        <router-link :to="{ name: 'memo-detail', params: { id: memo.id } }">
          {{ memo.title }}
        </router-link>
        <font-awesome-icon
          icon="xmark"
          class="invisible opacity-50 hover:opacity-100 group-hover:visible"
          @click.stop="handleDeleteMemo(memo.id)"
        />
      </li>
    </ul>
  </div>
</template>
