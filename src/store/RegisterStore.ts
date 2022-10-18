import Axios from 'axios'
import { Store } from './main'
import {uLibLon} from './ULibLon'


interface RegisterUser{
    
        username?: string|undefined,
        password?: string|undefined,
        password2?: string|undefined,
        email?: string|undefined,
        d?: Date |undefined
}

interface RegisterUserError{
    
   error?:string  
}

interface RegisterData{
    registerUser:RegisterUser,
    registerUserError:RegisterUserError
}

class RegisterStore extends Store<RegisterData>{
    protected data(): RegisterData {
        return{
            registerUser:{},
            registerUserError:{}            
        }
    }

    doRegister(u:RegisterUser){
        const h: string = `${uLibLon.httpSchema()}://" + ${uLibLon.backEnd()}/register`
        const s0 = this
        Axios.post(h, {user:u}).then(function (response) {
            let d = response.data
            console.log(d)

        }).catch(function (e) {

            if (e.response === undefined) {
                alert(e.message)
              //  return
            }
            if (e.status === 401) {
                alert("401")
            }
            if (e.response) {
                s0.state.registerUserError['error']=e.response.data
            }
            console.log(e)
            
        })
    }


    

}

export const registerStore: RegisterStore = new RegisterStore()