import { useEffect } from "react"

export const useIsSuccess = (isSuccess:boolean,data:{data:object,message:string,success:boolean}|undefined) =>{
    useEffect(()=>{
        if(isSuccess) alert(data?.message);

    },[isSuccess,data])   
}