
<template lang="pug">
h2 TO Addd Sale
div
  button(v-on:click="showSubWin('viewForm')") ADD sale
  button(v-on:click="showSubWin('viewList')") Show List
  button(v-on:click="load_sale(1)") LIST

hr

.dc-form-container(
  v-show="myUI['viewForm']===true",
  v-bind:class="'vl-form-box-' + subWin"
)
  .dc_p_container
    .dc_p.col-0
      h3 saleContracts
      .resac
        .resacf1(v-if="ldco00_saleContract && ldco00_saleContract.l")
          .resac-e(
            v-for="(e0, i0) in ldco00_saleContract.l",
            :key="e0.id",
            v-on:click="put_saleContract(e0, 1)"
          )
            span.pkey {{ e0.pkey }}
            div {{ e0 }}

        .ff
          label(for="pkey") pkey
          input(
            type="text",
            v-model="item_ac_saleContract['pkey']",
            autocomplete="off",
            placeholder="buscar",
            name="pkey",
            @input="updateAC_saleContract('pkey')",
            v-on:keyup.enter="select01()"
          )

        .ff
          label(for="pname") pname
          input(
            type="text",
            v-model="item_ac_saleContract['pname']",
            autocomplete="off",
            placeholder="buscar",
            name="pname",
            @input="updateAC_saleContract('pname')",
            v-on:keyup.enter="select01()"
          )

      .cont-dcp(v-if="m_dc_saleContract && m_dc_saleContract.l")
        .l-loop(
          v-for="e0 in m_dc_saleContract.l",
          :key="'saleContract_' + e0.id"
        ) 
          .f.pkey {{ e0.pkey }}
          .f.pname {{ e0.pname }}
          .f.programBaseTimePeriod_pkey {{ e0.programBaseTimePeriod_pkey }}
          .f.thirdPerson_pkey {{ e0.thirdPerson_pkey }}
          .f.thirdPerson_pname {{ e0.thirdPerson_pname }}
          .f.baseTimePeriod_pkey {{ e0.baseTimePeriod_pkey }}
          .f.program_pkey {{ e0.program_pkey }}
          .f.program_pname {{ e0.program_pname }}
          .f.base_pkey {{ e0.base_pkey }}
          .f.base_pname {{ e0.base_pname }}
          .f.timePeriod_pkey {{ e0.timePeriod_pkey }}
          .f.timePeriod_pname {{ e0.timePeriod_pname }}
          .f 
            button(v-on:click="put_saleContract(e0)") SET

    .dc_p.col-1
      h3 saleTypes
      .resac
        .resacf1(v-if="ldco00_saleType && ldco00_saleType.l")
          .resac-e(
            v-for="(e0, i0) in ldco00_saleType.l",
            :key="e0.id",
            v-on:click="put_saleType(e0, 1)"
          )
            span.pkey {{ e0.pkey }}
            div {{ e0 }}

        .ff
          label(for="pkey") pkey
          input(
            type="text",
            v-model="item_ac_saleType['pkey']",
            autocomplete="off",
            placeholder="buscar",
            name="pkey",
            @input="updateAC_saleType('pkey')",
            v-on:keyup.enter="select01()"
          )

        .ff
          label(for="pname") pname
          input(
            type="text",
            v-model="item_ac_saleType['pname']",
            autocomplete="off",
            placeholder="buscar",
            name="pname",
            @input="updateAC_saleType('pname')",
            v-on:keyup.enter="select01()"
          )

      .cont-dcp(v-if="m_dc_saleType && m_dc_saleType.l")
        .l-loop(v-for="e0 in m_dc_saleType.l", :key="'saleType_' + e0.id") 
          .f.pkey {{ e0.pkey }}
          .f.afectStock {{ e0.afectStock }}
          .f.pname {{ e0.pname }}
          .f 
            button(v-on:click="put_saleType(e0)") SET

  .current-dc-0-item.item_sale
    .el-item(v-if="item_sale")
      .el-item-parents 
        .dcp.pp-0
          h4 saleContract
          .item_dc-p(v-if="item_saleContract && item_saleContract.id")
            .it-pkey 
              label pkey
              span.pval {{ item_saleContract.pkey }}
            .it-pname 
              label pname
              span.pval {{ item_saleContract.pname }}
            .it-programBaseTimePeriod
              label programBaseTimePeriod
              span.pkey {{ item_saleContract.programBaseTimePeriod_pkey }}
              span.pc {{ item_saleContract.programBaseTimePeriod_pname }}
            .it-thirdPerson
              label thirdPerson
              span.pkey {{ item_saleContract.thirdPerson_pkey }}
              span.pc {{ item_saleContract.thirdPerson_pname }}
            button(v-on:click="removeDC_saleContract()") X
        .dcp.pp-1
          h4 saleType
          .item_dc-p(v-if="item_saleType && item_saleType.id")
            .it-pkey 
              label pkey
              span.pval {{ item_saleType.pkey }}
            .it-afectStock 
              label afectStock
              span.pval {{ item_saleType.afectStock }}
            .it-pname 
              label pname
              span.pval {{ item_saleType.pname }}
            button(v-on:click="removeDC_saleType()") X
      button.add(v-if="canAdd()", v-on:click="add_sale()") AGREGAR

    .oo-json {{ item_sale }}

