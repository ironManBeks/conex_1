export type TUrlParams = Record<string, string>;

type TSetElementVisible = (value: boolean) => void;

export interface ICommonStore {
    headerHeight: number;
    setHeaderHeight: (value: number) => void;
    urlParams: TUrlParams;
    setUrlParams: (value: TUrlParams) => void;
    getUrlParams: (value: string[]) => TUrlParams;
    removeUrlParams: (value: string[]) => void;
    //Modals and Drawers
    // ToDo remove type any
    confirmModalData: any;
    // ToDo remove type any
    setConfirmModalData: (confirmModalData: any) => void;
    modalConfirmVisible: boolean;
    setModalConfirmVisible: TSetElementVisible;
    modalAuthVisible: boolean;
    setModalAuthVisible: TSetElementVisible;
    modalCustomQuoteVisible: boolean;
    setModalCustomQuoteVisible: TSetElementVisible;
    modalCardBindingVisible: boolean;
    setModalCardBindingVisible: TSetElementVisible;
    headerDrawerVisible: boolean;
    setHeaderDrawerVisible: TSetElementVisible;
    builderDrawerVisible: boolean;
    setBuilderDrawerVisible: TSetElementVisible;
}
