<script setup>
import MemoList from '../components/memo-list/MemoList.vue'
</script>

<template>
  <div class="flex">
    <memo-list />
    <router-view />
  </div>
</template>
