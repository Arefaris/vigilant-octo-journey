import type { book } from "../types"

// Action types
export const SET_BOOKS = "SET_BOOKS"
export const CLEAR_BOOKS = "CLEAR_BOOKS"

// Action creators
export const setBooks = (books: book[]) => ({
    type: SET_BOOKS,
    payload: books
})

export const clearBooks = () => ({
    type: CLEAR_BOOKS
})