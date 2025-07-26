import type { book } from "../types/index";
const PRODUCTION = import.meta.env.VITE_PRODUCTION

export const serverResponse = async(title: string)=>{ 
  const response = await fetch(PRODUCTION === "production" ? "https://your-next-book-server.onrender.com/api" : "http://localhost:3000/api", {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({title: title})
  })
  
  const data = await response.json()
  return data
}

export const getBooks = async(booksArr: {title: string, description: string}[]): Promise<book[]> =>{
    const books: book[] = []
    
        for (const book of booksArr){
            const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(book.title)}&fields=title,author_name,cover_i,key,&lang=ene&limit=10`)

            if (response.status != 200){
                throw new Error(`Something went wrong with api request. Status code ${response.status}`)
                }

            const data = await response.json()

            
            const b: book = {
            author_name: data.docs[0].author_name,
            img_url: data.docs[0].cover_i ? `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg` : "no-image.png",
            open_library_url: `https://openlibrary.org${data.docs[0].key}`,
            title: data.docs[0].title,
            description: book.description
        }

        books.push(b)

        }
        return books

}

