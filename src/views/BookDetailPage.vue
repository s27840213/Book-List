<template lang="pug">
book-form(:book="currentBook")
</template>

<script lang="ts" setup>
import useBooks from '@/composable/useBooks'
import type { IBook } from '@/interface'

const { activeBookId, booksMap } = useBooks()
const currentBook: IBook | undefined = booksMap.get(activeBookId.value)
</script>
