import { PropsWithChildren, useRef, useState } from "react";
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
    titlePosition = "top",
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

    const handleStatusOpen = () => {
        setIsOpen(!isOpen);
        if (isFunction(onOpenChange)) {
            onOpenChange(!isOpen);
        }
    };

    const titleContent = (
        <H4
            onClick={() => {
                handleStatusOpen();
            }}
            className={cn(`${classPrefix}_title`, `_${titlePosition}`)}
        >
            {title}
            <IconArrowSingle
                direction={
                    isOpen ? EArrowDirection.top : EArrowDirection.bottom
                }
            />
        </H4>
    );

    return (
        <div
            className={cn(`${classPrefix}_wrapper`, wrapperClassName, {
                _open: isOpen,
            })}
        >
            {titlePosition === "top" && titleContent}
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
            {titlePosition === "bottom" && titleContent}
        </div>
    );
};

export default CollapsibleBlockWithTitle;
