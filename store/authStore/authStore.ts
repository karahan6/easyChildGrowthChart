import { thunk } from "easy-peasy";
import { login } from "../../service/authService";
import { IAuthStore } from "./IAuthStore";

export const authStore = <IAuthStore>({
    loading: false,
    login: thunk(
        () => login() 
    )
})