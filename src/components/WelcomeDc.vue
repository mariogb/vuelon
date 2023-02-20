<template lang="pug">
    h2 Welcome

</template>
<script lang="ts">
import { defineComponent } from "vue";
import ops from "../liblon/OpsLon";
export default defineComponent({
  name: "welcome-dc",

  props: {
    dc: String,
    objKey: String,
    parentObjKey: String,
    parentObjKey2: String,
    parentDc: String,
    parentDc2: String,
    parentDcMyName: String,
    parentDc2MyName: String,
    parentOnRelation: String,
    parentOnRelation2: String,
    elId: Number,
    isForSearch: Boolean,
  },



  setup(props:any, context) {

    const {
      modelo,
      elPc,
      dc,
      objKey,
      parentOnRelation,
      parentOnRelation2,
      parentObjKeyModel,
      parentObjKey,
      parentObjKey2,
      m_dc,
      losPs,
      losPsBool,
      currentParentDcItem,
      currentParentDcItem2,
    } = ops(props, context);

    return {
      modelo,
      elPc,
      dc,
      objKey,
      parentOnRelation,
      parentOnRelation2,
      parentObjKeyModel,
      parentObjKey,
      parentObjKey2,
      m_dc,
      losPs,
      losPsBool,
      currentParentDcItem,
      currentParentDcItem2,
    };
  },
});


</script> 