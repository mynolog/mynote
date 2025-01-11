<script setup lang="ts">
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useMemoStore } from '../../stores/memo/memoStore.ts'
import AppLogo from '../common/app-logo/AppLogo.vue'
import CommonButton from '../common/button/CommonButton.vue'
import type { Memo } from '../../types/memo/memoTypes.ts'
import { RoutePath } from '../../types/path/paths.ts'

const router = useRouter()
const { openedTabs, closeTab, createMemo, openTab } = useMemoStore()

const handleCloseTab = (id: string) => {
  let nextTabId = openedTabs[openedTabs.length - 1]?.id
  if (nextTabId === id) {
    nextTabId = openedTabs[openedTabs.length - 2]?.id
  }
  if (nextTabId) {
    router.push({ name: 'memo-detail', params: { id: nextTabId } })
  } else {
    // 마지막 탭을 닫을 경우
    router.push(RoutePath.Home)
  }
  closeTab(id)
}

const handleCreateMemo = () => {
  const newMemo: Memo = createMemo()
  openTab(newMemo.id)
  router.push({ name: 'memo-detail', params: { id: newMemo.id } })
}
</script>

<template>
  <header class="fixed w-full flex h-14">
    <div class="flex flex-col w-[210px] px-3 bg-gray-200">
      <app-logo variant="long" />
      <div class="flex gap-1">
        <common-button title="로그인" path="/auth/sign-in" />
        <common-button title="회원가입" path="/auth/sign-up" />
      </div>
    </div>
    <ul class="h-8 flex flex-1 bg-gray-200">
      <li
        v-for="tab in openedTabs"
        :key="tab.id + tab.title"
        :class="[
          'bg-gray-200 flex justify-center items-center',
          openedTabs.length > 4 ? 'flex-1' : 'w-56',
        ]"
      >
        <router-link
          :to="{ name: 'memo-detail', params: { id: tab.id } }"
          class="w-full h-full px-2 flex justify-between items-center cursor-default"
          active-class="bg-soft-blue-800 text-white"
          exact-active-class="font-bold"
        >
          <span>
            {{ tab.title }}
          </span>
          <span class="cursor-pointer" @click.prevent="handleCloseTab(tab.id)">
            <font-awesome-icon icon="xmark" />
          </span>
        </router-link>
      </li>
      <li class="flex items-center justify-center px-1" @click="handleCreateMemo">
        <span class="w-full rounded-md hover:bg-gray-100 px-2 cursor-pointer">
          <font-awesome-icon icon="plus" />
        </span>
      </li>
    </ul>
  </header>
</template>
