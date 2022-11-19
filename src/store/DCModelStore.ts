import Axios from 'axios'
import { uLibLon } from './ULibLon'
import { Store } from './main'

export interface PageData {
    elTotal: number, currentPage: number, numPages: number
}


export function doPagData(m_dc0: LDCObject): PageData {

    if (m_dc0 === undefined) {
        return { elTotal: 0, numPages: 0, currentPage: 1 }
    }
    const d: PageData = {
        elTotal: m_dc0.total,
        currentPage: m_dc0.offset / m_dc0.max + 1,
        numPages: (m_dc0.total / m_dc0.max) | 0
    }

    if (m_dc0.total > d.numPages * m_dc0.max) {
        d.numPages++
    }

    return d
}

export const buildHeaders = (): object => {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        , 'Content-Type': 'application/json;charset=UTF-8'
    }
}

export function pagination(c: number, m: number) {
    const current = c,
        last = m,
        delta = 2,
        left = current - delta,
        right = current + delta + 1,
        range: Array<number> = [];

    range.push(1);
    for (let i = left; i <= right; i++) {
        if (i > 1 && i < last) {
            range.push(i);
        }
    }
    let n = range.length;
    if (n > 0 && range[n - 1] !== last) {
        range.push(last);
    }
    n = range.length;
    if (n > 1 && range[1] - range[0] > 1) {
        range.splice(1, 0, -1);
    }
    n = range.length;
    if (n > 2 && range[n - 1] - range[n - 2] > 1) {
        range.splice(n - 1, 0, -1);
    }
    return range;
}


const mapToListLon = function (m: any) {
    const list0 = m.l;
    const list2: Array<Record<string, unknown>> = [];
    const ns = m.names;
    const ns_l = ns.length;
    for (let idx in list0) {
        const e = list0[idx];
        const e2: Record<string, unknown> = {};

        for (let jdx = 0; jdx < ns_l; jdx++) {
            e2[ns[jdx]] = e[jdx];
        }
        list2.push(e2);
    }
    return list2;
}

export const convertToLDCObject = (dc: string, data: any): LDCObject => {
    let l_ = mapToListLon(data)
    return {
        dc: dc,
        l: l_,
        names: data.names,
        offset: data.offset,
        total: data.total,
        max: data.max
    }
}

interface DcToSaveObject { item: { id?: Number, pkey: string }, dc: string }

const h00 = `${uLibLon.httpSchema()}://${uLibLon.backEnd()}/crud`;

export const doSaveOnMap = <T extends DcToSaveObject>(payload: T): Promise<any> => {
    return new Promise((resolve, reject) => {
        const h = `${h00}/${payload.dc}/smap`
        const headers: any = buildHeaders();
        Axios.put(h, payload.item, { headers: headers, data: payload.item }).then(function (response) {
            resolve(response.data)
        }).catch((error) => {

            if (error.response) {
                console.log("error.response")
                console.log(error.response)

            } else if (error.request) {
                console.log("error.request")
                console.log(error.request)


            } else {
                console.log("no se que paso")
            }

            reject(error)
        })
    })
}
export const doSave = <T extends DcToSaveObject>(payload: T): Promise<any> => {
    return new Promise((resolve, reject) => {
        const h = `${h00}/${payload.dc}/s`
        const headers: any = buildHeaders();
        Axios.put(h, payload.item, { headers: headers, data: payload.item }).then(function (response) {
            resolve(response.data)
        }).catch((error) => {

            if (error.response) {
                console.log("error.response")
                console.log(error.response)

            } else if (error.request) {
                console.log("error.request")
                console.log(error.request)


            } else {
                console.log("no se que paso")
            }

            reject(error)
        })
    })


}


const doMyParams = (payload: any) => {
    const p0 = payload.params
    const lp: Array<string> = []
    for (let p in p0) {
        const v = p0[p];
        if (v && typeof (v) === "object") {
            v.forEach((e: any) => {
                lp.push(p + "=" + e)
            })
        } else {
            lp.push(p + "=" + v)
        }
    }
    return lp
}

