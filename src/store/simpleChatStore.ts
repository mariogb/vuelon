import { Store } from './main'

interface SchatData {
    websocks: any,
    users: any,
    callings: any//llamadas2
    candidates: any,
    losP1: any
}

class SimpleChatStore extends Store<SchatData>{
    protected data(): SchatData {
        return {
            websocks: {},
            users: {},
            callings: {},
            candidates: {},
            losP1: {}
        }
    }

    registerWS(payload: any) {
        const d = this.state
        const wsid = payload.wsid
        d.websocks[wsid] = payload.ws
        d.users[wsid] = {}
        d.callings[wsid] = {}
        d.candidates[wsid] = {}
        d.losP1[wsid] = {}
    }
    registerUser(wsid: string, payload: any) {

        this.state.users[wsid][payload.from_uid] = payload
    }
    unregisterUser(wsid: string, from_uid: any) {
        if (this.state.users[wsid][from_uid] !== undefined) {
            this.state.users[wsid][from_uid]['close'] = true
        }

    }

    sendTT1Candidate(payload: any) {
        const wsid = payload.channel + "/" + payload.channelid
        const wss0 = this.state.websocks[wsid]
        if (wss0 !== undefined) {
            wss0.send(JSON.stringify({ action: 'sendT1Candidate', payload: payload }))
        }
    }

    registerCalling(wsid: string, payload: any) {
        this.state.callings[wsid][payload.from_uid] = payload
    }
    unregisterCalling(wsid:string,from_uid:any){
        this.state.callings[wsid][from_uid] = undefined
    }

    registerT1Candidate(wsid: string, payload: any) {
        this.state.candidates[wsid][payload.from_uid] = payload
    }

    registerWebRealLon(wsid: string, payload: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.state.losP1[wsid][payload.to_uid] = payload.pc1
            resolve(1)
        })


    }

    sendWRTDescription(wsid: string, payload: any) {
        const wss0: WebSocket = this.state.websocks[wsid]
        if (wss0 !== undefined) {
            wss0.send(JSON.stringify({ action: 'sendWRTDescription', payload: payload }))
        }
    }

    sendWRTDescription2_to1(wsid: string, payload: any) { //WRLT2 //envia local
        const wss0: WebSocket = this.state.websocks[wsid]
        if (wss0 !== undefined && wss0.readyState === 1) {
            wss0.send(JSON.stringify({
                action: "sendWRTDescription2_to1",
                'payload': payload
            }))

        }
    }

    sendResponseTT2Candidate(wsid: string, payload: any) { //WRL2T

        const wss0: WebSocket = this.state.websocks[wsid]
        if (wss0 !== undefined && wss0.readyState === 1) {
            wss0.send(JSON.stringify({
                action: 'sendTT2Candidate',
                'payload': payload
            }))
        }
    }

    // sendT2Candidate(wsid:string,payload:any) {

    //     const wss0:WebSocket = this.state.websocks[wsid]
    //     if (wss0 !== undefined && wss0.readyState === 1) {
    //         wss0.send(JSON.stringify({
    //             action: 'sendT2Candidate',
    //             'payload': payload
    //         }))
    //     }
    // }
    recibidoWRTDescription2to1(wsid: string, payload: any) { //WRLT2
        let elP1 = this.getState().losP1[wsid][payload.from_uid] //WRLT2
        let remoteDescription = payload.description
        elP1.setRemoteDescription(remoteDescription).then(function () {
            
         }, function (e) {
            console.log("!!!!!!!!!! EEEE en seRemoteDescriptin" ,e)
        })
    }


    sendTT2Candidate(wsid: string, payload: any) {
        let elP1 = this.getState().losP1[wsid][payload.from_uid] //WRLT2
        elP1.addIceCandidate(payload.candidate)
    }

    putOnPc2RemoteDescription(pc2:RTCPeerConnection,wsid: string,uid:any):Promise<any>{
        const elCall0 = this.state.callings[wsid][uid]

        const elCall = Object.assign({}, elCall0)
        return new Promise((resolve,reject)=>{
            pc2.setRemoteDescription(elCall.description).then(()=>{
                resolve(1)
            },(err00)=>{
                console.log("EEEEEE EEE EEE ",err00)
                reject(err00)
            })
        })
        

    }



}

export const simpleChatStore: SimpleChatStore = new SimpleChatStore()