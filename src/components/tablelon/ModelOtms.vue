
<template>
<template v-for="(dc0, dcp) in modelo.otm">
    <slot name="body" :dcp="dcp" :dc0="dc0" :level="1"></slot>
</template>   
<template v-for="(dc0, dcp) in modelo.otm2">
    <slot name="body" :dcp="dcp" :dc0="dc0" :level="2"></slot>
</template>  
<template v-for="(dc0, dcp) in modelo.otm3">
    <slot name="body" :dcp="dcp" :dc0="dc0" :level="3"></slot>
</template>  
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
//import { msgUIDataStore } from "../../store/dcmodel-store";
export default defineComponent({
  name: "model-otms",
  props:{
      modelo:Object
   //   dc:String,
    //  e0:Object
  },
  setup(props,context){
      const modelo = computed(()=>{
          return props.modelo
      })
      return{
          modelo
      } 
  }
})
</script>