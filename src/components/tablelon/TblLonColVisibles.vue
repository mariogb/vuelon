<template lang="pug">

.menu-cols-tbl(v-if="modelo !== undefined")
    .menu-cols-vis
      .menu-cols-vis-head
        button(
          v-on:click="showCols['psymto'] = !showCols['psymto']",
          v-bind:class="{ 'lon-s': showCols['psymto'] === true }"
        )
          | Columnas visibles X
      .menu-cols-vis-body(v-show="showCols['psymto'] === true")
        form
          fieldset
            template.menu-col-e-vis.th-ps(
              v-for="(p, pi) in losPs",
              :key="'td_' + pi"
            )
              div(v-if="p.n !== 'pkey'")
                input(
                  type="checkbox",
                  v-bind:checked="visibleFields[p.n] !== false",
                  v-on:change="doChange($event)",
                  v-bind:data-pn="p.n"
                )
                label {{ p.n }}
                hr
            model-mtos(v-bind:modelo="modelo")
              template(v-slot:header="p000")
                .menu-col-e-vis.th-mto
                  input(
                    type="checkbox",
                    v-on:change="doChange($event)",
                    v-bind:data-pn="p000.dc0.n",
                    v-bind:checked="visibleFields[p000.dc0.n] !== false"
                  )
                  label {{ p000.dc0.n }}
                  span(v-if="p000.dc0.n === parentOnRelation") **No debo de ver este
                  hr
            .menu-col-e-vis.col-action
              input(
                type="checkbox",
                v-bind:checked="visibleFields['Actions'] !== false",
                v-on:change="doChange($event)",
                data-pn="Actions"
              )
              label Actions
              hr
    .menu-cols-vis(v-if="modelo.otm")
      .menu-cols-vis-head
        button(
          v-on:click="showCols['ztats'] = !showCols['ztats']",
          v-bind:class="{ 'lon-s': showCols['ztats'] === true }"
        )
          | Ztats X
      .menu-cols-vis-body(v-show="showCols['ztats'] === true")
        form
          fieldset
            model-otms(v-bind:modelo="modelo")
              template(v-slot:body="p000")
                .menu-col-e-vis-th-otm
                  input(
                    type="checkbox",
                    v-on:change="doChangeZ($event)",
                    v-bind:data-dcch="p000.dc0.t",
                    v-bind:data-dcpn_dcch='\ p000.dc0.onRelation ? p000.dc0.onRelation : modelo.dc\ ',
                    v-bind:data-pn="p000.dc0.n",
                    v-bind:checked="\ ztatChilds !== undefined &&\ ztatChilds[p000.dc0.n] !== undefined &&\ ztatChilds[p000.dc0.n]['enable'] === true\ ",
                    v-bind:name="p000.dc0.n"
                  )
                  label.menu-col-e-vis(v-bind:for="p000.dc0.n")  {{p000.dc0.n}}
                  small {{p000.level}}


</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import ModelMtos from "./tablelon/ModelMtos.vue";
import ModelOtms from "./tablelon/ModelOtms.vue";
//import { msgUIDataStore } from "../../store/dcmodel-store";
export default defineComponent({
  name: "tbl-lon-col-visibles",
  props: {
    modelo: Object,
    //   dc:String,
    //  e0:Object
  },
  components: {
    ModelMtos,
    ModelOtms,
  },
  setup(props, context) {
    const modelo = computed(() => {
      return props.modelo;
    });
    return {
      modelo,
    };
  },
});
</script>
