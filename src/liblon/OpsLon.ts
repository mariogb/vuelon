import {
  computed
} from "vue";

import { dcModelStore, dcDataStore, ComponentPropLon, dcZtatStore } from "../store/DCModelStore";


export default function (props: ComponentPropLon, context: {}) {

  const dc = computed(() => {
    return props.dc
  })
  const objKey = computed(() => {
    return props.objKey
  })
  const modelo = computed(() => {
    if (dcModelStore.getState().mapa !== undefined) {
      return dcModelStore.getState().mapa[props.dc]
    }
  })
  const m_dc = computed(() => {
    return dcDataStore.getState().listDcs[props.objKey];
  });

  const currentItem = computed(() => {
    return dcDataStore.getState().currentItems[props.objKey];
  });


  const dMM = (k: string) => {
    return dcModelStore.getState().mapa[k]
  }

  const parentObjKeyModel = computed(() => {
    const k = props.parentObjKey
    if (k) {
      dMM(k)
    }
  })

  const parentObjKeyModel2 = computed(() => {
    const k = props.parentObjKey2
    if (k) {
      dMM(k)
    }
  })
  const parentDc = computed(() => {
    return props.parentDc
  })

  const parentDc2 = computed(() => {
    return props.parentDc2
  })

  const parentObjKey = computed(() => {
    return props.parentObjKey
  })

  const parentObjKey2 = computed(() => {
    return props.parentObjKey2
  })

  const parentDcMyName = computed(() => {
    return props.parentDcMyName
  })


  const parentDcMyName2 = computed(() => {
    return props.parentDcMyName2
  })
  //
  //onRelation
  //parentOnRelation
  const parentOnRelation = computed(() => {
    return props.parentOnRelation
  })

  const parentOnRelation2 = computed(() => {
    return props.parentOnRelation2
  })


  const putPage0 = (payload: { n: number }): Promise<any> => {
    return new Promise((resolve, reject) => {
      doListGral(payload.n).then((d) => {
        resolve(d)
      }).catch((e) => {
        reject(e)
      });
    })

  }


  const pagData = computed(() => {
    return dcDataStore.pagData(props.objKey);
  });

  const parentPagData = computed(() => {
    const c = props.parentObjKey
    if (c) {
      return dcDataStore.pagData(c);
    }

  });
  const parentPagData2 = computed(() => {
    const c = props.parentObjKey2
    if (c) {
      return dcDataStore.pagData(c);
    }

  });


  const copyProps00 = ["parentDc", "parentDc2", "parentObjKey", "parentObjKey2",
    "parentOnRelation", "parentOnRelation2"
  ]

  const downloadExcelFile00 = (withIds: string): Promise<any> => {


    return new Promise((resolve, reject) => {
      const dc0 = props.dc
      let v = props.dc; // msgUIDataStore.elMsg(props.dc)
      const payload = { dc: props.dc, objKey: '', name: v + ".xlsx", params: { max: 500, offset: 0, withIds: 'n' } };

      payload['objKey'] = props.objKey !== undefined ? props.objKey : dc0

      copyProps00.forEach((e) => {
        if ((<any>props)[e]) {
          (<any>payload)[e] = (<any>props)[e]
        }
      })

      if (withIds === "y") {
        payload.params["withIds"] = "y";
      }

      dcDataStore
        .downloadExcel(payload)
        .then((r) => {
          resolve(r)
        }).catch((err) => {
          reject(err)
        });


    })
  }

  const doListGral = (numPag: number): Promise<any> => {




    // if (props.related1 !== undefined && losMutuos !== undefined && losMutuos.value !== undefined && losMutuos.value.length > 0) {
    //     const itRelated = dcDataStore.parentDCItem00(props.related1)
    //     if (itRelated !== undefined) {
    //         const kid = losMutuos.value[0] + "_id"//  this.mutuos[0] + "_id"
    //         payload.params[kid] = itRelated[kid]
    //         payload['related1']=props.related1
    //     }
    //     console.log(dc0, losMutuos, itRelated)
    // }

    return new Promise((resolve, reject) => {
      const k0 = props.dc
      const dc0 = props.dc
      const objKey = props.objKey !== undefined ? props.objKey : dc0
      const max = props.max !== undefined ? props.max : 8

      const offset = (numPag - 1) * max
      const params = { max: max, offset: offset, withCount: 1 }

      const elId = props.elId

      const payload = { dc: dc0, k: k0, params: params, objKey: objKey, elId: elId }

      copyProps00.forEach((e) => {
        if ((<any>props)[e]) {
          (<any>payload)[e] = (<any>props)[e]
        }
      })


      dcDataStore.doList2(payload).then((r) => {
        dcZtatStore.loadAll(props.objKey)

        resolve(r)

        
      }).catch((err) => {
        reject(err)
      })
    })

  }

  const currentParentDcItem = computed(() => {
    if (props.parentObjKey !== undefined) {
      const itP = dcDataStore.getState().currentItems[props.parentObjKey];
      if (itP) {
        return itP.item
      }
    }
  })

  const currentParentDcItem2 = computed(() => {
    if (props.parentObjKey2 !== undefined) {
      const itP = dcDataStore.getState().currentItems[props.parentObjKey2];
      if (itP) {
        return itP.item
      }
    }
  })

  const losPs = computed(() => {
    const mv = modelo.value;
    if (!mv) {
      return;
    }
    const ps = mv.ps;
    if (ps) {
      return ps.filter((p) => {
        return p.setBySys === undefined && p.t !== "Boolean";
      })
    }
    return [];
  });


  const losPsBool = computed(() => {
    const mv = modelo.value;
    if (!mv) {
      return;
    }
    const ps = mv.ps;
    if (ps) {
      return ps.filter((p) => {
        return p.setBySys === undefined && p.t === "Boolean";
      });
    }
  });

  const elPc =computed(()=>{
    const mv = modelo.value;
    if (!mv) {
      return;
    }
    return mv.pc
  })



  const isFilterOn = computed(() => {
    return dcDataStore.isFilterOn(props.objKey)
  })



  return {
    modelo, dc,elPc, pagData, doListGral, objKey,
    parentObjKey, parentObjKey2, parentDc, parentDc2,
    m_dc, parentDcMyName, parentDcMyName2,
    putPage0, currentItem,
    downloadExcelFile00,
    currentParentDcItem, currentParentDcItem2,
    parentOnRelation, parentOnRelation2,
    parentObjKeyModel, parentObjKeyModel2, losPs, losPsBool,
    parentPagData, parentPagData2, isFilterOn
  }

}