import { useState } from "react";
import React from "react";
import { fetchReferee} from "../../axios";
// import styles from "./styles.module.css";

import { useEffect } from "react";
import RefereeList from "./RefereeList";

const AdminPanel = () => {
 
  const [referee, setReferee] = useState([]);
  const [filteredreferee, setfilteredreferee] = useState([]);
  const [searchtext, setSearchtext] = useState('');
  const [isSearch, setIsSearch] = useState(false);


  const handleSearch= (e)=>{
    e.preventDefault()
    
    let filtered;
    if (searchtext !=='') {
      setIsSearch(true)
      filtered = referee.filter(o => o.name.toLowerCase().includes(searchtext.toLowerCase()));
     
      setfilteredreferee(filtered)
    }
    

  }
  const handleResetSearch= (e)=>{
    e.preventDefault()
    setIsSearch(false)
setSearchtext('')
  }

  useEffect(()=>{
    fetchReferee().then(res=>{
      setReferee(res)
    })
  },[])

  return (
    <>
      <div className="container mt-5 mt-lg-1 referee-container">
        <h3 className="text-center text-white mt-4">Referee List</h3>
        <div className="col-md-12 ref-search">
        <div className="search-wrapper">
        <input type="text" placeholder="Search by name.." value={searchtext} onChange={(e)=>setSearchtext(e.target.value)} />
        <button onClick={handleSearch}>search</button>
        </div>
        <span className="reeset" onClick={handleResetSearch}>
          Reset Search
        </span>
        </div>
        <div className="">
<div className="row mt-4">

{isSearch?   <RefereeList referee={filteredreferee}/> :
  <RefereeList referee={referee}/>}


  
  
  
</div>
        </div>
      </div>
    </>
  )
};

export default AdminPanel
