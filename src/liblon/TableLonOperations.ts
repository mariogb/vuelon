import { Ref, computed, ref } from "vue";
import {
    dcDataStore,
    dcZtatStore
} from "../store/DCModelStore";

import cmmOp from "./OpsLon";

export default function (props: any, context: any) {
    
    const { currentItem, m_dc, pagData } = cmmOp(props, context)
    
    const table_navigator: Ref<HTMLElement | null> = ref(null);

    const doInTableFocus = () => {
        const v0 = table_navigator.value
        if (v0) {
            v0.focus();
        }
    };

    const setCurrentItem = (it0: { id: number, pkey: string }) => {
        dcDataStore.setCurrentItem({ objKey: props.objKey, item: it0 });
        doInTableFocus()
    };

    const idxTbl = ref({ r: -1, c: -1 });

    const rowNum0 = () => {
        const v = currentItem.value;
        if (!v || !v.item) {
            return 0;
        }
        const id0 = v.item.id;
        return m_dc.value.l.findIndex((e) => {
            return e.id === id0;
        });
    }
    const downRow = () => {
        if (currentItem !== undefined) {
            const nr: number = rowNum0();
            if (nr > -1 && nr < m_dc.value.l.length - 1) {
                idxTbl.value.r = nr + 1;
                setCurrentItem(m_dc.value.l[nr + 1]);
            }
        }
    };

    const upRow = () => {
        if (currentItem !== undefined) {
            const nr: number = rowNum0();
            if (nr > 0) {
                idxTbl.value.r = nr - 1;
                setCurrentItem(m_dc.value.l[nr - 1]);
            }
        }
    };


    const nextPage = () => {
        console.log(2)
        const v = pagData.value
        if (v.currentPage < v.numPages) {
            context.emit("setPage0", { n: v.currentPage + 1 });
        }
    };

    const previousPage = () => {
        const v = pagData.value
        if (v.currentPage > 1) {
            context.emit("setPage0", { n: v.currentPage - 1 });
        }
    };

    const maxPag = computed(() => {
        if (m_dc.value === undefined) {
            return 1;
        }
        return m_dc.value.max;
    });

    const visibleFields = computed(() => {
        const vf = dcDataStore.getState().visibleFields[props.objKey]
        if (vf) {
            return vf
        }
        return {}
    })

    const changeVisibleFields = (pn: string) => {
        dcDataStore.changeVisibleField(props.objKey, pn)
    };
    const isVisibleMto = computed(() => (v: string) => {
        const vf = visibleFields
        return vf[v] === undefined || vf[v] === true;
    });

    const ztatChilds = computed(() => {
        return dcZtatStore.getState().mapa[props.objKey];
    });

    const isVisibleZtatOtm = computed(() => (v: string) => {
        const z: any = ztatChilds.value;
        return z && z[v] && z[v]["enable"] === true;
    });
    const ztatOtmVal = computed(() => /*(otmPn,id0) => */ {
        const m_: any = {};
        const zv: any = ztatChilds.value;
        if (zv) {
            for (let otmPn in zv) {
                const m = zv[otmPn]['m']
                for (let id0 in m) {
                    m_[otmPn + ":" + id0] = m[id0]
                }
            }
            return m_
        }
    });

    const edit = (id0: number) => {
        context.emit("edit", id0);
    };
    const add = ()=>{
        context.emit("add")
    }

    const delete0 = (item: any) => {
        if (window.confirm("Esta seguro de borrar este elemento " + item.pkey + " ?")) {
            context.emit("delete0", item.id);
        }
    };

    const doChange = (evt: any) => {
        const ds = evt.target.dataset;
        const pn = ds.pn;
        changeVisibleFields(pn);
    };

    const putSort = (pi: string) => {
        context.emit("putSort", pi);
    };


    const loadAllZtatCh = ()=>{
        dcZtatStore.loadAll(props.objKey)
    }   

    const loadZtatCh = (keyPath, dcch, dcpn_dcch) => {
        const ok = props.objKey;
        if (!ok) {
            return;
        }
        let l = ztatChilds.value;
        if (l) {
            let ch = l[keyPath];
            if (ch && ch.enable === true) {
                dcZtatStore.disableChild(ok, keyPath);
                return;
            }
        }

        const l_dc = dcDataStore.getState().listDcs[ok];

        const params = {};

        params[dcpn_dcch + "_id"] = l_dc.l.map((e) => {
            return e.id;
        });

        dcZtatStore.load({
            objKey: props.objKey,
            dcch: dcch,
            keyPath: keyPath,
            dcpn_dcch: dcpn_dcch,
            params: params,
        });
    };


    const doCalculoParaObtener_dcpn_dcch = (p000: any, dc: string) => {
        // const or2 = p000.dc0.onRelation2;
        // if (or2) {
        //   return or2;
        // }
        const level = p000.level*1;
        const dc0 = p000.dc0;
        if(level===2){
            const or2 = dc0.onBiRelation;
            if (or2) {
              return or2;
            }
            return dc;
        }

        const or1 = dc0.onRelation;
        if (or1) {
          return or1;
        }
        return dc;


        //p000.dc0.onRelation ? p000.dc0.onRelation : modelo.dc
      };

    const doChangeZ = (evt,p000,default_dc) => {

        const dcch= p000.dc0.t;
        const dcpn_dcch = doCalculoParaObtener_dcpn_dcch(p000, default_dc);
        const keyPath= p000.dc0.keyPath;
        console.log("Change Z ", dcch, dcpn_dcch, keyPath);

        loadZtatCh(keyPath, dcch, dcpn_dcch);
    };


    return {
        table_navigator, doInTableFocus,
        setCurrentItem,
        idxTbl, downRow, upRow, pagData,
        nextPage, previousPage, maxPag,
        visibleFields, changeVisibleFields, isVisibleMto,
        ztatChilds, isVisibleZtatOtm, ztatOtmVal,
        edit,add, delete0, doChange, putSort,doChangeZ,loadAllZtatCh
    }
}