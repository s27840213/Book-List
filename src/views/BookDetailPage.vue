<template lang="pug">
book-form(:book="currentBook")
</template>

<script lang="ts" setup>
import BookForm from '@/components/BookForm.vue'
import useBooks from '@/composable/useBooks'
import type { IBook } from '@/interface'

const { activeBookId, booksMap } = useBooks()
const currentBook: IBook | undefined = booksMap.get(activeBookId.value)
</script>
