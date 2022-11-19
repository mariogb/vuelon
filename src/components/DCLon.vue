<template>
  <div class="dc-lon-comp">
    <div class="dc-btns-cont">
      <div class="show-btns">
        <button
          class="btn-showBtns-open"
          v-on:click="responiveShowBtns = !responiveShowBtns"
          title="Actions"
        >
          -
        </button>
      </div>

      <div class="dc-btns" v-show="responiveShowBtns === true">
        <button class="btn-list" v-on:click="doList()" title="List records">
          List
        </button>
        <button
          class="btn-add"
          v-on:click="showSubWin('viewForm')"
          title="Add new record"
        >
          Add
        </button>

        <button
          class="btn-filter"
          v-bind:class="{ 'warning-light': isFilterOn }"
          v-on:click="showSubWin('viewFilter')"
          title="Filter records"
        >
          Filter
        </button>
        <button
          class="btn-import-xls"
          v-on:click="showSubWin('viewUpXlsForm')"
          title="Import from Excel file"
        >
          Import
        </button>
        <button
          class="btn-download-xls"
          v-on:click="downloadExcelFile(0)"
          title="Download in excel file"
        >
          Download
        </button>
        <button
          class="btn-download-xls"
          v-on:click="downloadExcelFile('y')"
          title="Download in excel file with id info"
        >
        Download w/Ids
        </button>

        <TblShowColumns
          v-bind:dc="dc"
          v-bind:objKey="objKey"
          v-bind:parentDc="parentDc"
          v-bind:parentObjKey="parentObjKey"
          v-bind:parentDc2="parentDc2"
          v-bind:parentObjKey2="parentObjKey2"
        />
      </div>
    </div>

    <my-win
      v-bind:myUI="myUI"
      v-bind:fnCb="showSubWin"
      v-bind:subWin="'viewFilter'"
      v-bind:label="'Search/Filter '"
    >
      <template v-slot:content0>
        <FilterLon
          v-bind:dc="dc"
          v-bind:objKey="objKey"
          v-bind:parentObjKey="parentObjKey"
          v-bind:parentDc="parentDc"
          v-on:doList="doList()"
        ></FilterLon>
      </template>
    </my-win>

    <my-win
      v-bind:myUI="myUI"
      v-bind:fnCb="showSubWin"
      v-bind:subWin="'viewForm'"
      v-bind:label="'Add '"
    >
      <template v-slot:content0>
        <FormLon
          v-bind:dc="dc"
          v-bind:objKey="objKey"
          v-bind:parentObjKey="parentObjKey"
          v-bind:parentDc="parentDc"
          v-bind:parentOnRelation="parentOnRelation"
          v-bind:parentOnRelation2="parentOnRelation2"
          v-bind:parentObjKey2="parentObjKey2"
          v-bind:editId="editId"
          ref="laForma"
        ></FormLon>
      </template>
    </my-win>
    <my-win
      v-bind:myUI="myUI"
      v-bind:fnCb="showSubWin"
      v-bind:subWin="'viewUpXlsForm'"
      v-bind:label="'Upload from excel file '+1 "
    >
      <template v-slot:content0>
        <excel-file-upload
          v-bind:dc="dc"
          v-bind:objKey="objKey"
        ></excel-file-upload>
      </template>
    </my-win>
    <div class="dccomp_body">
  
      <TableLon
        v-bind:dc="dc"
        v-bind:objKey="objKey"
        v-bind:parentDc="parentDc"
        v-bind:parentObjKey="parentObjKey"
        v-bind:parentDc2="parentDc2"
        v-bind:parentObjKey2="parentObjKey2"
        v-on:setPage0="putPage"
        v-on:delete0="doDelete"
        v-on:putSort="putSort"
        v-on:edit="doEdt"
        v-on:add="doAdd"
        v-bind:parentOnRelation="parentOnRelation"
      ></TableLon>
      <PaginationLon
        v-bind:dc="dc"
        v-bind:objKey="objKey"
        v-bind:m_dc="m_dc"
        v-on:setPage0="putPage"
      ></PaginationLon>
    </div>

    <div v-if="isForSearch === true">
      <button class="btn-add-selected" v-on:click="putParentVal00_()">
        Agregar seleccionado
      </button>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  onUpdated, 
  watch,
  defineAsyncComponent,
  nextTick,
} from "vue";

