<template lang="pug">
nav.menu-main.second
  .hover-lon-p
    button.open-menu(v-on:click="ocm('m1')") LIST DCS
    ul.menu1.mm.hover-lon-ch-sh(v-show="UI.openedMenu ==='m1'")
      li 
        a(href="#/w/admui" , v-on:click="clMenu()") | ADMUI
      li 
        a(href="#/w/elg" , v-on:click="clMenu()") | elG
      template(v-for="dck in ldcs", :key="'l_' + dck") 
        li.dcbtn(v-bind:class="dck")
          button(v-on:click="wgoto(dck)") {{ mimsgUI(dck) }} 

  .hover-lon-p
    button.open-menu(v-on:click="ocm('m2')") MXM
    ul.menu1.mm.hover-lon-ch-sh(v-show="UI.openedMenu ==='m2'")
      li 
        router-link(
          :to="{ name: 'mxm', params: { dcch: 'baseTimePeriod', dcpn1: 'base', dcpn2: 'timePeriod' } }", v-on:click="clMenu()"
        ) {{ mimsgUI('baseTimePeriod_m_base_x_timePeriod') }} |
      li 
        router-link(
          :to="{ name: 'mxm', params: { dcch: 'fligth', dcpn1: 'fromAirport', dcpn2: 'toAirport' } }", v-on:click="clMenu()"
        ) {{ mimsgUI('Fligths by airports') }} |
      li 
        router-link(
          :to="{ name: 'mxm', params: { dcch: 'baseUserLon', dcpn1: 'base', dcpn2: 'userLon' } }", v-on:click="clMenu()"
        ) {{ mimsgUI('Usr x Sede') }} |
      li 
        router-link(
          :to="{ name: 'mxm', params: { dcch: 'departamentBaseTimePeriod', dcpn1: 'baseTimePeriod', dcpn2: 'departament' } }", v-on:click="clMenu()"
        ) {{ mimsgUI('departamentBaseTimePeriod_m_baseTimePeriod_x_departament') }} |
      li 
        router-link(
          :to="{ name: 'mxm', params: { dcch: 'contractOut', dcpn1: 'thirdPerson', dcpn2: 'departamentBaseTimePeriod' } }", v-on:click="clMenu()"
        ) {{ mimsgUI('contractOut_m_thirdPerson_x_departamentBaseTimePeriod') }} |

.wel-main 
    router-view
</template>
<script lang="ts">
import { ref, defineComponent, computed, onMounted, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { dcModelStore } from "../store/DCModelStore";
//import msg000 from "../liblon/MsgFactory"
export default defineComponent({
  name: "welcome",
  setup(props, context) {
    const route = useRoute();
    const router = useRouter();

    const UI = ref({ openedMenu:''});

    const mimsgUI = computed(() => (k) => {
      const v = dcModelStore.getState().mMUI[k];
      return v !== undefined ? v.list_name : k;
    });

    provide("msgUI", mimsgUI);

    const ocm = (v)=>{
      const v2 = UI.value.openedMenu;
      if(v===v2){
        UI.value.openedMenu= "";
        return
      }

      UI.value.openedMenu = v;
    }

    const wgoto = (dck) =>{

      router.push({name: 'simpledc', params: { dc: dck } })
      UI.value.openedMenu="";
    }

    const clMenu = ()=>{
      UI.value.openedMenu=''
    }

    onMounted(() => {
      console.log("Welcome mounted!");
      dcModelStore
        .loadMasterModel()
        .then((r) => {})
        .catch((e) => {
          if (e.response) {
            alert(e.response.statusText + " [" + e.response.status + "]");
            return;
          }
          alert("No response");
        });
      //  msgUIDataStore.load();
    });

    const mm = computed(() => {
      return dcModelStore.getState().mapa;
    });

    const ldcs = computed(() => {
      //const m = msg000()
      //m.msgUIs()
      const l: Array<string> = [];
        const mmA = dcModelStore.getState().mapa;
      if (mmA !== undefined) {
       
        for (let dck in mmA) {
          const dcv = mmA[dck]
         // m.msgUIs(dcv.dcname)
          l.push(dcv.dc);
        }
      }
      return l.sort((a, b) => {
        return a > b ? 1 : -1;
      });
    });

    const elDc = computed(() => {
      return route.params["dc"];
    });

    return { mm, ldcs, elDc, UI, mimsgUI,wgoto,clMenu,ocm };
  },
});
</script> 
<style>

.menu-main{  
  padding: 0px;
  margin: 0px;
}

li.dcbtn button{
  width: 100%;
  text-align: left;
}

.open-menu {
  font-size: 16px;
  background: rgb(23, 83, 212);
  color: azure;
}

.menu1{
  max-height: 400px;
  overflow: auto;
 }

.menu1 li {
  padding: 2px;
}

</style>