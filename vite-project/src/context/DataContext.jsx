import { useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const DataContext = createContext(null);
 
export const DataProvider =({children})=>{
    const [data, setData]=useState()
     
    const fetchAllProducts = async () => {
        try {
            const res = await axios.get("https://fakestoreapi.com/products/category/electronics")
          
      
        //    console.log(res);
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






