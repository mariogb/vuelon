<template lang="pug">
div
  small {{ parentOnRelation }}
  .fl-pdc(v-if="losMto", ref="theformp")
    
    template(v-for="p in losMto", :key="'d-' + p.n")
      .row.f-mto(v-if="p.setBySys === undefined")
        div
          h3.lb-mto(v-bind:for="'i-' + p.n") *{{ p.n }}
          p.err-undefined(
            v-if="err0 && err0.localVerify && err0.localVerify[p.n] === 'UNDEFINED'"
          )
            | This value is required
        .sch-mto
          button(
            v-if="hideParentsSearch[p.n] === true",
            v-on:click="hideParentsSearch[p.n] = undefined"
          )
            | Buscar
          div(v-if="parentOnRelation === p.n && currentParentDcItem")
            span(v-if="p.pc !== undefined")
              | {{ currentParentDcItem[p.pc] }}
            button.set-crr-dcp(v-on:click="putParent(p.n)")
              | **
              small.pkey {{ currentParentDcItem['pkey'] }}
          div(v-if="parentOnRelation2 === p.n && currentParentDcItem2")
            span(v-if="p.pc !== undefined") {{ currentParentDcItem2[p.pc] }}
            button.set-crr-dcp(v-on:click="putParent2(p.n)")
              | **
              small.pkey {{ currentParentDcItem2['pkey'] }}
          .sch-mto-opts(v-show="hideParentsSearch[p.n] !== true")
            auto-completer(
              v-on:putval0="getacval",
              v-bind:dc="p.t",
              v-bind:pn="p.n",
              v-bind:objkey="objKey + ':' + p.n"
            )
            div(v-if="parentOnRelation !== p.n")
              button(v-on:click="loadDCLonFinder(p.n)") DC Finder
              .dclon-psc(v-if="showParentFind[p.n]")
                .dclon-ps
                  h3.dclon-ps-title
                    | Search {{ p.t }} for {{ p.n }}
                  d-c-lon(
                    v-on:putParentVal00="putParentVal00",
                    v-bind:parentDcMyName="p.n",
                    v-bind:isForSearch="true",
                    v-bind:dc="p.t",
                    v-bind:objKey="objKey + '_' + p.n"
                  )
                  button.btn-dc-close(v-on:click="loadDCLonFinder(p.n)")
                    | DC Finder Close
        .parent-value(v-if="item0Parent[p.n] !== undefined")
          span.pc(v-if="p.pc !== undefined") {{ item0Parent[p.n][p.pc] }}
          |
          | [
          small.pkey {{ item0Parent[p.n]['pkey'] }}
          | ]
          button.btn-rm-parent-value(v-on:click="rmParent(p.n)") X
  div
    span parentOnRelation
      | {{ parentOnRelation }}
    button(v-on:click="test_theform()") test 
    hr
    small parentObjKey {{ parentObjKey }}
  form(v-if="modelo !== undefined", ref="theform", onsubmit="return false;")
    fieldset
      legend Generales
      .form-lon-container
        .f-ps
          div
            label.ps.pkey
              span *
              span pkey
          div 
            input(
              name="i-pkey",
              type="text",
              v-model="item0['pkey']",
              required="true"
            )

        .f-ps(v-if="elPc")
          div
            label.ps.pc
              span *
              span {{ elPc }}
          div 
            input(v-bind:name="'i-' + elPc", type="text", v-model="item0[elPc]")

        template(
          v-for="p in losPs.filter((p) => { return p.n !== 'pkey' && p.n !== elPc; })",
          :key="'d-' + p.n"
        )
          .f-ps
            div
              label.ps(v-bind:for="'i-' + p.n", v-bind:class="p.n")
                span(v-if="p.rq === true") *
                span {{ p.n }}
            div
              template(v-if="p.t === 'LocalDate'")
                input(
                  v-bind:name="'i-' + p.n",
                  type="date",
                  v-model="item0[p.n]"
                )
              template(v-if="p.t === 'LocalDateTime'")
                input(
                  v-bind:name="'i-' + p.n",
                  type="datetime-local",
                  v-model="item0[p.n]"
                )
              template(
                v-if="p.t === 'Long' || p.t === 'Integer' || p.t === 'BigDecimal'"
              )
                input.num(
                  v-bind:name="'i-' + p.n",
                  type="number",
                  step="0",
                  size="8",
                  v-model="item0[p.n]",
                  v-bind:required="p.rq === true",
                  v-bind:min="p.min",
                  v-bind:max="p.max"
                )
              template(v-if="p.t === 'String'")
                template(v-if="p.inList === undefined")
                  input(
                    v-bind:name="'i-' + p.n",
                    v-model="item0[p.n]",
                    type="text",
                    autocomplete="off",
                    minlength="3",
                    v-bind:required="p.rq === true"
                  )
                template(v-if="p.inList !== undefined")
                  select(v-model="item0[p.n]", required="")
                    option(
                      v-for="tt in p.inList",
                      v-bind:value="tt",
                      :key="'op_' + p.n + '_' + tt"
                    )
                      | {{ dc + '_' + p.n + '_' + tt }}
        template(v-for="p in losPsBool", :key="'d-' + p.n")
          .f-ps
            div
              label.ps(v-bind:for="'i-' + p.n", v-bind:class="p.n")
                span(v-if="p.rq === true")
                span {{ p.n }}
            div
              template(v-if="p.t === 'Boolean'")
                input(
                  type="checkbox",
                  v-model="item0[p.n]",
                  v-bind:name="'i-' + p.n"
                )
    div(
      style="background: pink; font-size: 0.8em; width: 260px; overflow: auto"
    )
      | {{ item0 }}
    span {{ err0 }}
    .error(
      v-if="err0 && err0.localVerify",
      style="background: orange; font-size: 0.8em; width: 260px; overflow: auto"
    )
      | {{ err0 }}
    .form-btns
      input.form-lon-submit(
        type="submit",
        v-bind:disable="statusSave === 'SAVING'",
        v-on:click="save()"
      )
      input(type="reset", v-on:click="cleanF()")
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue";
//import DCLon from "./DCLon.vue";
const DCLon = defineAsyncComponent(() => import("./DCLon.vue"));

