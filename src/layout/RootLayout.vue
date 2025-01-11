<script setup>
import MemoList from '../components/memo-list/MemoList.vue'
import AppHeader from '../components/app-header/ AppHeader.vue'
</script>

<template>
  <div class="flex flex-col mx-auto">
    <app-header />
    <div class="flex pt-14">
      <memo-list />
      <router-view />
    </div>
  </div>
</template>
