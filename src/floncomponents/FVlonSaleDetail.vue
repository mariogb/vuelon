
<template lang="pug">
h2 Detail for Sale
.sale {{ sale_id }} {{ sale.pname }}

.ff_detail
  .dcp2.invoiceLines
    .title invoiceLines
    .form_full 
      .ppp_form2 
        .a.frm-gpo
          label.ffa 
            span sale
        .a.frm-gpo
          label.ffa 
            span product
            input(
              name="product",
              type="text",
              v-model="item_ac_product_f_invoiceLines['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_product_f_invoiceLines('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_product_f_invoiceLines && ldco00_product_f_invoiceLines.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_product_f_invoiceLines.l",
                  :key="e0.id",
                  v-on:click="put_product_f_invoiceLines(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_product_f_invoiceLines && item_product_f_invoiceLines.id"
              ) 
                h3 {{ item_product_f_invoiceLines.pname }}
                .it2-pkey ---- {{ item_product_f_invoiceLines.pkey }}

        .a.frm-gpo
          label.ffa 
            span stockRackProduct
            input(
              name="stockRackProduct",
              type="text",
              v-model="item_ac_stockRackProduct_f_invoiceLines['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_stockRackProduct_f_invoiceLines('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_stockRackProduct_f_invoiceLines && ldco00_stockRackProduct_f_invoiceLines.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_stockRackProduct_f_invoiceLines.l",
                  :key="e0.id",
                  v-on:click="put_stockRackProduct_f_invoiceLines(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_stockRackProduct_f_invoiceLines && item_stockRackProduct_f_invoiceLines.id"
              ) 
                h3 {{ item_stockRackProduct_f_invoiceLines.pname }}
                .it2-pkey ---- {{ item_stockRackProduct_f_invoiceLines.pkey }}

      .item0-ps-formula
        p.item0
          span.subtotal subtotal {{ item0_f_invoiceLines_psFormula_subtotal }}
        p.item0
          span.descount descount {{ item0_f_invoiceLines_psFormula_descount }}
        p.item0
          span.tax tax {{ item0_f_invoiceLines_psFormula_tax }}
        p.item0
          span.total total {{ item0_f_invoiceLines_psFormula_total }}
      .form2 
        .a
          label.ff-detail-bb 
            span.ffa1 pkey
            input(
              name="pkey",
              type="text",
              v-model="item0_f_invoiceLines['pkey']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['pkey']")
            span.error {{ error_f_invoiceLines['pkey'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 askDate
            input(
              name="askDate",
              type="datetime-local",
              v-model="item0_f_invoiceLines['askDate']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['askDate']")
            span.error {{ error_f_invoiceLines['askDate'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 askQuantity
            input(
              name="askQuantity",
              type="number",
              v-model="item0_f_invoiceLines['askQuantity']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['askQuantity']")
            span.error {{ error_f_invoiceLines['askQuantity'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 createdDate
            input(
              name="createdDate",
              type="datetime-local",
              v-model="item0_f_invoiceLines['createdDate']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['createdDate']")
            span.error {{ error_f_invoiceLines['createdDate'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 descountPorcent
            input(
              name="descountPorcent",
              type="number",
              v-model="item0_f_invoiceLines['descountPorcent']"
            )
          p(
            v-if="error_f_invoiceLines && error_f_invoiceLines['descountPorcent']"
          )
            span.error {{ error_f_invoiceLines['descountPorcent'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 orden
            input(
              name="orden",
              type="number",
              v-model="item0_f_invoiceLines['orden']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['orden']")
            span.error {{ error_f_invoiceLines['orden'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 price
            input(
              name="price",
              type="number",
              v-model="item0_f_invoiceLines['price']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['price']")
            span.error {{ error_f_invoiceLines['price'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 status
          select(name="status", v-model="item0_f_invoiceLines['status']")
            option(value="PENDENT") PENDENT
            option(value="SUPPLIED") SUPPLIED
            option(value="CANCEL") CANCEL
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['status']")
            span.error {{ error_f_invoiceLines['status'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 supplyDate
            input(
              name="supplyDate",
              type="datetime-local",
              v-model="item0_f_invoiceLines['supplyDate']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['supplyDate']")
            span.error {{ error_f_invoiceLines['supplyDate'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 supplyQuantity
            input(
              name="supplyQuantity",
              type="number",
              v-model="item0_f_invoiceLines['supplyQuantity']"
            )
          p(
            v-if="error_f_invoiceLines && error_f_invoiceLines['supplyQuantity']"
          )
            span.error {{ error_f_invoiceLines['supplyQuantity'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 taxPorcent
            input(
              name="taxPorcent",
              type="number",
              v-model="item0_f_invoiceLines['taxPorcent']"
            )
          p(v-if="error_f_invoiceLines && error_f_invoiceLines['taxPorcent']")
            span.error {{ error_f_invoiceLines['taxPorcent'] }}

      .sum-var
        p.subtotal
          label subtotal
          span {{ sums_vars_invoiceLines['subtotal'] }}

        p.descount
          label descount
          span {{ sums_vars_invoiceLines['descount'] }}

        p.tax
          label tax
          span {{ sums_vars_invoiceLines['tax'] }}

        p.total
          label total
          span {{ sums_vars_invoiceLines['total'] }}

    .a 
      button(v-on:click="add_invoiceLines") Add

    .tab-container 
      table.blueTable.m_dc_invoiceLines(
        v-if="m_dc_invoiceLines && m_dc_invoiceLines.l"
      )
        thead
          tr 
            th 
            span.product product
            span.stockRackProduct stockRackProduct
          tr.xx 
            th
              span.sp-th.nCol pkey
            th
              span.sp-th.nCol askDate
            th
              span.sp-th.nCol askQuantity
            th
              span.sp-th.nCol createdDate
            th
              span.sp-th.nCol descountPorcent
            th
              span.sp-th.nCol orden
            th
              span.sp-th.nCol price
            th
              span.sp-th.nCol status
            th
              span.sp-th.nCol supplyDate
            th
              span.sp-th.nCol supplyQuantity
            th
              span.sp-th.nCol taxPorcent

        template(v-for="(r, idx) in m_dc_invoiceLines.l") 
          tbody.l-invoiceLines
            tr 
              th 
                span.product {{ r['product_pname'] }}
                span.stockRackProduct {{ r['stockRackProduct_pname'] }}
            tr.xx 
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}
              td
                span.sp-td.nCol {{ r['nCol'] }}

  .dcp2.payments
    .title payments
    .form_full 
      .ppp_form2 
        .a.frm-gpo
          label.ffa 
            span paymentInForm
            input(
              name="paymentInForm",
              type="text",
              v-model="item_ac_paymentInForm_f_payments['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_paymentInForm_f_payments('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_paymentInForm_f_payments && ldco00_paymentInForm_f_payments.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_paymentInForm_f_payments.l",
                  :key="e0.id",
                  v-on:click="put_paymentInForm_f_payments(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_paymentInForm_f_payments && item_paymentInForm_f_payments.id"
              ) 
                h3 {{ item_paymentInForm_f_payments.pname }}
                .it2-pkey ---- {{ item_paymentInForm_f_payments.pkey }}

        .a.frm-gpo
          label.ffa 
            span sale
        .a.frm-gpo
          label.ffa 
            span inAccount
            input(
              name="inAccount",
              type="text",
              v-model="item_ac_inAccount_f_payments['pkey']",
              autocomplete="off",
              placeholder="buscar",
              @input="updateAC_inAccount_f_payments('pkey')",
              v-on:keyup.enter="select01()"
            ) 
            .resac
              .resacf1(
                v-if="ldco00_inAccount_f_payments && ldco00_inAccount_f_payments.l"
              )
                .resac-e(
                  v-for="(e0, i0) in ldco00_inAccount_f_payments.l",
                  :key="e0.id",
                  v-on:click="put_inAccount_f_payments(e0, 1)"
                )
                  span.pkey {{ e0.pkey }}
              .item-dc-p2(
                v-if="item_inAccount_f_payments && item_inAccount_f_payments.id"
              ) 
                h3 {{ item_inAccount_f_payments.pname }}
                .it2-pkey ---- {{ item_inAccount_f_payments.pkey }}

      .item0-ps-formula

      .form2 
        .a
          label.ff-detail-bb 
            span.ffa1 pkey
            input(name="pkey", type="text", v-model="item0_f_payments['pkey']")
          p(v-if="error_f_payments && error_f_payments['pkey']")
            span.error {{ error_f_payments['pkey'] }}

        .a
          label.ff-detail-bb 
            span.ffa1 quantity
            input(
              name="quantity",
              type="number",
              v-model="item0_f_payments['quantity']"
            )
          p(v-if="error_f_payments && error_f_payments['quantity']")
            span.error {{ error_f_payments['quantity'] }}

    .a 
      button(v-on:click="add_payments") Add

    .tab-container 
      table.blueTable.m_dc_payments(v-if="m_dc_payments && m_dc_payments.l")
        thead
          th #
          th pkey
          th quantity
          th PaymentOutForm

        template(v-for="(r, idx) in m_dc_payments.l") 
          tbody.l-payments

          td 
            span monetaryAccount_pname {{ r.monetaryAccount_pname }}
          td 
            span paymentOutType_pname {{ r.paymentOutType_pname }}
          td 
            span quantity {{ r.quantity }}
</template>

<script lang="ts">
import { computed, ref } from "@vue/reactivity";
import { defineComponent, watch } from "vue";
import { useRoute } from "vue-router";
import {
  doList,
  doSave,
  handleError,
  formatPrice,
} from "../store/DCModelStore";
export default defineComponent({
  name: "sale-detail" /**      ******* */,
  setup(props, context) {
    /*
    const sumL = (m,k) =>{
      const l = m.v.l
      if(l){        
        return l.reduce( (acc, currVal) => acc + currVal,0)
      }
      return 0
    }*/

    const update = (k: string, pv, dcp, ldco00) => {
      if (pv) {
        setTimeout(() => {
          let params: any = { max: 4, withCount: 0 };

          params[["il_", k].join("")] = pv;

          let payload = {
            dc: dcp,
            params: params,
          };

          doList(payload)
            .then((ldco) => {
              ldco00.value = ldco;
              //let n = ldco.l.length;
              //  if (n <= idxSelect.value) {
              // idxSelect.value = n - 1;
              //  }
              console.log(ldco);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 265);
      }
    };

    const route = useRoute();

    const sale = ref({
      pkey: String,
      id: Number,
      pname: String,
    });

    const sale_id = computed(() => {
      return route.params.sale_id;
    });

    const load = () => {
      const p = { dc: "sale", params: { id: route.params.sale_id, max: 1 } };
      doList(p)
        .then((r) => {
          if (r && r.l && r.l.length > 0) {
            sale.value = r.l[0];

            loadList_invoiceLines();

            loadList_payments();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const m_dc_invoiceLines = ref({ l: [] });
    const item0_f_invoiceLines = ref({
      pkey: "",
      askDate: "",
      askQuantity: 0,
      createdDate: "",
      descountPorcent: 0,
      orden: 0,
      price: 0,
      status: "",
      supplyDate: "",
      supplyQuantity: 0,
      taxPorcent: 0,
    });
    const error_f_invoiceLines = ref({});

    const add_invoiceLines = () => {
      const it0: any = {};
      it0["pkey"] = [Math.random(), "a"].join("-");

      const v0 = item0_f_invoiceLines.value;

      it0["askDate"] = v0["askDate"];
      it0["askQuantity"] = v0["askQuantity"];
      it0["descountPorcent"] = v0["descountPorcent"];
      it0["orden"] = v0["orden"];
      it0["price"] = v0["price"];
      it0["status"] = v0["status"];
      it0["supplyDate"] = v0["supplyDate"];
      it0["supplyQuantity"] = v0["supplyQuantity"];
      it0["taxPorcent"] = v0["taxPorcent"];
      //sale product
      it0["product_id"] = item_product_f_invoiceLines.value["id"];
      //sale stockRackProduct
      it0["stockRackProduct_id"] =
        item_stockRackProduct_f_invoiceLines.value["id"];
      it0["sale_id"] = sale.value.id;

      const payload = { dc: "invoiceLineOut", item: it0 };
      doSave(payload)
        .then((r) => {
          console.log("added invoiceLines");
          console.log(r);
        })
        .catch((e) => {
          handleError(e, error_f_invoiceLines);
        });
    };

    const loadList_invoiceLines = () => {
      const payload = {
        dc: "invoiceLineOut",
        params: { sale_id: sale.value.id },
      };
      doList(payload).then((res: any) => {
        m_dc_invoiceLines.value = res;

        if (res.l) {
          res.l.forEach((e) => {
            extendElement(e);
          });
          calcSums_invoiceLines(res);
        }
      });
    };

    //AA DETAIL
    const item_ac_product_f_invoiceLines = ref({});
    const item_product_f_invoiceLines = ref({});
    const ldco00_product_f_invoiceLines = ref({});
    const updateAC_product_f_invoiceLines = (k: string) => {
      const v = item_ac_product_f_invoiceLines.value;
      const pv = v[k]; //
      update(k, pv, "product", ldco00_product_f_invoiceLines);
    };

    //PUT
    const put_product_f_invoiceLines = (e, o) => {
      item_product_f_invoiceLines.value = e;

      // InvoiceLineOut
      item0_f_invoiceLines.value.price = e.price;
      item0_f_invoiceLines.value.taxPorcent = e.taxPorcent;

      if (o) {
        ldco00_product_f_invoiceLines.value = { l: [] };
      }
    };

    //AA DETAIL
    const item_ac_stockRackProduct_f_invoiceLines = ref({});
    const item_stockRackProduct_f_invoiceLines = ref({});
    const ldco00_stockRackProduct_f_invoiceLines = ref({});
    const updateAC_stockRackProduct_f_invoiceLines = (k: string) => {
      const v = item_ac_stockRackProduct_f_invoiceLines.value;
      const pv = v[k]; //
      update(k, pv, "stockRackProduct", ldco00_stockRackProduct_f_invoiceLines);
    };

    //PUT
    const put_stockRackProduct_f_invoiceLines = (e, o) => {
      item_stockRackProduct_f_invoiceLines.value = e;

      if (o) {
        ldco00_stockRackProduct_f_invoiceLines.value = { l: [] };
      }
    };

    const sums_vars_invoiceLines = ref({
      subtotal: 0,
      descount: 0,
      tax: 0,
      total: 0,
    });

    const calcSums_invoiceLines = (m) => {
      if (m) {
        const l = m.l;
        if (l) {
          const sums_ = { subtotal: 0, descount: 0, tax: 0, total: 0 };
          l.forEach((e) => {
            sums_["subtotal"] += e["subtotal"];
            sums_["descount"] += e["descount"];
            sums_["tax"] += e["tax"];
            sums_["total"] += e["total"];
          });
          sums_vars_invoiceLines.value = sums_;
        }
      }
    };

    const extendElement = (e0) => {
      e0["subtotal"] = e0["askQuantity"] * e0["price"];
    };

    //----
    // Ztats

    const item0_f_invoiceLines_psFormula_subtotal = computed(() => {
      const v = item0_f_invoiceLines.value;
      return v.askQuantity * v.price;
    });

    const item0_f_invoiceLines_psFormula_descountUnit = computed(() => {
      const v = item0_f_invoiceLines.value;
      return v.price * v.descountPorcent * 0.01;
    });

    const item0_f_invoiceLines_psFormula_descountTotal = computed(() => {
      const v = item0_f_invoiceLines.value;
      const v_descountUnit = item0_f_invoiceLines_psFormula_descountUnit.value;
      return v.askQuantity * v_descountUnit;
    });

    const item0_f_invoiceLines_psFormula_subtotal2 = computed(() => {
      const v_subtotal = item0_f_invoiceLines_psFormula_subtotal.value;
      const v_descountTotal =
        item0_f_invoiceLines_psFormula_descountTotal.value;
      return v_subtotal - v_descountTotal;
    });

    const item0_f_invoiceLines_psFormula_tax = computed(() => {
      const v = item0_f_invoiceLines.value;
      const v_subtotal2 = item0_f_invoiceLines_psFormula_subtotal2.value;

      return v_subtotal2 * v.taxPorcent * 0.01;
    });

    const item0_f_invoiceLines_psFormula_total = computed(() => {
      const v_subtotal2 = item0_f_invoiceLines_psFormula_subtotal2.value;
      const v_tax = item0_f_invoiceLines_psFormula_tax.value;

      return v_subtotal2 + v_tax;
    });

    const m_dc_payments = ref({ l: [] });
    const item0_f_payments = ref({
      pkey: "",
      quantity: 0,
    });
    const error_f_payments = ref({});

    const add_payments = () => {
      const it0: any = {};
      it0["pkey"] = [Math.random(), "a"].join("-");

      const v0 = item0_f_payments.value;

      it0["quantity"] = v0["quantity"];
      //sale paymentInForm
      it0["paymentInForm_id"] = item_paymentInForm_f_payments.value["id"];
      //sale inAccount
      it0["inAccount_id"] = item_inAccount_f_payments.value["id"];
      it0["sale_id"] = sale.value.id;

      const payload = { dc: "paymentIn", item: it0 };
      doSave(payload)
        .then((r) => {
          console.log("added payments");
          console.log(r);
        })
        .catch((e) => {
          handleError(e, error_f_payments);
        });
    };

    const loadList_payments = () => {
      const payload = { dc: "paymentIn", params: { sale_id: sale.value.id } };
      doList(payload).then((res: any) => {
        m_dc_payments.value = res;
      });
    };

    //AA DETAIL
    const item_ac_paymentInForm_f_payments = ref({});
    const item_paymentInForm_f_payments = ref({});
    const ldco00_paymentInForm_f_payments = ref({});
    const updateAC_paymentInForm_f_payments = (k: string) => {
      const v = item_ac_paymentInForm_f_payments.value;
      const pv = v[k]; //
      update(k, pv, "paymentInForm", ldco00_paymentInForm_f_payments);
    };

    //PUT
    const put_paymentInForm_f_payments = (e, o) => {
      item_paymentInForm_f_payments.value = e;

      if (o) {
        ldco00_paymentInForm_f_payments.value = { l: [] };
      }
    };

    //AA DETAIL
    const item_ac_inAccount_f_payments = ref({});
    const item_inAccount_f_payments = ref({});
    const ldco00_inAccount_f_payments = ref({});
    const updateAC_inAccount_f_payments = (k: string) => {
      const v = item_ac_inAccount_f_payments.value;
      const pv = v[k]; //
      update(k, pv, "monetaryAccount", ldco00_inAccount_f_payments);
    };

    //PUT
    const put_inAccount_f_payments = (e, o) => {
      item_inAccount_f_payments.value = e;

      if (o) {
        ldco00_inAccount_f_payments.value = { l: [] };
      }
    };

    watch(sale_id, () => {
      load();
    });

    setTimeout(() => {
      load(), 255;
    });

    return {
      sale_id,
      sale,
      formatPrice,

      //
      m_dc_invoiceLines,
      loadList_invoiceLines,
      item0_f_invoiceLines,
      add_invoiceLines,
      error_f_invoiceLines,
      ///product
      item_product_f_invoiceLines,
      item_ac_product_f_invoiceLines,
      updateAC_product_f_invoiceLines,
      ldco00_product_f_invoiceLines,
      put_product_f_invoiceLines,

      ///stockRackProduct
      item_stockRackProduct_f_invoiceLines,
      item_ac_stockRackProduct_f_invoiceLines,
      updateAC_stockRackProduct_f_invoiceLines,
      ldco00_stockRackProduct_f_invoiceLines,
      put_stockRackProduct_f_invoiceLines,

      //Custom for invoiceLines

      item0_f_invoiceLines_psFormula_subtotal,
      item0_f_invoiceLines_psFormula_descountUnit,
      item0_f_invoiceLines_psFormula_descountTotal,
      item0_f_invoiceLines_psFormula_subtotal2,
      item0_f_invoiceLines_psFormula_tax,
      item0_f_invoiceLines_psFormula_total,

      sums_vars_invoiceLines,

      //End Custom for invoiceLines
      //
      m_dc_payments,
      loadList_payments,
      item0_f_payments,
      add_payments,
      error_f_payments,
      ///paymentInForm
      item_paymentInForm_f_payments,
      item_ac_paymentInForm_f_payments,
      updateAC_paymentInForm_f_payments,
      ldco00_paymentInForm_f_payments,
      put_paymentInForm_f_payments,

      ///inAccount
      item_inAccount_f_payments,
      item_ac_inAccount_f_payments,
      updateAC_inAccount_f_payments,
      ldco00_inAccount_f_payments,
      put_inAccount_f_payments,

      //Custom for payments

      //End Custom for payments
    };
  },
});
</script>
<style>
.ff {
  display: flex;
  align-items: stretch;
  background: blueviolet;
  padding: 8px;
  flex-direction: column;
}

.form_full {
  background: rgba(2, 33, 44, 0.67);
  padding: 3px;
}

.form2 {
  display: flex;
  overflow: auto;
  margin: 7px;
  flex-wrap: wrap;
  box-shadow: 3px 3px 3px purple;
  border-radius: 6px;
  border: 2px #9526c8 inset;
  padding: 7px;
  flex-wrap: wrap;
}

.ppp_form2 {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.dcp2 {
  background: beige;
  padding: 8px;
  margin: 5px;
  width: 50vw;
}

.a {
  background: #4e8db7;
  padding: 4px;
  margin: 2px;
  box-shadow: 2px 2px 2px darkblue;
  font-size: 1.12em;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  font-family: Lato;
  font-weight: bold;
  border-radius: 9px 6px 3px 2px;
}

.ppp_form2 {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.ffa1 {
  display: flex;
  display: inline-block;
  padding-right: 0.5em;
  text-align: right;
  border-bottom: 1px solid #aaa;
  padding-bottom: 1px;
}
.btn-stock-rack-product {
  background: yellow;
  color: purple;
  border: 0;
  margin: 2px;
}

.ctls-res {
  background: orangered;
  margin: 4px;
  padding: 8px;
}

span.quantity {
  background: rgb(223, 24, 197);
  color: aqua;
  padding: 6px;
}

span.error {
  background: #fff;
  color: #f00;
  font-size: 12px;
}

.ps-formula-l {
  display: flex;
}

.ps-formula-l p {
  font-weight: bolder;
  font-size: 1.42em;
  display: flex;
  flex-direction: column;
  width: 11em;
  background: #4e8db7;
}

.ff_detail {
  display: flex;
  width: 100vw;
}
</style> 