<template lang="pug">
router-link(
  :to="`/${book.id}`"
  :tag="'div'"
  class="box-border flex h-full flex-col rounded-md border-2 border-gray-200 bg-slate-50 bg-opacity-60 p-4 transition-[transform] hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg hover:shadow-slate-400 md:p-6 lg:p-8")
  div(class="aspect-[3/4]")
    img(
      class="aspect-[3/4] h-full w-full object-cover object-center"
      :src="book.image ?? placeholder")
  div(class="my-4")
    span(class="overflow-hidden text-lg font-bold line-clamp-2 md:text-xl") {{ book.title ? book.title : '未知書名' }}
    span(class="text-md mt-2 overflow-hidden font-bold line-clamp-1 md:text-lg") {{ book.author ? book.author : '未知作者' }}
</template>

<script lang="ts" setup>
import placeholder from '@/assets/placeholder.jpg'
import type { IBook } from '@/interface'
defineProps<{
  book: IBook
}>()
</script>
