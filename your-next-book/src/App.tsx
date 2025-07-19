import { useState } from 'react'
import Header from './components/header/Header'
import Search from './components/search/Search'
import Loading from './components/loading/Loading'

import './App.css'

function App() {

  return (
    <div className="container">
          < Header />
          < Search />
          < Loading />
          
     
    </div>
  
  )
}

export default App
