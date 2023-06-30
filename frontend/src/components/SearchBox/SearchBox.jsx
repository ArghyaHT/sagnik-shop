import React,{useState} from 'react'
import "./SearchBox.css"
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
      e.preventDefault();
      const trimmedKeyword = keyword.replace(/\s+/g, '').trim();
      if(trimmedKeyword){
        navigate(`/search/${trimmedKeyword}`);
        setKeyword("");
      } else {
        navigate('/');
      }
    }
  

  return (
   <>
   <div className='search-box'>
    <input 
    type="text"
    placeholder='Search'
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    />
    <button onClick={searchHandler}>Search</button>
   </div>
   </>
  )
}

export default SearchBox