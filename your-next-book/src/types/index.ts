export interface book {
    author_name: string[],
    img_url: string,
    open_library_url: string,
    title: string,
    description: string
}

export interface bookState {
    booksReducer: {
      books: book[]
    }
}