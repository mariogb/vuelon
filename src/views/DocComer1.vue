<template lang="pug">
h2 COMPR Addd
div
  button ADD
  button(v-on:click="load_comercialDocumentOut()") LIST

hr

.dc_p_container
  .dc_p.col-1
    h3 comercialDocumentTypeOuts
    template(
      v-if="m_dc_comercialDocumentTypeOut && m_dc_comercialDocumentTypeOut.l"
    )
      .l-loop(
        v-for="e0 in m_dc_comercialDocumentTypeOut.l",
        :key="'cdt_' + e0.id"
      ) 
        .f.pkey {{ e0.pkey }}
        .f.pname {{ e0.pname }}
        .f.afectStock {{ e0.afectStock }}
        .f 
          button(v-on:click="put_comercialDocumentTypeOut(e0)") SET

  .dc_p.col-2
    h3 contracts
    template(v-if="m_dc_contractOut && m_dc_contractOut.l")
      .l-loop.l-contract-out(
        v-for="e0 in m_dc_contractOut.l",
        :key="'co_' + e0.id"
      ) 
        .f 
          button(v-on:click="put_contractOut(e0)") SET
        .f.pkey {{ e0.pkey }}
        .f.pname {{ e0.pname }}
        .f.thirdPerson_pname {{ e0.thirdPerson_pname }}
        .f.departament_pname {{ e0.departament_pname }}
        .f.base_pname {{ e0.base_pname }}
        .f.timePeriod_pname {{ e0.timePeriod_pname }}

.current-dc-0-item.item_comercialDocumentOut
  .el-item(v-if="item_comercialDocumentOut")
    .el-item-parents 
      .pp
        h4 comercialDocumentTypeOut
        .item_dc-p(
          v-if="item_comercialDocumentOut.comercialDocumentTypeOut_id"
        )
          .it-1-pkey {{ item_comercialDocumentOut.comercialDocumentTypeOut_pkey }}
          .it-1-pname {{ item_comercialDocumentOut.comercialDocumentTypeOut_pname }}

      .pp
        h4 contract
        .item_dc-p(v-if="item_comercialDocumentOut.contractOut_id")
          .it-1-pkey {{ item_comercialDocumentOut.contractOut_pkey }}
          .it-1-pname {{ item_comercialDocumentOut.contractOut_pname }}

  .oo-json {{ item_comercialDocumentOut }}

.l-dc-container
  .dc-0 
    h3.dc-h comercialDocumentOut
    template(v-if="m_dc_comercialDocumentOut && m_dc_comercialDocumentOut.l")
      .l-loop(v-for="e0 in m_dc_comercialDocumentOut.l", :key="'cdo_' + e0.id") 
        .f.pkey {{ e0.pkey }}
        .f.pname {{ e0.pname }}
        .f.thirdPerson_pname {{ e0.thirdPerson_pname }}
        .f.departament_pname {{ e0.departament_pname }}
        .f.baseTimePeriod_pkey {{ e0.baseTimePeriod_pkey }}
        .f.departament_pname {{ e0.departament_pname }}
        .f 
          button SET

div 
  router-view
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { doList } from "../store/DCModelStore";
export default defineComponent({
  name: "compra",

  setup(props, context) {
    const m_dc_comercialDocumentTypeOut = ref({});
    const m_dc_contractOut = ref({});
    const m_dc_comercialDocumentOut = ref({});

    const item_comercialDocumentOut = ref({
      pkey: "",
      documentDate: new Date(),
      folio: "",
      pname: "",
      status: "",
      supplyDate: "",
    });

    const load_comercialDocumentTypeOut = () => {
      const comercialDocumentTypeOutPay = { dc: "comercialDocumentTypeOut" };
      doList(comercialDocumentTypeOutPay).then((rr) => {
        m_dc_comercialDocumentTypeOut.value = rr;
      });
    };
    const load_contractOut = () => {
      const contractOutPay = { dc: "contractOut" };
      doList(contractOutPay).then((rr) => {
        m_dc_contractOut.value = rr;
      });
    };

    const load_comercialDocumentOut = () => {
      const comercialDocumentOutPay = { dc: "comercialDocumentOut" };
      doList(comercialDocumentOutPay).then((rr) => {
        m_dc_comercialDocumentOut.value = rr;
      });
    };

    const add_comercialDocumentOut = () => {};

    const put_contractOut = (contractOut0) => {
      item_comercialDocumentOut.value["contractOut_id"] = contractOut0.id;
      item_comercialDocumentOut.value["contractOut_pkey"] = contractOut0.pkey;
    };
    const put_comercialDocumentTypeOut = (e0) => {
      item_comercialDocumentOut.value["comercialDocumentTypeOut_id"] = e0.id;
      item_comercialDocumentOut.value["comercialDocumentTypeOut_pkey"] =
        e0.pkey;
    };

    const init0 = () => {
      load_comercialDocumentTypeOut();
      load_contractOut();
      load_comercialDocumentOut();
    };

    init0();
    return {
      item_comercialDocumentOut,
      m_dc_comercialDocumentTypeOut,
      m_dc_contractOut,
      m_dc_comercialDocumentOut,
      load_comercialDocumentOut,
      load_contractOut,
      load_comercialDocumentTypeOut,
      add_comercialDocumentOut,
      /* puts to parents*/
      put_contractOut,
      put_comercialDocumentTypeOut,
    };
  },
});
</script> 
<style>
.dc_p_container {
  display: flex;
}
.dc_p {
  padding: 6px;
  background: rgba(2, 202, 230, 0.12);
  margin: 15px;
  box-shadow: 3px 3px 3px black;
}
.l-dc-container {
  display: flex;
}

.l-loop {
  display: flex;
}
.l-loop .f {
  padding: 4px;
}

.el-item-parents {
  display: flex;
}

.el-item-parents .pp {
  background: pink;
  border: 2px solid red;
  border-radius: 8px;
  padding: 12px;
  margin: 12px;
}
</style>