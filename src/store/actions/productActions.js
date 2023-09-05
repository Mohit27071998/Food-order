import { productsError, productsFetched, productsLoading } from "../slices/productSlice"
import axios from "axios"


export const getProducts = ()=> async(dispatch)=>{
    dispatch(productsLoading())
    const url = 'https://food-order-62410-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json'
    try{
        const res = await axios.get(url) ;
        const data = res.data
        console.log(data);
         dispatch(productsFetched(data))
    }
   catch(error){
       dispatch(productsError("Error in fetching",error))
   } 
}