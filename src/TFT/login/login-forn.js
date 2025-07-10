import React, { useState } from 'react'
import './loginStyle.css'

export default function LoginForm() {
  const [pn, setPn] = useState("")
  const api_key = process.env.REACT_APP_RIOT_API

  return (
    <>
    <form className='search-wrapper'>
        <select className='search-select'>
            <option value="vn">VN</option>
            <option value="kr">KR</option>,
        </select>
        <div className='search-inputs'>
          <input type='text' placeholder='Tên in-game' className='search-input' onChange={(e) => setPn(e.target.value)}></input>
          <span className='tag-separator'> # </span>
          <input type='text' placeholder='TAG' className='search-input tag'></input>
        </div>
    </form>
    <p>{pn}</p>
    </>
  );
}