export const delete00 = function (payload: any): Promise<any> {

    return new Promise((resolve, reject) => {

        const id = payload.id;
        if (!id) {
            reject({ error: "No Ids" })
            return;
        }

        const p = id.map((e: number) => { return `id=${e}` }).join("&");
        const h = `${h00}/${payload.dc}/delete?${p}`
        const headers: any = buildHeaders();
        Axios.delete(h, { headers: headers }).then(function (response) {
            resolve(response)
        }).catch((error) => {
            reject(error)
        })
    })
}

export const downLoadFile = (payload: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        let lp = doMyParams(payload)
        const h = `${h00}/${payload.dc}/l?${lp.join("&")}&xlsExport=1`
        const headers: any = buildHeaders();
        Axios.get(h, { headers: headers, responseType: 'blob' }).then(function (response) {

            const respuesta = {
                data: response.data,
                name: payload.name
            }
            resolve(respuesta)
        }).catch((error) => {
            reject(error)
        })
    });
}
export const doList = (payload: any): Promise<LDCObject> => {
    console.log(payload)
    const lp = doMyParams(payload)
    const h = `${h00}/${payload.dc}/l?${lp.join("&")}`;
    return new Promise((resolve, reject) => {
        const headers: any = buildHeaders()
        Axios.get(h, { headers: headers }).then(function (response) {
            resolve(convertToLDCObject(payload.dc, response.data))
        }).catch((error) => {
            reject(error)
        })
    })

}

export const sendFiles = (payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const h = `${h00}/${payload.dc}/upXls`
        const headers: any = buildHeaders();
        headers['Content-Type'] = 'multipart/form-data'
        Axios.post(h, payload.formData, { headers: headers }).then(function (response) {
            resolve(response.data)
        }).catch((error) => {
            reject(error)
        })

    })

}

export const downLoadTemplateFile = function (payload: any): Promise<any> {
    const h = `${h00}/${payload.dc}/l?xlsTemplate=1`
    return new Promise((resolve, reject) => {
        const headers: any = buildHeaders();
        Axios.get(h, { headers: headers, responseType: 'blob' }).then(function (response) {
            const respuesta = {
                data: response.data,
                name: payload.name
            }
            resolve(respuesta)
        }).catch((error) => {
            console.log("ERROR RECIVING FILES", error)
            resolve(error)
        })
    })
}


interface SProperty {
    n: string,
    t: string,
    template?: string,
    inList?: Array<string | number>,
    setBySys?: string | undefined,
    rq?: boolean | undefined,
    onForm?: string | undefined,
    max?: number | undefined,
    min?: number | undefined,

}


interface SMTO {
    n: string,
    t: string,
    pc?: string,
    from?: string,
    setBySys?: string | undefined,
    rq?: boolean | undefined,
    onForm?: string | undefined
}

interface SOTM {
    t: string,
    n: string,
    onRelation?: string,
    from?: string,
    onRelation2?: string,
    from2?: string,
    keyPath?: string

}

/*
interface SOTM2 extends SOTM{
    onBiRelation?: string,
}
*/
export interface DCModel {
    dc: string,
    pc: string,
    ps: Array<SProperty> | undefined,
    mto: Array<SMTO> | undefined,
    mto2: Array<SMTO> | undefined,
    mto3: Array<SMTO> | undefined,

    otm: Array<SOTM> | undefined,
    otm2: Array<SOTM> | undefined,
    otm3: Array<SOTM> | undefined
}
interface EntryDCModel {
    [key: string]: DCModel
}

interface EntryDCModelPermission {
    [key: string]: Array<string>
}

interface EntryDCModelUserColumns {
    [key: string]: any
}

interface EntryMMUI {
    [key: string]: { list_name: string, id: number }
}

interface DCMapDCModel {
    mapa: EntryDCModel //Map<string, DCModel> 
    mMUI: EntryMMUI
    permissions: EntryDCModelPermission
    userColumns: EntryDCModelUserColumns
}

class DCModelStore extends Store<DCMapDCModel>{

    protected data(): DCMapDCModel {
        return {
            mapa: {},
            permissions: {},
            userColumns: {},
            mMUI: {}
        }
    }

    public putDCModelInMap(name: string, dcModel: DCModel) {
        this.state.mapa[name] = dcModel
    }

