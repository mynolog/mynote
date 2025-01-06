import { defineStore } from 'pinia'
import type { Memo } from '../../types/memo/MemoTypes'
import { generateId } from '../../utils/generateId.ts'

interface MemoStoreState {
  memos: Memo[]
  openedTabs: Memo[]
}

const dummyMemos: Memo[] = Array.from({ length: 10 }, (_, index) => ({
  id: String(index + 1),
  title: `Memo ${index + 1}`,
  content: `This is content of Memo ${index + 1}`,
}))

export const useMemoStore = defineStore('memo', {
  state: (): MemoStoreState => ({
    //TODO: 세션 스토리지로 변경
    memos: dummyMemos,
    selectedMemo: null,
    openedTabs: [],
  }),
  actions: {
    openTab(id: string) {
      const currentMemo = this.memos.find((memo) => memo.id === id)
      if (currentMemo && !this.openedTabs.some((tab) => tab.id === currentMemo.id)) {
        this.openedTabs.push(currentMemo)
      }
    },
    closeTab(id: string) {
      const target = this.openedTabs.findIndex((tab) => tab.id === id)
      if (target !== -1) {
        this.openedTabs.splice(target, 1)
      }
    },

    createMemo() {
      let maxNumber = 0
      this.memos.forEach((memo) => {
        const match = memo.title.match(/^Untitled (\d+)$/)
        if (match) {
          maxNumber = Math.max(maxNumber, parseInt(match[1]))
        }
      })
      const newMemoTitle = `Untitled ${maxNumber + 1}`
      const newMemo: Memo = {
        id: generateId(),
        title: newMemoTitle,
        content: '',
      }
      // this.memos = [...this.memos, newMemo]
      this.memos.push(newMemo)
      return newMemo
    },
  },
})
