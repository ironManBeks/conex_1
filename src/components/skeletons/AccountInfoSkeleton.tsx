import { FC } from "react";
import { Skeleton } from "antd";

import SkeletonLayout from "./SkeletonLayout";

import { TSkeleton } from "@components/skeletons/types";

const AccountInfoSkeleton: FC<TSkeleton> = ({ className }) => {
    const isActive = true;
    const classPrefix = "account-page-info";

    return (
        <SkeletonLayout className={className} classPrefix={classPrefix}>
            <div className={`${classPrefix}_form__wrapper`}>
                <Skeleton.Input
                    active={isActive}
                    className={`${classPrefix}_title`}
                />
                <div>
                    <Skeleton.Input
                        active={isActive}
                        className={`${classPrefix}_field`}
                    />
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Skeleton.Input
                        active={isActive}
                        className={`${classPrefix}_field`}
                    />
                    <Skeleton.Input
                        active={isActive}
                        className={`${classPrefix}_field`}
                    />
                </div>
            </div>
            <div className={`${classPrefix}_payment__wrapper`}>
                <Skeleton.Input
                    active={isActive}
                    className={`${classPrefix}_title`}
                />
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                    }}
                >
                    <Skeleton.Input
                        active={isActive}
                        className={`${classPrefix}_card`}
                    />
                    <Skeleton.Input
                        active={isActive}
                        className={`${classPrefix}_card`}
                    />
                </div>
            </div>
        </SkeletonLayout>
    );
};

export default AccountInfoSkeleton;