    public getUserColumns(dcname: string) {
        const st0 = this.state
        let ucols0 = st0.userColumns[dcname];
        if (ucols0 === undefined) {
            ucols0 = []
            const modelo0: DCModel = st0.mapa[dcname]
            if (modelo0 !== undefined) {
                for (var p0 in modelo0.ps) {
                    ucols0.push({ name: p0, t: 'ps' })
                }
                for (var p0 in modelo0.mto) {
                    ucols0.push({ name: p0, t: 'mto' })
                }
                for (var p0 in modelo0.mto2) {
                    ucols0.push({ name: p0, t: 'mto2' })
                }
                for (var p0 in modelo0.mto3) {
                    ucols0.push({ name: p0, t: 'mto2' })
                }
                st0.userColumns[dcname] = ucols0;
            }
            return st0.userColumns[dcname];

        }


    }


    /*
        public loadFormLon(payload): void {
            doList(payload).then((r) => {
    
            }).catch((ee) => {
                console.log("error en loadFormLon", ee)
            })
        }
    */

    private fillOTMFrom(m_dcm) {

        const dKP = (otm0: Array<SOTM>, fn: Function) => {
            if (otm0) {
                otm0.forEach((e) => {
                    e.keyPath = fn(e)
                })
            }
        }

        for (let dcn in m_dcm) {
            const m0 = m_dcm[dcn];
            dKP(m0.otm, (e: SOTM) => { return e.n });
            dKP(m0.otm2, (e: SOTM) => { return `${e.from}_${e.n}` });
            dKP(m0.otm3, (e: SOTM) => { return `${e.from}_${e.n}` });
        }
    }

    public loadMasterModel(): Promise<any> {
        const s0 = this
        return new Promise((resolve, reject) => {
            const h = `${uLibLon.httpSchema()}://${uLibLon.backEnd()}/init0/l_models`;

            const headers: any = buildHeaders()
            Axios.get(h, { headers: headers }).then(function (response) {
                const data = response.data;
                const m_dcm: EntryDCModel = data.m_dcmodel;
                s0.fillOTMFrom(m_dcm);

                s0.state.mapa = m_dcm;
                s0.state.mMUI = data.mMUI
                s0.state.permissions = data.permissions
                //s0.state.mapa['baseTimePeriod']['autokey'] = ['base', 'timePeriod']
                resolve(1)
            }).catch(function (e) {
                console.log("Error en load")
                reject(e)
            })
        })
    }

    public updateMMUI(k: string, v: string, id: number): void {
        const s0 = this
        s0.state.mMUI[k] = { list_name: v, id: id }
    }
}

export interface LDCObject {
    dc: string,
    l: Array<any>,
    names: Array<any>,
    offset: number,
    total: number,
    max: number
}

interface EntryLDCObject {
    [key: string]: LDCObject
}

interface SavedItemObject {
    dc: string,
    item: any
}

interface EntrySavedItemObject {
    [key: string]: SavedItemObject
}


interface SavedDcErrorObject {
    dc: string,
    error: any
}

interface EntrySavedDcErrorObject {
    [key: string]: SavedDcErrorObject
}

export interface CurrentItem {
    item: { id: number, pkey: string },
    objKey: string
}

export interface EntryCurrentItem {
    [key: string]: CurrentItem | undefined

}


interface FilterLonMto {
    l: Array<any>
}

interface FilterLon {
    [key: string]: FilterLonMto
}

interface FilterBoolLon {
    [key: string]: boolean
}

interface EntryFilterBoolLon {
    [key: string]: FilterBoolLon
}

interface EntryFilterLon {
    [key: string]: FilterLon
}

interface ObjSortLon {
    sortProp: string,
    sortDir: string
}

interface SortLon {
    l: Array<ObjSortLon>
}

interface EntrySortLon {
    [key: string]: SortLon
}

interface VisibleField {
    [key: string]: boolean
}

interface EntryVisibleField {
    [key: string]: VisibleField
}

interface DCLonOptions {
    [key: string]: any
}
interface EntryDCLonOptions {
    [key: string]: DCLonOptions
}

