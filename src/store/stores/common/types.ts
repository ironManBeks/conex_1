export type TUrlParams = Record<string, string>;

export interface ICommonStore {
    headerHeight: number;
    setHeaderHeight: (value: number) => void;
    urlParams: TUrlParams;
    setUrlParams: (value: TUrlParams) => void;
    getUrlParams: (value: string[]) => TUrlParams;
    removeUrlParams: (value: string[]) => void;
    //Modals
    // ToDo заменить тип any
    confirmModalData: any;
    setConfirmModalData: (confirmModalData: any) => void;
    modalConfirmVisible: boolean;
    setModalConfirmVisible: (value: boolean) => void;
    modalAuthVisible: boolean;
    setModalAuthVisible: (value: boolean) => void;
    modalCustomQuoteVisible: boolean;
    setModalCustomQuoteVisible: (value: boolean) => void;
}
