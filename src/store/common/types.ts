import { TNullable } from "@globalTypes/commonTypes";

export type TUrlParams = Record<string, string>;

type TSetElementVisible = (value: boolean) => void;

export interface ICommonStore {
    headerHeight: number;
    headerVisible: boolean;
    urlParams: TUrlParams;
    //
    setHeaderHeight: (value: number) => void;
    setHeaderVisible: (value: boolean) => void;
    //
    setUrlParams: (value: TUrlParams) => void;
    getUrlParams: (value: string[]) => TUrlParams;
    removeUrlParams: (value: string[]) => void;
    //Modals and Drawers
    confirmModalData: TNullable<unknown>;
    setConfirmModalData: (confirmModalData: TNullable<unknown>) => void;
    modalConfirmVisible: boolean;
    setModalConfirmVisible: TSetElementVisible;
    modalAuthVisible: boolean;
    setModalAuthVisible: TSetElementVisible;
    modalCustomQuoteVisible: boolean;
    setModalCustomQuoteVisible: TSetElementVisible;
    modalCardBindingVisible: boolean;
    setModalCardBindingVisible: TSetElementVisible;
    modalMapPickupVisible: boolean;
    setModalMapPickupVisible: TSetElementVisible;
    headerDrawerVisible: boolean;
    setHeaderDrawerVisible: TSetElementVisible;
    builderDrawerVisible: boolean;
    setBuilderDrawerVisible: TSetElementVisible;
}