import ops from "../liblon/OpsLon";
import formOps from "../liblon/FormLonOperations";
import AutoCompleter from "./AutoCompleter.vue";
import ModelMtos from "./tablelon/ModelMtos.vue";
export default defineComponent({
  components: {
    ModelMtos,
    AutoCompleter,
    DCLon,
  },
  props: {
    dc: String,
    parentDc: String,
    parentDc2: String,
    objKey: String,
    parentObjKey: String,
    parentObjKey2: String,
    parentOnRelation: String,
    parentOnRelation2: String,
    editId: Number,
  },

  setup(props: any, context) {
    const {
      modelo,
      elPc,
      dc,
      objKey,
      parentOnRelation,
      parentOnRelation2,
      parentObjKeyModel,
      parentObjKey,
      parentObjKey2,
      m_dc,
      losPs,
      losPsBool,
      currentParentDcItem,
      currentParentDcItem2,
    } = ops(props, context);

    const {
      item0,
      save,
      err0,
      statusSave,
      getacval,
      item0Parent,
      cleanF,
      elSubmit,
      editId,
      hideParentsSearch,
      showParentFind, //to find with a dclon
      loadDCLonFinder, //to load a dclon
      rmParent,
      putParent,
      putParent2,
      putParentVal00,
      losMto,
      theform,
      theformp,
    } = formOps(props, context);

    const test_theform = ()=>{
      const v = theform.value
      if(v){
        const elements:any = v['elements']
        console.log(elements)
        if(elements){          
          for(var p in elements){
            console.log(p,elements[p])
          }
        }
      }
      

    }

    return {
      dc,
      modelo,
      item0,
      save,
      objKey,
      err0,
      statusSave,
      getacval,
      item0Parent,

      cleanF,
      elSubmit,
      editId,
      m_dc,
      hideParentsSearch,
      showParentFind, //to find with a dclon
      loadDCLonFinder, //to load a dclon
      rmParent,
      parentOnRelation,
      parentOnRelation2,
      parentObjKey,
      parentObjKey2,

      currentParentDcItem,
      currentParentDcItem2,
      parentObjKeyModel,
      putParent,
      putParent2,
      putParentVal00,
      losMto,
      losPs,
      losPsBool,
      theform,test_theform,
      theformp,
      elPc,
    };
  },
});
</script>
<style>
.parent-value {
  background: #0e72ddb3;
  padding: 6px;
  color: #f8f0ff;
  font-weight: bold;
  width: 86%;
  border-radius: 12px;
  box-shadow: -2px 3px 3px black;
  margin: 16px;
  text-shadow: 1px 1px 1px #050505;
  font-family: Arial, sans-serif;
  position: relative;
  font-size: 2.4em;
}

.form-btns {
  width: 280px;
  padding: 12px;
}

button.btn-show-form-body {
  float: right;
  font-size: 0.65em;
}

