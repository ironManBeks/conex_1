import { FC } from "react";

import SkeletonLayout from "./SkeletonLayout";

import { TSkeleton } from "@components/skeletons/types";
import { Skeleton } from "antd";

const AccountOrderItemSkeleton: FC<TSkeleton> = ({ className }) => {
    const isActive = true;
    const classPrefix = "account-order-item";

    return (
        <SkeletonLayout className={className} classPrefix={classPrefix}>
            <Skeleton.Input active={isActive} size="small" />
        </SkeletonLayout>
    );
};

export default AccountOrderItemSkeleton;
