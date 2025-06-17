const userInput = document.querySelector(".main-input") as HTMLInputElement
const searchBtn = document.querySelector(".search-btn") as HTMLButtonElement
const bookGridEl = document.querySelector(".book-grid") as HTMLDivElement
const loadIcon = document.querySelector(".load-icon") as HTMLDivElement

interface book {
    author_name: string[],
    img_url: string,
    open_library_url: string,
    title: string,
    description: string
}

const serverResponse = async(title: string)=>{ 
  const response = await fetch("https://your-next-book-server.onrender.com/api", {
    method: "POST",
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({title: title})
  })
  
  const data = response.json()
  return data
}

searchBtn.addEventListener("click", async ()=>{
    try {
        const userQ: string = userInput.value
        if (userQ === "") throw new Error("bad value")
        loadIcon.style.display = "block"
        const response = await serverResponse(userQ)
        
        const bookObj = JSON.parse(response.output_text)
        
        const books = await getBooks(bookObj.books) 
        renderBooks(books)
        loadIcon.style.display = "none"
    }catch (e){
        console.log(e)
    }
    
})


const renderBooks = (books: book[])=>{
    bookGridEl.innerHTML = ""
    books.forEach(book => {
        const div = document.createElement("div") as HTMLDivElement
        const h3 = document.createElement("h3") as HTMLHeadingElement 
        const h4 = document.createElement("h4") as HTMLHeadingElement 
        const imgDiv = document.createElement("div") as HTMLDivElement
        const pEl = document.createElement("p") as HTMLParagraphElement
        const link = document.createElement("a") as HTMLAnchorElement

        div.classList.add("book")
        h3.classList.add("title")
        h4.classList.add("author")
        imgDiv.classList.add("img-container")
        pEl.classList.add("description")

        h3.textContent = book.title
        h4.textContent = book.author_name.join(", ")
        imgDiv.style.backgroundImage = `url(${book.img_url})`
        pEl.textContent = book.description
        link.textContent = "See details"
        link.href = book.open_library_url
        link.target = "_blank"
        div.append(h3, h4, imgDiv, pEl, link)
        bookGridEl.append(div)
    })
}

const getBooks = async(booksArr: {title: string, description: string}[]): Promise<book[]> =>{
    const books: book[] = []
    
        for (const book of booksArr){
            const response = await fetch(`https://openlibrary.org/search.json?q=${book.title}&fields=title,author_name,cover_i,key,&lang=ene&limit=10`)

            if (response.status != 200){
                throw new Error(`Something went wrong with api request. Status code ${response.status}`)
                }

            const data = await response.json()

            
            const b: book = {
            author_name: data.docs[0].author_name,
            img_url: data.docs[0].cover_i ? `https://covers.openlibrary.org/b/id/${data.docs[0].cover_i}-L.jpg` : "./no-image.png",
            open_library_url: `https://openlibrary.org${data.docs[0].key}`,
            title: data.docs[0].title,
            description: book.description
        }

        books.push(b)

        }
        return books

}



