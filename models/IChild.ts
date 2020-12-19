import { Gender } from "./Gender";

export interface IChild{
    id: Number | undefined;
    name: string;
    birthDay: string;
    gender: Gender;
    note: string;
    photo: string;
    isSent: boolean;
}