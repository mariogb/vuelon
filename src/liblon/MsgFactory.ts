
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
    contractOut:{
     dcMsg:"contractOut"
, lDcMsg:"contractOuts"
,pkey:"pkey"
,pname:"pname"
,departamentBaseTimePeriod:"departamentBaseTimePeriod"
,thirdPerson:"thirdPerson"         
    }  ,
    contractIn:{
     dcMsg:"contractIn"
, lDcMsg:"contractIns"
,pkey:"pkey"
,pname:"pname"
,programBaseTimePeriod:"programBaseTimePeriod"
,thirdPerson:"thirdPerson"         
    }  ,
    comercialDocumentTypeOut:{
     dcMsg:"comercialDocumentTypeOut"
, lDcMsg:"comercialDocumentTypeOuts"
,pkey:"pkey"
,afectStock:"afectStock"
,pname:"pname"
,         
    }  ,
    comercialDocumentTypeIn:{
     dcMsg:"comercialDocumentTypeIn"
, lDcMsg:"comercialDocumentTypeIns"
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
,paymentOutForm:"paymentOutForm"
,comercialDocumentOut:"comercialDocumentOut"         
    }  ,
    paymentIn:{
     dcMsg:"paymentIn"
, lDcMsg:"paymentIns"
,pkey:"pkey"
,paymentInForm:"paymentInForm"
,comercialDocumentIn:"comercialDocumentIn"         
    }  ,
    comercialDocumentOut:{
     dcMsg:"comercialDocumentOut"
, lDcMsg:"comercialDocumentOuts"
,pkey:"pkey"
,createdDate:"createdDate"
,documentDate:"documentDate"
,folio:"folio"
,pname:"pname"
,status:"status"
,supplyDate:"supplyDate"
,contract:"contract"
,userAutor:"userAutor"
,comercialDocumentType:"comercialDocumentType"         
    }  ,
    comercialDocumentIn:{
     dcMsg:"comercialDocumentIn"
, lDcMsg:"comercialDocumentIns"
,pkey:"pkey"
,createdDate:"createdDate"
,documentDate:"documentDate"
,folio:"folio"
,pname:"pname"
,status:"status"
,supplyDate:"supplyDate"
,contract:"contract"
,userAutor:"userAutor"
,comercialDocumentType:"comercialDocumentType"         
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
,sku:"sku"
,productType:"productType"         
    }  ,
    invoiceLineIn:{
     dcMsg:"invoiceLineIn"
, lDcMsg:"invoiceLineIns"
,pkey:"pkey"
,askQuantity:"askQuantity"
,createdDate:"createdDate"
,descount:"descount"
,invoiceDate:"invoiceDate"
,orden:"orden"
,status:"status"
,supplyDate:"supplyDate"
,supplyQuantity:"supplyQuantity"
,taxPorcent:"taxPorcent"
,total:"total"
,totalCost:"totalCost"
,unitCost:"unitCost"
,comercialDocument:"comercialDocument"
,product:"product"
,stockRackProduct:"stockRackProduct"         
    }  ,
    invoiceLineOut:{
     dcMsg:"invoiceLineOut"
, lDcMsg:"invoiceLineOuts"
,pkey:"pkey"
,askQuantity:"askQuantity"
,createdDate:"createdDate"
,descount:"descount"
,invoiceDate:"invoiceDate"
,orden:"orden"
,status:"status"
,supplyDate:"supplyDate"
,supplyQuantity:"supplyQuantity"
,taxPorcent:"taxPorcent"
,total:"total"
,totalCost:"totalCost"
,unitCost:"unitCost"
,comercialDocument:"comercialDocument"
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
,contract:"contract"
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
    