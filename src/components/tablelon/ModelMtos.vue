
<template>
<template v-for="(dc0, dcp) in modelo.mto">
    <slot name="header" :dcp="dcp" :dc0="dc0"></slot>
</template>   
<template v-for="(dc0, dcp) in modelo.mto2">
    <slot name="header" :dcp="dcp" :dc0="dc0"></slot>
</template>  
<template v-for="(dc0, dcp) in modelo.mto3">
    <slot name="header" :dcp="dcp" :dc0="dc0"></slot>
</template>  
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
//import { msgUIDataStore } from "../../store/dcmodel-store";
export default defineComponent({
  name: "model-mtos",
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
