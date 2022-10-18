<template lang="pug">
.search-1
  span Search by property
  auto-completer(v-on:putVal0="getacval", v-bind:dc="dc", v-bind:pn="dc", v-bind:objKey="objKey + ':' + dc")
  template(v-if="mFilter!==undefined && mFilter[dc]!==undefined")
    div(v-for="(it0,idx) in mFilter[dc].l" :key="'fv'+dc+'_'+dc+'_'+idx")
      span(v-if="modelo.pc!=='null'") {{it0[modelo.pc]}}
      span.pkey {{it0.pkey}}
      button.rmfit(v-on:click="rmFilterVal(dc,it0)") X  

div
  div.parent-container(v-if="modelo && modelo.mto") 
    .row_f(
      v-for="(p, pi) in modelo.mto.filter((p) => { return p.n !== parentDc; })",
      :key="'fil_' + dc + '_' + pi"
    )
      span {{ p.n }} :: {{ parentDc }}AA
      .row
        .col-sm-12
          span {{ p.n }}
        .col-sm-12 
          auto-completer(v-on:putval0="getacval", v-bind:dc="p.t", v-bind:pn="p.n", v-bind:objKey="objKey + ':' + p.n")

          div.filter-items(v-if="mFilter!==undefined && mFilter[p.n]!==undefined")
            div.filter-item(v-for="(it0,idx) in mFilter[p.n].l" :key="'fv'+dc+'_'+p.n+'_'+idx")
              span(v-if="p.pc!=='null'") {{it0[p.pc]}} 
              span.pkey {{it0.pkey}} 
              button.rmfit(v-on:click="rmFilterVal(p.n,it0)") X
            

form.filter-lon(v-if="modelo", onsubmit="return false;") 
  fieldset(v-if="modelo.ps")
    legend Filter by properties
      .flds-1
        .row_f
          label(for="pkey") pkey
          input(
            type="text",
            name="pkey",
            autocomplete="off",
            v-model="item0['il_pkey']"
          )
        .row_f(v-if="modelo.pc !== undefined")
          label(v-bind:for="modelo.pc") {{ modelo.pc }}
          input(
            type="text",
            autocomplete="off",
            v-bind:name="modelo.pc",
            v-model="item0['il_' + modelo.pc]"
          )

      .flds-1 
        .row_f(
          v-for="p in losPs.filter((p) => { return p.inList === undefined && p.withIndex === true; })",
          :key="'p_' + p.n"
        ) 
          label(v-bind:for="p.n") {{ p.n }}
          input(
            type="text",
            autocomplete="off",
            v-bind:name="p.n",
            v-model="item0['il_' + p.n]"
          )
      .flds-1 
        .row_f(
          v-for="p in losPs.filter((p) => { return p.inList !== undefined; })",
          :key="'p_' + p.n"
        ) 
          label(v-bind:for="p.n") {{ p.n }}
          select(v-on:change="apply00($event, p.n)", multiple)
            option(v-for="vv in p.inList", :key="'op_' + vv", v-bind:value="vv") 
              span {{ vv }}

      .flds-1 
        .row_f(v-for="p in losPsBool", :key="'p_' + p.n") 
          template(v-if="p.t === 'Boolean'")
            .col-sm-12
              label(v-bind:for="p.n") {{ p.n }}
            .col-sm-3 
              input(
                type="checkbox",
                v-bind:name="p.n",
                v-model="item0['booltr_' + p.n]"
              )
              span Y
            .col-sm-3 
              input(
                type="checkbox",
                v-bind:name="p.n",
                v-model="item0['boolfl_' + p.n]"
              )
              span N

      .flds-1 
        .row_f(v-for="p in modelo.ps.filter((p) => { return p.t === 'Integer'; })" :key="'p_' + p.n") 
          label(v-bind:for="p.n") {{ p.n }}
          input(
              type="number",
              size="8",
              v-bind:name="p.n",
              min="0",
              v-model="item0['gt_' + p.n]"
            )
          input(
            type="number",
            size="8",
            v-bind:name="p.n",
            v-model="item0['lt_' + p.n]"
          )

      .flds-1 
        .row_f 
          button(v-on:click="doList()", role="button") Apply Filter
          input(type="reset", v-on:click="clean()") 

</template>
<script lang="ts">
/*
AutoCompleter.props = 
    dc: String,
    pn: String,
    fromDCParent1: String,
    objKey: String,
*/

import { ref, defineComponent, computed } from "vue";
import AutoCompleter from "./AutoCompleter.vue";
import { dcDataStore } from "../store/DCModelStore";
import ops from "../liblon/OpsLon";
export default defineComponent({
  name: "filter-lon",
  emits: ["doList"],
  props: {
    dc: String,
    objKey: String,
    parentDc: String,
    parentDc2: String,
    parentObjKey: String,
    parentObjKey2: String,
  },
  components: {
    AutoCompleter,
  },
  setup(props: any, context) {
    const {
      modelo,
      dc,
      objKey,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      losPs,
      losPsBool,
    } = ops(props, context);

    const getacval = (payload) => {
      console.log("-------")
      console.log(payload);

      console.log(props.objKey, payload.pn, payload.elem0);

       dcDataStore.putFilterDc(props.objKey, payload.pn, payload.elem0);
      //dcDataStore.


    };
    const doList = () => {
      const oK = props.objKey;
      if (oK) {
        dcDataStore.putValOnFilterItem0(props.objKey, item0.value);
      }
      context.emit("doList");
    };

    const clean = () => {
      item0.value = {};
      const oK = props.objKey;
      if (oK) {
        dcDataStore.cleanFilterItem0(oK);
      }
      context.emit("doList");
    };

    const item0 = ref({});

    const apply00 = (e, pn) => {
      const so0 = e.target.selectedOptions;
      if (so0 && so0.length > 0) {
        const lv_: Array<string> = [];
        for (let i = 0; i < so0.length; i++) {
          lv_.push(so0[i].value);
        }
        item0.value["eq_" + pn] = lv_;
        return;
      }
      item0.value["eq_" + pn] = undefined;
    };


    const mFilter = computed(() => {
      return dcDataStore.getState().filterDcs[props.objKey];
    });


    const rmFilterVal = (pi, it0) => {
      dcDataStore.removeFilterDc(props.objKey, pi, it0);
    };


    return {
      dc,
      modelo,
      objKey,
      getacval,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      doList,
      item0,
      clean,
      apply00,
      losPs,
      losPsBool,mFilter,rmFilterVal
    };
  },
});
</script> 
<style>
.flds-1 {
  display: flex;
  flex-wrap: wrap;
}
.row_f {
  background: rgba(223, 61, 61, 0.4);
  display: flex;
  flex-direction: column;
  margin: 8px;
  padding: 5px;
}

.filter-items{
  margin: 4px;
  padding: 8px;
  background: rgba(1,1,1,0.25);
  border: 1px inset;
}

.filter-item{
  margin: 4px;
  padding: 8px;
  display: inline-block;
  background: rgba(2,3,40,0.55);
  color: aqua;
}

.rmfit{
  margin-left: 4px;
}

.parent-container{
  display: flex;
}

</style>