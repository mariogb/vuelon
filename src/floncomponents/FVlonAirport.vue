
<template lang="pug">
h2 TO Addd Airport
div
  button(v-on:click="showSubWin('viewForm')") ADD airport
  button(v-on:click="showSubWin('viewList')") Show List
  button(v-on:click="load_airport(1)") LIST

hr

.dc-form-container(
  v-show="myUI['viewForm']===true",
  v-bind:class="'vl-form-box-' + subWin"
)
  .dc_p_container

  .current-dc-0-item.item_airport
    .el-item(v-if="item_airport")
      .el-item-parents 

      button.add(v-if="canAdd()", v-on:click="add_airport()") AGREGAR

    .oo-json {{ item_airport }}

.l-dc-container(v-show="myUI['viewList']===true")
  .dc-0 
    h3.dc-h airport
    FVPagination(v-bind:ldc="m_dc_airport", v-on:setPage0="setPage0") 
    table.blueTable(v-if="m_dc_airport && m_dc_airport.l")
      tbody
        tr.l-loop(v-for="e0 in m_dc_airport.l", :key="'cdo_' + e0.id") 
          td.pkey {{ e0.pkey }}
          td.pname {{ e0.pname }}
          td.thirdPerson_pname {{ e0.thirdPerson_pname }}
          td.departament_pname {{ e0.departament_pname }}
          td.baseTimePeriod_pkey {{ e0.baseTimePeriod_pkey }}
          td.departament_pname {{ e0.departament_pname }}
          td 
            router-link(
              :to="{ name: 'vl_airport_detail', params: { airport_id: e0.id } }"
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
    const m_dc_airport = ref({});

    const item_airport = ref({
      pkey: "",
      pname: "",
    });
    const setPage0 = (payload) => {
      load_airport(payload.n);
    };

    //const subWins = ["viewForm", "viewUpXlsForm", "viewFilter"];
    const myUI = ref({
      viewForm: false,
      viewList: false,
    });
    const showSubWin = (eui) => {
      myUI.value[eui] = !myUI.value[eui];
    };

    /** MAIN DC Airport */
    const load_airport = (n) => {
      const max = 8;
      const offset = max * (n - 1);
      const airportPayload = {
        dc: "airport",
        params: { withCount: "1", max: 8, offset: offset },
      };
      doList(airportPayload).then((rr) => {
        m_dc_airport.value = rr;
      });
    };

    const add_airport = () => {
      const it0: any = {};

      it0["pkey"] = it0["pkey"] = [Math.random(), "a"].join("-");
      const v0 = item_airport.value;

      it0["pname"] = v0["pname"];
      const payload = { dc: "airport", item: it0 };
      doSave(payload)
        .then((r) => {
          if (r.id) {
            router.push({
              name: "vl_airport_detail",
              params: { airport_id: r.id },
            });
          }

          console.log(r);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const canAdd = () => {
      return;
    };

    const select00 = (dcp: string, e0: any) => {
      console.log(dcp, e0);
    };

    const init0 = () => {};

    const select01 = () => {};

    init0();
    return {
      item_airport,
      m_dc_airport,
      setPage0,
      load_airport,
      add_airport,
      canAdd,
      select01,
      select00,
      /* puts to parents*/

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