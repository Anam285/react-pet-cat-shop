// import cart from './components/cart'
import './App.css';
// import CatApi from './CatApi';
import {useState, useEffect} from 'react';
import faker from "faker"
import Header from './components/Header'
// import Cart from './components/Cart'

function App() {
  const [sibr, setSibr]= useState([])
  const [beng, setBeng]= useState([])
  const [basket, setBasket] = useState([])
  const [total,setTotal]= useState(0)
  // const [basketTotal,setBasketTotal] = useState(0)
  

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
      item.price = parseInt(faker.commerce.price(),10)
    }

    setBeng(newData)
  
  }

  const handleFetchSibr = async () => {
    let newData = []

    let response =  await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=sibe&limit=4"); 
    newData = await response.json();
    for (let i = 0; i < newData.length; i++) {
      const item = newData[i];
      item.price = parseInt(faker.commerce.price(),10)
      console.log(typeof(item.price))
      console.log(item.price)
    }



    setSibr(newData)
  
  }

  const handleDelete=(item)=>{
    
    let newBasket = [...basket];
    let productIndex = newBasket.indexOf(item)
    newBasket.splice(productIndex, 1);
    setBasket(newBasket);
    let itemPrice=item.price;
    setTotal(total-itemPrice)

  }

  const handleAdd = (item) => {
    setBasket([...basket, item])
    let itemPrice=item.price;
    setTotal(total+itemPrice)

  }

  return (
    <div className="App">
      {beng.length > 0 && sibr.length > 0 ? 
        <>
          <Header/>
          <div className="pagewrapper">
           
            <div>
              <div className="wrapperBeng">
                <Catdesc data={sibr}/>
                <CatInfo data={sibr} handleAdd={handleAdd}/>
                <button onClick={handleFetchSibr}>More Siberian</button>
              </div>
              <div className="wrapperBeng">
                <Catdesc data={beng}/>
                <CatInfo data={beng} handleAdd={handleAdd}/>
                <button onClick={handleFetchBeng}>More BengalCats</button>
                </div>
            </div>
            <div className="cart">
              <Cart basket={basket} handleDel={handleDelete}/>
              <BasketTotal total={total}/>
            </div>
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
    props.data.map((item)=>{
      return (
        <Detail 
          imgSrc={item.url}
          key = {item.id}
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
        <button onClick={props.handleAdd}>add to cart</button>
      </div>
    </>
  )
}
const BasketTotal = (props) => {
  return (
  <h4>Total = {props.total}</h4>)
}

const ShopListItem = (props) => {
  return (
      <ul>
        <li className="cart-item">
          <img className="basketImg" src={props.imgsrc} alt="cat" />
          <h4>Price: {props.price}</h4>
          <button onClick={props.handleDelete}>Del</button>

        </li>
      </ul>)
}
const Cart = (props) => {

  return (  
    <>
    {props.basket.length > 0 ?     
        props.basket.map((item) => {
          return (
                <ShopListItem
                    
                    key={item.id}
                    imgsrc={item.url}
                    price={item.price}
                    handleDelete={() => props.handleDel(item)}/>

          )})
      :
      <p>Nothing in your basket</p>}
      
    
      </>
 
  )
  
}





export default App;
