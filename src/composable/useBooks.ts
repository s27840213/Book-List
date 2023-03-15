import type { BooksMap, IBook } from '@/interface'
import { notify } from '@kyvg/vue3-notification'
import { computed, reactive } from 'vue'
import { useRoute } from 'vue-router'

/**
 * @description: they will be shared across all components, so we put out of the functions
 */
const books: Array<IBook> = reactive([])
const booksMap: BooksMap = new Map()

function generateRandomNumber() {
  return Math.floor(Math.random() * 999) + 1
}

const useBooks = () => {
  const route = useRoute()
  const BASE_URL = 'https://fe-interview-api.unnotech.com/books/'

  const activeBookId = computed((): string => {
    return route.params.bookId as string
  })

  const fetchJson = async (url: string, options: RequestInit = {}) => {
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error(await response.text())
    }
    return response.json()
  }

  const listBooks = async (id?: string) => {
    try {
      const data = await fetchJson(`${BASE_URL}${id ?? ''}`)
      // if id is not provided, it means we are fetching all books
      if (!id) {
        Object.assign(books, data)
        books.forEach((book, index) => {
          booksMap.set(`${book.id}`, { ...book, index })
        })
      }

      return data
    } catch (error) {
      notify({
        group: 'error',
        text: '取得書本失敗'
      })
      console.error(error)
    }
  }

  const patchBook = async (
    id: string | number,
    { author = '', title = '', description = '' }
  ) => {
    try {
      const data = await fetchJson(`${BASE_URL}${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          author,
          title,
          description
        })
      })

      const targetIndex = booksMap.get(`${data.id}`)?.index
      books[targetIndex!] = data
      booksMap.set(`${data.id}`, { ...data, index: targetIndex })
      notify({
        group: 'success',
        text: '更新成功'
      })
    } catch (error) {
      console.error(error)
      notify({
        group: 'error',
        text: '更新失敗'
      })
    }
  }

  const addBook = async ({ author = '', title = '', description = '' }) => {
    try {
      let id = generateRandomNumber()
      while (booksMap.has(`${id}`)) {
        id = generateRandomNumber()
      }
      const data = await fetchJson(BASE_URL, {
        method: 'POST',
        body: JSON.stringify({
          id: id,
          author,
          title,
          description
        })
      })

      books.push(data)
      booksMap.set(`${data.id}`, { ...data, index: books.length - 1 })

      notify({
        group: 'success',
        text: '加入新書成功'
      })
      return data
    } catch (error) {
      console.error(error)
      notify({
        group: 'error',
        text: '加入新書失敗'
      })
    }
  }

  const deleteBook = async (id: string | number) => {
    try {
      const data = await fetchJson(`${BASE_URL}${id}`, {
        method: 'DELETE'
      })

      notify({
        group: 'success',
        text: '刪除書本成功'
      })
      return data
    } catch (error) {
      console.error(error)
      notify({
        group: 'error',
        text: '刪除書本失敗'
      })
    }
  }

  return {
    books,
    activeBookId,
    listBooks,
    addBook,
    deleteBook,
    patchBook,
    booksMap
  }
}

export default useBooks
