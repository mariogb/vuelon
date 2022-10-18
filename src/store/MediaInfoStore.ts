import { Store } from './main'


type MapDevicesType = {
    [key: string]: Array<String>;
};

interface MediaInfo{
    capabilites:any ,lDevices:Array<any>,
    mDevices:MapDevicesType

}


class MediaInfoStore extends Store<MediaInfo>{
    protected data(): MediaInfo {
        return{
            capabilites:{},
            lDevices:[],
            mDevices:{}
        }
    }
 

    checkMedia(){
        const s0 = this
        const caps:{hasAudioOut?:Boolean,hasAudioIn?:Boolean,hasVideo?:Boolean}= {}//
        navigator.mediaDevices.enumerateDevices()
        .then((deviceInfos:Array<MediaDeviceInfo>) => {
            const l0: any[] = []
            const m0 :MapDevicesType= {}
            deviceInfos.forEach((e:MediaDeviceInfo) =>{
                l0.push({kind:e.kind,label:e.label,id:e.deviceId})
                if(e.kind==="audiooutput"){
                    caps["hasAudioOut"]=true
                }else if(e.kind==="audioinput"){
                    caps["hasAudioIn"]=true
                }else if(e.kind==="videoinput"){
                    caps["hasVideo"]=true
                }
                if(m0[e.kind]===undefined){
                    m0[e.kind]=[]
                }
                m0[e.kind].push(e.label)



                console.log(e)
            })    
            s0.state.capabilites=caps
            s0.state.lDevices=l0
            s0.state.mDevices=m0

        }).catch(function(eee) {
            console.log("EXCEPTION ON checkMedia", eee)
        })
    }
    
    constructor(){
        super()
        const s0 = this
        s0.checkMedia()

        navigator.mediaDevices.ondevicechange = (event) =>{
            console.log("event navigator.mediaDevices.ondevicechange",event)
          s0.checkMedia()  
        }
        


    }

    

}
export const mediaInfoStore:MediaInfoStore = new MediaInfoStore()


