import Axios from 'axios'
import { Store } from './main'
import { uLibLon } from './ULibLon'

interface AuthLon {
    pkey: string,
    access_token: string | null,
    username: string | null
    error: any | null,
    parsedJWT: any | null
}
const ACCESSTOKEN: string = "access_token";
const USERNAME: string = "username";


function doParseJwt(tk: string): any {
    if (tk !== undefined && tk !== null) {
        return JSON.parse(window.atob(tk.split('.')[1]));
    }
}

class AuthStore extends Store<AuthLon>{

    constructor() {
        super()
        const accTk = localStorage.getItem(ACCESSTOKEN)
        this.state.access_token = accTk
        this.state.username = localStorage.getItem(USERNAME)
        if (accTk) {
            this.state.parsedJWT = doParseJwt(accTk)
        }


    }

    protected data(): AuthLon {
        return {
            access_token: null,
            pkey: '',
            error: null,
            parsedJWT: null,
            username: ''
        }
    }


    updateAccessToken(access_token: string | null): void {
        if (access_token === null) {
            localStorage.removeItem(ACCESSTOKEN)
        } else {
            localStorage.setItem(ACCESSTOKEN, access_token)
            this.state.parsedJWT = doParseJwt(access_token)
        }
        this.state.access_token = access_token

    }

    isAuth(): boolean {
        return this.state.access_token !== null
    }

    isADM(): boolean {
        return this.state.parsedJWT['TYPELON'] === 'ADM'
    }

    doLogout() {
        this.updateAccessToken(null)
    }
    doLogin(username: string, password: string): Promise<any> {

        const h: string = `${uLibLon.httpSchema()}://${uLibLon.backEnd()}/login`
        const s0 = this
        return new Promise((resolve, reject) => {
            Axios.post(h, { username, password }).then(function (response) {
                const d = response.data
                s0.state.username = d.username
                localStorage.setItem(USERNAME, d.username)
                localStorage.setItem("UID", d.uid)
                s0.updateAccessToken(d.access_token)
                localStorage.setItem("refresh_token", d.refresh_token)
                resolve(d)
            }).catch(function (e) {
                
                if (e.response === undefined) {                    
                    s0.state.error = "NO RESPONSE";                    
                }else if (e.response) {
                    s0.state.error = e.code;
                }
                reject(e)
            })

        })


    }

    // canDo(v:string, permissions:any) {
    //     if (authStore.isADM()) {
    //         return true;
    //     }
    //     if (permissions === undefined || permissions.value) {
    //         return false;
    //     }
    //     return (
    //         permissions.value.findIndex((e) => {
    //             return e === v;
    //         }) > -1
    //     );
    // };


}

export const authStore: AuthStore = new AuthStore()
