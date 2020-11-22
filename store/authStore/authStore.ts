import { persist, thunk } from "easy-peasy";
import { login } from "../../service/authService";
import { IAuthStore } from "./IAuthStore";

export const authStore = persist<IAuthStore>({
    loading: false,
    login: thunk(
        () => login() 
    )
})