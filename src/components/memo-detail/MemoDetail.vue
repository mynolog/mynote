<script setup lang="ts">
import { computed, ref, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Memo } from '../../types/memo/MemoTypes.ts'
import { useMemoStore } from '../../stores/memo/memoStore'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { memos, updateMemo } = useMemoStore()

// selectedMemo를 찾기 위해 memos에서 해당 memo를 찾음
const selectedMemo = computed<Memo | null>(() => {
  return memos.find((memo) => memo.id === id.value) || null
})

const titleRef = ref<HTMLInputElement | null>(null)
const contentRef = ref<HTMLTextAreaElement | null>(null)

const moveToContent = async () => {
  contentRef.value?.focus()
  await nextTick()
  const length = contentRef.value?.value.length ?? 0
  if (contentRef.value instanceof HTMLTextAreaElement) {
    contentRef.value.setSelectionRange(length, length)
  }
}

// selectedMemo가 변경될 때마다 memos 전체를 sessionStorage에 저장
watch(
  () => memos,
  () => {
    // memos 배열이 변경되었을 때 sessionStorage에 저장
    sessionStorage.setItem('memos', JSON.stringify(memos))
  },
  { immediate: true },
)

// selectedMemo의 title이 변경되었을 때 memos에 반영하고 sessionStorage에 저장
watch(
  () => selectedMemo.value?.title,
  (newTitle) => {
    if (selectedMemo.value) {
      // title이 변경되면 해당 메모를 업데이트
      selectedMemo.value.title = newTitle
      // memos 배열에 반영하고 sessionStorage에 저장
      sessionStorage.setItem('memos', JSON.stringify(memos))
    }
  },
)

// selectedMemo의 content가 변경되었을 때 memos에 반영하고 sessionStorage에 저장
watch(
  () => selectedMemo.value?.content,
  (newContent) => {
    if (selectedMemo.value) {
      // content가 변경되면 해당 메모를 업데이트
      selectedMemo.value.content = newContent
      // memos 배열에 반영하고 sessionStorage에 저장
      sessionStorage.setItem('memos', JSON.stringify(memos))
    }
  },
)
</script>

<template>
  <div class="w-full h-screen pl-9 pt-8">
    <div v-if="selectedMemo" class="w-full h-screen flex flex-col">
      <input
        ref="titleRef"
        v-model="selectedMemo.title"
        @keyup.enter="moveToContent"
        type="text"
        class="font-bold text-2xl outline-none"
      />
      <textarea
        ref="contentRef"
        cols="100%"
        v-model="selectedMemo.content"
        class="w-full h-screen outline-none resize-none"
      />
    </div>

    <div v-else>
      <p>메모 불러오는 중...</p>
    </div>
  </div>
</template>
