import React from "react"
import TipService from "../services/TipService"

export default function TipController({children}){
    const gateway = new TipService();
    
    const getRandomTip = async()=>{
        const response = await gateway.getRandomTip();

        if(response.status === 200)
        {
            return response.data.description;
        }
        else
        {
            return "no data";
        }
    }

    return React.cloneElement(children,{
        getRandomTip
    })
}