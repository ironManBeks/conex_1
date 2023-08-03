import { FC } from "react";
import { Skeleton } from "antd";

import SkeletonLayout from "./SkeletonLayout";
import AccountOrderItemSkeleton from "./AccountOrderItemSkeleton";

import { TSkeleton } from "@components/skeletons/types";

const AccountOrderSkeleton: FC<TSkeleton> = ({ className }) => {
    const isActive = true;
    const classPrefix = "account-page-order";

    return (
        <SkeletonLayout className={className} classPrefix={classPrefix}>
            <Skeleton.Input
                active={isActive}
                className={`${classPrefix}_title`}
            />
            <Skeleton.Input
                active={isActive}
                className={`${classPrefix}_segmented`}
            />
            <div className={`${classPrefix}_list__wrapper`}>
                <AccountOrderItemSkeleton />
                <AccountOrderItemSkeleton />
                <AccountOrderItemSkeleton />
            </div>
        </SkeletonLayout>
    );
};

export default AccountOrderSkeleton;