.l-dc-container(v-show="myUI['viewList']===true")
  .dc-0 
    h3.dc-h sale
    FVPagination(v-bind:ldc="m_dc_sale", v-on:setPage0="setPage0") 
    table.blueTable(v-if="m_dc_sale && m_dc_sale.l")
      tbody
        tr.l-loop(v-for="e0 in m_dc_sale.l", :key="'cdo_' + e0.id") 
          td.pkey {{ e0.pkey }}
          td.pname {{ e0.pname }}
          td.thirdPerson_pname {{ e0.thirdPerson_pname }}
          td.departament_pname {{ e0.departament_pname }}
          td.baseTimePeriod_pkey {{ e0.baseTimePeriod_pkey }}
          td.departament_pname {{ e0.departament_pname }}
          td 
            router-link(:to="{ name: 'vl_sale_detail', params: { sale_id: e0.id } }") T

div 
  router-view
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import FVPagination from "./FVPagination.vue";

import { doList, doSave } from "../store/DCModelStore";
export default defineComponent({
  name: "compra",
  components: {
    FVPagination,
  },
  setup(props, context) {
    const router = useRouter();
    const m_dc_sale = ref({});

    const update = (k: string, pv, dcp, ldco00) => {
      if (pv) {
        setTimeout(() => {
          let params: any = { max: 4, withCount: 0 };
          params[["il_", k].join("")] = pv;

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
        }, 265);
      }
    };

    const item_sale = ref({
      pkey: "",
      documentDate: new Date(),
      folio: "",
      pname: "",
      status: "",
      supplyDate: new Date(),
    });
    const setPage0 = (payload) => {
      load_sale(payload.n);
    };

    //const subWins = ["viewForm", "viewUpXlsForm", "viewFilter"];
    const myUI = ref({
      viewForm: false,
      viewList: false,
    });
    const showSubWin = (eui) => {
      myUI.value[eui] = !myUI.value[eui];
    };

    /** DC parent saleContract   */

    const m_dc_saleContract = ref({});
    const item_saleContract = ref({});
    const item_ac_saleContract = ref({});
    const ldco00_saleContract = ref({});
    const idxSelect_saleContract = ref(-1);

    const put_saleContract = (e, o) => {
      item_saleContract.value = e;
      //item_sale.value['saleContract_id']=e.ids
      //item_sale.value['saleContract_pkey']=e.pkey

      if (o) {
        ldco00_saleContract.value = { l: [] };
      }
    };

    const loadList_saleContract = () => {
      const payload = { dc: "saleContract" };
      doList(payload).then((res) => {
        m_dc_saleContract.value = res;
      });
    };

    const updateAC_saleContract = (k: string) => {
      console.log("222", k);
      const v = item_ac_saleContract.value;
      const pv = v[k]; //,dcp
      update(k, pv, "saleContract", ldco00_saleContract);
    };

    const removeDC_saleContract = (k: string) => {
      item_saleContract.value = {};
    };

    /** DC parent saleType   */

    const m_dc_saleType = ref({});
    const item_saleType = ref({});
    const item_ac_saleType = ref({});
    const ldco00_saleType = ref({});
    const idxSelect_saleType = ref(-1);

    const put_saleType = (e, o) => {
      item_saleType.value = e;
      //item_sale.value['saleType_id']=e.ids
      //item_sale.value['saleType_pkey']=e.pkey

      if (o) {
        ldco00_saleType.value = { l: [] };
      }
    };

    const loadList_saleType = () => {
      const payload = { dc: "saleType" };
      doList(payload).then((res) => {
        m_dc_saleType.value = res;
      });
    };

    const updateAC_saleType = (k: string) => {
      console.log("222", k);
      const v = item_ac_saleType.value;
      const pv = v[k]; //,dcp
      update(k, pv, "saleType", ldco00_saleType);
    };

    const removeDC_saleType = (k: string) => {
      item_saleType.value = {};
    };

    /** MAIN DC Sale */
    const load_sale = (n) => {
      const max = 8;
      const offset = max * (n - 1);
      const salePayload = {
        dc: "sale",
        params: { withCount: "1", max: 8, offset: offset },
      };
      doList(salePayload).then((rr) => {
        m_dc_sale.value = rr;
      });
    };

    const add_sale = () => {
      const it0: any = {};

      const d00 = new Date().toISOString().substring(0, 16);
      it0["pkey"] = it0["pkey"] = [Math.random(), "a"].join("-");
      const v0 = item_sale.value;

      it0["documentDate"] = d00;
      it0["folio"] = v0["folio"];
      it0["pname"] = v0["pname"];
      it0["status"] = v0["status"];
      it0["supplyDate"] = d00;
      it0["saleContract_id"] = item_saleContract.value["id"];
      it0["saleType_id"] = item_saleType.value["id"];
      const payload = { dc: "sale", item: it0 };
      doSave(payload)
        .then((r) => {
          if (r.id) {
            router.push({ name: "vl_sale_detail", params: { sale_id: r.id } });

            item_saleContract.value = {};
            item_saleType.value = {};
          }

          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const canAdd = () => {
      return (
        item_saleContract.value["id"] !== undefined &&
        item_saleType.value["id"] !== undefined
      );
    };

    const select00 = (dcp: string, e0: any) => {
      console.log(dcp, e0);
    };

    const init0 = () => {
      //loadList_saleContract();
      loadList_saleType();
    };

    const select01 = () => {};

    init0();
    return {
      item_sale,
      m_dc_sale,
      setPage0,
      load_sale,
      add_sale,
      canAdd,
      select01,
      select00,
      /* puts to parents*/

      m_dc_saleContract,
      put_saleContract,
      loadList_saleContract,
      ldco00_saleContract,
      updateAC_saleContract,
      item_saleContract,
      item_ac_saleContract,
      removeDC_saleContract,
      idxSelect_saleContract,

      m_dc_saleType,
      put_saleType,
      loadList_saleType,
      ldco00_saleType,
      updateAC_saleType,
      item_saleType,
      item_ac_saleType,
      removeDC_saleType,
      idxSelect_saleType,

      myUI,
      showSubWin,
    };
  },
});
</script> 
<style>
.dc_p_container {
  display: flex;
  flex-wrap: wrap;
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

.resac {
  position: relative;
}

.resacf1 {
  position: absolute;
  top: 26px;
  left: 90px;
  padding: 8px;
  background: pink;
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

.dcp {
  background: red;
  margin: 12px;
  padding: 12px;
}

.item_dc-p {
  background: orange;
  margin: 4px;
  padding: 6px;
}

.item_dc-p label {
  font-weight: bolder;
}

button.add {
  font-size: 1.2em;
}

table.blueTable {
  border: 1px solid #1c6ea4;
  background-color: #eeeeee;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table.blueTable td,
table.blueTable th {
  border: 1px solid #aaaaaa;
  padding: 3px 2px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: #d0e4f5;
}
table.blueTable thead {
  background: #1c6ea4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  background: -webkit-linear-gradient(
    top,
    #5592bb 0%,
    #327cad 66%,
    #1c6ea4 100%
  );
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1c6ea4 100%);
  border-bottom: 2px solid #444444;
}
table.blueTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #ffffff;
  border-left: 2px solid #d0e4f5;
}
table.blueTable thead th:first-child {
  border-left: none;
}

table.blueTable tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background: #d0e4f5;
  background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  background: -webkit-linear-gradient(
    top,
    #dcebf7 0%,
    #d4e6f6 66%,
    #d0e4f5 100%
  );
  background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #d0e4f5 100%);
  border-top: 2px solid #444444;
}
table.blueTable tfoot td {
  font-size: 14px;
}
table.blueTable tfoot .links {
  text-align: right;
}
table.blueTable tfoot .links a {
  display: inline-block;
  background: #1c6ea4;
  color: #ffffff;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>  