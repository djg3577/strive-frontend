import { UserDTO } from "@/interfaces/auth/auth"
import axios from "./axios"


export default {
  login(credentials: UserDTO){
    return axios.post("/auth/sign-in", credentials)
  },
  signUp(credentials: UserDTO){
    return axios.post("/auth/sign-up", credentials)
  },
  validateCode(code: string){
    return axios.post("/auth/validate-code", { code })
  },
  decodeJWT(){
    return axios.get("/auth/decode-jwt")
  }
}