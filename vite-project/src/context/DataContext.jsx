import { useState } from "react";
import { createContext , useContext} from "react";
import axios from "axios";

export const DataContext = createContext(null);
 
export const DataProvider =({children})=>{
    const [data, setData]=useState()
     
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get("https://fakestoreapi.com/products")
          
      
        //   console.log(res);
           const productsData = res.data;
           setData(productsData)
           
        } catch (error) {
            console.log(error);

        }
    }


    return <DataContext.Provider value={{data,setData , fetchAllProducts}}>
        {children}
    </DataContext.Provider>
   
} 


export const getData = ()=> useContext(DataContext)