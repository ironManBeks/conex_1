import { EButtonColor } from "@components/buttons/types";

export type TModalConfirm = {
    onConfirm: () => void;
    color: EButtonColor.primary | EButtonColor.danger;
    text: string;
};
