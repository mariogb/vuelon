
<template lang="pug">
.form-box(v-show="myUI[subWin] === true" v-bind:class="'form-box-'+subWin")   
  .wd-head.primary-dark 
    span.action {{label}}     
    .wd-btns     
       button(v-on:click="ui.showBody=!ui.showBody") &DownArrowBar;&UpArrowBar;
       button(v-on:click="fnCb(subWin)") X
    
  div(v-show="ui.showBody===true")
    slot(name="content0")
  
</template>
<script lang="ts">
import { defineComponent, computed,ref } from "vue";
export default defineComponent({
  name: "head-sub-win-lon",
  props: {
    subWin: String,
    myUI:Object,
    fnCb:Function,label:String
  },
  setup(props, context) {
    const subWin = computed(() => {
      return props.subWin;
    });

    const label = computed(()=>{
      return props.label
    })
    const ui  = ref({showBody:true})

    return {
      subWin,ui,label
    };
  },
});
</script>
<style>

.form-box {
  background: rgba(204, 204, 204, 0.54);  
  border-radius: 6px;
  z-index: 8100;
  box-shadow: 2px 2px 3px #222;
  margin-top: 6px;
  margin-right: 32px;;
}

.wd-head {    
  margin: 0;
  padding: 4px;
  margin-bottom: 8px;;
  box-shadow: 3px 3px 3px black;
}
.wd-btns{
  float: right;
}

</style>