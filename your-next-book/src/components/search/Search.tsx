import "./Search.css"
import { useState } from 'react'
import { getBooks, serverResponse } from "../../api/fetchBooks"
import { useDispatch } from 'react-redux'
import { setBooks,  clearBooks} from '../../redux/actions'

const Search = ()=> {
    const [title, setTitle] = useState<string>("")
    const dispatch = useDispatch()

    const handleSearch = async () => {
            try {
                if(title){
                    dispatch(clearBooks())
                    const response = await serverResponse(title)
                    const bookObj = JSON.parse(response.output_text)
                    const books = await getBooks(bookObj.books)
                    dispatch(setBooks(books))
                }else {
                    ///TODO: some kinda warning

                } 

                // renderBooks(books)
                
            }catch (e){
                console.log(e)
            }

        }


    return <>
        <div className="search-container">
              <input placeholder="Lord of the rings" onChange={(e) => setTitle(e.target.value)} className="main-input" type="text"/>
              <button className="search-btn" onClick={handleSearch}>Search</button>
        </div>
        </>
}

export default Search