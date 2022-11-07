<template>
  <div v-if="ztatOtmVal && key0 && ztatOtmVal[key0]">
    {{ztatOtmVal[key0]['count']}}     
  </div>
  <div v-else>
    &nbsp;
  </div>
</template>
<script lang="ts">
import { defineComponent,computed } from "vue";
import ops from "../../liblon/OpsLon";
import tabLonOp from "../../liblon/TableLonOperations";

export default defineComponent({
  props: {
    dc: String,
    dc_n:String,
    e0_id:Number,
    objKey:String,
    keyPath:String

  },
  name: "tds-ztat",
  setup(props, context) {
    const { modelo, dc,objKey } = ops(<any>props, context);

    const { ztatOtmVal } = tabLonOp(props, context);

    const key0 = computed(()=>{
      return `${props.keyPath}:${props.e0_id}`
    })

    const keyPath = computed(()=>{
      return props.keyPath
    })

    return {
      modelo,
      dc,
      ztatOtmVal,key0,objKey,keyPath
    };
  },
});

</script>

