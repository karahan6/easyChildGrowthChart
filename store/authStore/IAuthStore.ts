import { Thunk } from "easy-peasy";
import { IUserCredential } from "../../models/IUserCredential";
import { IAuthService } from "../../service/authService";


export interface IAuthStore {
    loading: boolean;
    login: Thunk<
        IAuthStore,
        { credentials: IUserCredential },
        IAuthService
    >;
}