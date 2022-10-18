<template lang="pug">
button.open-mimenu(v-show="UI.showMenu!==true", v-on:click="UI.showMenu = true") LIST DCS

.wel-container
  
  .wel-col1(v-if="UI.showMenu === true")
    nav.mimenu 
      .mimenu-head
        button.close-mimenu(v-on:click="UI.showMenu = false") x
      .abc-links 
        a(href="#/welcomeThird/docCom1/b1") | Comprar

  .wel-col2     
    router-view


</template>
<script lang="ts">
import { ref, defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { dcModelStore } from "../store/DCModelStore";
export default defineComponent({
  name: "welcome-third",
  setup(props, context) {
    const route = useRoute();

    const UI = ref({ showMenu: true });

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
      const l:Array<string> = [];
      if (mm !== undefined) {
        for (let dck in mm.value) {
          l.push(dck);
        }
      }
      return l.sort((a, b) => {
        return a > b ? 1 : -1;
      });
    });

    const elDc = computed(() => {
      return route.params["dc"];
    });

    return { mm, ldcs, elDc, UI };
  },
});
</script> 
<style>
.menu-w {
  filter: hue-rotate(-45deg);
}

header.ldcs {
  height: 1.96rem;
  margin: 0;
  padding-bottom: 1.82rem;
  top: 28px;
}

.ldcs a.button {
  background: blue;
  color: antiquewhite;
}

.ldcs a.dc-selected {
  background: blueviolet;
}

.mimenu {
  display: flex;
  overflow: auto;  
  height: 100%;
}

.mimenu a {
  padding-right: 6px;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  margin-left: 4px;
}

.mimenu-head {
  text-align: right;
}

.button.close-mimenu {
  background: rosybrown;
}
.abc-links {
    background: rgb(209, 218, 208);
}

.wel-container{
  display: flex;
}

.wel-col1{
  position: relative;
  background: red;
}
.wel-col2{
  width: 100%;
}
</style>