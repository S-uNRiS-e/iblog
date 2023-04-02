import { FormControl } from '@angular/forms';
export interface RegistrationI {
    username:FormControl,
    firstPassword:FormControl
    secondPassword:FormControl
}
export interface RegistrationPayload {
    username:string
    password:string
}
export interface RegistrationResponce {
    accessToken:string
    refreshToken:string
    user:{
        username:string
        id:string
    }
}
// ENUMS

export enum RegistrationIcons {
    open = '/assets/images/icons/open-eye-icon.svg',
    closed = '/assets/images/icons/closed-eye-icon.svg',
    cancel = '/assets/images/icons/gray-cancel-icon.svg'
}

export enum PasswordTypes {
    text = 'text',
    password = 'password'
}