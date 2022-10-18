<template lang="pug">
.cmxm
  .h1
    router-link(
      :to="{ name: 'mxm', params: { dcch: losDcs.dcch, dcpn1: losDcs.dcpn2, dcpn2: losDcs.dcpn1 } }"
    ) change
  .h2
  .c1
    template(v-if="modeloDC1")
      h3 {{ losDcs.dcpn1 }}
      DCLon(v-bind:dc="modeloDC1.dc", v-bind:objKey="'m_' + losDcs.dcpn1")

  .c2
    template(v-if="modeloDC2")
      h3 {{ losDcs.dcpn2 }}
      DCLon(v-bind:dc="modeloDC2.dc", v-bind:objKey="'m_' + losDcs.dcpn2")

  .c3
    template(v-if="vv")
      h4 {{ losDcs.dcch }}
      DCLon(
        v-bind:dc="losDcs.dcch",
        v-bind:objKey="'m_dcch_' + losDcs.dcch",
        v-bind:parentDc="modeloDC1.dc",
        v-bind:parentObjKey="'m_' + losDcs.dcpn1",
        v-bind:parentOnRelation="parentOnRelation.onRelation",
        v-bind:parentDcMyName="parentOnRelation.n",
        v-bind:parentDc2="modeloDC2.dc",
        v-bind:parentObjKey2="'m_' + losDcs.dcpn2",
        v-bind:parentOnRelation2="parentOnRelation2.onRelation",
        v-bind:parentDcMyName2="parentOnRelation2.n"
      )
  .c4
    template(v-if="vv")
      MxMLon(
        v-bind:dc="losDcs.dcch",
        v-bind:objKey="'m_dcch_' + losDcs.dcch",
        v-bind:parentDc="modeloDC1.dc",
        v-bind:parentObjKey="'m_' + losDcs.dcpn1",
        v-bind:parentOnRelation="parentOnRelation.onRelation",
        v-bind:parentDcMyName="parentOnRelation.n",
        v-bind:parentDc2="modeloDC2.dc",
        v-bind:parentObjKey2="'m_' + losDcs.dcpn2",
        v-bind:parentOnRelation2="parentOnRelation2.onRelation",
        v-bind:parentDcMyName2="parentOnRelation2.n"
      )
  .f1
  .f2
</template>
<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { dcDataStore, dcModelStore } from "../store/DCModelStore";

const DCLon = defineAsyncComponent(() => import("../components/DCLon.vue"));
const MxMLon = defineAsyncComponent(() => import("../components/MxMLon.vue"));

export default defineComponent({
  name: "mxm-view",
  components: { DCLon, MxMLon },
  setup(props, context) {
    const route = useRoute();
    const losDcs = computed(() => {
      return {
        dcpn1: route.params.dcpn1,
        dcpn2: route.params.dcpn2,
        dcch: route.params.dcch,
      };
    });

    const modeloDCCH = computed(() => {
      const dcch = route.params.dcch;
      if (typeof dcch === "string") {
        return dcModelStore.getState().mapa[dcch];
      }
    });

    const modeloDC__ = (np) => {
      console.log("modeloDC__", np);

      //const dcch = route.params.dcch;
      //if (typeof dcch === "string") {
      //  const mDCCH = dcModelStore.getState().mapa[dcch];

      const mDCCH = modeloDCCH.value;
      if (mDCCH && mDCCH.mto) {
        const dcpn1 = route.params["dcpn" + np];
        const dc1 = mDCCH.mto.find((p) => {
          return p.n === dcpn1;
        });
        if (dc1) {
          return dcModelStore.getState().mapa[dc1.t];
        }
      }

      //}
    };

    /**
     * Model for dc parent 1
     */
    const modeloDC1 = computed(() => {
      return modeloDC__(1);
    });

    /**
     * Model for dc parent 2
     */
    const modeloDC2 = computed(() => {
      return modeloDC__(2);
    });

    const parentOnRelation00 = (n, mDC) => {
      //const mDC1 = modeloDC1.value;
      const dcpn1 = route.params["dcpn" + n];
      const mDCCH = modeloDCCH.value;
      if (dcpn1 && mDC && mDC.otm && mDCCH) {
        const r1 = mDC.otm.find((p) => {
          return p.onRelation === dcpn1;
        });
        if (r1) {
          return { onRelation: r1.onRelation, n: r1.n };
        }

        const r3 = { onRelation: mDC.dc };
        const r2 = mDC.otm.find((p) => {
          return p.t === mDCCH.dc;
        });
        if (r2) {
          r3["n"] = r2.n;
        }
        return r3;
      }
    };

    const parentOnRelation = computed(() => {
      return parentOnRelation00(1, modeloDC1.value);
    });
    const parentOnRelation2 = computed(() => {
      return parentOnRelation00(2, modeloDC2.value);
    });

    /**
     *
     *  Map with list result for dc parent 1
     */
    const m_dc1 = computed(() => {
      const dcpn1 = route.params["dcpn1"];
      return dcDataStore.getState().listDcs["m_" + dcpn1];
    });

    /**
     *
     *  Map with list result for dc parent 2
     */
    const m_dc2 = computed(() => {
      const dcpn2 = route.params["dcpn2"];
      return dcDataStore.getState().listDcs["m_" + dcpn2];
    });

    /**
     * Current selected item on DC parent 1
     */
    const currentItemDC1 = computed(() => {
      const dcpn1 = route.params["dcpn1"];
      return dcDataStore.getState().currentItems["m_" + dcpn1];
    });

    const currentItemDC2 = computed(() => {
      const dcpn2 = route.params["dcpn2"];
      return dcDataStore.getState().currentItems["m_" + dcpn2];
    });

    const vv = computed(() => {
      return losDcs.value &&
        modeloDCCH.value &&
        modeloDC1.value &&
        modeloDC2.value &&
        parentOnRelation.value &&
        parentOnRelation2.value &&
        currentItemDC1.value &&
        m_dc2.value &&
        m_dc2.value.l &&
        m_dc2.value.l.length > 0
        ? true
        : false;
    });

    return {
      losDcs,
      modeloDCCH,
      modeloDC1,
      modeloDC2,
      parentOnRelation,
      parentOnRelation2,
      m_dc1,
      m_dc2,
      currentItemDC1,
      currentItemDC2,vv
    };
  },
});
</script> 
<style>
.cmxm {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 4fr 4fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
   gap: 3px 6px; 
  grid-template-areas:
    "h1 h2"
    "c1 c2"
    "c3 c4"
    "f1 f2";
}

.h1 {
  grid-area: h1;
}

.h2 {
  grid-area: h2;
}

.c1 {
  grid-area: c1;
}

.c2 {
  grid-area: c2;
}

.c3 {
  grid-area: c3;
}

.c4 {
  grid-area: c4;
}

.f1 {
  grid-area: f1;
}

.f2 {
  grid-area: f2;
}

.col11 {
  background: rgba(185, 88, 88, 0.12);

  padding: 8px;
}

.col22 {
  padding: 8px;
}

.column table.tbl-lon {
  font-size: 0.8rem;
}

.x11 {
  background: rgba(2, 33, 33, 0.34);
}
.x21 {
  background: rgba(200, 33, 33, 0.34);
}

.x12 {
  background: rgba(191, 95, 255, 0.34);
}
.x22 {
  background: rgba(20, 223, 233, 0.34);
}

.mxm1 {
  width: 100%;
  table-layout: fixed;
}

table.mxm1 tr {
  vertical-align: top;
}
</style>