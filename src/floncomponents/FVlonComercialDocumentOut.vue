
<template lang="pug">
h2 TO Addd ComercialDocumentOut
div
  button ADD comercialDocumentOut
  button(v-on:click="load_comercialDocumentOut(1)") LIST
      
hr

.dc_p_container
  
  .dc_p.col-0
    h3 contracts
    div.resac
      .resacf1(v-if="ldco00_contract && ldco00_contract.l")
        div(v-for="(e0, i0) in ldco00_contract.l",:key="e0.id")
          span {{e0}}

      
      .ff
        label(for="pkey") pkey
        input(type="text", v-model="item_ac_contract['pkey']" ,autocomplete="off",placeholder="buscar",name="pkey",@input="updateAC_contract('pkey')",v-on:keyup.enter="select01()")

      .ff
        label(for="pname") pname
        input(type="text", v-model="item_ac_contract['pname']" ,autocomplete="off",placeholder="buscar",name="pname",@input="updateAC_contract('pname')",v-on:keyup.enter="select01()")

      
    .cont-dcp(v-if="m_dc_contract && m_dc_contract.l")
      .l-loop(v-for="e0 in m_dc_contract.l", :key="'contract_' + e0.id") 
         
        .f.pkey {{ e0.pkey }}
        .f.pname {{ e0.pname }}
        .f.departamentBaseTimePeriod_pkey {{ e0.departamentBaseTimePeriod_pkey }}    
        .f.thirdPerson_pkey {{ e0.thirdPerson_pkey }}    
        .f.thirdPerson_pname {{ e0.thirdPerson_pname }}    
        .f.baseTimePeriod_pkey {{ e0.baseTimePeriod_pkey }}    
        .f.departament_pkey {{ e0.departament_pkey }}    
        .f.departament_pname {{ e0.departament_pname }}    
        .f.base_pkey {{ e0.base_pkey }}    
        .f.base_pname {{ e0.base_pname }}    
        .f.timePeriod_pkey {{ e0.timePeriod_pkey }}    
        .f.timePeriod_pname {{ e0.timePeriod_pname }}    
        .f 
          button(v-on:click="put_contract(e0)") SET
        
  .dc_p.col-1
    h3 comercialDocumentTypes
    div.resac
      .resacf1(v-if="ldco00_comercialDocumentType && ldco00_comercialDocumentType.l")
        div(v-for="(e0, i0) in ldco00_comercialDocumentType.l",:key="e0.id")
          span {{e0}}

      
      .ff
        label(for="pkey") pkey
        input(type="text", v-model="item_ac_comercialDocumentType['pkey']" ,autocomplete="off",placeholder="buscar",name="pkey",@input="updateAC_comercialDocumentType('pkey')",v-on:keyup.enter="select01()")

      .ff
        label(for="pname") pname
        input(type="text", v-model="item_ac_comercialDocumentType['pname']" ,autocomplete="off",placeholder="buscar",name="pname",@input="updateAC_comercialDocumentType('pname')",v-on:keyup.enter="select01()")

      
    .cont-dcp(v-if="m_dc_comercialDocumentType && m_dc_comercialDocumentType.l")
      .l-loop(v-for="e0 in m_dc_comercialDocumentType.l", :key="'comercialDocumentType_' + e0.id") 
         
        .f.pkey {{ e0.pkey }}
        .f.afectStock {{ e0.afectStock }}
        .f.pname {{ e0.pname }}
        .f 
          button(v-on:click="put_comercialDocumentType(e0)") SET
        
    
.current-dc-0-item.item_comercialDocumentOut

  .el-item(v-if="item_comercialDocumentOut")
    .el-item-parents  
    
      .dcp.pp-0
        h4 contract
        .item_dc-p(v-if="item_contract && item_contract.id")
          
          .it-pkey 
            label pkey 
            span.pval {{ item_contract.pkey }}
          .it-pname 
            label pname 
            span.pval {{ item_contract.pname }}
          .it-departamentBaseTimePeriod
            label  departamentBaseTimePeriod
            span.pkey {{ item_contract.departamentBaseTimePeriod_pkey }}
            span.pc {{ item_contract.departamentBaseTimePeriod_pname }}    
          .it-thirdPerson
            label  thirdPerson
            span.pkey {{ item_contract.thirdPerson_pkey }}
            span.pc {{ item_contract.thirdPerson_pname }}         
          button(v-on:click="removeDC_contract()") X 
      .dcp.pp-1
        h4 comercialDocumentType
        .item_dc-p(v-if="item_comercialDocumentType && item_comercialDocumentType.id")
          
          .it-pkey 
            label pkey 
            span.pval {{ item_comercialDocumentType.pkey }}
          .it-afectStock 
            label afectStock 
            span.pval {{ item_comercialDocumentType.afectStock }}
          .it-pname 
            label pname 
            span.pval {{ item_comercialDocumentType.pname }}     
          button(v-on:click="removeDC_comercialDocumentType()") X 
    button.add(v-if="canAdd()" v-on:click="add_comercialDocumentOut()") AGREGAR 

  .oo-json {{item_comercialDocumentOut}}     


