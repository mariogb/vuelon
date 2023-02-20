
<template lang="pug">
h2 TO Addd Purchase
div
  button(v-on:click="showSubWin('viewForm')") ADD purchase
  button(v-on:click="showSubWin('viewList')") Show List
  button(v-on:click="load_purchase(1)") LIST

hr

.dc-form-container(
  v-show="myUI['viewForm']===true",
  v-bind:class="'vl-form-box-' + subWin"
)
  .dc_p_container
    .dc_p.col-0
      h3 purchaseContracts
      .resac
        .resacf1(v-if="ldco00_purchaseContract && ldco00_purchaseContract.l")
          .resac-e(
            v-for="(e0, i0) in ldco00_purchaseContract.l",
            :key="e0.id",
            v-on:click="put_purchaseContract(e0, 1)"
          )
            span.pkey {{ e0.pkey }}
            div {{ e0['thirdPerson_name'] }} {{ e0['departamentBaseTimePeriod_pkey'] }}

        .ff
          label(for="pkey") pkey
          input(
            type="text",
            v-model="item_ac_purchaseContract['pkey']",
            autocomplete="off",
            placeholder="buscar",
            name="pkey",
            @input="updateAC_purchaseContract('pkey')",
            v-on:keyup.enter="select01()"
          )

        .ff
          label(for="pname") pname
          input(
            type="text",
            v-model="item_ac_purchaseContract['pname']",
            autocomplete="off",
            placeholder="buscar",
            name="pname",
            @input="updateAC_purchaseContract('pname')",
            v-on:keyup.enter="select01()"
          )

      .cont-dcp(v-if="m_dc_purchaseContract && m_dc_purchaseContract.l")
        .l-loop(
          v-for="e0 in m_dc_purchaseContract.l",
          :key="'purchaseContract_' + e0.id"
        ) 
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
            button(v-on:click="put_purchaseContract(e0)") SET

    .dc_p.col-1
      h3 purchaseTypes
      .resac
        .resacf1(v-if="ldco00_purchaseType && ldco00_purchaseType.l")
          .resac-e(
            v-for="(e0, i0) in ldco00_purchaseType.l",
            :key="e0.id",
            v-on:click="put_purchaseType(e0, 1)"
          )
            span.pkey {{ e0.pkey }}
            div {{ e0 }}

        .ff
          label(for="pkey") pkey
          input(
            type="text",
            v-model="item_ac_purchaseType['pkey']",
            autocomplete="off",
            placeholder="buscar",
            name="pkey",
            @input="updateAC_purchaseType('pkey')",
            v-on:keyup.enter="select01()"
          )

        .ff
          label(for="pname") pname
          input(
            type="text",
            v-model="item_ac_purchaseType['pname']",
            autocomplete="off",
            placeholder="buscar",
            name="pname",
            @input="updateAC_purchaseType('pname')",
            v-on:keyup.enter="select01()"
          )

      .cont-dcp(v-if="m_dc_purchaseType && m_dc_purchaseType.l")
        .l-loop(
          v-for="e0 in m_dc_purchaseType.l",
          :key="'purchaseType_' + e0.id"
        ) 
          .f.pkey {{ e0.pkey }}
          .f.afectStock {{ e0.afectStock }}
          .f.pname {{ e0.pname }}
          .f 
            button(v-on:click="put_purchaseType(e0)") SET

  .current-dc-0-item.item_purchase
    .el-item(v-if="item_purchase")
      .el-item-parents 
        .dcp.pp-0
          h4 purchaseContract
          .item_dc-p(v-if="item_purchaseContract && item_purchaseContract.id")
            .it-pkey 
              label pkey
              span.pval {{ item_purchaseContract.pkey }}
            .it-pname 
              label pname
              span.pval {{ item_purchaseContract.pname }}
            .it-departamentBaseTimePeriod
              label departamentBaseTimePeriod
              span.pkey {{ item_purchaseContract.departamentBaseTimePeriod_pkey }}
              span.pc {{ item_purchaseContract.departamentBaseTimePeriod_pname }}
            .it-thirdPerson
              label thirdPerson
              span.pkey {{ item_purchaseContract.thirdPerson_pkey }}
              span.pc {{ item_purchaseContract.thirdPerson_pname }}
            button(v-on:click="removeDC_purchaseContract()") X
        .dcp.pp-1
          h4 purchaseType
          .item_dc-p(v-if="item_purchaseType && item_purchaseType.id")
            .it-pkey 
              label pkey
              span.pval {{ item_purchaseType.pkey }}
            .it-afectStock 
              label afectStock
              span.pval {{ item_purchaseType.afectStock }}
            .it-pname 
              label pname
              span.pval {{ item_purchaseType.pname }}
            button(v-on:click="removeDC_purchaseType()") X
      button.add(v-if="canAdd()", v-on:click="add_purchase()") AGREGAR

    .oo-json {{ item_purchase }}

