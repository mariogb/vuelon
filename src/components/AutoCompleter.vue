<template lang="pug">
.auto-completer-lon.container 
  div(style="position: relative")
    .f1(v-if="ldco00.l !== undefined")
      .toselect(
        v-for="(e0, i0) in ldco00.l",
        :key="e0.id",
        v-bind:class="{ selected01: idxSelect === i0 }",
        v-on:click="select00(e0)"
      )
        template(
          v-bind:class="p.n",
          v-for="p in modeloDC.ps",
          :key="'p' + p.n"
        )
          span {{ p.n }} {{ e0[p.n] }}

    fieldset(v-if="modeloDC !== undefined")
      .row(v-for="pn in fldForSearch")
        .col-sm-12
          label {{ pn }}

        .col-sm-12
          input.slon(
            type="text",
            v-bind:name="pn",
            v-model="item00[pn]",
            autocomplete="off",
            placeholder="buscar",
            v-on:keyup.arrow-down="elementDown()",
            v-on:keyup.arrow-up="elementUp()",
            @input="update(pn)",
            v-on:blur="blur()",
            v-on:keyup.enter="select01()",
            v-bind:autofocus="pn === 'pkey'"
          )
</template>




<script lang="ts">
import { ref, computed, defineComponent, SetupContext, Ref } from "vue";
import { doList, dcModelStore, LDCObject } from "../store/DCModelStore";

export default defineComponent({
  name: "AutoCompleterLon",
  emits: ["putval0"],
  props: {
    dc: String,
    pn: String,
    fromDCParent1: String,
    objKey: String,
  },

  setup(props: any, context: SetupContext) {
    const item00 = ref({});

    let dc = computed(() => {
      return props.dc;
    });
    let pn = computed(() => {
      return props.pn;
    });

    const ppc = computed(() => {
      const v = dcModelStore.getState().mapa[props.dc];
      if (v !== undefined) {
        return v["pc"];
      }
    });

    const modeloDC = computed(() => {
      return dcModelStore.getState().mapa[props.dc];
    });

    const fldForSearch = computed(() => {
      const l_ = ["pkey"];
      const mv = modeloDC.value;
      if (mv !== undefined) {
        if (mv.pc !== undefined) {
          l_.push(mv.pc);
        }
        if (mv.ps !== undefined) {
          mv.ps
            .filter((p: any) => {
              return p.withIndex === true;
            })
            .forEach((p) => {
              l_.push(p.n);
            });
        }
      }

      return l_;
    });

    const objKey = computed(() => {
      return props.objKey;
    });

    const ldco00: Ref<LDCObject | any> = ref({});
    const idxSelect = ref(-1);

    const update = (k: string) => {
      const itv: any = item00.value;
      if (!itv) {
        return;
      }

      setTimeout(() => {
        let q = itv[k];

        if (q === undefined || q === null || q.length < 2) {
          return;
        }
        let params: any = { max: 4, withCount: 0 };
        params["il_" + k] = q;
        //params[k] = q;
        let payload = {
          dc: dc.value,
          params: params,
        };

        doList(payload)
          .then((ldco) => {
            ldco00.value = ldco;
            let n = ldco.l.length;
            if (n <= idxSelect.value) {
              idxSelect.value = n - 1;
            }
            console.log(ldco);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 255);
    };

    const elementDown = () => {
      if (idxSelect.value < ldco00.value.l.length - 1) {
        idxSelect.value++;
      }
    };

    const elementUp = () => {
      if (idxSelect.value > -1) {
        idxSelect.value--;
      }
    };
    const select00 = (elem0: any) => {
      context.emit("putval0", { pn: pn.value, elem0: elem0 });
      clear();
    };

    const select01 = () => {
      const v = idxSelect.value;
      if (v > -1 && v < ldco00.value.l.length) {
        select00(ldco00.value.l[v]);
        clear();
      }
    };

    const clear = () => {
      item00.value = {};
      ldco00.value = { l: [] };
      idxSelect.value = -1;
    };
    const blur = () => {
      //console.log(this.$refs)

      setTimeout(() => {
        clear();
      }, 658);
    };

    return {
      dc,
      pn,
      ppc,
      objKey,
      item00,
      ldco00,
      idxSelect,
      elementDown,
      elementUp,
      update,
      select00,
      blur,
      select01,
      modeloDC,
      fldForSearch,
    };
  },
});
</script>
<style>
.auto-completer-lon {
  box-shadow: 1px 2px 3px #000;
  position: relative;
  border-radius: 3px;
  padding: 4px;
}
.toselect {
  border: 1px solid #ccc;
  cursor: pointer;
  background: orange;
  padding: 8px;
  position: relative;
  z-index: 200;
}
.toselect:hover {
  background: green;
}
.selected01 {
  background: rgb(168, 231, 196);
}
.f1 {
  position: absolute;
  top: 0;
  left: 90px;
}
</style>