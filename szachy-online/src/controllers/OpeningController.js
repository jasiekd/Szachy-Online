import OpeningService from "../services/OpeningService"
import React from "react";
export default function OpeningController({children})
{
    const gateway = new OpeningService();    
    const getOpenings = async() =>{
        const response = await gateway.getOpenings();

        if(response.status === 200)
        {
            return response.data;
        }
        else{
            return [];
        }
    }
    return React.cloneElement(children,{
        getOpenings
    })
}