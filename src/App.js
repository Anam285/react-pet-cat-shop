
import './App.css';
// import CatApi from './CatApi';
import {useState, useEffect} from 'react';
const faker = require('faker')

function App() {
  const [sibr, setSibr]= useState([])
  const [beng, setBeng]= useState([])

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
      item.price = faker.commerce.price()
    }

    setBeng(newData)
  
  }

  const handleFetchSibr = async () => {
    let newData = []

    let response =  await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=sibe&limit=4"); 
    newData = await response.json();
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      item.price = faker.commerce.price()
    }



    setSibr(newData)
  
  }

  return (
    <div className="App">
      {beng.length > 0 && sibr.length > 0 ? 
        <>
          <h1>Pet Shop</h1>
          <div className="wrapperBeng">
            <Catdesc data={sibr}/>
            <CatInfo data={sibr}/>
            <button onClick={handleFetchSibr}>More Siberian</button>
          </div>
          <div className="wrapperBeng">
            <Catdesc data={beng}/>
            <CatInfo data={beng}/>
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
      <CatImg data={props.data} />
      
    </div>
  )
}
const Detail = (props) => {
  return (
    <>
      <div className="wrapperCat">
        <img src={props.imgSrc} alt="cant access image"/>
        {/* {props.breed} */}
        <h4>Price: £{props.price}</h4>
      </div>
    </>
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

        />
      )
    })
  )
}











export default App;
