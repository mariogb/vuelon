
<template lang="pug">
.form-box(v-show="myUI[subWin] === true" v-bind:class="'form-box-'+subWin")   
  .wd-head 
    span.action {{label}}     
    .wd-btns     
       button(v-on:click="ui.showBody=!ui.showBody") &DownArrowBar;&UpArrowBar;
       button(v-on:click="fnCb(subWin)") &olcross;
    
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
  padding-left: 8px;
  padding-right: 8px;
  border-radius: 8px;
  z-index: 8100;
  box-shadow: 2px 2px 3px #222;
  margin: 6px;
}

.wd-head {
  background: var(--primary);
  width: 100%;
  margin: 0;
  padding: 0;
  border: 2px groove #16136f;
  box-shadow: 3px 3px 3px black;
}
.wd-btns{
  float: right;
}

</style>