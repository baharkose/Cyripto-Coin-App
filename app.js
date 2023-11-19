//? MAIN.JS
console.log("***** main *****")
const searchInput = document.querySelector(".searchInput")

// https://api.coinranking.com/v2/search-suggestions?query=avax

const getCripto = async () =>{
    try {
       const response = await fetch(`https://api.coinranking.com/v2/search-suggestions) 
       if(!response.ok){
            throw new Error(`Sth went wrong: ${response.status}`)
       }
       const data = await response.json()
       console.log(data);
    
    } catch (error) {
        console.log(error)
    }
}


getCripto()