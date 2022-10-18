<template lang="pug">
.mxm-lon
  h2 *{{ dc }}
  h3.current-parent-dc {{ parentOnRelation }} - {{ currentParentDcItem.pkey }}
  h4 **parentOnRelation2*{{ parentOnRelation2 }}
  small {{ objKey }}
  table.mxmm(v-if="m_dcP2 && m_dcP2.l && m_dcP1 && m_dcP1.l && mapXXX")
    thead
      tr
        th {{ parentOnRelation2 }} pkey
        th pname
        th {{ dc }}

    tbody 
      tr(v-for="e2 in m_dcP2.l", :key="'f' + e2.id")
        td {{ e2['pkey'] }}
        td {{ e2['pname'] }}
        td 
          button.add(
            v-if="mapXXX[e2['id']] === undefined",
            v-on:click="addOne(currentParentDcItem, e2)"
          ) +
          div(v-if="mapXXX[e2['id']]") 
            span {{ mapXXX[e2['id']]['pkey'] }}
            button.remove -
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import ops from "../liblon/OpsLon";
import { dcDataStore, dcModelStore } from "../store/DCModelStore";

export default defineComponent({
  props: {
    dc: String,
    objKey: String,
    parentObjKey: String,
    parentObjKey2: String,
    parentDc: String,
    parentDc2: String,
    parentDcMyName: String,
    parentDc2MyName: String,
    parentOnRelation: String,
    parentOnRelation2: String,
    elId: Number,
    isForSearch: Boolean,
  },

  name: "mxm-lon",
  setup(props, context) {
    const {
      modelo,
      dc,
      m_dc,
      objKey,
      pagData,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      parentDcMyName,
      currentParentDcItem,
      currentParentDcItem2,
      parentOnRelation,
      parentOnRelation2,
      doListGral,
    } = ops(<any>props, context);

    const dP = (p: string) => {
      const k0 = props[p];
      if (k0) {
        return dcDataStore.getState().listDcs[k0];
      }
    };
    const dM = (dc0: string) => {
      const k0 = props[dc0];
      if (k0) {
        return dcModelStore.getState().mapa[k0];
      }
    };

    const mapXXX = computed(() => {
      const mF = {};
      const pr2 = parentOnRelation2;
      if (m_dc && m_dc.value && m_dc.value.l && pr2 && pr2.value) {
        const v2 = pr2.value + "_id";
        m_dc.value.l.forEach((e) => {
          mF[e[v2]] = e;
        });
      }
      return mF;
    });

    const m_dcP1 = computed(() => {
      return dP("parentObjKey");
    });
    const m_dcP2 = computed(() => {
      return dP("parentObjKey2");
    });

    const modeloP1 = computed(() => {
      return dM("parentDc");
    });

    const modeloP2 = computed(() => {
      return dM("parentDc2");
    });

    const addOne = (itP1, itP2) => {
      const item0 = {};
      const p1 = parentOnRelation.value;
      if (p1) {
        item0[p1 + "_id"] = itP1.id;
        item0[p1 + "_pkey"] = itP1.pkey;
      }
      const p2 = parentOnRelation2.value;
      if (p2) {
        item0[p2 + "_id"] = itP2.id;
        item0[p2 + "_pkey"] = itP2.pkey;
      }

      if (dc.value === "baseTimePeriod") {
        item0["pkey"] = `${item0["base_pkey"]}:${item0["timePeriod_pkey"]}`;
      }

      if (dc.value === "departamentBaseTimePeriod") {
        item0[
          "pkey"
        ] = `${item0["departament_pkey"]}:${item0["baseTimePeriod_pkey"]}:`;
      }

      if (dc.value === "baseUserLon") {
        item0["pkey"] = `${item0["userLon_pkey"]}:${item0["base_pkey"]}`;
      }

      if (dc.value === "departamentUserLon") {
        item0["pkey"] = `${item0["userLon_pkey"]}:${item0["departament_pkey"]}`;
      }

      if (dc.value === "contractOut") {
        item0[
          "pkey"
        ] = `${item0["thirdPerson_pkey"]}:${item0["departamentBaseTimePeriod_pkey"]}`;
        item0[
          "pname"
        ] = `Contrato compra de ${item0["thirdPerson_pname"]} ${item0["departament_pname"]} ${item0["baseTimePeriod_pkey"]}   `;
      }

      //departamentUserLon

      let payload = {
        item: item0,
        objKey: objKey.value,
        dc: dc.value,
      };

      console.log(payload);
      dcDataStore
        .doSave2(payload)
        .then((r) => {
          console.log(r);
          doListGral(1);
        })
        .catch((ee) => {
          console.log(ee);
        });
    };

    return {
      modelo,
      dc,
      objKey,
      pagData,
      m_dc,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      parentDcMyName,
      currentParentDcItem,
      currentParentDcItem2,
      parentOnRelation,
      parentOnRelation2,
      m_dcP1,
      m_dcP2,
      modeloP1,
      modeloP2,
      mapXXX,
      addOne,
    };
  },
});
</script> 
<style >
.current-parent-dc {
  border: 1px solid red;
  background: green;
  padding: 8px;
  margin-left: 12px;
}
table.mxmm {
  width: 100%;
}
</style>