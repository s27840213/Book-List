<template lang="pug">
div(class="flex h-full flex-col items-center justify-center p-4 md:p-8")
  div(class="container-style")
    span(class="placeholder-style top-1/2 -translate-y-6 text-xs") 書名
    input(
      class="input-style rounded-3xl"
      :class="{ 'pointer-events-none': isShowingDetail }"
      type="text"
      v-model="title")
  div(class="container-style")
    span(class="placeholder-style top-1/2 -translate-y-6 text-xs") 作者
    input(
      class="input-style rounded-3xl"
      :class="{ 'pointer-events-none': isShowingDetail }"
      type="text"
      v-model="author")
  div(class="container-style")
    span(class="placeholder-style -translate-y- top-1 text-xs") 備註
    textarea(
      class="input-style min-h-[240px] rounded-xl"
      :class="{ 'pointer-events-none': isShowingDetail }"
      v-model="description")
  div(v-if="!isShowingDetail" class="flex gap-4 px-8 py-8 md:px-16")
    button(
      class="box-border rounded-3xl bg-slate-500 px-8 py-2 text-slate-200 hover:bg-slate-500 active:bg-slate-600"
      @click="leftBtn?.callback") {{ leftBtn?.text }}
    button(
      class="box-border rounded-3xl bg-blue-400 px-8 py-2 text-slate-200 hover:bg-blue-500 active:bg-blue-600"
      @click="rightBtn?.callback") {{ rightBtn?.text }}
  div(v-if="isShowingDetail" class="flex gap-4 px-8 py-8 md:px-16")
    button(
      class="box-border rounded-3xl bg-red-500 px-8 py-2 text-slate-200 hover:bg-slate-500 active:bg-slate-600"
      @click="deleteCurrBook()") {{ '刪除' }}
</template>

<script lang="ts" setup>
import useBooks from '@/composable/useBooks'
import useState from '@/composable/useState'
import type { IBook } from '@/interface'
import { notify } from '@kyvg/vue3-notification'
import { computed, onMounted, ref } from 'vue'
const props = defineProps<{
  book?: IBook
}>()
const { book } = props

const { isShowingDetail, isAddingBook, isEditingBook, setState } = useState()
const { addBook, patchBook, deleteBook } = useBooks()

const deleteCurrBook = async () => {
  await deleteBook(book!.id)

  setState('listing')
}
const title = ref('')

const author = ref('')

const description = ref('')

const rightBtn = computed(() => {
  if (isAddingBook.value) {
    return {
      callback: async () => {
        if (title.value !== '' && author.value !== '') {
          await addBook({
            title: title.value,
            author: author.value,
            description: description.value
          })
          title.value = ''
          author.value = ''
          description.value = ''
        } else {
          notify({
            text: '書名跟作者都需有值!',
            group: 'error'
          })
        }
      },
      text: '新增'
    }
  }

  if (isEditingBook.value && book) {
    return {
      callback: () => {
        if (title.value !== '' && author.value !== '') {
          patchBook(book.id, {
            title: title.value,
            author: author.value,
            description: description.value
          })
        } else {
          notify({
            text: '書名跟作者都需有值!',
            group: 'error'
          })
        }
      },
      text: '修改'
    }
  }
})

const leftBtn = computed(() => {
  if (isAddingBook.value) {
    return {
      callback: () => {
        setState('listing')
      },
      text: '取消'
    }
  }

  if (isEditingBook.value && book) {
    return {
      callback: () => {
        setState('showingDetail')
      },
      text: '取消'
    }
  }
})
onMounted(() => {
  if (isShowingDetail) {
    if (book) {
      title.value = book.title
      author.value = book.author
      description.value = book.description
    } else {
      notify({
        text: '沒有書籍資料!',
        group: 'error'
      })

      setState('listing')
    }
  }
})
</script>

<style scoped>
.input-style {
  @apply box-border w-full border border-slate-300 px-8 py-4 text-slate-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-slate-500;
}

.container-style {
  @apply relative mx-20 my-4 flex w-full;
}

.placeholder-style {
  @apply absolute left-4  text-slate-500;
}
</style>
