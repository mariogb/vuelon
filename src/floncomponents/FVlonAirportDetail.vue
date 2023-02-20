
<template lang="pug">
h2 Detail for Airport
.airport {{ airport_id }} {{ airport.pname }}

.ff_detail
  .dcp2.inCommingFligths
    .title inCommingFligths
    .form_full 
      .ppp_form2 
        .a.frm-gpo
          label.ffa 
            span fromAirport
            input(
              name="fromAirport",
              type="text",
              v-model="item_ac_fromAirport_f_inCommingFligths['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_fromAirport_f_inCommingFligths('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_fromAirport_f_inCommingFligths && ldco00_fromAirport_f_inCommingFligths.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_fromAirport_f_inCommingFligths.l",
                  :key="e0.id",
                  v-on:click="put_fromAirport_f_inCommingFligths(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_fromAirport_f_inCommingFligths && item_fromAirport_f_inCommingFligths.id"
              ) 
                h3 {{ item_fromAirport_f_inCommingFligths.pname }}
                .it2-pkey ---- {{ item_fromAirport_f_inCommingFligths.pkey }}

        .a.frm-gpo
          label.ffa 
            span toAirport
        .a.frm-gpo
          label.ffa 
            span plane
            input(
              name="plane",
              type="text",
              v-model="item_ac_plane_f_inCommingFligths['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_plane_f_inCommingFligths('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_plane_f_inCommingFligths && ldco00_plane_f_inCommingFligths.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_plane_f_inCommingFligths.l",
                  :key="e0.id",
                  v-on:click="put_plane_f_inCommingFligths(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_plane_f_inCommingFligths && item_plane_f_inCommingFligths.id"
              ) 
                h3 {{ item_plane_f_inCommingFligths.pname }}
                .it2-pkey ---- {{ item_plane_f_inCommingFligths.pkey }}

      .item0-ps-formula

      .form2 
        .a
          label.ff-detail-bb 
            span.ffa1 pkey
            input(
              name="pkey",
              type="text",
              v-model="item0_f_inCommingFligths['pkey']"
            )
          p(
            v-if="error_f_inCommingFligths && error_f_inCommingFligths['pkey']"
          )
            span.error {{ error_f_inCommingFligths['pkey'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 pname
            input(
              name="pname",
              type="text",
              v-model="item0_f_inCommingFligths['pname']"
            )
          p(
            v-if="error_f_inCommingFligths && error_f_inCommingFligths['pname']"
          )
            span.error {{ error_f_inCommingFligths['pname'] }}

    .a 
      button(v-on:click="add_inCommingFligths") Add

    .tab-container 
      table.blueTable.m_dc_inCommingFligths(
        v-if="m_dc_inCommingFligths && m_dc_inCommingFligths.l"
      )
        thead
          tr 
            th 
            span.fromAirport fromAirport
            span.plane plane
          tr.xx 
            th
              span.sp-th.nCol pkey
            th
              span.sp-th.nCol pname

        template(v-for="(r, idx) in m_dc_inCommingFligths.l") 
          tbody.l-inCommingFligths
            tr 
              th 
                span.fromAirport {{ r['fromAirport_pname'] }}
                span.plane {{ r['plane_pname'] }}
            tr.xx 
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}

  .dcp2.outCommingFligths
    .title outCommingFligths
    .form_full 
      .ppp_form2 
        .a.frm-gpo
          label.ffa 
            span fromAirport
        .a.frm-gpo
          label.ffa 
            span toAirport
            input(
              name="toAirport",
              type="text",
              v-model="item_ac_toAirport_f_outCommingFligths['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_toAirport_f_outCommingFligths('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_toAirport_f_outCommingFligths && ldco00_toAirport_f_outCommingFligths.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_toAirport_f_outCommingFligths.l",
                  :key="e0.id",
                  v-on:click="put_toAirport_f_outCommingFligths(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_toAirport_f_outCommingFligths && item_toAirport_f_outCommingFligths.id"
              ) 
                h3 {{ item_toAirport_f_outCommingFligths.pname }}
                .it2-pkey ---- {{ item_toAirport_f_outCommingFligths.pkey }}

        .a.frm-gpo
          label.ffa 
            span plane
            input(
              name="plane",
              type="text",
              v-model="item_ac_plane_f_outCommingFligths['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_plane_f_outCommingFligths('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_plane_f_outCommingFligths && ldco00_plane_f_outCommingFligths.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_plane_f_outCommingFligths.l",
                  :key="e0.id",
                  v-on:click="put_plane_f_outCommingFligths(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_plane_f_outCommingFligths && item_plane_f_outCommingFligths.id"
              ) 
                h3 {{ item_plane_f_outCommingFligths.pname }}
                .it2-pkey ---- {{ item_plane_f_outCommingFligths.pkey }}

      .item0-ps-formula

      .form2 
        .a
          label.ff-detail-bb 
            span.ffa1 pkey
            input(
              name="pkey",
              type="text",
              v-model="item0_f_outCommingFligths['pkey']"
            )
          p(
            v-if="error_f_outCommingFligths && error_f_outCommingFligths['pkey']"
          )
            span.error {{ error_f_outCommingFligths['pkey'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 pname
            input(
              name="pname",
              type="text",
              v-model="item0_f_outCommingFligths['pname']"
            )
          p(
            v-if="error_f_outCommingFligths && error_f_outCommingFligths['pname']"
          )
            span.error {{ error_f_outCommingFligths['pname'] }}

    .a 
      button(v-on:click="add_outCommingFligths") Add

    .tab-container 
      table.blueTable.m_dc_outCommingFligths(
        v-if="m_dc_outCommingFligths && m_dc_outCommingFligths.l"
      )
        thead
          tr 
            th 
            span.toAirport toAirport
            span.plane plane
          tr.xx 
            th
              span.sp-th.nCol pkey
            th
              span.sp-th.nCol pname

        template(v-for="(r, idx) in m_dc_outCommingFligths.l") 
          tbody.l-outCommingFligths
            tr 
              th 
                span.toAirport {{ r['toAirport_pname'] }}
                span.plane {{ r['plane_pname'] }}
            tr.xx 
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
</template>

<script lang="ts">
import { computed, ref } from "@vue/reactivity";
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import {
  doList,
  doSave,
  handleError,
  formatPrice,
} from "../store/DCModelStore";
export default defineComponent({
  name: "airport-detail" /**      ******* */,
  setup(props, context) {
    /*
    const sumL = (m,k) =>{
      const l = m.v.l
      if(l){        
        return l.reduce( (acc, currVal) => acc + currVal,0)
      }
      return 0
    }*/

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

    const route = useRoute();

    const airport = ref({
      pkey: String,
      id: Number,
      pname: String,
    });

    const airport_id = computed(() => {
      return route.params.airport_id;
    });

    const load = () => {
      const p = {
        dc: "airport",
        params: { id: route.params.airport_id, max: 1 },
      };
      doList(p)
        .then((r) => {
          if (r && r.l && r.l.length > 0) {
            airport.value = r.l[0];

            loadList_inCommingFligths();

            loadList_outCommingFligths();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const m_dc_inCommingFligths = ref({ l: [] });
    const item0_f_inCommingFligths = ref({
      pkey: "",
      pname: "",
    });
    const error_f_inCommingFligths = ref({});

    const add_inCommingFligths = () => {
      const it0: any = {};
      it0["pkey"] = [Math.random(), "a"].join("-");

      const v0 = item0_f_inCommingFligths.value;

      it0["pname"] = v0["pname"];
      //toAirport fromAirport
      it0["fromAirport_id"] = item_fromAirport_f_inCommingFligths.value["id"];
      //toAirport plane
      it0["plane_id"] = item_plane_f_inCommingFligths.value["id"];
      it0["toAirport_id"] = airport.value.id;

      const payload = { dc: "fligth", item: it0 };
      doSave(payload)
        .then((r) => {
          console.log("added inCommingFligths");
          console.log(r);
        })
        .catch((e) => {
          handleError(e, error_f_inCommingFligths);
        });
    };

    const loadList_inCommingFligths = () => {
      const payload = {
        dc: "fligth",
        params: { toAirport_id: airport.value.id },
      };
      doList(payload).then((res: any) => {
        m_dc_inCommingFligths.value = res;
      });
    };

    //AA DETAIL
    const item_ac_fromAirport_f_inCommingFligths = ref({});
    const item_fromAirport_f_inCommingFligths = ref({});
    const ldco00_fromAirport_f_inCommingFligths = ref({});
    const updateAC_fromAirport_f_inCommingFligths = (k: string) => {
      const v = item_ac_fromAirport_f_inCommingFligths.value;
      const pv = v[k]; //
      update(k, pv, "airport", ldco00_fromAirport_f_inCommingFligths);
    };

    //PUT
    const put_fromAirport_f_inCommingFligths = (e, o) => {
      item_fromAirport_f_inCommingFligths.value = e;

      if (o) {
        ldco00_fromAirport_f_inCommingFligths.value = { l: [] };
      }
    };

    //AA DETAIL
    const item_ac_plane_f_inCommingFligths = ref({});
    const item_plane_f_inCommingFligths = ref({});
    const ldco00_plane_f_inCommingFligths = ref({});
    const updateAC_plane_f_inCommingFligths = (k: string) => {
      const v = item_ac_plane_f_inCommingFligths.value;
      const pv = v[k]; //
      update(k, pv, "plane", ldco00_plane_f_inCommingFligths);
    };

    //PUT
    const put_plane_f_inCommingFligths = (e, o) => {
      item_plane_f_inCommingFligths.value = e;

      if (o) {
        ldco00_plane_f_inCommingFligths.value = { l: [] };
      }
    };

    const m_dc_outCommingFligths = ref({ l: [] });
    const item0_f_outCommingFligths = ref({
      pkey: "",
      pname: "",
    });
    const error_f_outCommingFligths = ref({});

    const add_outCommingFligths = () => {
      const it0: any = {};
      it0["pkey"] = [Math.random(), "a"].join("-");

      const v0 = item0_f_outCommingFligths.value;

      it0["pname"] = v0["pname"];
      //fromAirport toAirport
      it0["toAirport_id"] = item_toAirport_f_outCommingFligths.value["id"];
      //fromAirport plane
      it0["plane_id"] = item_plane_f_outCommingFligths.value["id"];
      it0["fromAirport_id"] = airport.value.id;

      const payload = { dc: "fligth", item: it0 };
      doSave(payload)
        .then((r) => {
          console.log("added outCommingFligths");
          console.log(r);
        })
        .catch((e) => {
          handleError(e, error_f_outCommingFligths);
        });
    };

    const loadList_outCommingFligths = () => {
      const payload = {
        dc: "fligth",
        params: { fromAirport_id: airport.value.id },
      };
      doList(payload).then((res: any) => {
        m_dc_outCommingFligths.value = res;
      });
    };

    //AA DETAIL
    const item_ac_toAirport_f_outCommingFligths = ref({});
    const item_toAirport_f_outCommingFligths = ref({});
    const ldco00_toAirport_f_outCommingFligths = ref({});
    const updateAC_toAirport_f_outCommingFligths = (k: string) => {
      const v = item_ac_toAirport_f_outCommingFligths.value;
      const pv = v[k]; //
      update(k, pv, "airport", ldco00_toAirport_f_outCommingFligths);
    };

    //PUT
    const put_toAirport_f_outCommingFligths = (e, o) => {
      item_toAirport_f_outCommingFligths.value = e;

      if (o) {
        ldco00_toAirport_f_outCommingFligths.value = { l: [] };
      }
    };

    //AA DETAIL
    const item_ac_plane_f_outCommingFligths = ref({});
    const item_plane_f_outCommingFligths = ref({});
    const ldco00_plane_f_outCommingFligths = ref({});
    const updateAC_plane_f_outCommingFligths = (k: string) => {
      const v = item_ac_plane_f_outCommingFligths.value;
      const pv = v[k]; //
      update(k, pv, "plane", ldco00_plane_f_outCommingFligths);
    };

    //PUT
    const put_plane_f_outCommingFligths = (e, o) => {
      item_plane_f_outCommingFligths.value = e;

      if (o) {
        ldco00_plane_f_outCommingFligths.value = { l: [] };
      }
    };

    watch(airport_id, () => {
      load();
    });

    setTimeout(() => {
      load(), 255;
    });

    return {
      airport_id,
      airport,
      formatPrice,

      //
      m_dc_inCommingFligths,
      loadList_inCommingFligths,
      item0_f_inCommingFligths,
      add_inCommingFligths,
      error_f_inCommingFligths,
      ///fromAirport
      item_fromAirport_f_inCommingFligths,
      item_ac_fromAirport_f_inCommingFligths,
      updateAC_fromAirport_f_inCommingFligths,
      ldco00_fromAirport_f_inCommingFligths,
      put_fromAirport_f_inCommingFligths,

      ///plane
      item_plane_f_inCommingFligths,
      item_ac_plane_f_inCommingFligths,
      updateAC_plane_f_inCommingFligths,
      ldco00_plane_f_inCommingFligths,
      put_plane_f_inCommingFligths,

      //Custom for inCommingFligths

      //End Custom for inCommingFligths

      //
      m_dc_outCommingFligths,
      loadList_outCommingFligths,
      item0_f_outCommingFligths,
      add_outCommingFligths,
      error_f_outCommingFligths,
      ///toAirport
      item_toAirport_f_outCommingFligths,
      item_ac_toAirport_f_outCommingFligths,
      updateAC_toAirport_f_outCommingFligths,
      ldco00_toAirport_f_outCommingFligths,
      put_toAirport_f_outCommingFligths,

      ///plane
      item_plane_f_outCommingFligths,
      item_ac_plane_f_outCommingFligths,
      updateAC_plane_f_outCommingFligths,
      ldco00_plane_f_outCommingFligths,
      put_plane_f_outCommingFligths,

      //Custom for outCommingFligths

      //End Custom for outCommingFligths
    };
  },
});
</script>
<style>
.ff {
  display: flex;
  align-items: stretch;
  background: blueviolet;
  padding: 8px;
  flex-direction: column;
}

.form_full {
  background: rgba(2, 33, 44, 0.67);
  padding: 3px;
}

.form2 {
  display: flex;
  overflow: auto;
  margin: 7px;
  flex-wrap: wrap;
  box-shadow: 3px 3px 3px purple;
  border-radius: 6px;
  border: 2px #9526c8 inset;
  padding: 7px;
  flex-wrap: wrap;
}

.ppp_form2 {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.dcp2 {
  background: beige;
  padding: 8px;
  margin: 5px;
  width: 50vw;
}

.a {
  background: #4e8db7;
  padding: 4px;
  margin: 2px;
  box-shadow: 2px 2px 2px darkblue;
  font-size: 1.12em;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  font-family: Lato;
  font-weight: bold;
  border-radius: 9px 6px 3px 2px;
}

.ppp_form2 {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.ffa1 {
  display: flex;
  display: inline-block;
  padding-right: 0.5em;
  text-align: right;
  border-bottom: 1px solid #aaa;
  padding-bottom: 1px;
}
.btn-stock-rack-product {
  background: yellow;
  color: purple;
  border: 0;
  margin: 2px;
}

.ctls-res {
  background: orangered;
  margin: 4px;
  padding: 8px;
}

span.quantity {
  background: rgb(223, 24, 197);
  color: aqua;
  padding: 6px;
}

span.error {
  background: #fff;
  color: #f00;
  font-size: 12px;
}

.ps-formula-l {
  display: flex;
}

.ps-formula-l p {
  font-weight: bolder;
  font-size: 1.42em;
  display: flex;
  flex-direction: column;
  width: 11em;
  background: #4e8db7;
}

.ff_detail {
  display: flex;
  width: 100vw;
}
</style> 