.l-dc-container(v-show="myUI['viewList']===true")
  .dc-0 
    h3.dc-h purchase
    FVPagination(v-bind:ldc="m_dc_purchase", v-on:setPage0="setPage0") 
    table.blueTable(v-if="m_dc_purchase && m_dc_purchase.l")
      tbody
        tr.l-loop(v-for="e0 in m_dc_purchase.l", :key="'cdo_' + e0.id") 
          td.pkey {{ e0.pkey }}
          td.pname {{ e0.pname }}
          td.thirdPerson_pname {{ e0.thirdPerson_pname }}
          td.departament_pname {{ e0.departament_pname }}
          td.baseTimePeriod_pkey {{ e0.baseTimePeriod_pkey }}
          td.departament_pname {{ e0.departament_pname }}
          td 
            router-link(
              :to="{ name: 'vl_purchase_detail', params: { purchase_id: e0.id } }"
            ) T

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
    const m_dc_purchase = ref({});

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

    const item_purchase = ref({
      pkey: "",
      documentDate: new Date(),
      folio: "",
      pname: "",
      status: "",
      supplyDate: new Date(),
    });
    const setPage0 = (payload) => {
      load_purchase(payload.n);
    };

    //const subWins = ["viewForm", "viewUpXlsForm", "viewFilter"];
    const myUI = ref({
      viewForm: false,
      viewList: false,
    });
    const showSubWin = (eui) => {
      myUI.value[eui] = !myUI.value[eui];
    };

    /** DC parent purchaseContract   */

    const m_dc_purchaseContract = ref({});
    const item_purchaseContract = ref({});
    const item_ac_purchaseContract = ref({});
    const ldco00_purchaseContract = ref({});
    const idxSelect_purchaseContract = ref(-1);

    const put_purchaseContract = (e, o) => {
      item_purchaseContract.value = e;
      //item_purchase.value['purchaseContract_id']=e.ids
      //item_purchase.value['purchaseContract_pkey']=e.pkey

      if (o) {
        ldco00_purchaseContract.value = { l: [] };
      }
    };

    const loadList_purchaseContract = () => {
      const payload = { dc: "purchaseContract" };
      doList(payload).then((res) => {
        m_dc_purchaseContract.value = res;
      });
    };

    const updateAC_purchaseContract = (k: string) => {
      console.log("222", k);
      const v = item_ac_purchaseContract.value;
      const pv = v[k]; //,dcp
      update(k, pv, "purchaseContract", ldco00_purchaseContract);
    };

    const removeDC_purchaseContract = (k: string) => {
      item_purchaseContract.value = {};
    };

    /** DC parent purchaseType   */

    const m_dc_purchaseType = ref({});
    const item_purchaseType = ref({});
    const item_ac_purchaseType = ref({});
    const ldco00_purchaseType = ref({});
    const idxSelect_purchaseType = ref(-1);

    const put_purchaseType = (e, o) => {
      item_purchaseType.value = e;
      //item_purchase.value['purchaseType_id']=e.ids
      //item_purchase.value['purchaseType_pkey']=e.pkey

      if (o) {
        ldco00_purchaseType.value = { l: [] };
      }
    };

    const loadList_purchaseType = () => {
      const payload = { dc: "purchaseType" };
      doList(payload).then((res) => {
        m_dc_purchaseType.value = res;
      });
    };

    const updateAC_purchaseType = (k: string) => {
      console.log("222", k);
      const v = item_ac_purchaseType.value;
      const pv = v[k]; //,dcp
      update(k, pv, "purchaseType", ldco00_purchaseType);
    };

    const removeDC_purchaseType = (k: string) => {
      item_purchaseType.value = {};
    };

    /** MAIN DC Purchase */
    const load_purchase = (n) => {
      const max = 8;
      const offset = max * (n - 1);
      const purchasePayload = {
        dc: "purchase",
        params: { withCount: "1", max: 8, offset: offset },
      };
      doList(purchasePayload).then((rr) => {
        m_dc_purchase.value = rr;
      });
    };

    const add_purchase = () => {
      const it0: any = {};

      const d00 = new Date().toISOString().substring(0, 16);
      it0["pkey"] = it0["pkey"] = [Math.random(), "a"].join("-");
      const v0 = item_purchase.value;

      it0["documentDate"] = d00;
      it0["folio"] = v0["folio"];
      it0["pname"] = v0["pname"];
      it0["status"] = v0["status"];
      it0["supplyDate"] = d00;
      it0["purchaseContract_id"] = item_purchaseContract.value["id"];
      it0["purchaseType_id"] = item_purchaseType.value["id"];
      const payload = { dc: "purchase", item: it0 };
      doSave(payload)
        .then((r) => {
          if (r.id) {
            router.push({
              name: "vl_purchase_detail",
              params: { purchase_id: r.id },
            });

            item_purchaseContract.value = {};
            item_purchaseType.value = {};
          }

          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const canAdd = () => {
      return (
        item_purchaseContract.value["id"] !== undefined &&
        item_purchaseType.value["id"] !== undefined
      );
    };

    const select00 = (dcp: string, e0: any) => {
      console.log(dcp, e0);
    };

    const init0 = () => {
      //loadList_purchaseContract();
      loadList_purchaseType();
    };

    const select01 = () => {};

    init0();
    return {
      item_purchase,
      m_dc_purchase,
      setPage0,
      load_purchase,
      add_purchase,
      canAdd,
      select01,
      select00,
      /* puts to parents*/

      m_dc_purchaseContract,
      put_purchaseContract,
      loadList_purchaseContract,
      ldco00_purchaseContract,
      updateAC_purchaseContract,
      item_purchaseContract,
      item_ac_purchaseContract,
      removeDC_purchaseContract,
      idxSelect_purchaseContract,

      m_dc_purchaseType,
      put_purchaseType,
      loadList_purchaseType,
      ldco00_purchaseType,
      updateAC_purchaseType,
      item_purchaseType,
      item_ac_purchaseType,
      removeDC_purchaseType,
      idxSelect_purchaseType,

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