interface MapLDCObject {
    listDcs: EntryLDCObject //Map<string, DCModel>  
    savedItems: EntrySavedItemObject,
    savedDcErrorItems: EntrySavedDcErrorObject,
    currentItems: EntryCurrentItem,
    filterDcs: EntryFilterLon,
    filterItem0: any,
    filterBoolsDcs: EntryFilterBoolLon,
    sortDcs: EntrySortLon,
    dcLonOptions: EntryDCLonOptions,
    visibleFields: EntryVisibleField
}

class DCDataStore extends Store<MapLDCObject>{
    protected data(): MapLDCObject {
        return {
            listDcs: {},
            savedItems: {},
            savedDcErrorItems: {},
            currentItems: {},
            filterDcs: {},
            filterItem0: {},
            sortDcs: {},
            filterBoolsDcs: {},
            dcLonOptions: {},
            visibleFields: {}
        }
    }

    private applyParams(payload: any) {

        const s0 = this

        const objKey = payload.objKey;
        const params = payload.params;
        const fi0 = s0.state.filterItem0[objKey]
        if (fi0 !== undefined && Object.keys(fi0).length > 0) {
            for (let p0 in fi0) {
                const v0 = fi0[p0]
                if (v0) {
                    if (typeof v0 === 'object') {
                        params[p0] = v0
                    } else {
                        params[p0] = (v0 + "").trim();
                    }
                }
            }
        }

        if (payload.parentOnRelation !== undefined) {
            const k0 = payload.parentObjKey//payload.parentDc
            const c0 = s0.state.currentItems[k0]
            if (c0 !== undefined) {
                params[payload.parentOnRelation + "_id"] = c0.item.id
                //payload.params[k0 + "_id"] = c0.id
            }
        }


        if (payload.parentOnRelation2 !== undefined) {
            const k0 = payload.parentObjKey2//payload.parentDc
            const m_dc2 = s0.getState().listDcs[k0]
            if (m_dc2 !== undefined && m_dc2.l !== undefined && m_dc2.l.length > 0) {
                params[payload.parentOnRelation2 + "_id"] = m_dc2.l.map(e => { return e.id })
            }
        }

        let fl = s0.state.filterDcs[objKey]
        if (fl !== undefined) {
            for (let pi in fl) {
                let l = fl[pi].l
                if (l.length > 0) {
                    const k = payload.dc === pi ? "id" : pi + "_id";//pi + "_id"
                    params[k] = l.map((e) => { return e.id })
                }
            }
        }

        let fldb = s0.state.filterBoolsDcs[objKey]
        if (fldb !== undefined) {
            for (let pi in fldb) {
                params['booleq_' + pi] = fldb[pi]
            }
        }

        const sort0 = s0.state.sortDcs[objKey]
        if (sort0 !== undefined) {
            const e0 = sort0.l[0]
            params["orderby"] = e0['sortProp']
            params["sort"] = e0['sortDir']
        }

    }


    downloadExcel(payload: any): Promise<any> {
        const s0 = this
        s0.applyParams(payload)
        return new Promise((resolve, reject) => {
            downLoadFile(payload).then((r) => {
                resolve(r)
            }).catch((e) => {
                reject(e)
            })
        })

    }

    pagData(dc00: string): PageData {
        const s0 = this
        const m_dc0: any = s0.getState().listDcs[dc00]
        return doPagData(m_dc0);
    }

    public doList2 = (payload: any): Promise<any> => {
        const objKey = payload.objKey
        if (payload.related1 !== undefined) {
            //s0.state.listDcs[objKey] = undefined
            //s0.state.currentItems[objKey] = undefined
        }

        return new Promise((resolve, reject) => {


            this.applyParams(payload)
            doList(payload).then((ldco: LDCObject) => {
                const st = this.state
                st.listDcs[objKey] = ldco
                if (ldco.l !== undefined && ldco.l.length > 0) {
                    const it0: any = ldco.l[0]
                    st.currentItems[objKey] = { item: it0, objKey: objKey }
                } else {

                    st.currentItems[objKey] = undefined;
                }
                resolve(1)
            }).catch((e) => {
                if (e.response !== undefined) {
                    if (e.response.status === 401) {
                        alert("Response 401 ");
                    }
                }
                alert("Error " + e.message)
                reject(e)
            })
        })

    }

    public setCurrentItem(currentItem: CurrentItem) {
        const s0 = this
        s0.state.currentItems[currentItem.objKey] = currentItem
    }


