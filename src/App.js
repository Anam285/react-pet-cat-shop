import cart from './components/cart'
import './App.css';
// import CatApi from './CatApi';
import {useState, useEffect} from 'react';

function App() {
  const [sibr, setSibr]= useState([])
  const [beng, setBeng]= useState([])




  
  useEffect(()=>{handleFetchSibr()

  },[])
  useEffect(()=>{handleFetchBeng()

  },[])

 


  const handleFetchBeng =async()=>{
    let newdata=[]

    let response =  await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=beng&limit=4"

    ); 
    newdata = await response.json();
    setBeng(newdata)
  
  
  }
  const handleFetchSibr =async()=>{
    let newdata=[]

    let response =  await fetch("https://api.thecatapi.com/v1/images/search?breed_ids=sibe&limit=4"

    ); 
    newdata = await response.json();
    setSibr(newdata)
  
  
  }


  












  return (
    <div className="App">
      <h1>Pet Shop</h1>
    
      
      <Catdesc data={sibr}/>
      
        <CatInfo data={sibr}/>
        <button onClick={handleFetchSibr}>More Siberian</button>
     

      
      <Catdesc data={beng}/>
      
        <CatInfo data={beng}/>
        <button onClick={handleFetchBeng}>More BengalCats</button>
      
       
       

      
      
     
     


     
     
     
    </div>
  );
}

const CatInfo =(props)=>{
  return (
     <div className="wrapper">
      
      <CatImg data={props.data} />
      
      
    </div>
  )
}
const Detail =(props)=>{
  return(
    <>

    <div className="wrapperCat">
      <img src={props.imgSrc} alt="cant access image"/>
      
      {props.breed}
    
    </div>
    </>

  )

}
const Catdesc=(props)=>{
  let disc=props.data[0]
  console.log(disc)
  return(
      <p>
      {disc.breeds[0].description}
      </p>)
}






const CatImg =(props) => {
  return(

    props.data.map((item,index)=>{
      return (
        <Detail 

          imgSrc={item.url}
          key = {index}
          breed= {item.breeds[0].name}
          
          
          />


      )

    })



  )
}











export default App;
