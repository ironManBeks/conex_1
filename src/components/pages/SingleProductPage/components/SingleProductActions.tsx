import { FC, useEffect, useRef } from "react";

import ButtonPrimary from "@components/buttons/ButtonPrimary";

import { EButtonColor, EButtonSize } from "@components/buttons/types";
import { useElementPosition } from "@hooks/useElementPosition";
import { TSingleProductActionsProps } from "../types";
import { inject, observer } from "mobx-react";
import { IRoot } from "@store/store";
import { useScrollPosition } from "@hooks/useScrollPosition";

const SingleProductActions: FC<TSingleProductActionsProps> = inject("store")(
    observer(
        ({
            store,
            isAvailable,
            changeHeaderVisible = false,
            mainButtonSize = EButtonSize.md,
        }) => {
            const { commonStore } = store as IRoot;
            const { setHeaderVisible } = commonStore;
            const wrapperRef = useRef<HTMLElement>(null);
            const { position } = useElementPosition({ ref: wrapperRef });
            const { scrollY, scrollDirection } = useScrollPosition();

            useEffect(() => {
                if (changeHeaderVisible) {
                    if (scrollDirection === "up") {
                        setHeaderVisible(true);
                    } else if (scrollDirection == "down") {
                        if (position.top) {
                            if (scrollY > position.top) {
                                setHeaderVisible(false);
                            }
                        }
                    }
                }
            }, [position, scrollY, scrollDirection]);

            return (
                <span ref={wrapperRef} className="action">
                    <ButtonPrimary
                        color={
                            isAvailable
                                ? EButtonColor.primary
                                : EButtonColor.secondary
                        }
                        type="submit"
                        disabled={!isAvailable}
                        size={mainButtonSize}
                    >
                        {isAvailable ? "To cart" : "Notify us when it arrives"}
                    </ButtonPrimary>
                </span>
            );
        },
    ),
);

export default SingleProductActions;