    public doSave2 = (payload: { objKey: string, item: any, dc: string }): Promise<any> => {

        return new Promise((resolve, reject) => {
            const sErr: any = this.state.savedDcErrorItems
            const k0 = payload.objKey
            if (!k0) {
                sErr[k0] = { 'NOOBJKEY': 1 }
                reject("NO OBJKEY!!!")
                return
            }
            sErr[k0] = undefined
            doSave(payload).then((r) => {

                console.log("guardado")
                resolve(r)
                /*
                const id0 = payload.item.id
                if(s0.state.listDcs[k0]===undefined){
                    s0.state.listDcs[k0]
                }
                if (id0 === undefined) {
                    r['isNew'] = true
                    s0.state.listDcs[k0].l.push(r)
                    s0.state.listDcs[k0].total++
    
                } else {
                    let idx0 = s0.state.listDcs[k0].l.findIndex((e) => { return e.id === id0 })
                    if (idx0 > -1) {
                        r['isUpdated'] = true
                        s0.state.listDcs[k0].l[idx0] = r
                    }
    
                }
                s0.state.savedItems[k0] = r
                */

            }).catch((e) => {

                if (e.response) {
                    sErr[k0] = e.response.data
                }
                console.log(e)
                reject(e)

            })


        })

    }

    //Filter functions
    putValOnFilterItem0(objKey: string, val: any) {
        const s0 = this
        s0.state.filterItem0[objKey] = val
    }
    cleanFilterItem0(objKey: string) {
        const s0 = this
        s0.state.filterItem0[objKey] = undefined
    }

    /***
     * 
     */


    public putFilterDc(objKey0: string, pi: string, it0: any) {
        const s0 = this
        const fDcs = s0.state.filterDcs;
        let fl = fDcs[objKey0]
        if (fl === undefined) {
            fDcs[objKey0] = {}
        }
        if (fDcs[objKey0][pi] === undefined) {
            fDcs[objKey0][pi] = { l: [] }
        }
        const v = fDcs[objKey0][pi]
        const idx = v.l.findIndex((e) => { return e.id === it0.id })
        if (idx < 0) {
            fDcs[objKey0][pi].l.push(it0)
        }
    }
    public removeFilterDc(objKey0: string, pi: string, it0: any) {
        const s0 = this
        let fl = s0.state.filterDcs[objKey0]
        if (fl !== undefined && fl[pi] !== undefined) {
            fl[objKey0][pi].l = fl[pi].l.filter((e) => { return e.id !== it0.id })
        }
    }

    public isFilterOn(objKey0: string): boolean {
        const s0 = this
        let fl = s0.state.filterDcs[objKey0]
        if (fl !== undefined) {
            for (let p in fl) {
                if (fl[p].l !== undefined && fl[p].l.length > 0) {
                    return true
                }
            }
        }
        return false
    }

    /***
     * 
     */


    public putSort = (objKey: string, pi: string) => {
        const sDcs = this.state.sortDcs;
        let sort0 = sDcs[objKey]
        if (sort0 === undefined) {
            sDcs[objKey] = { l: [{ sortProp: pi, sortDir: 'asc' }] }
        } else {
            let dir0 = sort0.l[0]['sortDir']
            dir0 = dir0 === "asc" ? "desc" : "asc"
            sort0.l[0] = { sortProp: pi, sortDir: dir0 }
        }
    }


    public changeVisibleField = (objKey: string, pn: string) => {
        const state = this.state
        const vfs = state.visibleFields
        let vf: VisibleField = vfs[objKey]
        if (vf === undefined) {
            vfs[objKey] = {}
            vfs[objKey][pn] = false
        } else {
            if (vfs[objKey][pn] === undefined) {
                vfs[objKey][pn] = false
            } else {
                vfs[objKey][pn] = !vf[pn]
            }

        }
    }



}

// interface DcZtatChild {
//     dc: string,
//     data: any
// }

export interface ComponentPropLon {
    dc: string, objKey: string,
    parentDc?: string | undefined, parentDc2?: string | undefined,
    parentObjKey?: string | undefined, parentObjKey2?: string | undefined,
    parentDcMyName?: string | undefined, parentDcMyName2?: string | undefined,
    parentOnRelation?: string | undefined, parentOnRelation2?: string | undefined,
    max?: number | undefined, elId?: number | undefined

}


