<template lang="pug">
.simple-dc(
  v-bind:class="{ 'simple-dc-cols': ui.tipo === 'row', 'simple-dc-rows': ui.tipo === 'col' }"
)
  .col-aa
    h2.simple-dc-head(v-bind:class="dc")
      span.dc00 {{ msgUI(dc) }}
    button.hm(v-on:click="ui.tipo = 'row'") r
    button.hm(v-on:click="ui.tipo = 'col'") c    
    d-c-lon(v-bind:dc="dc", v-bind:objKey="dc")
  .col-bb(v-if="modelo && modelo.otm && m_dc && m_dc.l && m_dc.l.length > 0") 
    .otm
      button(
        v-for="p_ch in modelo.otm",
        :key="'btn-' + dc + '_' + p_ch.n",
        v-on:click="changeShowChild(p_ch.n)",
        v-bind:class="{ 'is-open': viewOptions.showChild[p_ch.n] === true }"
      ) {{ p_ch.n }}

    template(v-for="p_ch in modelo.otm", :key="dc + '_' + p_ch.n")
      transition(name="fade0")
        .bx-dclon(
          v-if="currentItem !== undefined && viewOptions.showChild[p_ch.n] === true"
        ) 
          h3.sub-dc * {{ p_ch.n }}
          router-link.button(
            :to="{ name: 'simpledc', params: { dc: p_ch.t } }"
          ) Ir
          d-c-lon(
            v-bind:dc="p_ch.t",
            v-bind:objKey="dc + '_' + p_ch.n",
            v-bind:parentDc="dc",
            v-bind:parentObjKey="dc",
            v-bind:parentOnRelation="p_ch.onRelation ? p_ch.onRelation : dc",
            v-bind:parentDcMyName="p_ch.n"
          )
          div(v-if="modelo.otm2") 
            .otm2
              template(
                v-for="p_ch2 in modelo.otm2",
                :key="'btn-ch2-' + p_ch2.n"
              )
                button(
                  v-if="p_ch2.from === p_ch.n",
                  :key="'btn-' + dc + '_' + p_ch2.n",
                  v-on:click="changeShowChild(p_ch.n+':'+p_ch2.n)",
                  v-bind:class="{ 'is-open': viewOptions.showChild[p_ch.n+':'+p_ch2.n] === true }"
                ) {{ p_ch2.n }} {{p_ch.n}} 
            template(v-for="p_ch2 in modelo.otm2", :key="dc + '_' + p_ch2.n" ) 
              transition(name="fade0") 
                
                .bx-dclon(
                  v-if="currentItem !== undefined && viewOptions.showChild[p_ch.n+':'+p_ch2.n] === true && p_ch2.from === p_ch.n && canViewMDc(dc + '_' + p_ch.n)"
                ) 
                  h4.sub-dc ** {{ p_ch2.n }}
                  d-c-lon(
                      v-bind:dc="p_ch2.t",
                      v-bind:objKey="dc + '_' + p_ch.n+ '_' + p_ch2.n",
                      v-bind:parentDc="p_ch.t",
                      v-bind:parentObjKey="dc + '_' + p_ch.n",
                      v-bind:parentOnRelation="p_ch2.onRelation ? p_ch2.onRelation : p_ch.t",
                      v-bind:parentDcMyName="p_ch2.n"
                  )
</template>
<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  defineAsyncComponent,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  inject,
} from "vue";
import { useRoute } from "vue-router";

import { dcModelStore, dcDataStore } from "../store/DCModelStore";
const DCLon = defineAsyncComponent(() => import("../components/DCLon.vue"));
export default defineComponent({
  components: { DCLon },
  setup(props, context) {
    const route = useRoute();
    const dc = computed(() => {
      return route.params.dc;
    });
    const msgUI = inject("msgUI");
    const viewOptions = ref({ showChild: {} });
    const changeShowChild = (dcp) => {
      let v = viewOptions.value.showChild[dcp];
      viewOptions.value.showChild[dcp] = v === undefined ? true : !v;
    };




    const ui = ref({ tipo: "row" });
    const currentItem = computed(() => {
      const dc:any = route.params.dc
      return dcDataStore.getState().currentItems[dc];
    });

    const modelo = computed(() => {
      if (dcModelStore.getState().mapa !== undefined) {
        const dc:any = route.params.dc
        return dcModelStore.getState().mapa[dc];
      }
    });

    const m_dc = computed(() => {
      const dc:any = route.params.dc
      return dcDataStore.getState().listDcs[dc];
    });

    const canViewMDc = computed(() => (v) => {
      const mdc00 = dcDataStore.getState().listDcs[v]
      console.log(v,mdc00)
      return (mdc00 && mdc00.l && mdc00.l.length>0)? true:false
    });

    onMounted(() => {
      console.log(
        "%c Montado " + route.params.dc,
        "background:green; padding:18px;"
      );
    });
    onUpdated(() => {
      console.log(
        "%c Actualizado completo " + route.params.dc,
        "background:cyan; padding:12px;"
      );
    });

    onBeforeUpdate(() => {
      console.log(
        "%c Antes de actualizar " + route.params.dc,
        "background:orange; padding:12px;"
      );
    });

    return {
      dc,
      modelo,
      currentItem,
      m_dc,
      viewOptions,
      changeShowChild,
      msgUI,
      ui,canViewMDc
    };
  },
});
</script>
<style>
.simple-dc {
  display: flex;  
}

.simple-dc-cols {
  flex-direction: column;
}

.simple-dc-rows {
  flex-direction: row;
}

.simple-dc-rows .col-aa {
  width: 25%;
}
.simple-dc-rows .col-bb {
  width: 75%;
}

.otm {
  background: #76bad53d;
  padding-top: 2px;
  padding-right: 1.5em;
  padding-bottom: 8px;
  margin: 8px;
  font-size: 0.8em;
  display: inline-block;
}

.otm2 {
  background: #76bad53d;
  padding-top: 2px;
  padding-right: 2em;
  padding-bottom: 0px;
  padding-left: 2em;
  margin: 8px;
  font-size: 0.8em;
}

.simple-dc-head {
  margin: 0; 

}

.sub-dc {  
  margin: 0;
}

.is-open::after {
  content: " \2714 ";
  text-shadow: 2px 1px 2px green, 1px 1px 4px #fffb00;
}

.bx-dclon {
  border: 1px solid #cff;
  margin: 8px;
}

.fade0-enter-active,
.fade0-leave-active {
  transition: opacity 0.5s ease;
}

.fade0-enter-from,
.fade0-leave-to {
  opacity: 0;
}

.base {
  color: #120020;
}
.departament {
  color: #122620;
}
.departament a {
  color: #122620;
}
.departament a:visited {
  color: #122620;
}

.userLon {
  color: #d74040;
}

.userLon a {
  color: #d74040;
}
.userLon a:visited {
  color: #d74040;
}
.contractIn {
  background: green;
}
.contractOut {
  background: orange;
}

.dc00 {
  padding: 4px;
  margin: 5px;
}

@media screen and (max-width: 600px) {

}
</style>
