import { FC, useEffect, useRef, useState } from "react";
import CSS from "csstype";
import { Transition, TransitionStatus } from "react-transition-group";
import cn from "classnames";

import { IconArrowSingle } from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import { H2 } from "@components/Text";

import { EButtonColor } from "@components/buttons/types";
import { EArrowDirection } from "@components/Icons/types";
import { TSingleProductDescriptionProps } from "../types";

const SingleProductDescription: FC<TSingleProductDescriptionProps> = ({
    pageClassPrefix,
    description,
}) => {
    const classPrefix = `${pageClassPrefix}_description`;
    const contentRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const MIN_HEIGHT = 300;

    const listTransitionStyles: Partial<
        Record<TransitionStatus, CSS.Properties>
    > = {
        entering: { height: `${contentHeight}px` },
        entered: { height: `${contentHeight}px` },
        exiting: {
            height: contentHeight < MIN_HEIGHT ? "auto" : `${MIN_HEIGHT}px`,
        },
        exited: {
            height: contentHeight < MIN_HEIGHT ? "auto" : `${MIN_HEIGHT}px`,
        },
    };

    useEffect(() => {
        if (contentRef?.current) {
            setContentHeight(
                contentRef?.current?.getBoundingClientRect().height,
            );
        }
    }, [contentRef]);

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__inner-wrapper`}>
                <H2>Description</H2>
                <Transition in={isOpen} timeout={0}>
                    {(state) => (
                        <div
                            className={cn(`${classPrefix}__collapse`, {
                                _open: isOpen,
                                _small: contentHeight < MIN_HEIGHT,
                            })}
                            style={{
                                transition: "all 0.2s",
                                transitionProperty: "height",
                                overflow: "hidden",
                                ...listTransitionStyles[state],
                            }}
                        >
                            <div
                                ref={contentRef}
                                className={cn(`${classPrefix}__content`, {
                                    _open: isOpen,
                                })}
                                dangerouslySetInnerHTML={{
                                    __html: description,
                                }}
                            />
                        </div>
                    )}
                </Transition>

                {contentHeight > MIN_HEIGHT && (
                    <div className={`${classPrefix}__actions`}>
                        <ButtonPrimary
                            color={EButtonColor.transparent}
                            rightIcon={
                                <IconArrowSingle
                                    direction={
                                        isOpen
                                            ? EArrowDirection.top
                                            : EArrowDirection.bottom
                                    }
                                />
                            }
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? "Close" : "Roll up"}
                        </ButtonPrimary>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleProductDescription;
