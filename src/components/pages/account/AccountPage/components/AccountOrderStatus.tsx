import { FC, ReactNode, memo, useState } from "react";
import cn from "classnames";
import { Steps } from "antd";
import { StepProps } from "antd/lib/steps";
import { isFunction } from "lodash";

import {
    IconCheck,
    IconCross,
    IconLinePoint,
    IconPoint,
} from "@components/Icons";
import CollapsibleBlockWithTitle from "@components/globalComponents/CollapsibleBlockWithTitle";

import {
    TAccountOrderStatus,
    TStepsStatus,
} from "@components/pages/account/AccountPage/types";
import {
    EAccountOrderStatusTimelapse,
    TOrderStatusTimelapse,
} from "@store/auth/types";

const AccountOrderStatus: FC<TAccountOrderStatus> = ({
    wrapperClassName,
    statusTimelapse,
    onOpenChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleStatusOpen = (val: boolean) => {
        setIsOpen(val);
        if (isFunction(onOpenChange)) {
            onOpenChange(val);
        }
    };

    return (
        <div
            className={cn(`order-status_wrapper`, wrapperClassName, {
                _open: isOpen,
            })}
        >
            <CollapsibleBlockWithTitle
                title="Status"
                onOpenChange={(val) => handleStatusOpen(val)}
            >
                <OrderStatusTimelapse statusTimelapse={statusTimelapse} />
            </CollapsibleBlockWithTitle>
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
