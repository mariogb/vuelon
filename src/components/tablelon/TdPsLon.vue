<template>
  <td v-bind:data-label="dlabel" v-if="isVisible">
    {{ e0[pi] }}
  </td>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
//import { msgUIDataStore } from "../../store/DCModelStore";
export default defineComponent({
  name: "td-ps-lon",
  props: { dc: String, p: Object, pi: String, isVisible: Boolean, e0: Object },
  setup(props, context) {
    const dlabel = computed(() => {
      let k = props.dc + "_" + props.pi;
      return k//msgUIDataStore.elMsg(k);
    });

    const e0 = computed(() => {
      return props.e0;
    });
    const dc = computed(() => {
      return props.dc;
    });
    const p = computed(() => {
      return props.p;
    });
    const pi = computed(() => {
      return props.pi;
    });
    const isVisible = computed(() => {
      const v = props.isVisible;
      return v === undefined || v === true;
    });

    

    return {
      dc,
      p,
      pi,
      dlabel,
      isVisible,e0
    };
  },
});
</script> 