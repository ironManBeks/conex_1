import { FC, ReactNode, memo, useEffect, useRef, useState } from "react";
import { Transition, TransitionStatus } from "react-transition-group";
import CSS from "csstype";
import cn from "classnames";
import { Steps } from "antd";
import { StepProps } from "antd/lib/steps";

import {
    IconArrowSingle,
    IconCheck,
    IconCross,
    IconLinePoint,
    IconPoint,
} from "@components/Icons";
import { H4 } from "@components/Text";

import { EArrowDirection } from "@components/Icons/types";
import {
    TAccountOrderStatus,
    TStepsStatus,
} from "@components/pages/AccountPage/types";
import {
    EAccountOrderStatusTimelapse,
    TOrderStatusTimelapse,
} from "@store/auth/types";
import { isFunction } from "lodash";

const AccountOrderStatus: FC<TAccountOrderStatus> = ({
    wrapperClassName,
    statusTimelapse,
    onOpenChange,
}) => {
    const timelapseRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [timelapseHeight, setTimelapseHeight] = useState<number>(0);

    const handleStatusOpen = (val: boolean) => {
        setIsOpen(val);
        if (isFunction(onOpenChange)) {
            onOpenChange(val);
        }
    };

    const listTransitionStyles: Partial<
        Record<TransitionStatus, CSS.Properties>
    > = {
        entering: { height: `${timelapseHeight}px` },
        entered: { height: `${timelapseHeight}px` },
        exiting: { height: 0 },
        exited: { height: 0 },
    };

    useEffect(() => {
        if (timelapseRef?.current) {
            setTimelapseHeight(
                timelapseRef?.current?.getBoundingClientRect().height,
            );
        }
    }, [timelapseRef]);

    return (
        <div
            className={cn(`order-status_wrapper`, wrapperClassName, {
                _open: isOpen,
            })}
        >
            <H4
                onClick={() => {
                    handleStatusOpen(!isOpen);
                }}
            >
                Status
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
                        <div ref={timelapseRef}>
                            <OrderStatusTimelapse
                                statusTimelapse={statusTimelapse}
                            />
                        </div>
                    </div>
                )}
            </Transition>
        </div>
    );
};

export default AccountOrderStatus;

const OrderStatusTimelapse = memo(
    ({ statusTimelapse }: { statusTimelapse: TOrderStatusTimelapse[] }) => {
        const currentStep: number | undefined = undefined;

        const generateTimelapse = (): StepProps[] => {
            const result: StepProps[] = [];
            if (!statusTimelapse.length) return result;

            for (let i = 0; i < statusTimelapse.length; i++) {
                const item = statusTimelapse[i];
                result.push({
                    title: item.time,
                    description: item.description,
                    icon: orderStatusesIcons[item.status] || (
                        <IconPoint {...iconProps} color="#108700" />
                    ),
                    status: orderStatuses[item.status] || "wait",
                });
            }

            return result;
        };

        return (
            <Steps
                className={"order-status_timelapse"}
                direction="vertical"
                current={currentStep}
                items={generateTimelapse()}
            />
        );
    },
);

const iconProps = {
    width: 24,
    height: 24,
};

const orderStatusesIcons: Record<EAccountOrderStatusTimelapse, ReactNode> = {
    [EAccountOrderStatusTimelapse.done]: (
        <IconCheck {...iconProps} color="#108700" />
    ),
    [EAccountOrderStatusTimelapse.processed]: <IconPoint {...iconProps} />,
    [EAccountOrderStatusTimelapse.feature]: <IconLinePoint {...iconProps} />,
    [EAccountOrderStatusTimelapse.failure]: (
        <IconCross {...iconProps} color="#FF0404" />
    ),
};

const orderStatuses: Record<EAccountOrderStatusTimelapse, TStepsStatus> = {
    [EAccountOrderStatusTimelapse.done]: "finish",
    [EAccountOrderStatusTimelapse.processed]: "process",
    [EAccountOrderStatusTimelapse.feature]: "wait",
    [EAccountOrderStatusTimelapse.failure]: "error",
};
