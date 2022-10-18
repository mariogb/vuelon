<template lang="pug">
h2 Pruebas
hr 
div
   .ff(v-for="(dcv,dck) in elMM")   
      .r(v-for="dcp1 in dcv.mto")  
        .r {{dck}} -&gt; {{dcp1.t}} [label = "{{dcp1.n}}"] 


</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { dcModelStore} from "../store/DCModelStore";

export default defineComponent({
  name: "admin-mui",
  setup(props, context) {

    const elMM = computed(()=>{
        return dcModelStore.getState().mapa;
    })  

    return {
        elMM
    };
  },
});
</script>