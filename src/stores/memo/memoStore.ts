import { defineStore } from 'pinia'
import type { Memo } from '../../types/memo/MemoTypes'
import { generateId } from '../../utils/generateId.ts'

interface MemoStoreState {
  memos: Memo[]
  openedTabs: Memo[]
  selectedMemo: Memo | null
}
// 로컬 스토리지와 연동
const storedMemos: Memo[] = JSON.parse(localStorage.getItem('memos') || '[]')
const storedOpenedTabs: Memo[] = JSON.parse(localStorage.getItem('openedTabs') || '[]')

export const useMemoStore = defineStore('memo', {
  state: (): MemoStoreState => ({
    memos: storedMemos,
    selectedMemo: null,
    openedTabs: storedOpenedTabs,
  }),
  actions: {
    openTab(id: string) {
      const currentMemo = this.memos.find((memo) => memo.id === id)
      if (currentMemo && !this.openedTabs.some((tab) => tab.id === currentMemo.id)) {
        this.openedTabs.push(currentMemo)
        localStorage.setItem('openedTabs', JSON.stringify([...this.openedTabs]))
      }
    },
    closeTab(id: string) {
      const target = this.openedTabs.findIndex((tab) => tab.id === id)
      if (target !== -1) {
        this.openedTabs.splice(target, 1)
      }
    },

    // Create
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
      localStorage.setItem('memos', JSON.stringify([...this.memos]))
      return newMemo
    },

    // Read
    // getStoredMemos() {
    //   const storedMemos: Memo[] = sessionStorage.getItem('memos') ?? []
    //   return JSON.parse(storedMemos)
    // },

    // Delete
    deleteMemo(id: string) {
      const target = this.memos.find((memo) => memo.id === id)
      if (target !== -1) {
        this.memos.splice(target, 1)
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        path: 'memos',
      },
    ],
  },
})
