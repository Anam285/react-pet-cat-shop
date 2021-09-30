
const CatApi =async()=>{

    let response =  await fetch("https://api.thecatapi.com/v1/images/search"

    ); 
    let data = await response.json();
    // setData(data)
    return(
      <image src={data.url}/>
     
    )
  
  }
  export default CatApi;

