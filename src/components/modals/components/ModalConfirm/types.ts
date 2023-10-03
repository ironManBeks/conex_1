import { EButtonColor } from "@components/buttons/types";
import { TStore } from "@globalTypes/storeTypes";
import { TNullable } from "@globalTypes/commonTypes";

export type TModalConfirm = {
    onConfirm: (confirmModalData: TNullable<unknown>) => void;
    onClose?: () => void;
    confirmColor?: EButtonColor.primary | EButtonColor.danger;
    title: string;
    description?: string;
    confirmText?: string;
} & TStore;
