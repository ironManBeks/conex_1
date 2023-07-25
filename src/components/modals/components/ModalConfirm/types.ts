import { EButtonColor } from "@components/buttons/types";

export type TModalConfirm = {
    onConfirm: () => void;
    confirmColor: EButtonColor.primary | EButtonColor.danger;
    text: string;
    confirmText?: string;
};
