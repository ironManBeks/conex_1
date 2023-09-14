import { FC, ReactNode, useEffect, useRef, useState } from "react";
import cn from "classnames";
import { Transition, TransitionStatus } from "react-transition-group";
import CSS from "csstype";
import { Steps } from "antd";

import { H4, P } from "@components/Text";
import {
    IconArrowSingle,
    IconCalendar,
    IconCheck,
    IconCross,
    IconLinePoint,
    IconMapPoint,
    IconPoint,
} from "@components/Icons";
import ButtonPrimary from "@components/buttons/ButtonPrimary";
import CopyText from "@components/globalComponents/CopyText";

import { notImplemented } from "@helpers/notImplemented";
import {
    EAccountOrderStatusTimelapse,
    TAccountOrderItem,
    TOrderStatusTimelapse,
} from "@components/pages/AccountPage/types";
import { EButtonColor } from "@components/buttons/types";
import { EArrowDirection } from "@components/Icons/types";
import { StepProps } from "antd/lib/steps";

const AccountOrderItem: FC<
    TAccountOrderItem & { wrapperClassPrefix: string }
> = ({
    wrapperClassPrefix,
    orderNumber,
    dateOfOrder,
    orderAddress,
    orderStatus,
    moneyStatus,
    statusTimelapse,
}) => {
    const statusRef = useRef<HTMLDivElement>(null);
    const classPrefix = `${wrapperClassPrefix}__item`;
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusHeight, setStatusHeight] = useState<number>(0);

    const handleStatusOpen = (val: boolean) => {
        setIsStatusOpen(val);
    };

    const listTransitionStyles: Partial<
        Record<TransitionStatus, CSS.Properties>
    > = {
        entering: { height: `${statusHeight}px` },
        entered: { height: `${statusHeight}px` },
        exiting: { height: 0 },
        exited: { height: 0 },
    };

    useEffect(() => {
        setTimeout(() => {
            if (statusRef?.current) {
                setStatusHeight(
                    statusRef?.current?.getBoundingClientRect().height,
                );
            }
        }, 300);
    }, [statusRef, statusRef?.current?.getBoundingClientRect().height]);

    // const getCurrent

    return (
        <div className={cn(`${classPrefix} _wrapper`)}>
            <div
                className={cn(`${classPrefix} _inner-wrapper`, {
                    _open: isStatusOpen,
                })}
            >
                <div className={cn(`${classPrefix} _title`)}>
                    <H4>
                        <b>Order №</b>
                        {orderNumber}
                        <CopyText text={orderNumber} />
                    </H4>
                    {moneyStatus && (
                        <P>
                            <IconPoint color="#FFD700" />
                            Your money’s being {moneyStatus}
                        </P>
                    )}
                    {orderStatus && (
                        <P>
                            <IconPoint color="#108700" />
                            Your order has been {orderStatus}
                        </P>
                    )}
                </div>

                <div className={cn(`${classPrefix} _info`)}>
                    <OrderInfoItem
                        title={`Order ${dateOfOrder}`}
                        description={"Date of order"}
                        icon={<IconCalendar />}
                    />
                    <OrderInfoItem
                        title={orderAddress}
                        description={"Order adress"}
                        icon={<IconMapPoint />}
                    />
                </div>
                <div className={cn(`${classPrefix} _status`)}>
                    <H4
                        onClick={() => {
                            handleStatusOpen(!isStatusOpen);
                        }}
                    >
                        Status
                        <IconArrowSingle
                            direction={
                                isStatusOpen
                                    ? EArrowDirection.top
                                    : EArrowDirection.bottom
                            }
                        />
                    </H4>
                    <Transition in={isStatusOpen} timeout={0}>
                        {(state) => (
                            <div
                                style={{
                                    transition: "all 0.2s",
                                    transitionProperty: "height",
                                    overflow: "hidden",
                                    ...listTransitionStyles[state],
                                }}
                            >
                                <div ref={statusRef}>
                                    <OrderStatusTimeLapse
                                        statusTimelapse={statusTimelapse}
                                    />
                                </div>
                            </div>
                        )}
                    </Transition>
                </div>
                <div className={cn(`${classPrefix} _actions`)}>
                    <ButtonPrimary
                        onClick={() => notImplemented()}
                        color={EButtonColor.secondary}
                    >
                        Read more
                    </ButtonPrimary>
                </div>
            </div>
        </div>
    );
};

export default AccountOrderItem;

const OrderInfoItem = ({
    title,
    description,
    icon,
}: {
    title: string;
    description: string;
    icon?: ReactNode;
}) => {
    const classPrefix = "order-info-item";
    return (
        <div className={`${classPrefix}_wrapper`}>
            {icon && <div className={`${classPrefix}_icon`}>{icon}</div>}
            <div className={`${classPrefix}_text`}>
                <H4>{title}</H4>
                <P>{description}</P>
            </div>
        </div>
    );
};

const OrderStatusTimeLapse = ({
    statusTimelapse,
}: {
    statusTimelapse: TOrderStatusTimelapse[];
}) => {
    const classPrefix = "order-status-timelapse";

    const currentStep: number | undefined = undefined;

    const iconProps = {
        width: 24,
        height: 24,
    };

    const getIconByStatus = (
        status: EAccountOrderStatusTimelapse,
    ): ReactNode => {
        switch (status) {
            case EAccountOrderStatusTimelapse.done:
                return <IconCheck {...iconProps} color="#108700" />;
            case EAccountOrderStatusTimelapse.processed:
                return <IconPoint {...iconProps} />;
            case EAccountOrderStatusTimelapse.feature:
                return <IconLinePoint {...iconProps} />;
            case EAccountOrderStatusTimelapse.failure:
                return <IconCross {...iconProps} color="#FF0404" />;
            default:
                return <IconPoint {...iconProps} color="#108700" />;
        }
    };

    const getStatus = (
        status: EAccountOrderStatusTimelapse,
    ): "wait" | "process" | "finish" | "error" => {
        switch (status) {
            case EAccountOrderStatusTimelapse.done:
                return "finish";
            case EAccountOrderStatusTimelapse.processed:
                return "process";
            case EAccountOrderStatusTimelapse.feature:
                return "wait";
            case EAccountOrderStatusTimelapse.failure:
                return "error";
            default:
                return "wait";
        }
    };

    const generateTimelapse = (): StepProps[] => {
        const result: StepProps[] = [];
        if (!statusTimelapse.length) return result;

        for (let i = 0; i < statusTimelapse.length; i++) {
            const item = statusTimelapse[i];
            result.push({
                title: item.time,
                description: item.description,
                icon: getIconByStatus(item.status),
                status: getStatus(item.status),
            });
        }

        return result;
    };

    return (
        <Steps
            className={classPrefix}
            direction="vertical"
            current={currentStep}
            items={generateTimelapse()}
        />
    );
};
