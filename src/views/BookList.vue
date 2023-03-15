<template lang="pug">
div(
  v-if="isListingBooks"
  class="grid grid-cols-2 gap-4 px-4 py-8 md:gap-12 md:px-16 lg:grid-cols-3 xl:grid-cols-4")
  book-card(v-for="book in books" :key="book.id" :book="book")
book-form(v-else-if="isAddingBook")
</template>

<script lang="ts" setup>
import BookForm from '@/components/BookForm.vue'
import useBooks from '@/composable/useBooks'
import useState from '@/composable/useState'
const { isAddingBook, isListingBooks } = useState()

const { books } = useBooks()
</script>
