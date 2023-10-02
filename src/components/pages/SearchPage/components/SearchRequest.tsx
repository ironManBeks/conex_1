import { FC } from "react";

import { H2 } from "@components/Text";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import ModalCustomQuote from "@components/modals/components/ModalCustomQuote";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { inject, observer } from "mobx-react";
import { IRoot } from "@store/store";

const SearchRequest: FC<TSectionTypes> = inject("store")(
    observer(({ store, pageClassPrefix }) => {
        const { commonStore } = store as IRoot;
        const { setModalCustomQuoteVisible } = commonStore;

        const classPrefix = `${pageClassPrefix}_request`;

        return (
            <div className={`${classPrefix}__wrapper`}>
                <H2>Didn’t find what you were looking for?</H2>
                <div className={`${classPrefix}__actions`}>
                    <ButtonPrimary
                        color={EButtonColor.primary}
                        onClick={() => setModalCustomQuoteVisible(true)}
                        size={EButtonSize.lg}
                    >
                        Request quote
                    </ButtonPrimary>
                </div>
                <ModalCustomQuote />
            </div>
        );
    }),
);

export default SearchRequest;
