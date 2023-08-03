import { makeAutoObservable, observable } from "mobx";

import { IAuthStore, TAuthData } from "./types";
import { AuthDataMockup } from "../../../mockups/AuthDataMockup";

export class AuthStore implements IAuthStore {
    authData: TAuthData = null;
    authDataFetching = true;

    constructor() {
        makeAutoObservable(this, {
            authData: observable,
            authDataFetching: observable,
        });
    }

    setAuthData = (data: TAuthData): void => {
        this.authData = data;
    };

    getAuthData = (): void => {
        setTimeout(() => {
            this.setAuthData(AuthDataMockup);
            this.setAuthDataFetching(false);
        }, 1000);
    };

    setAuthDataFetching = (value: boolean): void => {
        this.authDataFetching = value;
    };
}
