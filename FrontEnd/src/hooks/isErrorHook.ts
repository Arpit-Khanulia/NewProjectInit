import { useEffect } from "react"

// interface ErrorT{
//     status:number,
//     data:{
//         success:boolean,
//         message:string
//     }
// }
export const useIsError = (isError:boolean,error:any) =>{
    useEffect(()=>{

        if(isError) alert(error?.data.message);

    },[isError,error])   
}