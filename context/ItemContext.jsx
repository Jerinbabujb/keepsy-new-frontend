import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";


export const ItemContext=createContext();
export const ItemProvider=({children})=>{

const {axios} =useContext(AuthContext);

    const sendItem=async(credentials)=>{
        try{
        const response = await axios.post("api/items/send",credentials);
        const data = response.data;
        if(data.success){
            toast.success(data.message);
            
        }

        else{
            toast.error(data.message);
        }
    }
    catch(error)
    {
        toast.error(error.message);
       
    }

    }

        const recieveItem=async(code)=>{
        try{
        const response = await axios.post("api/items/recieve",{code});
        const data = response.data;
        if(data.success){
            toast.success(data.message);
            return data.findItem?.[0];
        }
        
        else{
            toast.error(data.message);
        }
    }
    catch(error)
    {
        toast.error(error.message);
       
    }

    }

    const value={
        sendItem,
        recieveItem
    }
    return(
    <ItemContext.Provider value={value}>
        {children}
    </ItemContext.Provider>
    )
}