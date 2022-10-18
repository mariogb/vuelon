
interface ThirdPerson{
    id?:number,
    pkey?: string,
    pname?: string
}

interface ContractIn{
    id?:number,
    pkey?: string,
    pname?: string,
    thirdPerson?:ThirdPerson
}


interface DocumentIn{
    id?:number,
    pkey?: string,
    pname?: string,    
    email?: string,
    d?: Date,
    contractIn:ContractIn    
}








