<template lang="pug">
.pags(v-if="pagData && pagData.numPages > 0")  
  .pag-buttons
    button(v-show="1 < pagData.currentPage", v-on:click="setPage0(pagData.currentPage - 1)") Prev
    template(v-for="(pag0, idx) in lasPaginas")
      span(v-if="pag0 !== -1")
        button(v-if="pag0 != pagData.currentPage", v-on:click="setPage0(pag0)") {{ pag0 }}
        span.curr(v-if="pag0 === pagData.currentPage") {{ pag0 }}
      span(v-if="pag0 === -1") ...

    button(
      v-show="pagData.currentPage < pagData.numPages",
      v-on:click="setPage0(pagData.currentPage + 1)"
    ) Next


</template>
<script lang="ts">
import { defineComponent,computed } from "vue";
import { doPagData, LDCObject, pagination } from "../store/DCModelStore";

export default defineComponent({
  name: "fv-pagination",
  props: {
    ldc: {
      type: Object as () => LDCObject,
    },
  },
  emits: ["setPage0"],
  setup(props, context) {
    const pagData = computed(() => {
        if(props.ldc){
            return doPagData(props.ldc);
        }
      
    });

    const setPage0 = (n) => {
      context.emit("setPage0", { n: n });
    };

    const lasPaginas = computed(() => {
        const v = pagData.value
        if(!v){
            return []
        }
      if (v.numPages < 1) {
        return [];
      }
      return pagination(
        v.currentPage,
        v.numPages 
      );
    });
    return {
      pagData,lasPaginas,setPage0
    };
  },
});
</script>
