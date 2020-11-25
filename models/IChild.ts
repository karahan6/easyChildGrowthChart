import { Gender } from "./Gender";

export interface IChild{
    name: string;
    birthDay: string;
    gender: Gender;
    notes: string;
    photo: string;
    isSent: boolean;
}