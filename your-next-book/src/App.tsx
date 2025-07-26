import Header from './components/header/Header'
import Search from './components/search/Search'
import Loading from './components/loading/Loading'
import './App.css'
import Books from './components/books/Books'
import type { book, bookState } from './types'
import {  useSelector } from "react-redux";



function App() {
  const books = useSelector((state: bookState) => state.booksReducer.books);


  return (
    <div className="container">
          < Header />
          < Search />
          < Loading />
          < Books books={books}/>
    </div>
  
  )
}

export default App