interface UILon {
    title: string,
    isOpen: boolean
}

interface EntryUILon {
    [key: string]: UILon
}

interface MapForUILons {
    subWins: EntryUILon
}
class UILonStore extends Store<MapForUILons>{
    protected data(): MapForUILons {
        return {
            subWins: {}
        }
    }

    public saveSubWinState = (subWinKey: string, val: UILon): void => {
        localStorage.setItem(subWinKey, JSON.stringify(val));
    };

    public loadUILon = (objKey: string): UILon => {
        const uis = localStorage.getItem(objKey)
        if (uis) {
            return <UILon>JSON.parse(uis)
        }
        return {
            title: '',
            isOpen: false
        }
    }

    public putVal = (subWinKey: string, val: UILon): void => {
        this.state.subWins[subWinKey] = val
        this.saveSubWinState(subWinKey, val)
    }

}

interface DcZtat {
    // names:Array<String>
}

interface EntryDcZtatModel {
    [key: string]: DcZtat
}
interface DcZtatModel {
    mapa: EntryDcZtatModel
}


class DCZtatStore extends Store<DcZtatModel>{
    protected data(): DcZtatModel {
        return {
            mapa: {}
        }
    }

    public disableChild(objKey: string, otmPn: string) {
        const s0 = this
        const m0: any = s0.state.mapa
        if (m0[objKey] !== undefined && m0[objKey][otmPn] !== undefined) {
            m0[objKey][otmPn]['enable'] = false
        }
    }

    protected doQryStr(params): any[] {
        const lp: any[] = [];
        for (var p in params) {
            const p0p = params[p];
            if (p0p) {
                if (typeof p0p === "object") {
                    p0p.forEach((e: any) => {
                        lp.push(`${p}=${e}`)
                    })
                } else {
                    lp.push(`${p}=${p0p}`)
                }
            }
        }
        return lp;
    }

    public loadAll(objKey: string) {

        const lch = this.getState().mapa[objKey];
        const lldcs = dcDataStore.getState().listDcs;
        const l_dc = lldcs[objKey];
        for (let ch in lch) {
            const v: { dcch: string, dcpn_dcch: string, enable: boolean, keyPath: string } = lch[ch];
            if (v.enable) {
                const params = {};
                params[v.dcpn_dcch + "_id"] = l_dc.l.map((e) => {
                    return e.id;
                });
                const py2 = { objKey: objKey, dcch: v.dcch, keyPath: v.keyPath, dcpn_dcch: v.dcpn_dcch, params: params }
                this.load(py2);
            }
        }

    }

    public load(payload: { objKey: string, dcch: string, keyPath: string, dcpn_dcch: string, params: any }): Promise<any> {

        const h = `${h00}/${payload.dcch}/lztat`
        const s0 = this
        const keyPath = payload['keyPath']
        const objKey = payload['objKey']
        const lp: any[] = this.doQryStr(payload.params)
        return new Promise((resolve, reject) => {
            const headers: any = buildHeaders();
            Axios.get(h + "?" + lp.join("&"), { headers: headers }).then(function (response) {
                
                console.log("rrr")
                const data: any = response.data
                const m00: any = s0.state.mapa
                if (m00[objKey] === undefined) {
                    m00[objKey] = {}
                }
                const l_ = mapToListLon(data)
                const m: any = {}
                l_.forEach((e0: { id: number }) => {
                    const k00: string | number = e0[payload['dcpn_dcch'] + "_id"] !== undefined ? e0[payload.dcpn_dcch + "_id"] : "gral"
                    m[k00] = e0
                })
                m00[objKey][keyPath] = { m: m, enable: true, keyPath: keyPath, dcch: payload.dcch, dcpn_dcch: payload.dcpn_dcch }
                console.log(objKey,keyPath)
                console.log(m00)
                resolve(1)
            }).catch(function (e) {
                reject(e)
            })
        })

    }

}

export const dcModelStore = new DCModelStore()
export const dcDataStore = new DCDataStore()
export const dcZtatStore = new DCZtatStore()
export const uILonStore = new UILonStore()


