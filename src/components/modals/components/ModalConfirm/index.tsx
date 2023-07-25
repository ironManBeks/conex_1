import { FC } from "react";
import { observer } from "mobx-react";

import ModalLayout from "../../ModalLayout";
import { H3 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { useRootStore } from "@store";
import { EModalSize } from "../../types";
import { TModalConfirm } from "./types";
import { EButtonSize } from "@components/buttons/types";

const ModalConfirm: FC<TModalConfirm> = observer(
    ({ text, onConfirm, confirmColor, confirmText }) => {
        const { commonStore } = useRootStore();
        const { modalConfirmToDeleteVisible, setModalConfirmToDeleteVisible } =
            commonStore;

        return (
            <ModalLayout
                wrapperClassName="modal-confirm"
                modalVisible={modalConfirmToDeleteVisible}
                handleCancel={() => setModalConfirmToDeleteVisible(false)}
                modalSize={EModalSize.md}
                bodyContent={<H3>{text}</H3>}
                footerContent={
                    <>
                        <ButtonPrimary
                            onClick={() =>
                                setModalConfirmToDeleteVisible(false)
                            }
                            size={EButtonSize.sm}
                        >
                            Close
                        </ButtonPrimary>
                        <ButtonPrimary
                            size={EButtonSize.sm}
                            color={confirmColor}
                            onClick={() => {
                                onConfirm();
                                setModalConfirmToDeleteVisible(false);
                            }}
                        >
                            {confirmText ?? "Confirm"}
                        </ButtonPrimary>
                    </>
                }
            />
        );
    },
);

export default ModalConfirm;
