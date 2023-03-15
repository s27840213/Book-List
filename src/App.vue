<template lang="pug">
div(class="flex h-full flex-col overflow-y-scroll")
  div(
    class="sticky top-0 left-0 z-50 w-full bg-slate-900 py-5 text-2xl font-bold text-slate-200 shadow-sm shadow-slate-600")
    span {{ titleText }}
    img(
      v-if="showBackIcon"
      @click="handleBackIconAction"
      class="absolute top-1/2 left-4 w-12 -translate-y-1/2 cursor-pointer"
      :src="backIcon")
    img(
      v-if="!isAddingBook && !isEditingBook"
      @click="handleRightIconAction()"
      class="absolute top-1/2 right-4 w-12 -translate-y-1/2 cursor-pointer"
      :src="isShowingDetail ? editIcon : plusIcon")
  router-view
  notifications(
    position="bottom center"
    group="success"
    width="300px"
    :max="2"
    :duration="2000")
  notifications(
    position="bottom center"
    group="error"
    width="300px"
    :max="2"
    :duration="2000")
    template(v-slot:body="{ item }")
      div(class="bg-red-500 py-2 pl-4 text-left text-white" v-html="item.text")
</template>

<script setup lang="ts">
import backIcon from '@/assets/chevron-left.svg'
import editIcon from '@/assets/edit.svg'
import plusIcon from '@/assets/plus-square.svg'
import { computed, onBeforeMount, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useBooks from './composable/useBooks'
import useState from './composable/useState'

const {
  isAddingBook,
  isEditingBook,
  isListingBooks,
  isShowingDetail,
  setState,
  currentState
} = useState()
const titleText = computed(() => {
  if (isShowingDetail.value) return '書本詳情'
  if (isAddingBook.value) return '新增書本'
  if (isEditingBook.value) return '編輯書本'

  return '書本列表'
})

const showBackIcon = computed(() => {
  return isAddingBook.value || isEditingBook.value || isShowingDetail.value
})

const router = useRouter()
const route = useRoute()

const currentPath = computed(() => route.path)

const goToBookList = () => {
  router.replace({ path: '/' })
}

const handleBackIconAction = () => {
  setState('listing')
  goToBookList()
}

const handleRightIconAction = () => {
  if (isListingBooks.value) {
    setState('adding')
  } else if (isShowingDetail.value) {
    setState('editing')
  }
}

const { listBooks } = useBooks()

watch(currentPath, (newVal) => {
  if (newVal === '/') {
    setState('listing')
  } else {
    setState('showingDetail')
  }
})

watch(currentState, (newVal) => {
  if (newVal === 'listing') {
    goToBookList()
  }
})

onBeforeMount(async () => {
  await listBooks()
})
</script>
