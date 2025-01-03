<script setup lang="ts">
import { useMemoStore } from '../../stores/memo/memoStore'
import AppLogo from '../common/app-logo/AppLogo.vue'

const { memos, openTab } = useMemoStore()

const handleSelectMemo = (id: string) => {
  openTab(id)
}
</script>

<template>
  <div class="w-[210px] relative border-r-2 min-h-screen border-soft-blue-800 overflow-y-auto">
    <div class="flex fixed w-[200px] h-8 px-5 bg-white">
      <app-logo variant="long" />
    </div>
    <ul class="pt-10 pl-3">
      <li v-for="memo in memos">
        <router-link
          @click="() => handleSelectMemo(memo.id)"
          :to="{ name: 'memo-detail', params: { id: memo.id } }"
        >
          {{ memo.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
