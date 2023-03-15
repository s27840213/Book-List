export interface IBook {
  id: string | number
  author: string
  title: string
  description: string
  created_at?: string
  updated_at?: string
  image?: string
  v?: string
  w?: string
  h?: string
  index?: number
  thumbnail?: string
}

export type BooksMap = Map<string, IBook>

export type CurrentState = 'listing' | 'showingDetail' | 'editing' | 'adding'
