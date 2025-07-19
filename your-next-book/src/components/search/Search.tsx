import "./Search.css"
const Search = ()=> {
    return <>
        <div className="search-container">
              <input placeholder="Lord of the rings" className="main-input" type="text"/>
              <button className="search-btn">Search</button>
        </div>
    </>
}

export default Search