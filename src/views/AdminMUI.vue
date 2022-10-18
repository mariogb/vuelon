<template lang="pug">
h2 Welcome
span {{ item0 }}
.flexlon
  ul.ldcs 
    li(v-for="dck in l_dcs", :key="'mm_' + dck")
      .dck(style="width: 200px; background: red") 
        button.set-dc(v-on:click="setElDc(dck)") {{ dck }}

  div(v-if="mmDc !== undefined && mmDc.ps !== undefined") 
    .form
      table
        tr 
          th 
            h3 {{ elDc }}
          th
            input.inputlon(type="text", size="32", v-model="item0[elDc]")
          th
            button.buttonlon(v-on:click="doSave0(elDc,0)") s
        tr(v-for="p in mmDc.ps", :key="'pp_' + p") 
          td
            span(v-bind:class="p.n") {{ p.n }}
          td
            input.inputlon(
              type="text",
              size="32",
              v-model="item0[elDc + '_' + p.n]"
            )
          td
            button.buttonlon(v-on:click="doSave0(elDc + '_' + p.n,1)") s
    .graph 
      .otm 
        h4 otm
        ul
          li(v-for="e_otm in mmDc.otm", :key="e_otm.n")
            span {{e_otm.n}}
            p {{e_otm}}
            p 
              strong MTO: 
              span {{elMapa[e_otm.t]['mto']}}
              

      .otm2 
        h4 otm2
        ul
          li(v-for="e_otm2 in mmDc.otm2", :key="e_otm2.n")
            span {{e_otm2.n}}
            p 
              span dc:  
              span  {{e_otm2}}
            
            p 
              strong MTO:   
              span {{elMapa[e_otm2.t]['mto']}}
            p 
              strong MTO2:   
              span {{elMapa[e_otm2.t]['mto2']}}              
            hr


      .mtos
        .mmm(v-for="mtoee in mmDc.mto")  
          p {{mtoee}}
          p {{elMapa[mtoee.t]}}
        



</template>
<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { dcModelStore, doSaveOnMap } from "../store/DCModelStore";

export default defineComponent({
  name: "admin-mui",
  setup(props, context) {
    const l_dcs = computed(() => {
      const mm = dcModelStore.getState().mapa;
      const l: Array<string> = [];
      if (mm !== undefined) {
        for (let dck in mm) {
          l.push(dck);
        }
      }
      return l.sort((a, b) => {
        return a > b ? 1 : -1;
      });
    });

    const elDc = ref("");
    const mmDc = computed(() => {
      if (elDc.value !== "") {
        return dcModelStore.getState().mapa[elDc.value];
      }
    });



    const elMapa = computed(()=>{
      return dcModelStore.getState().mapa
    })

    const item0 = ref({});
    //const item0Ids = ref({});
    const setElDc = (v) => {
      elDc.value = v;
      const m0 = dcModelStore.getState().mapa[elDc.value];
      const mMUI = dcModelStore.getState().mMUI;
      const dcui = mMUI[v];
      const itN2 = {};
      itN2[v] = dcui !== undefined ? dcui.list_name : "";
      if (m0.ps) {
        m0.ps.forEach((p) => {
          const k0 = v + "_" + p.n;
          const vmui = mMUI[k0];
          itN2[k0] = vmui !== undefined ? vmui.list_name : "";
        });
      }
      item0.value = itN2;
    };

    const doSave0 = (k,level) => {
      const v: string = item0.value[k];

      if (v) {
        const v2 = v.trim();
        if (v2.length > 0) {
          const py00 = {
            item: { pkey: k, label: v.trim() ,level:level,'dc':elDc.value},
            dc: "meUsrInterface",
          };

          const mMUI = dcModelStore.getState().mMUI;
          const vmui = mMUI[k];
          console.log(vmui);
          if (vmui) {
            py00["item"]["id"] = vmui["id"];
          }

          doSaveOnMap(py00)
            .then((d) => {
              console.log(d);
              dcModelStore.updateMMUI(k, v2, d["id"]);
            })
            .catch((err) => {
              console.log("Err saving");
            });
        }
      }
    };

    return {
      l_dcs,
      elDc,
      mmDc,
      setElDc,
      item0,
      doSave0,elMapa
    };
  },
});
</script> 
<style>
.flexlon {
  display: flex;
}
.ldcs {
  max-height: 300px;
  min-width: 320px;
  overflow: auto;
}
.labellon {
  width: 120px;
  padding-right: 12px;
}
.set-dc {
  width: 100%;
  text-align: left;
  font-size: 0.8em;
  background: rgb(175, 248, 141);
  margin-bottom: 1px;;
}
</style>