import { login } from "./login";

export interface IAuthService {
    login: typeof login;
}