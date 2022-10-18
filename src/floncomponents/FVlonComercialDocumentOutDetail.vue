<template lang="pug">
h2 Detail for 
  .docid {{ docid }} {{ comercialDocumentOut.pname }} 
  .ff
    
      
      .dcp.invoiceLines
        .form
          
          label 
            span pkey 
              input(name="pkey" type="text")
          label 
            span askQuantity 
              input(name="askQuantity" type="number")
          label 
            span createdDate 
              input(name="createdDate" type="Date")
          label 
            span descount 
              input(name="descount" type="number")
          label 
            span invoiceDate 
              input(name="invoiceDate" type="Date")
          label 
            span orden 
              input(name="orden" type="Integer")
          label 
            span status 
              input(name="status" type="text")
          label 
            span supplyDate 
              input(name="supplyDate" type="Date")
          label 
            span supplyQuantity 
              input(name="supplyQuantity" type="number")
          label 
            span taxPorcent 
              input(name="taxPorcent" type="number")
          label 
            span total 
              input(name="total" type="number")
          label 
            span totalCost 
              input(name="totalCost" type="number")
          label 
            span unitCost 
              input(name="unitCost" type="number")
          label 
            span.dcp_dcch comercialDocument 
            input(name="comercialDocument_pkey" type="text")
          label 
            span.dcp_dcch product 
            input(name="product_pkey" type="text")
          label 
            span.dcp_dcch stockRackProduct 
            input(name="stockRackProduct_pkey" type="text")
      
      
      .dcp.payments
        .form
          
          label 
            span pkey 
              input(name="pkey" type="text")
          label 
            span.dcp_dcch paymentOutForm 
            input(name="paymentOutForm_pkey" type="text")
          label 
            span.dcp_dcch comercialDocumentOut 
            input(name="comercialDocumentOut_pkey" type="text")
      
</template>

<script lang="ts">

import { computed, ref } from "@vue/reactivity";
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import { doList} from "../store/DCModelStore";
export default defineComponent({
  name: "comercialDocumentOut-detail" /**      ******* */,
  setup(props, context) {
    const route = useRoute();

    const comercialDocumentOut = ref({
        pkey:String,id:Number,pname:String
    })

    const docid = computed(() => {
      return route.params.docid;
    });

    const load = ()=>{
      const p = {dc:'comercialDocumentOut',params:{id:route.params.docid,max:1}}
      ;
      doList(p).then((r)=>{
        if(r && r.l && r.l.length>0){
          comercialDocumentOut.value=r.l[0];
          
        loadList_invoiceLineIn(),
        loadList_paymentOut()
        }
      
      }).catch((e)=>{
        console.log(e)
      })
    }

  

            

  const m_dc_invoiceLineIn = ref({
          pkey:String,
          createdDate:Date,
          documentDate:Date,
          folio:String,
          pname:String,
          status:String,
          supplyDate:Date})
 
  const loadList_invoiceLineIn = () => {
    const payload = { dc: "invoiceLineIn" };
    doList(payload).then((res:any) => {
      m_dc_invoiceLineIn.value = res;
    });
  }; 
  
          
            

  const m_dc_paymentOut = ref({
          pkey:String,
          createdDate:Date,
          documentDate:Date,
          folio:String,
          pname:String,
          status:String,
          supplyDate:Date})
 
  const loadList_paymentOut = () => {
    const payload = { dc: "paymentOut" };
    doList(payload).then((res:any) => {
      m_dc_paymentOut.value = res;
    });
  }; 
  
          
  
    watch(docid,()=>{
      load();
    })

    setTimeout(()=>{
      load(),255
    })
    return {
      docid,comercialDocumentOut,
      
        m_dc_invoiceLineIn,
        loadList_invoiceLineIn,
        m_dc_paymentOut,
        loadList_paymentOut
    };
  },
});
</script>
<style>
</style> 