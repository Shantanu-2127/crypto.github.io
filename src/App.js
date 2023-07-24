import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import axios from 'axios';
import React, { useState} from 'react';

function App() {
  const [crypto, setCrypto]= useState('')
  const [img, setImg]= useState('')
  const [name, setName]= useState('')
  const [symbol, setSymbol]= useState('')
  const [link , setLink]= useState('')
  const [ind, setInd]=useState('')
  const [usd, setUsd]=useState('')
  const [desc, setDesc]= useState('')

  const handleKeypress = (e) =>{
    if(e.key === 'Enter')
       handleSearch();
  }

  const handleSearch = () =>{
    const url= "https://api.coingecko.com/api/v3/coins/" + crypto;
    axios.get(url)
    .then(res =>{
       console.log(res.data)
       setImg(res.data.image.large)
       setName(res.data.name)
       setSymbol(res.data.symbol)
       setLink(res.data.links.homepage[0])
       setInd("Indian price: ₹" + res.data.market_data.current_price.inr)
       setUsd("United States price: $" + res.data.market_data.current_price.usd)
       setDesc(JSON.stringify(res.data.description.en))

    }) 
    .catch(err => {console.log(err)})
  }

  function createMarkup(){
    return {__html: desc}
  }
  

  return (
    <div style={{backgroundColor: "crimson", minHeight: "100vh"}} className="App">
      <h1 className='bg-info p-4'>Crypocurrency Search</h1>
      <div className='d-flex justify-content-center'>
        <div className="col-md-4 mt-5">
          <input type='text' onKeyDown={handleKeypress} className='form-control' value={crypto} onChange={(e)=>{setCrypto(e.target.value)}} placeholder='Enter the cryptocurrency' required />
        </div>
      </div>
      <button onClick={handleSearch} className='btn btn-secondary px-5 mt-4'>Search</button>
      <div className='mt-5 container-fuild d-flex justify-content-center'>
        <div className='col-md-4 bg-success p-2 rounded'>
          <img src={img} width={150} alt='OOPs'/>
          <br />
          <h1 className="text-white">{name}</h1>
          <h2>{symbol}</h2>
          <h2><a className='text-white' href={link}>{link}</a></h2>
          <br />
          <h2>{ind}</h2>
          <h2>{usd}</h2>
        </div>
        <div className='text-white col-md-8 my-auto'>
           <div dangerouslySetInnerHTML={createMarkup()}>
             
           </div>
        </div>
      </div>
    </div>
  );
}

export default App;
