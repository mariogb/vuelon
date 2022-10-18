import Axios from 'axios'
import {uLibLon} from './ULibLon'
interface LDCObject {
    dc: string,
    l: Array<any>,
    names: Array<any>,
    offset: number,
    total: number,
    max: number
}


const buildHeaders = (): object => {
    return {
        'Authorization': 'Bearer ' + localStorage.getItem("access_token")
        , 'Content-Type': 'application/json;charset=UTF-8'
    }
}

const mapToListLon = function (m: any) {
    const list0 = m.l;
    const list2:any = [];
    var ns = m.names;
    for (var idx in list0) {
        var e = list0[idx];
        var e2: any = {};
        for (var jdx = 0; jdx < ns.length; jdx++) {
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

export const doList = (payload: any): Promise<LDCObject> => {

    let p0 = payload.params
    const lp:any[] = []
    for (var p in p0) {
        if (p0[p] !== null && typeof (p0[p]) === "object") {
            p0[p].forEach((e) => {
                lp.push(p + "=" + e)
            })
        } else {
            lp.push(p + "=" + p0[p])
        }
    }
    
    return new Promise((resolve, reject) => {
        const h = `${uLibLon.httpSchema()}://${uLibLon.backEnd()}/pg/payload.dc/l?${lp.join("&")}`
        const headers:any = buildHeaders();
        Axios.get(h, { headers: headers }).then(function (response) {
            resolve(convertToLDCObject(payload.dc, response.data))
        }).catch((error) => {
            reject(error)
        })
    })

}

export const doSave = (payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const h =  `${uLibLon.httpSchema()}://${uLibLon.backEnd()}/pg/${payload.dc}/sou`
      
        const headers:any = buildHeaders();
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

