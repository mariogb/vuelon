
    const messages = {
        
    userLon:{
     dcMsg:"Usuario"
, lDcMsg:"Usuarios"
,pkey:"pkey"
,email:"Correo"
,enabled:"Activa"
,password:"Contraseña"
,pname:"Nombre"
,typeLon:"Tipo usuario"
,username:"Clave de usuario"
,         
    }  ,
    role:{
     dcMsg:"role"
, lDcMsg:"roles"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    userRole:{
     dcMsg:"userRole"
, lDcMsg:"userRoles"
,pkey:"pkey"
,userLon:"userLon"
,role:"role"         
    }  ,
    userThirdPerson:{
     dcMsg:"userThirdPerson"
, lDcMsg:"userThirdPersons"
,pkey:"pkey"
,userLon:"userLon"
,thirdPerson:"thirdPerson"         
    }  ,
    thirdPerson:{
     dcMsg:"Tercero"
, lDcMsg:"Terceros"
,pkey:"pkey"
,pname:"pname"
,rfc:"rfc"
,tipo:"tipo"
,         
    }  ,
    entityPermisionRole:{
     dcMsg:"entityPermisionRole"
, lDcMsg:"entityPermisionRoles"
,pkey:"pkey"
,enabled:"enabled"
,nombre:"nombre"
,permission:"permission"
,role:"role"         
    }  ,
    base:{
     dcMsg:"Sede"
, lDcMsg:"Sedes"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    timePeriod:{
     dcMsg:"timePeriod"
, lDcMsg:"timePeriods"
,pkey:"pkey"
,beginDate:"beginDate"
,endDate:"endDate"
,pname:"pname"
,typeLon:"typeLon"
,         
    }  ,
    baseTimePeriod:{
     dcMsg:"baseTimePeriod"
, lDcMsg:"baseTimePeriods"
,pkey:"pkey"
,base:"base"
,timePeriod:"timePeriod"         
    }  ,
    workSpaceGroup:{
     dcMsg:"workSpaceGroup"
, lDcMsg:"workSpaceGroups"
,pkey:"pkey"
,pname:"pname"
,typeLon:"typeLon"
,base:"base"         
    }  ,
    workSpace:{
     dcMsg:"workSpace"
, lDcMsg:"workSpaces"
,pkey:"pkey"
,capacity:"capacity"
,pname:"pname"
,type:"type"
,workSpaceGroup:"workSpaceGroup"         
    }  ,
    departament:{
     dcMsg:"departament"
, lDcMsg:"departaments"
,pkey:"pkey"
,description:"description"
,fastKey:"fastKey"
,pname:"pname"
,         
    }  ,
    departamentJob:{
     dcMsg:"departamentJob"
, lDcMsg:"departamentJobs"
,pkey:"pkey"
,description:"description"
,fastKey:"fastKey"
,nhoras:"nhoras"
,pname:"pname"
,departament:"departament"         
    }  ,
    departamentJobInstance:{
     dcMsg:"departamentJobInstance"
, lDcMsg:"departamentJobInstances"
,pkey:"pkey"
,description:"description"
,nhoras:"nhoras"
,pname:"pname"
,departamentJob:"departamentJob"
,departamentBaseTimePeriod:"departamentBaseTimePeriod"         
    }  ,
    program:{
     dcMsg:"program"
, lDcMsg:"programs"
,pkey:"pkey"
,description:"description"
,fastKey:"fastKey"
,pname:"pname"
,         
    }  ,
    programJob:{
     dcMsg:"programJob"
, lDcMsg:"programJobs"
,pkey:"pkey"
,description:"description"
,fastKey:"fastKey"
,nhoras:"nhoras"
,pname:"pname"
,program:"program"
,departamentJob:"departamentJob"         
    }  ,
    departamentUserLon:{
     dcMsg:"departamentUserLon"
, lDcMsg:"departamentUserLons"
,pkey:"pkey"
,departament:"departament"
,userLon:"userLon"         
    }  ,
    programUserLon:{
     dcMsg:"programUserLon"
, lDcMsg:"programUserLons"
,pkey:"pkey"
,program:"program"
,userLon:"userLon"         
    }  ,
    baseUserLon:{
     dcMsg:"baseUserLon"
, lDcMsg:"baseUserLons"
,pkey:"pkey"
,base:"base"
,userLon:"userLon"         
    }  ,
    departamentBaseTimePeriod:{
     dcMsg:"departamentBaseTimePeriod"
, lDcMsg:"departamentBaseTimePeriods"
,pkey:"pkey"
,baseTimePeriod:"baseTimePeriod"
,departament:"departament"         
    }  ,
    programBaseTimePeriod:{
     dcMsg:"programBaseTimePeriod"
, lDcMsg:"programBaseTimePeriods"
,pkey:"pkey"
,baseTimePeriod:"baseTimePeriod"
,program:"program"         
    }  ,
    purchaseContract:{
     dcMsg:"purchaseContract"
, lDcMsg:"purchaseContracts"
,pkey:"pkey"
,pname:"pname"
,departamentBaseTimePeriod:"departamentBaseTimePeriod"
,thirdPerson:"thirdPerson"         
    }  ,
    saleContract:{
     dcMsg:"saleContract"
, lDcMsg:"saleContracts"
,pkey:"pkey"
,pname:"pname"
,programBaseTimePeriod:"programBaseTimePeriod"
,thirdPerson:"thirdPerson"         
    }  ,
    saleType:{
     dcMsg:"saleType"
, lDcMsg:"saleTypes"
,pkey:"pkey"
,afectStock:"afectStock"
,pname:"pname"
,         
    }  ,
    purchaseType:{
     dcMsg:"purchaseType"
, lDcMsg:"purchaseTypes"
,pkey:"pkey"
,afectStock:"afectStock"
,pname:"pname"
,         
    }  ,
    monetaryAccount:{
     dcMsg:"monetaryAccount"
, lDcMsg:"monetaryAccounts"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    paymentOutType:{
     dcMsg:"paymentOutType"
, lDcMsg:"paymentOutTypes"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    paymentInType:{
     dcMsg:"paymentInType"
, lDcMsg:"paymentInTypes"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    paymentOutForm:{
     dcMsg:"paymentOutForm"
, lDcMsg:"paymentOutForms"
,pkey:"pkey"
,monetaryAccount:"monetaryAccount"
,paymentOutType:"paymentOutType"         
    }  ,
    paymentInForm:{
     dcMsg:"paymentInForm"
, lDcMsg:"paymentInForms"
,pkey:"pkey"
,monetaryAccount:"monetaryAccount"
,paymentInType:"paymentInType"         
    }  ,
    paymentOut:{
     dcMsg:"paymentOut"
, lDcMsg:"paymentOuts"
,pkey:"pkey"
,quantity:"quantity"
,paymentOutForm:"paymentOutForm"
,purchase:"purchase"
,outAccount:"outAccount"         
    }  ,
    paymentIn:{
     dcMsg:"paymentIn"
, lDcMsg:"paymentIns"
,pkey:"pkey"
,quantity:"quantity"
,paymentInForm:"paymentInForm"
,sale:"sale"
,inAccount:"inAccount"         
    }  ,
    purchase:{
     dcMsg:"purchase"
, lDcMsg:"purchases"
,pkey:"pkey"
,createdDate:"createdDate"
,documentDate:"documentDate"
,folio:"folio"
,pname:"pname"
,status:"status"
,supplyDate:"supplyDate"
,purchaseContract:"purchaseContract"
,userAutor:"userAutor"
,purchaseType:"purchaseType"         
    }  ,
    sale:{
     dcMsg:"sale"
, lDcMsg:"sales"
,pkey:"pkey"
,createdDate:"createdDate"
,documentDate:"documentDate"
,folio:"folio"
,pname:"pname"
,status:"status"
,supplyDate:"supplyDate"
,saleContract:"saleContract"
,userAutor:"userAutor"
,saleType:"saleType"         
    }  ,
    productType:{
     dcMsg:"productType"
, lDcMsg:"productTypes"
,pkey:"pkey"
,afectStock:"afectStock"
,description:"description"
,fastKey:"fastKey"
,isService:"isService"
,pname:"pname"
,taxable:"taxable"
,withSerialNumber:"withSerialNumber"
,         
    }  ,
    stockRack:{
     dcMsg:"stockRack"
, lDcMsg:"stockRacks"
,pkey:"pkey"
,fastKey:"fastKey"
,pname:"pname"
,workSpace:"workSpace"         
    }  ,
    stockRackProduct:{
     dcMsg:"stockRackProduct"
, lDcMsg:"stockRackProducts"
,pkey:"pkey"
,pname:"pname"
,quantity:"quantity"
,serialNumber:"serialNumber"
,stockRack:"stockRack"
,product:"product"         
    }  ,
    product:{
     dcMsg:"product"
, lDcMsg:"products"
,pkey:"pkey"
,description:"description"
,fastKey:"fastKey"
,pname:"pname"
,price:"price"
,sku:"sku"
,taxPorcent:"taxPorcent"
,productType:"productType"         
    }  ,
    invoiceLineIn:{
     dcMsg:"invoiceLineIn"
, lDcMsg:"invoiceLineIns"
,pkey:"pkey"
,askDate:"askDate"
,askQuantity:"askQuantity"
,createdDate:"createdDate"
,descountPorcent:"descountPorcent"
,orden:"orden"
,price:"price"
,status:"status"
,supplyDate:"supplyDate"
,supplyQuantity:"supplyQuantity"
,taxPorcent:"taxPorcent"
,purchase:"purchase"
,product:"product"
,stockRackProduct:"stockRackProduct"         
    }  ,
    invoiceLineOut:{
     dcMsg:"invoiceLineOut"
, lDcMsg:"invoiceLineOuts"
,pkey:"pkey"
,askDate:"askDate"
,askQuantity:"askQuantity"
,createdDate:"createdDate"
,descountPorcent:"descountPorcent"
,orden:"orden"
,price:"price"
,status:"status"
,supplyDate:"supplyDate"
,supplyQuantity:"supplyQuantity"
,taxPorcent:"taxPorcent"
,sale:"sale"
,product:"product"
,stockRackProduct:"stockRackProduct"         
    }  ,
    appointment:{
     dcMsg:"appointment"
, lDcMsg:"appointments"
,pkey:"pkey"
,endHour:"endHour"
,endMinute:"endMinute"
,pname:"pname"
,startHour:"startHour"
,startMinute:"startMinute"
,weekDay:"weekDay"
,purchaseContract:"purchaseContract"
,workSpace:"workSpace"
,departamentJobInstance:"departamentJobInstance"         
    }  ,
    account:{
     dcMsg:"account"
, lDcMsg:"accounts"
,pkey:"pkey"
,description:"description"
,pname:"pname"
,type:"type"
,         
    }  ,
    airport:{
     dcMsg:"airport"
, lDcMsg:"airports"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    fligth:{
     dcMsg:"fligth"
, lDcMsg:"fligths"
,pkey:"pkey"
,pname:"pname"
,fromAirport:"fromAirport"
,toAirport:"toAirport"
,plane:"plane"         
    }  ,
    fligthInstance:{
     dcMsg:"fligthInstance"
, lDcMsg:"fligthInstances"
,pkey:"pkey"
,inLocalDateTime:"inLocalDateTime"
,outLocalDateTime:"outLocalDateTime"
,pname:"pname"
,theFligth:"theFligth"         
    }  ,
    airCompany:{
     dcMsg:"airCompany"
, lDcMsg:"airCompanys"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    plane:{
     dcMsg:"plane"
, lDcMsg:"planes"
,pkey:"pkey"
,plate:"plate"
,pname:"pname"
,seats:"seats"
,laCompania:"laCompania"         
    }  ,
    meUsrInterface:{
     dcMsg:"meUsrInterface"
, lDcMsg:"meUsrInterfaces"
,pkey:"pkey"
,dc:"dc"
,label:"label"
,level:"level"
,         
    }  ,
    formLon:{
     dcMsg:"formLon"
, lDcMsg:"formLons"
,pkey:"pkey"
,pname:"pname"
,         
    }  ,
    formLonField:{
     dcMsg:"formLonField"
, lDcMsg:"formLonFields"
,pkey:"pkey"
,pname:"pname"
,formLon:"formLon"         
    }  ,
    alumno:{
     dcMsg:"alumno"
, lDcMsg:"alumnos"
,pkey:"pkey"
,activo:"activo"
,pname:"pname"
,primer_apellido:"primer_apellido"
,segundo_apellido:"segundo_apellido"
,         
    }  ,
    materia:{
     dcMsg:"materia"
, lDcMsg:"materias"
,pkey:"pkey"
,activo:"activo"
,pname:"pname"
,         
    }  ,
    calificacion:{
     dcMsg:"calificacion"
, lDcMsg:"calificacions"
,pkey:"pkey"
,calificacion:"calificacion"
,fecha:"fecha"
,alumno:"alumno"
,materia:"materia"         
    }  
    }
    export default function () {
        const msgUIs = (k: string) => {
            const v: string = messages[k]
            if (!v) {
                return k;
            }
            return v;
        }
        return {
            msgUIs
        }
    }
    