import { dcDataStore, delete00 } from "../store/DCModelStore";

//import TableLon from "./TableLon.vue";
const TableLon = defineAsyncComponent(() => import("./TableLon.vue"));

//import FormLon from "./FormLon.vue";
const FormLon = defineAsyncComponent(() => import("./FormLon.vue"));

import PaginationLon from "./PaginationLon.vue";
import ExcelFileUpload from "./ExcelFileUpload.vue";
import FilterLon from "./FilterLon.vue";

import MyWin from "./HeadSubWinLon.vue";

import ops from "../liblon/OpsLon";
import TblShowColumns from "./tablelon/TblShowColumns.vue";

export default {
  components: {
    TableLon,
    FormLon,
    PaginationLon,
    ExcelFileUpload,
    FilterLon,
    MyWin,
    TblShowColumns,
  },
  emits: ["putParentVal00"],
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

  setup(props, context) {
    const subWins = ["viewForm", "viewUpXlsForm", "viewFilter"];
    const responiveShowBtns = ref(true);

    let myEdo = "init";
    const {
      modelo,
      dc,
      m_dc,
      doListGral,
      objKey,
      putPage0,
      pagData,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      parentDcMyName,
      downloadExcelFile00,
      currentParentDcItem,
      parentOnRelation,
      parentOnRelation2,
      parentPagData2,
      isFilterOn,
    } = ops(props, context);

    const currentItem = computed(() => {
      return dcDataStore.getState().currentItems[props.objKey];
    });

    const putParentVal00_ = () => {
      console.log("aaaa", parentDcMyName.value);
      const it0 = dcDataStore.getState().currentItems[props.objKey]["item"];
      context.emit("putParentVal00", { pn: parentDcMyName.value, item: it0 });
    };

    const doList = () => {
      doListGral(1).then((d) => {
        myEdo = "x";
        //loadZChi
      });
    };

    /*

*/

    const doDelete = (id) => {
      const payload = { dc: props.dc, id: [id] };
      delete00(payload)
        .then((r) => {
          const d = r.data;
          if (d.r === 1) {
            // doListGral()
          }
          const crrpg = dcDataStore.pagData(props.dc).currentPage;
          doListGral(crrpg);
          console.log(r);
        })
        .catch((e) => {
          if (e.response !== undefined) {
            alert(`Error [${e.response.status}]  ${e.response.data.message}`);
          }
          for (var i in e) {
            console.log(i, e[i]);
          }
        });
    };

    const downloadExcelFile = (withIds /*estatus_download*/) => {
      downloadExcelFile00(withIds)
        .then((r) => {
          let a = window.document.createElement("a");
          a.href = window.URL.createObjectURL(new Blob([r.data]));
          a.setAttribute("download", r.name);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          //estatus_download['value'] = false
        })
        .catch((err) => {
          alert("Error descargando Excel");
          console.log(err);
          //estatus_download['value'] = false
        });
    };

    const putPage = (payload) => {
      putPage0(payload).then((d) => {
        // loadZchilds00();
      });
    };

    const myUI = ref({
      /*viewForm: false,
      viewUpXlsForm: false,
      viewFilter: false,*/
    });

    subWins.forEach((sw) => {
      myUI.value[sw] = false;
    });

    const vSW2 = (w) => {
      return localStorage.getItem(props.objKey + ":" + w);
    };
    const viewForm2 = computed(() => {
      return vSW2("viewForm");
    });

    const saveSubWinState = (eui, key0) => {
      localStorage.setItem(eui + ":" + key0, myUI.value[eui] + "");
    };
    const showSubWin = (eui) => {
      myUI.value[eui] = !myUI.value[eui];
      saveSubWinState(eui, props.objKey);

      nextTick(() => {
        const lfv = laForma.value;
        if (lfv) {
          if (eui === "viewForm" && myUI.value[eui]) {
            const rr = lfv.$refs;
            if (rr) {
              const theformp = rr.theformp;
              if (theformp) {
                const l_b =
                  theformp.getElementsByClassName("set-curr-dc-parent");
                if (l_b.length > 0) {
                  l_b[0].focus();
                  return;
                }
                const l_ins = theformp.getElementsByTagName("input");
                if (l_ins.length > 1) {
                  l_ins[0].focus();
                }
              }
            }
          }
        }
      });
    };

    const isForSearch = computed(() => {
      return props.isForSearch;
    });

    // const readPrefs = () => {
    //   console.log(
    //     "%c READING PEFERENCES FOR " + props.objKey,
    //     " background: pink;"
    //   );
    //   subWins.forEach((eui) => {
    //     const vf0 = localStorage.getItem(eui + ":" + props.objKey);
    //     myUI.value[eui] = vf0 === "true";
    //   });
    // };
    watch(props, () => {
      //readPrefs();
      console.log("cambio " + props.dc);
      subWins.forEach((sw) => {
        myUI.value[sw] = false;
      });
      doList();
    });

    watch(currentParentDcItem, () => {
      if (myEdo === "init") {
        myEdo = "x";
        console.log(" WATCH 1 INIT DCLON currentParentDcItem " + props.dc);
        return;
      }
      console.log(" WATCH  2 DCLON currentParentDcItem " + props.dc);
      doList();
    });

    watch(parentPagData2, () => {
      console.log("parentPagData2");
      doList();
    });

    const doLoadD = () => {
      setTimeout(() => {
        doList();
      }, 600);
    };

    const editId = ref(0);

    const doEdt = (id) => {
     
      myUI.value["viewForm"] = true;
      editId.value = id;
    };

    const doAdd = () =>{
      showSubWin('viewForm')
    }

    onMounted(() => {
      console.log(
        "%c DCLON Montado " + props.objKey,
        "background:#5fb; padding:18px;"
      );
    });
    onUpdated(() => {
      console.log(
        "%c DCLON Actualizado completo " + props.objKey,
        "background:cyan; padding:12px;"
      );
    });

    const putSort = (pi) => {
      dcDataStore.putSort(props.objKey, pi);
      doList();
    };

    const laForma = ref(null);

    //readPrefs();
    // if(currentParentDcItem.value===undefined){
    doLoadD();
    //}else{

    //}

    return {
      modelo,
      dc,
      doList,
      objKey,
      downloadExcelFile,
      pagData,
      m_dc,
      putPage,
      myUI,
      doDelete,
      parentDc,
      parentDc2,
      parentObjKey,
      parentObjKey2,
      parentDcMyName,
      currentParentDcItem,

      showSubWin,
      parentOnRelation,
      parentOnRelation2,
      editId,
      doEdt,
      responiveShowBtns,
      isForSearch,
      currentItem,
      putParentVal00_,
      viewForm2,
      putSort,
      laForma,
      parentPagData2,
      isFilterOn,doAdd
    };
  },
};
</script>
<style lang="less">
.dc-lon-comp {
  position: relative;
  border-radius: 4px;
}

.dccomp_body {
  position: relative;  
}

.dc-btns-cont {
  display: flex;
}



.dc-btns {
  margin-left: 12px;
}

.btn-add-selected {
  margin: 16px;
  padding: 9px;
  background: green;
  color: yellow;
}



.dc-btns button:hover {
  filter: hue-rotate(45deg);
  box-shadow: 2px 1px 1px #fa00fa;
}
@media screen and (max-width: 600px) {
  .dc-btns-cont button {
    font-size:20px;
  }

}

</style>