import cart from './components/cart'
import './App.css';
// import CatApi from './CatApi';
import {useState, useEffect} from 'react';
import { commerce } from "faker"

function App() {
  const [sibr, setSibr]= useState([])
  const [beng, setBeng]= useState([])
  const [basket, setBasket] = useState([])

  useEffect(()=>{
    handleFetchSibr()
  },[])

  useEffect(()=>{
    handleFetchBeng()
  },[])

  const handleFetchBeng = async () => {
    let newData = []

    let response =  await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=beng&limit=4"); 
    newData = await response.json();
    
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      item.price = commerce.price()
    }

    setBeng(newData)
  
  }

  const handleFetchSibr = async () => {
    let newData = []

    let response =  await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=sibe&limit=4"); 
    newData = await response.json();
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      item.price = commerce.price()
    }
    setSibr(newData)
  
  }

  const handleAdd = (item) => {
    setBasket([...basket, item])
  }

  return (
    <div className="App">
      {beng.length > 0 && sibr.length > 0 ? 
        <>
          <h1>Pet Shop</h1>
          <div className="wrapperBeng">
            <Catdesc data={sibr}/>
            <CatInfo data={sibr} handleAdd={handleAdd} />
            <button onClick={handleFetchSibr}>More Siberian</button>
          </div>
          <div className="wrapperBeng">
            <Catdesc data={beng}/>
            <CatInfo data={beng} handleAdd={handleAdd} />
            <button onClick={handleFetchBeng}>More BengalCats</button>
          </div>
        </>
      :
        <h3>Loading...</h3>
      }
      
    </div>
  );
}

const CatInfo = (props) => {
  return (
     <div className="wrapper">
      <CatImg data={props.data} handleAdd={props.handleAdd}/>
      
    </div>
  )
}

const Catdesc = (props) => {
  console.log(props.data)
  return (
      <p>
        {props.data[0].breeds[0].description}
      </p>
  )
}


const CatImg =(props) => {
  return(
    props.data.map((item,index)=>{
      return (
        <Detail 
          imgSrc={item.url}
          key = {index}
          breed= {item.breeds[0].name}
          price= {item.price}
          handleAdd={() => props.handleAdd(item)}
        />
      )
    })
  )
}

const Detail = (props) => {
  return (
    <>
      <div className="wrapperCat">
        <img src={props.imgSrc} alt="cant access image"/>
        {/* {props.breed} */}
        <h4>Price: £{props.price}</h4>
        <button onClick={props.handleAdd}>Add to cart</button>
      </div>
    </>
  )
}







export default App;
