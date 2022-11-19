<template lang="pug">
.table-lon(v-if="modelo !== undefined")
  .total-rows(v-if="m_dc !== undefined")
    span Total {{ m_dc.total }}

  .tbl-container
    .cc(v-if="showTable !== true")
      button(v-on:click="add()", style="display: block; margin: 0 auto") Agregar nuevo
    table.tbl-lon(v-if="showTable")
      thead
        tr
          th.th-idx
            span #
            input.tbl-lon-nav.hm(
              ref="table_navigator",
              type="text",
              v-on:keyup.arrow-down="downRow()",
              v-on:keyup.arrow-up="upRow()",
              v-on:keyup.page-down="nextPage()",
              v-on:keyup.page-up="previousPage()",
              @focus="inTableFocus = true",
              @blur="inTableFocus = false",
              size="2"
            )
          // Fisrt 2 fields
          template(v-if="visibleFields['pkey'] !== false")
            th.th-ps.th-pkey
              btn-sort-lon(
                :p="{ n: 'pkey' }",
                :fncb="putSort",
                :label="msgUI(dc + '_pkey')",
                :typePropertySort="typePropertySort"
              )

          template(v-if="elPc && visibleFields[elPc] !== false")
            th.th-ps.th-pc
              btn-sort-lon(
                :p="{ n: elPc }",
                :fncb="putSort",
                :label="msgUI(dc + '_' + elPc)",
                :typePropertySort="typePropertySort"
              )
          // end Fisrt 2 fields
          template(
            v-for="(p, pi) in losPs.filter((p) => { return p.n !== 'pkey' && p.n !== elPc; })",
            :key="'th_' + pi"
          )
            template(v-if="visibleFields[p.n] !== false")
              th.th-ps(v-bind:class="dc + '_' + p.n")
                btn-sort-lon(
                  :p="p",
                  :fncb="putSort",
                  :label="msgUI(dc + '_' + p.n)",
                  :typePropertySort="typePropertySort"
                )

          model-mtos(v-bind:modelo="modelo")
            template(v-slot:header="p000")
              template(v-if="visibleFields[p000.dc0.n] !== false")
                th.th-mto(
                  v-if="p000.dc0.n !== parentOnRelation",
                  v-bind:class="dc + '_' + p000.dc0.n"
                )
                  | {{ p000.dc0.n }} id,pkey
          model-otms(v-bind:modelo="modelo")
            template(v-slot:body="p000")
              th.th-otm(
                v-bind:class="dc + '_' + p000.dc0.n",
                :key="'h_' + p000.dc0.n",
                v-if="isVisibleZtatOtm(p000.dc0.keyPath)"
              )
                | {{ p000.dc0.n }} {{ p000.dc0.from }}
          th.th-actions(v-if="visibleFields['Actions'] !== false")
            | Actions
            input(type="checkbox")
      tbody
        tr(
          v-for="(e0, idx) in m_dc.l",
          v-bind:key="e0.id",
          v-bind:class="{ 'tr-current': currentItem && currentItem.item && currentItem.item.id === e0.id, 'is-new': e0.isNew, 'is-updated': e0.isUpdated }"
        )
          th.th-idx(
            v-bind:data-label="idx + 1 + (currentPage - 1) * maxPag",
            v-on:click="setCurrentItem(e0)"
          )
            | {{ idx + 1 + (currentPage - 1) * maxPag }}
          // 2 first
          template(v-if="visibleFields['pkey'] !== false")
            th.th-pkey(
              v-bind:class="[dc + '_pkey', 'pkey']",
              v-bind:data-label="msgUI(dc + '_pkey')"
            )
              span.pkey {{ e0['pkey'] }}
          // pc    
          template(v-if="elPc && visibleFields[elPc] !== false")
            th.th-pc(
              v-bind:class="[dc + '_' + elPc, elPc]",
              v-bind:data-label="msgUI(dc + '_' + elPc)"
            )
              span.pc {{ e0[elPc] }}
          // end 2 first
          template(
            v-bind:data-label="p.n",
            v-for="(p, pi) in losPs.filter((p) => { return p.n !== 'pkey' && p.n !== modelo.pc; })",
            :key="'td_' + pi"
          )
            td.td-ps(
              v-if="visibleFields[p.n] !== false",
              v-bind:class="dc + '_' + p.n",
              v-bind:data-label="p.n"
            )
              span(v-bind:class="p.n") {{ e0[p.n] }}
          model-mtos(v-bind:modelo="modelo")
            template(v-slot:header="p000")
              td(
                v-if="p000.dc0.n !== parentOnRelation && visibleFields[p000.dc0.n] !== false",
                v-bind:data-label="p000.dc0.n"
              )
                span.tlon-pkey
                  | {{  e0[p000.dc0.n + &quot;_pkey&quot;]  }}
                span(v-if="p000.dc0.pc !== undefined")
                  |
                  | {{  e0[p000.dc0.n + &quot;_&quot; + p000.dc0.pc]  }}
          model-otms(v-bind:modelo="modelo")
            template(v-slot:body="p000")
              td.td-otm(
                v-bind:class="dc + '_' + p000.dc0.n",
                v-if="isVisibleZtatOtm(p000.dc0.keyPath)",
                v-bind:key="'tt' + p000.dcp",
                v-bind:data-label="p000.dc0.n"
              ) 
           
                TdsZtat(
                  v-bind:objKey="objKey",
                  v-bind:dc="p000.dc0.t",
                  v-bind:dc_n="p000.dc0.n",
                  v-bind:e0_id="e0.id",
                  v-bind:keyPath="p000.dc0.keyPath"
                )

          td.actions(
            data-label="Actions",
            v-if="visibleFields['Actions'] !== false"
          )
            span
              button(v-on:click="edit(e0.id)") Edt
              button(v-on:click="delete0(e0)") Del
              input(type="checkbox")
  span(v-if="numPages > 0") Pagina {{ currentPage }} de {{ numPages }}
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  defineComponent,
  reactive,
  watch,
  onUpdated,
  inject,
} from "vue";

