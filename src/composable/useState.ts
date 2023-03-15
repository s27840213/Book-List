import type { CurrentState } from '@/interface'
import { computed, Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

/**
 * @description: they will be shared across all components, so we put out of the functions
 */
const currentState: Ref<CurrentState> = ref('listing')

const useBooks = () => {
  const route = useRoute()

  const isAddingBook = computed(() => {
    return currentState.value === 'adding'
  })

  const isEditingBook = computed(() => {
    return currentState.value === 'editing'
  })

  const isListingBooks = computed(() => {
    return currentState.value === 'listing'
  })

  const isShowingDetail = computed(() => {
    return currentState.value === 'showingDetail'
  })

  const setState = (state: CurrentState) => {
    currentState.value = state
  }

  return {
    currentState,
    isAddingBook,
    isEditingBook,
    isListingBooks,
    isShowingDetail,
    setState
  }
}

export default useBooks
