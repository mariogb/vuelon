<template  lang="pug">
.menu-cols-tbl(v-if="modelo")
  .tcols.hover-lon-p
    .tcols-head
      button(
        v-on:click="UI.showMenu = !UI.showMenu",
        title="Show/Hide table columns"
      ) Cols
    .tcols-body(
      v-bind:class="{ 'hover-lon-ch-sh': UI.showMenu, 'hover-lon-ch': !UI.showMenu }"
    )
      form
        fieldset
          template.menu-col-e-vis.th-ps(
            v-for="(p, pi) in losPs",
            :key="'td_' + pi"
          )
            div(v-if="p.n !== 'pkey'")
            input(
              type="checkbox",
              v-bind:checked="visibleFields[p.n] !== false",
              v-on:change="doChange($event)",
              v-bind:data-pn="p.n"
            )
            label {{ p.n }}
            hr

          model-mtos(v-bind:modelo="modelo")
            template(v-slot:header="p000")
              .menu-col-e-vis.th-mto
                input(
                  type="checkbox",
                  v-on:change="doChange($event)",
                  v-bind:data-pn="p000.dc0.n",
                  v-bind:checked="visibleFields[p000.dc0.n] !== false"
                )
                label {{ p000.dc0.n }}
                span(v-if="p000.dc0.n === parentOnRelation") **No debo de ver este
                hr

          .menu-col-e-vis.col-action
            input(
              type="checkbox",
              v-bind:checked="visibleFields['Actions'] !== false",
              v-on:change="doChange($event)",
              data-pn="Actions"
            )
            label Actions
            hr

  .tcols.hover-lon-p(v-if="modelo.otm")
    .tcols-head
      button(
        v-on:click="UI.showMenu2 = !UI.showMenu2",
        title="Show/Hide Stat info columns"
      ) stats 
    .tcols-body(
      v-bind:class="{ 'hover-lon-ch-sh': UI.showMenu2, 'hover-lon-ch': !UI.showMenu2 }"
    )
      form
        fieldset
          model-otms(v-bind:modelo="modelo")
            template(v-slot:body="p000")
              .menu-col-e-vis-th-otm
                .dd onRelation {{ p000.dc0.onRelation }}
                .ee modelo {{ modelo.dc }}                                
                label.menu-col-e-vis(v-bind:for="'ckzt_'+p000.dc0.keyPath") {{ p000.dc0.keyPath}}                  
                  input(
                    type="checkbox",
                    v-on:change="doChangeZ($event, p000, modelo.dc)",
                    v-bind:checked="ztatChilds !== undefined && ztatChilds[p000.dc0.keyPath] !== undefined && ztatChilds[p000.dc0.keyPath]['enable'] === true",
                    v-bind:name="'ckzt_'+p000.dc0.keyPath" )
                hr
</template>

<script lang="ts">
import { defineComponent, inject, ref } from "vue";
import ops from "../../liblon/OpsLon";
import tabLonOp from "../../liblon/TableLonOperations";
import ModelMtos from "./ModelMtos.vue";
import ModelOtms from "./ModelOtms.vue";

export default defineComponent({
  components: {
    ModelMtos,
    ModelOtms,
  },

  props: {
    dc: String,
    objKey: String,
    parentObjKey: String,
    parentObjKey2: String,
    parentDc: String,
    parentDcChildName: String,
    parentDc2: String,
    elId: Number,
    parentOnRelation: String,
    parentOnRelation2: String,
  },
  name: "tbl-show-columns",

  setup(props, context) {
    const {
      modelo,
      dc,
      objKey,
      losPs,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      parentOnRelation,
      parentOnRelation2,
    } = ops(<any>props, context);

    const { doChange, visibleFields, ztatChilds, doChangeZ } = tabLonOp(
      props,
      context
    );

    const msgUI = inject("msgUI");

    const UI = ref({ showMenu: false, showMenu2: false });

    // const doCalculoParaObtener_dcpn_dcch = (p000: any, dc: string) => {
    //   const or2 = p000.dc0.onRelation2;
    //   if (or2) {
    //     return or2;
    //   }
    //   const or1 = p000.dc0.onRelation;
    //   if (or1) {
    //     return or1;
    //   }
    //   return dc;
    //   //p000.dc0.onRelation ? p000.dc0.onRelation : modelo.dc
    // };

    // const loadZtatCh = (pn, dcch, dcpn_dcch) => {
    //   const ok = props.objKey;
    //   if (!ok) {
    //     return;
    //   }
    //   let l = ztatChilds.value;
    //   if (l) {
    //     let ch = l[pn];
    //     if (ch && ch.enable === true) {
    //       dcZtatStore.disableChild(ok, pn);
    //       return;
    //     }
    //   }

    //   const l_dc = dcDataStore.getState().listDcs[ok];

    //   const params = {};

    //   params[dcpn_dcch + "_id"] = l_dc.l.map((e) => {
    //     return e.id;
    //   });

    //   dcZtatStore.load({
    //     objKey: props.objKey,
    //     dcch: dcch,
    //     pn: pn,
    //     dcpn_dcch: dcpn_dcch,
    //     params: params,
    //   });
    // };

    // const doChangeZ = (evt) => {
    //   const ds = evt.target.dataset;

    //   const dcch = ds.dcch;
    //   const dcpn_dcch = ds.dcpn_dcch;
    //   const pn = ds.pn;

    //   console.log("Change Z ", dcch, dcpn_dcch, pn);

    //   loadZtatCh(pn, dcch, dcpn_dcch);
    // };

    return {
      doChange,
      doChangeZ,
      losPs,
      dc,
      objKey,
      visibleFields,
      modelo,
      ztatChilds,

      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      parentOnRelation,
      parentOnRelation2,
      msgUI,
      UI,
      // doCalculoParaObtener_dcpn_dcch,
    };
  },
});
</script>

<style>
.menu-cols-tbl {  
  display: inline;
  background: rgba(200, 200, 200, 0.1);
}

.menu-col-e-vis {
  display: block;
}

.tcols-body {
  background: #a6b6db;
  color: #1d0f4f;
  padding: 8px;
  position: absolute;
  box-shadow: 2px 2px 3px #072a48;
}

.pp {
  border: 1px solid red;
}
.dd,.ee {
display: none;
}
@media screen and (max-width: 600px) {

}
</style>
