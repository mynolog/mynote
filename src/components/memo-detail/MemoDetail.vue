<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import type { Memo } from '../../types/memo/MemoTypes.ts'
import { useMemoStore } from '../../stores/memo/memoStore'

const route = useRoute()
const id = computed(() => route.params.id as string)
const { memos } = useMemoStore()

const selectedMemo: Memo = computed(() => {
  return memos.find((memo) => memo.id === id.value) || null
})

const titleRef = ref<HTMLInputElement | null>(null)
const contentRef = ref<HTMLTextAreaElement | null>(null)

const moveToContent = async () => {
  contentRef.value.focus()
  // 렌더링 완료까지 기다리기
  await nextTick()
  //
  const length = contentRef.value.value.length ?? 0
  if (contentRef.value instanceof HTMLTextAreaElement) {
    contentRef.value.setSelectionRange(length, length)
  }
}
</script>

<template>
  <div class="w-full h-screen pl-9 pt-8">
    <div v-if="selectedMemo" class="w-full h-screen flex flex-col">
      <input
        ref="titleRef"
        v-model="selectedMemo.title"
        @keyup.enter="moveToContent"
        type="text"
        class="font-bold text-2xl"
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
