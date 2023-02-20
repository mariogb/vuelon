<template lang="pug">
.pags(v-if="numPages > 1") 
  .pag-buttons
    button(v-show="1 < currentPage", v-on:click="setPage0(currentPage - 1)") Prev
    template(v-for="(pag0, idx) in lasPaginas")
      span(v-if="pag0 !== -1")
        button(v-if="pag0 != currentPage", v-on:click="setPage0(pag0)") {{ pag0 }}
        span.curr(v-if="pag0 === currentPage") {{ pag0 }}
      span(v-if="pag0 === -1") ...

    button(
      v-show="currentPage < numPages",
      v-on:click="setPage0(currentPage + 1)"
    ) Next
</template>  


<script lang="ts" >
import { pagination } from "../store/DCModelStore";

import { computed } from "vue";
//import { dcDataStore } from "../store/dcmodel-store";
import ops from "../liblon/OpsLon";

export default {
  props: {
    dc: String,
    m_dc: Object, //recived as Object in props
    objKey: String,
  },
  emits: ["setPage0"],
  setup(props: any, context) {
    // const m_dc = computed(() => {
    //   return props.m_dc; //dcDataStore.getState().listDcs[props.dc];
    // });

    const { pagData } = ops(props, context);

    const currentPage = computed(() => {
      return pagData.value.currentPage; // props.currentPage
    });
    const numPages = computed(() => {
      return pagData.value.numPages; // props.numPages
    });
    const lasPaginas = computed(() => {
      if (numPages.value < 1 /* props.numPages<1*/) {
        return [];
      }
      return pagination(
        currentPage.value,
        numPages.value /*props.currentPage,props.numPages*/
      );
    });
    const setPage0 = (n) => {
      context.emit("setPage0", { n: n });
    };

    return {
      currentPage,
      numPages,
      lasPaginas,
      setPage0,
    };
  },
};
</script>
<style>
.pags {
  display: flex;
  flex-direction: row;
}

span.curr {
  background: rgb(190, 240, 9);
  color: black;
  padding: 8px;
}
.pag-buttons {
  background: #25316d;
  color: red;
  padding: 6px;
  width: 100%;
  text-align: center;
}
.pag-buttons span {
  margin-left: 3px;
  margin-right: 3px;
}

.pag-buttons button {
  font-size: 0.8em;
  line-height: 1em;
  background: linear-gradient(#79bbff, #378de5);
  color: #25316d;
  border: solid;
}
</style>