import { IRoot } from "./store";

import { CommonStore } from "./common";

import { ICommonStore } from "./common/types";

export class RootStore implements IRoot {
    commonStore: ICommonStore;

    constructor() {
        this.commonStore = new CommonStore();
    }
}
