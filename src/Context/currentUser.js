import { createContext } from "react";

export const currentUser = createContext({
    email:'',
    password:'',
    idUser:'',
    auth:false,
});