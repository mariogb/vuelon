
<template lang="pug">
.form-box(v-show="myUI[subWin] === true" v-bind:class="'form-box-'+subWin")   
  .wd-head.first 
    span.action {{label}}     
    .wd-btns     
       button(v-on:click="ui.showBody=!ui.showBody") &DownArrowBar;&UpArrowBar;
       button(v-on:click="fnCb(subWin)") X
    
  div.wd-body.second-l(v-show="ui.showBody===true")
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
   z-index: 8100;
  margin-top: 6px;
  margin-right: 32px;
  margin-left:32px;
  margin-bottom: 12px;
  box-shadow: 2px 2px 3px;
}

.wd-head {    
  margin: 0;
  height: 1.5em;
}
.wd-body {    
  margin: 0;
  padding: 12px;
  margin-bottom: 8px;;
}

.wd-btns{
  float: right;
}

</style>