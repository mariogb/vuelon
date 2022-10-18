
const buildHeaders = (): object => {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        , 'Content-Type': 'application/json;charset=UTF-8'
    }
}

const backEnd = (): string => {
    const be0: string | null = localStorage.getItem("BACKEND")
    if (be0 === null) {
        return 'lonpe.com.mx'
    }
    return be0;
}

const putBackEnd = (h:string):void =>{
    localStorage.setItem("BACKEND",h)
}
const hws0 = ():boolean =>{
    return localStorage.getItem("HTTPSCHEMA")==="true";
}
const httpSchema = ():string =>{        
    return hws0()===true ? "https" : "http";
}
const wsSchema = ():string =>{
    return hws0()===true ? "wss" : "ws";
}  

const setHttpSchema=(v:boolean):void =>{
    localStorage.setItem("HTTPSCHEMA",v+"")
}

function ULibLon(){
    //localStorage.setItem("HTTPSCHEMA","true");
    return{
        backEnd,httpSchema,wsSchema,buildHeaders,setHttpSchema,putBackEnd
    }
}

export const uLibLon = ULibLon()