import ops from "../liblon/OpsLon";
import tabLonOp from "../liblon/TableLonOperations";
import BtnSortLon from "./BtnSortLon.vue";
import { dcModelStore, dcDataStore, dcZtatStore } from "../store/DCModelStore";
import ModelMtos from "./tablelon/ModelMtos.vue";
import ModelOtms from "./tablelon/ModelOtms.vue";
import TdsZtat from "./tablelon/TdsZtat.vue";

export default {
  components: {
    ModelMtos,
    ModelOtms,
    BtnSortLon,
    TdsZtat,
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
  emits: ["edit", "setPage0", "delete0", "putSort", "add"],
  setup(props, context) {
    const inTableFocus = ref(false);
    const currentPage = computed(() => {
      return pagData.value.currentPage;
    });
    const numPages = computed(() => {
      return pagData.value.numPages; // props.numPages
    });
    const {
      table_navigator,
      doInTableFocus,
      setCurrentItem,
      idxTbl,
      downRow,
      upRow,
      pagData,
      nextPage,
      previousPage,
      maxPag,
      visibleFields,
      changeVisibleFields,
      isVisibleMto,
      ztatChilds,
      ztatOtmVal,
      isVisibleZtatOtm,
      hasZtatVal,
      putSort,
      edit,
      add,
      delete0,
      doChange,
    } = tabLonOp(props, context);

    const {
      modelo,
      dc,
      m_dc,
      objKey,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      parentOnRelation,
      parentOnRelation2,
      currentItem,
      losPs,
      elPc,
    } = ops(props, context);

    const msgUI = inject("msgUI");

    const showTable = computed(() => {
      const v = m_dc.value;
      return v !== undefined && v.l !== undefined && v.l.length > 0;
    });

    const parentDcChildName = computed(() => {
      return props.parentDcChildName;
    });

    const losMto = computed(() => {
      const mto = modelo.value.mto;
      if (mto) {
        //p000.dc0.n !== parentOnRelation
        return mto.filter((p) => {
          return p.n !== props.parentOnRelation;
        });
      }
      return [];
    });

    const elSort = computed(() => {
      return dcDataStore.getState().sortDcs[props.objKey];
    });

    const typePropertySort = computed(() => {
      let s00 = dcDataStore.getState().sortDcs[props.objKey];
      if (s00 !== undefined && s00["l"].length > 0) {
        const o = s00["l"][0];
        return o["sortProp"] + "_" + o["sortDir"];
      }
      return "N";
    });

    return {
      dc,
      objKey,
      modelo,
      m_dc,
      setCurrentItem,
      currentPage,
      numPages,
      currentItem,
      maxPag,
      table_navigator,
      downRow,
      upRow,
      nextPage,
      previousPage,
      inTableFocus,
      delete0,
      parentDc,
      parentDc2,
      ztatChilds,
      parentDcChildName,
      ztatOtmVal,
      isVisibleZtatOtm,
      parentOnRelation,
      parentOnRelation2,
      edit,
      add,
      losPs,
      losMto,
      doChange,
      visibleFields,
      msgUI,
      typePropertySort,
      elSort,
      putSort,
      elPc,
      showTable,
    };
  },
};
</script>
<style lang="less">
.txt_left() {
  text-align: left;
  padding-left: 6px;
  padding-right: 6px;
}

.min-width() {
  min-width: 92px;
}

.tbl-container {
  overflow: auto;
  max-width: 100vw;
  padding-bottom: 18px;
  

  .tbl-lon {
    white-space: nowrap;
    border-collapse: separate;
    border-spacing: 1px;
    thead {
      th {
        position: sticky;
        top: 0;
        z-index: 1;
      }
      tr {
        background: var(--table-thead-background);
        color: var(--table-thead-color);
      }
    }
    td {
      .txt_left();
    }
    tbody {
      th {
        .txt_left();
        position: relative;
        position: sticky;
        left: 0;
        z-index: 1;
      }
    }
    .th-pc {
      position: sticky;
      left: 64px;
      z-index: 8;
    }

    tr {
      &:nth-child(2n) {
        background: var(--table-oddrow-color);
      }
    }
    caption {
      .txt_left();
      padding: 0.25rem;
      position: sticky;
      left: 0;
    }
    tr.tr-current {
      background: var(--table-current-color);
    }
    .tr-current {
      .th-idx {
        &::before {
          content: "*>";
          position: absolute;
          left: -8px;
          background: var(--table-current-color);
        }
      }
    }

    .td-mto {
      .min-width();
    }
    .th-mto {
      .min-width();
    }
    .th-otm {
      .min-width();
    }
    th.pkey {
      max-width: 80px;
    }
    .td-otm {
      text-align: center;
    }

    .th-idx {
      position: sticky;
      left: 0;
      z-index: 4;
      width: 2.5em;
      text-align: right;
      padding-right: 0.5rem;
      position: relative;
      padding-left: 0.5rem;
      cursor: pointer;
    }

    .th-pkey {
      position: sticky;
      left: 32px;
      z-index: 6;
    }
  }
}

.actions {
  width: 6em;
  text-align: center;

  button {
    background: var(--primary);
    border: 0;
    border-radius: 12px;
  }
}

.col-idx {
  background: #eee8aa;
}
.tbl-lon-nav {
  position: absolute;
  left: -10000px;
  width: 0.56rem;
  font-size: 0.72rem;
}

span.tlon-pkey {
  margin-right: 12px;
  padding: 2px;
}

.th-actions {
  width: 6em;
  text-align: center;
}

.tbl-lon2 {
  border: 0;
  width: 96%;
  caption {
    font-size: 1.3em;
  }
  thead {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  tbody {
    height: 360px;
    overflow: auto;
    display: block;
    scroll-snap-type: y mandatory;
  }
  tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
    scroll-snap-align: start;
  }
  td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 0.9em;
    text-align: right;
    padding-right: 8px;
    span {
      min-width: 2rem;
      display: inline-block;
    }
    &::before {
      content: attr(data-label);
      float: left;
      font-weight: 700;
      text-transform: uppercase;
    }
    &:first-child {
      background: rgb(165, 9, 17);
      width: 100%;
      text-align: right;
    }
    &:last-child {
      border-bottom: 0;
      width: 90%;
      text-align: right;
    }
  }
}

@media screen and (max-width: 600px) {
  .tbl-lon {
    border: 0;
    width: 100%;
    caption {
      font-size: 1.3em;
    }
    thead {
      border: 0;
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      width: 1px;
    }
    tbody {
      height: 360px;
      overflow: auto;
      display: block;
      scroll-snap-type: y mandatory;
      .th-pkey {
        width: 100%;
      }
    }
    tr {
      border-bottom: 3px solid #ddd;
      display: block;
      margin-bottom: 0.625em;
      scroll-snap-align: start;
    }
    td {
      border-bottom: 1px solid #ddd;
      display: block;
      text-align: right;
      padding-right: 8px;
      span {
        min-width: 2rem;
        display: block;
        text-align: right;
        padding: 4px;
      }
      &::before {
        content: attr(data-label);
        float: left;
        font-size: 0.8rem;
      }
      &:first-child {
        background: rgb(165, 9, 17);
        width: 100%;
        text-align: right;
      }
      &:last-child {
        border-bottom: 0;
        width: 90%;
        text-align: right;
      }
    }
  }
}
</style>