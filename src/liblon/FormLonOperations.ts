import {
    computed,
    onBeforeUpdate,
    onMounted,
    ref,
    watch,
} from "vue";
import { dcDataStore, dcModelStore } from "../store/DCModelStore";

import ops from "../liblon/OpsLon";

export default function (props: any, context: any) {


    const {
        modelo,
        dc,
        objKey,
        parentOnRelation,
        m_dc,
        losPs,
        losPsBool,
        currentParentDcItem, currentParentDcItem2, doListGral
    } = ops(props, context);


    const item0 = ref({});
    const item0Parent = ref({});
    const err0 = ref({localVerify:{},remoteError:{}});
    const statusSave = ref("");

    const hideParentsSearch = ref({});
    const showParentFind = ref({});

    const theform = ref(null);

    const theformp = ref(null);


    const save = () => {
        const mv = modelo.value;
        if (!mv) {
            return;
        }
        const ps = modelo.value.ps;
        console.log("EN SAVE");
        const m_verify = {};
        const itv = item0.value;
        if (ps) {
            ps.forEach((p) => {
                if (p.rq === true) {
                    if (p.t === "Boolean") {
                        if (itv[p.n] === undefined) {
                            itv[p.n] = false;
                        }
                    } else if (p.t === "String") {
                        const v = itv[p.n]
                        if (v === undefined || v===null || v.length<1) {
                            m_verify[p.n] = "UNDEFINED";
                        }
                    }
                }
            });
        }

        const mto = modelo.value.mto;
        if (mto) {
            mto
                .filter((p) => {
                    return p.setBySys === undefined;
                })
                .forEach((p) => {
                    if (itv[p.n + "_id"] === undefined) {
                        m_verify[p.n] = "UNDEFINED";
                    }
                });
        }

        if (Object.keys(m_verify).length > 0) {
            err0.value['localVerify']= m_verify ;
            return;
        }

        statusSave.value = "SAVING";
        let payload = {
            item: item0.value,
            objKey: objKey.value,
            dc: dc.value,
        };

        dcDataStore
            .doSave2(payload)
            .then((r) => {
                err0.value = {localVerify:{},remoteError:{}};
                console.log("obtuve ", r);
                //clean item0
                statusSave.value = "";
                const crrpg = dcDataStore.pagData(props.dc).currentPage;
                doListGral(crrpg)

                cleanF();
            })
            .catch((rrr0) => {
                if (rrr0.response) {
                    err0.value = rrr0.response.data;
                }
                statusSave.value = "";
            });
    };

    const getacval = (payload) => {
        const pn = payload.pn;
        console.log("puesto el valor de ", payload);
        item0.value[pn + "_id"] = payload.elem0["id"];
        item0Parent.value[pn] = payload.elem0;
        hideParentsSearch.value[pn] = true;
        const errV = err0.value;
        if (errV) {
            if (errV["localVerify"] && errV["localVerify"][pn]) {
                errV["localVerify"][pn] = undefined;
            }
        }

        //  item0.value[payload.pi] = { id: payload.elem0["id"] };
        // item0Parent.value[payload.pi] = payload.elem0;
    };

    const cleanF = () => {
        item0.value = {};
        item0Parent.value = {};
        err0.value = {localVerify:{},remoteError:{}};
        hideParentsSearch.value = {};
        showParentFind.value = {};
    };
    const losMto = computed(() => {
        const mv = modelo.value;
        if (!mv) {
            return;
        }
        const mto = mv.mto;
        if (mto) {
            const l: Array<any> = [];
            mto.forEach((p) => {
                if (parentOnRelation.value === p.n) {
                    l.push(p);
                }
            });
            mto.forEach((p) => {
                if (parentOnRelation.value !== p.n) {
                    l.push(p);
                }
            });
            return l;
        }
    });

    watch(dc, () => {
        cleanF();
        //  doList({dc:'timePeriod',params:{max:1000}})
    });

    const elSubmit = ($event) => {
        //elSubmit
        console.log("ee", $event);
    };

    const editId = computed(() => {
        return props.editId;
    });

    watch(editId, () => {
        onWatchEdit(editId);
    });
    //doList({dc:'timePeriod',params:{max:1000}})
    const onWatchEdit = (editId) => {
        console.log("MIRANDO editId", editId.value);
        const m00 = modelo.value;
        if (!m00) {
            return;
        }
        const m_dc0 = m_dc.value;
        if (!m_dc0 || !m_dc0.l) {
            return;
        }
        const e000 = m_dc0.l.find((e) => {
            return e.id === editId.value;
        });
        if (!e000) {
            return;
        }
        item0.value["id"] = e000.id;
        const ps = m00.ps;
        if (ps) {
            ps.forEach((p) => {
                if (p.t === "String" || p.t === "Boolean" || p.t === "BigDecimal") {
                    item0.value[p.n] = e000[p.n];
                }
            });
        }

        const mto = m00.mto;
        console.log("mto", mto);

        if (mto) {
            mto.forEach((p) => {
                item0.value[p.n + "_id"] = e000[p.n + "_id"];
                item0Parent.value[p.n] = {
                    id: e000[p.n + "_id"],
                    pkey: e000[p.n + "_pkey"],
                };
                hideParentsSearch.value[p.n] = true;
                if (p.pc) {
                    item0Parent.value[p.n][p.pc] = e000[p.n + "_" + p.pc];
                }

                if (p.onForm) {
                    //   doList
                }
            });
        }
    };

    const rmParent = (pn) => {
        item0.value[pn + "_id"] = undefined;
        item0Parent.value[pn] = undefined;
        hideParentsSearch.value[pn] = undefined;
    };

    const loadDCLonFinder = (pn, pt) => {
        showParentFind.value[pn] = !showParentFind.value[pn];
    };

    const losAll = () => {
        const m00 = dcModelStore.getState().mapa[props.dc]; //modelo.value;
        if (m00 !== undefined && m00.mto !== undefined) {
            const l_getAll = m00.mto.filter((e) => {
                return e.onForm === "getAll";
            });
            if (l_getAll.length > 0) {
                //alert("obtengo todos [getAll] IN FORM");
            }
        }
    };

    onBeforeUpdate(() => {
        losAll();
    });

    onMounted(() => {
        //  alert("una vez")
        losAll();
    });

    const putParent = (pn) => {
        const v = currentParentDcItem.value;
        if (v) {
            item0.value[pn + "_id"] = v["id"];
            item0Parent.value[pn] = v;
            hideParentsSearch.value[pn] = true;
        }
    };
    const putParent2 = (pn) => {
        const v = currentParentDcItem2.value;
        if (v) {
            item0.value[pn + "_id"] = v["id"];
            item0Parent.value[pn] = v;
            hideParentsSearch.value[pn] = true;
        }
    };

    const putParentVal00 = (payload) => {
        const pn = payload.pn;
        const it0 = payload.item;
        item0.value[pn + "_id"] = it0["id"];
        item0Parent.value[pn] = it0;
        hideParentsSearch.value[pn] = true;
        showParentFind.value[pn] = !showParentFind.value[pn];
        err0.value.localVerify[pn]="";
    };
    return {
        item0,
        save,
        err0,
        statusSave,
        getacval,
        item0Parent,
        cleanF,
        elSubmit,
        editId,
        hideParentsSearch,
        showParentFind, //to find with a dclon
        loadDCLonFinder, //to load a dclon
        rmParent,
        putParent, putParent2,
        putParentVal00,
        losMto,
        losPs,
        losPsBool,
        theform,
        theformp
    }

}