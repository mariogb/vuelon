
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

const crudBackEnd = ():string =>{
    const ce0: string | null = localStorage.getItem("CRUD_BACKEND")
    if (ce0 === null) {
        return 'crud'
    }
    return ce0;
}

const putCrudBackEnd = (h:string):void =>{
    localStorage.setItem("CRUD_BACKEND",h)
}


const putBackEnd = (h:string):void =>{
    localStorage.setItem("BACKEND",h)
}
const hws0 = ():boolean =>{
    return localStorage.getItem("HTTPSCHEMA")==="true";
}
const httpSchema = ():string =>{        
    return hws0()===true ? "http" : "https";
}
const wsSchema = ():string =>{
    return hws0()===true ? "ws" : "wss";
}  

const setHttpSchema=(v:boolean):void =>{
    localStorage.setItem("HTTPSCHEMA",v+"")
}

function ULibLon(){
    //localStorage.setItem("HTTPSCHEMA","true");
    return{
        backEnd,httpSchema,wsSchema,buildHeaders,setHttpSchema,putBackEnd,
        crudBackEnd,putCrudBackEnd
    }
}

export const uLibLon = ULibLon()

