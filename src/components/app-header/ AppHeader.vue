<script setup lang="ts">
import AppLogo from '../common/app-logo/AppLogo.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useMemoStore } from '../../stores/memo/memoStore.ts'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { openedTabs, memos } = useMemoStore()
</script>

<template>
  <header class="w-full flex">
    <div class="flex w-[210px] h-8 px-3 bg-gray-200">
      <app-logo variant="long" />
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
          class="w-full h-full px-2 flex items-center"
          active-class="bg-soft-blue-800 text-white"
          exact-active-class="font-bold"
        >
          {{ tab.title }}
        </router-link>
      </li>
      <li class="flex items-center justify-center px-1">
        <span class="w-full rounded-md hover:bg-gray-300 px-2 cursor-pointer">+</span>
      </li>
    </ul>
  </header>
</template>
