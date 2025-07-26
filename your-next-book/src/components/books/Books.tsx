import "./Books.css"
import type { book } from "../../types"

const Books = ({ books }: { books: book[] })=> {
    return <>
        <div className="book-grid">
            {
                books.map(book => {
                    return <Book title={book.title} description={book.description} open_library_url={book.open_library_url} img_url={book.img_url} author_name={book.author_name}/>
            })
        }
        </div>  
    </>
}

export default  Books

const Book = ({title,  description, open_library_url, img_url, author_name}: book)=> {
    return <>
            <div className="book">
            <h3 className="title">{title}</h3>
            <h4 className="author">{author_name.join(", ")}</h4>
            <div className="img-container" style={{backgroundImage: `url(${img_url})`}}></div>
            <p className="description">{description}</p>
            <a href={open_library_url} target="_blank">See details</a>
        </div>
    </>
}


