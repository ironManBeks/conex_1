import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useElementSize } from "@hooks/useElementSize";
import { Transition, TransitionStatus } from "react-transition-group";
import CSS from "csstype";
import cn from "classnames";
import { isFunction } from "lodash";

import { H4 } from "@components/Text";
import { IconArrowSingle } from "@components/Icons";

import { EArrowDirection } from "@components/Icons/types";
import { TCollapsibleBlockWithTitleProps } from "@components/globalComponents/types";

const CollapsibleBlockWithTitle = ({
    title,
    wrapperClassName,
    children,
    defaultOpen = false,
    onOpenChange,
}: PropsWithChildren<TCollapsibleBlockWithTitleProps>) => {
    const classPrefix = `collapsible-block`;
    const contentRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const { size } = useElementSize({ ref: contentRef });
    const contentHeight = size.height ?? 0;

    const listTransitionStyles: Partial<
        Record<TransitionStatus, CSS.Properties>
    > = {
        entering: { height: `${contentHeight}px` },
        entered: { height: `${contentHeight}px` },
        exiting: { height: 0 },
        exited: { height: 0 },
    };

    useEffect(() => {
        console.log("contentHeight", contentHeight);
    }, [contentHeight]);

    const handleStatusOpen = () => {
        setIsOpen(!isOpen);
        if (isFunction(onOpenChange)) {
            onOpenChange(!isOpen);
        }
    };

    return (
        <div
            className={cn(`${classPrefix}_wrapper`, wrapperClassName, {
                _open: isOpen,
            })}
        >
            <H4
                onClick={() => {
                    handleStatusOpen();
                }}
                className={`${classPrefix}_title`}
            >
                {title}
                <IconArrowSingle
                    direction={
                        isOpen ? EArrowDirection.top : EArrowDirection.bottom
                    }
                />
            </H4>
            <Transition in={isOpen} timeout={0}>
                {(state) => (
                    <div
                        style={{
                            transition: "all 0.2s",
                            transitionProperty: "height",
                            overflow: "hidden",
                            ...listTransitionStyles[state],
                        }}
                    >
                        <div
                            ref={contentRef}
                            className={cn(`${classPrefix}_content`)}
                        >
                            {children}
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
};

export default CollapsibleBlockWithTitle;
