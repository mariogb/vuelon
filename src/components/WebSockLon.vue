<template>
  <h3>WSLon</h3>
  <div>WS://{{props0.channel}}/{{props0.channelid}}</div>
  <input type="text" v-model="txt">
  <button v-on:click="w1">S</button>
</template>
<script lang="ts">
import { defineComponent,ref,computed } from "vue";
import wbSkLon from "../liblon/WbSkLon"
export default defineComponent({
  name: "web-sock-lon",
  props:{
      channel:String,
      channelid:Number
  },
  setup(props, context) {

      const fn1 = (payload) =>{
          console.log(payload)
        if(typeof(payload)==='object'){
            console.log(JSON.parse(payload))
        }
          
      }

      const props0 = computed(()=>{
        return props
      })

      const txt = ref('')
      const {write} = wbSkLon(props,fn1,context)



      const w1 = ()=>{
          write({txt:txt.value})
          txt.value=''
      }  
    return {
        w1,txt,props0

    };
  },
});
</script> 