.l-dc-container
  .dc-0    
    h3.dc-h comercialDocumentOut
    template(v-if="m_dc_comercialDocumentOut && m_dc_comercialDocumentOut.l")
    FVPagination(v-bind:ldc="m_dc_comercialDocumentOut",v-on:setPage0="setPage0") 
    .l-loop(v-for="e0 in m_dc_comercialDocumentOut.l", :key="'cdo_' + e0.id") 
      .f.pkey {{ e0.pkey }}
      .f.pname {{ e0.pname }}     
      .f.thirdPerson_pname {{ e0.thirdPerson_pname }}
      .f.departament_pname {{ e0.departament_pname }}
      .f.baseTimePeriod_pkey {{ e0.baseTimePeriod_pkey }}
      .f.departament_pname {{ e0.departament_pname }}
      .f 
        router-link(:to="{name:'indoc',params:{docid:e0.id}}") T


div 
  router-view


</template>
<script lang="ts">
import {  defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import  FVPagination  from "./FVPagination.vue";

import { doList, doSave } from "../store/DCModelStore";
export default defineComponent({
  name: "compra",
  components:{
    FVPagination
  },
  setup(props, context) {
    const router = useRouter()
    const m_dc_comercialDocumentOut = ref({});

    const item_comercialDocumentOut = ref({
        pkey:"",
  documentDate: new Date(),
folio: "" ,
pname: "" ,
status: "" ,
  supplyDate: new Date()
    });
    const setPage0 = (payload) => {
      load_comercialDocumentOut(payload.n)
    };

    
/** DC parent contract   */

      const m_dc_contract = ref({});
      const item_contract = ref({});
      const item_ac_contract = ref({});
      const ldco00_contract = ref({});
      const idxSelect_contract = ref(-1);

      const put_contract = (e) =>{
        item_contract.value=  e;
        //item_comercialDocumentOut.value['contract_id']=e.id
        //item_comercialDocumentOut.value['contract_pkey']=e.pkey
      }
  
      const loadList_contract = () => {
        const payload = { dc: "contractOut" };
        doList(payload).then((res) => {
          m_dc_contract.value = res;
        });
      }; 

      const updateAC_contract =(k:string)=>{
        console.log("222",k)
           const v = item_ac_contract.value;
           const pv  =  v[k] //,dcp
           update(k,pv,"contractOut",ldco00_contract)
      } 

      const removeDC_contract = (k:string)=>{
        item_contract.value={};
      }
      

     
/** DC parent comercialDocumentType   */

      const m_dc_comercialDocumentType = ref({});
      const item_comercialDocumentType = ref({});
      const item_ac_comercialDocumentType = ref({});
      const ldco00_comercialDocumentType = ref({});
      const idxSelect_comercialDocumentType = ref(-1);

      const put_comercialDocumentType = (e) =>{
        item_comercialDocumentType.value=  e;
        //item_comercialDocumentOut.value['comercialDocumentType_id']=e.id
        //item_comercialDocumentOut.value['comercialDocumentType_pkey']=e.pkey
      }
  
      const loadList_comercialDocumentType = () => {
        const payload = { dc: "comercialDocumentTypeOut" };
        doList(payload).then((res) => {
          m_dc_comercialDocumentType.value = res;
        });
      }; 

      const updateAC_comercialDocumentType =(k:string)=>{
        console.log("222",k)
           const v = item_ac_comercialDocumentType.value;
           const pv  =  v[k] //,dcp
           update(k,pv,"comercialDocumentTypeOut",ldco00_comercialDocumentType)
      } 

      const removeDC_comercialDocumentType = (k:string)=>{
        item_comercialDocumentType.value={};
      }
      

     

    /** MAIN DC ComercialDocumentOut */
    const load_comercialDocumentOut = (n) => {
      const max = 8;
      const offset = max*(n- 1);
      const comercialDocumentOutPayload = { dc: "comercialDocumentOut",params:{ withCount:"1",max:8,offset:offset} };
      doList(comercialDocumentOutPayload).then((rr) => {
        m_dc_comercialDocumentOut.value = rr;
      });
    };

    const add_comercialDocumentOut = () =>{
      const it0:any = {};
      it0['pkey']=Math.random()+'a'
      
              it0['documentDate'] =  item_comercialDocumentOut['documentDate'];
              it0['folio'] =  item_comercialDocumentOut['folio'];
              it0['pname'] =  item_comercialDocumentOut['pname'];
              it0['status'] =  item_comercialDocumentOut['status'];
              it0['supplyDate'] =  item_comercialDocumentOut['supplyDate'];
              it0['contract_id'] =  item_contract.value['id'];
              it0['comercialDocumentType_id'] =  item_comercialDocumentType.value['id'];
      const payload = {dc:'comercialDocumentOut',item:it0}
      doSave(payload).then((r)=>{
        if(r.id){
          router.push({ name: 'indoc', params: { comercialType: 'aa',docid:r.id } })
          
    item_contract.value = {};    
    item_comercialDocumentType.value = {};    
        }

        console.log(r)
      }).catch((e)=>{
        console.log(e)
      })

    }

    const canAdd = () => {
      return item_contract.value['id']!==undefined && item_comercialDocumentType.value['id']!==undefined
    }


    const init0 = () => {
      /*
      
    loadList_contract();    
    loadList_comercialDocumentType();    
      */
    };

    const select01 = () => {

    };
    
    const update = (k:string,pv,dcp,ldco00) => {
        if(pv){
          setTimeout(() => {
            let params: any = { max: 4, withCount: 0 };
            params["il_" + k] = pv;

            let payload = {
              dc: dcp,
              params: params,
            };

            doList(payload)
            .then((ldco) => {
              ldco00.value = ldco;
              //let n = ldco.l.length;
            //  if (n <= idxSelect.value) {
               // idxSelect.value = n - 1;
            //  }
              console.log(ldco);
            })
            .catch((error) => {
              console.log(error);
            });

          },265);

        }
    };
    
    init0();
    return {
      item_comercialDocumentOut,
      m_dc_comercialDocumentOut,
      setPage0,
      load_comercialDocumentOut,
      add_comercialDocumentOut,
      canAdd,select01,
      /* puts to parents*/ 
      
      m_dc_contract,
      put_contract,
      loadList_contract, ldco00_contract,
      item_contract,item_ac_contract,updateAC_contract,removeDC_contract,idxSelect_contract,
      
      m_dc_comercialDocumentType,
      put_comercialDocumentType,
      loadList_comercialDocumentType, ldco00_comercialDocumentType,
      item_comercialDocumentType,item_ac_comercialDocumentType,updateAC_comercialDocumentType,removeDC_comercialDocumentType,idxSelect_comercialDocumentType,
          

    };
  },
});
</script> 
<style>

.dc_p_container{
  display: flex;
  flex-wrap: wrap;
}
.dc_p{
  padding: 6px;
  background: rgba(2,202,230,0.12);
  margin: 15px;
  box-shadow: 3px 3px 3px black;
}
.l-dc-container{
  display: flex;
}

.cont-dcp {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow: auto;
  font-size: 0.8em;
}
.l-loop {
  border: 1px solid;
}
.l-loop .f {
  padding: 4px;
  display: inline;
}



.resac{
  position:relative;
}
.resacf1{
  position: absolute;
  top: 0;
  left: 90px;
}
.el-item-parents{
  display: flex;
}

.el-item-parents .pp{
  background: pink;
  border: 2px solid red;
  border-radius: 8px;
  padding: 12px;
  margin: 12px;;
}

.dcp {
  background: red;
  margin: 12px;
  padding: 12px;
}

.item_dc-p{
  background: orange;
  margin: 4px;
  padding: 6px
}

.item_dc-p label{
  font-weight:bolder;
}

button.add{
  font-size:1.2em;
}

</style>  