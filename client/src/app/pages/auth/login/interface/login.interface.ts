import { FormControl } from '@angular/forms';
export interface LoginI {
    username:FormControl,
    password:FormControl
}
export interface LoginPayload {
    username:string
    password:string
}
export interface LoginResponce {
    accessToken:string
    refreshToken:string
    user:{
        username:string
        id:string
    }
}
// ENUMS

export enum LoginIcons {
    open = '/assets/images/icons/open-eye-icon.svg',
    closed = '/assets/images/icons/closed-eye-icon.svg',
    cancel = '/assets/images/icons/gray-cancel-icon.svg'
}

export enum PasswordTypes {
    text = 'text',
    password = 'password'
}