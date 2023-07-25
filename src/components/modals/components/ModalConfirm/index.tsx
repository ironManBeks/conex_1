import { FC } from "react";
import { observer } from "mobx-react";

import ModalLayout from "../../ModalLayout";

import { useRootStore } from "@store";
import { EModalSize } from "../../types";
import { TModalConfirmToDelete } from "./types";

const ModalConfirmToDelete: FC<TModalConfirmToDelete> = observer(() => {
    const { commonStore } = useRootStore();
    const { modalConfirmToDeleteVisible, setModalConfirmToDeleteVisible } =
        commonStore;

    return (
        <ModalLayout
            modalVisible={modalConfirmToDeleteVisible}
            handleCancel={() => setModalConfirmToDeleteVisible(false)}
            modalSize={EModalSize.sm}
            bodyContent={
                <div>Do you want to remove the door from the cart?</div>
            }
        />
    );
});

export default ModalConfirmToDelete;
