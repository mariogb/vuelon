
<template lang="pug">
button.btn-sort(v-on:click="fncb(p.n)") 
  span {{ label }}
  span(v-show="typePropertySort === p.n + '_asc'") &darr;
  span(v-show="typePropertySort === p.n + '_desc'") &uarr;
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
export default defineComponent({
  name: "head-sub-win-lon",
  props: {
    p: Object,
    fncb: Function,
    label: String,
    typePropertySort: String,
    //  e0:Object
  },
  setup(props, context) {
    const p = computed(() => {
      return props.p;
    });
    const typePropertySort = computed(() => {
      return props.typePropertySort;
    });
    const label = computed(() => {
      return props.label;
    });
    const showBody = ref(true);
    const fncb = computed(() => {
      return props.fncb;
    });

    return {
      p,
      showBody,
      label,
      typePropertySort,
      fncb,
    };
  },
});
</script>
<style>
.btn-sort {
  background: #0000;
  font-size: 1.2em;
  border: 0;
  color: var(--tbl-h-col);
  cursor: pointer;
}
</style>