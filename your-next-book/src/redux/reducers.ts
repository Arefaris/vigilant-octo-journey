import type { book } from "../types"

const initialState = {
    books: [] as book[]
}

export const booksReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_BOOKS":
            return { ...state, books: action.payload }
        case "CLEAR_BOOKS":
            return { ...state, books: [] }
        default:
            return state
    }
}