.form-lon-container {
  display: flex;
  flex-wrap: wrap;
}
.fl-pdc {
  padding: 8px;
  margin: 2px;
  grid-gap: 2px;
  border-radius: 8px;
  box-shadow: 3px 3px 3px black;
  background: repeating-radial-gradient(
      circle at bottom left,
      #fedc00 0,
      #fedc00 5.5555555556%,
      #fcb712 0,
      #fcb712 11.1111111111%,
      #f7921e 0,
      #f7921e 16.6666666667%,
      #e87f24 0,
      #e87f24 22.2222222222%,
      #dd6227 0,
      #dd6227 27.7777777778%,
      #dc4c27 0,
      #dc4c27 33.3333333333%,
      #ca3435 0,
      #ca3435 38.8888888889%,
      #b82841 0,
      #b82841 44.4444444444%,
      #953751 0,
      #953751 50%,
      #364c88 0,
      #364c88 55.5555555556%,
      #16599d 0,
      #16599d 61.1111111111%,
      #02609e 0,
      #02609e 66.6666666667%,
      #0073a9 0,
      #0073a9 72.2222222222%,
      #008aa4 0,
      #008aa4 77.7777777778%,
      #239a87 0,
      #239a87 83.3333333333%,
      #7cba6d 0,
      #7cba6d 88.8888888889%,
      #becc2f 0,
      #becc2f 94.4444444444%,
      #e0d81d 0,
      #e0d81d 100%
    ),
    repeating-radial-gradient(
      circle at bottom right,
      #fedc00 0,
      #fedc00 5.5555555556%,
      #fcb712 0,
      #fcb712 11.1111111111%,
      #f7921e 0,
      #f7921e 16.6666666667%,
      #e87f24 0,
      #e87f24 22.2222222222%,
      #dd6227 0,
      #dd6227 27.7777777778%,
      #dc4c27 0,
      #dc4c27 33.3333333333%,
      #ca3435 0,
      #ca3435 38.8888888889%,
      #b82841 0,
      #b82841 44.4444444444%,
      #953751 0,
      #953751 50%,
      #364c88 0,
      #364c88 55.5555555556%,
      #16599d 0,
      #16599d 61.1111111111%,
      #02609e 0,
      #02609e 66.6666666667%,
      #0073a9 0,
      #0073a9 72.2222222222%,
      #008aa4 0,
      #008aa4 77.7777777778%,
      #239a87 0,
      #239a87 83.3333333333%,
      #7cba6d 0,
      #7cba6d 88.8888888889%,
      #becc2f 0,
      #becc2f 94.4444444444%,
      #e0d81d 0,
      #e0d81d 100%
    );
  background-blend-mode: overlay;

  display: flex;
  flex-wrap: wrap;
}
.f-mto {
  padding: 8px;
  border: 6px outset rgba(4, 72, 112, 0.55);
  margin-bottom: 4px;
  margin-right: 3px;
  background: rgba(54, 14, 230, 0.28);
  border-radius: 8px;
}
.f-ps {
  background-color: #66a3ff;

  margin-bottom: 13px;
  border-bottom: groove;
  padding-bottom: 8px;
  padding-top: 8px;
  padding-left: 4px;
}

.err-undefined {
  background: #f2c7a7;
  color: #200006;
  padding: 8px;
  font-style: italic;
  font-size: 0.85rem;
  text-shadow: #fb0404 2px 2px 2px;
  margin: 6px;
  border-radius: 8px;
  border: groove #db1137;
}

.dclon-ps {
  background: #02609eec;
  padding: 5px;
  border: 3px inset;
}
.dclon-psc {
  position: fixed;
  margin: 4px;
  padding: 3px;
  background: #0059ff;
 

  z-index: 2000;
  border: 2px outset rgba(54, 14, 230, 0.767);
  box-shadow: -3px -3px 5px #4d0d22;
  top: 4px;
  left: 4px;
  overflow: auto;
  bottom: 4px;
  right: 2px;
  padding-bottom: 52px;
}

.lb-mto {
  background: #61fda2;
}
.sch-mto {
  background: #34aa73de;
  border-radius: 10px;
  padding: 6px;
  box-shadow: 2px 2px 2px #100635;
}

.sch-mto-opts {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-rm-parent-value {
  position: absolute;
  right: 2px;
  top: -5px;
  background: #ffe300;
  color: #ff006c;
  font-weight: bold;
  font-size: 1.2rem;
  border: 2px outset #f817ff;
  border-radius: 6px;
  box-shadow: 2px -2px 5px #6c205d;
  text-shadow: 1px 1px 1px #509ef0;
}

.btn-rm-parent-value:hover {
  color: #ffe300;
  background: #ff006c;
  text-shadow: -1px -1px 2px #6c205d;
  box-shadow: -2px 2px 3px #509ef0;
}

.form-lon-submit:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.dclon-ps-title {
  background: greenyellow;
  padding: 6px;
}

.btn-dc-close {
  margin: 18px;
  background: red;
  padding: 10px;
  color: whitesmoke;
}
</style>

