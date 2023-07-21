import { FC } from "react";
import { Skeleton } from "antd";

import SkeletonLayout from "./SkeletonLayout";

import { TSkeleton } from "./types";

const ProductSearchCardSkeleton: FC<TSkeleton> = ({ className }) => {
    const isActive = true;
    const classPrefix = "product-search-card";

    return (
        <SkeletonLayout className={className} classPrefix={classPrefix}>
            <div className={`${classPrefix}_inner-wrapper`}>
                <div className={`${classPrefix}_info__wrapper`}>
                    <div className="img-custom_wrapper">
                        <Skeleton.Input active={isActive} />
                    </div>
                    <div className={`${classPrefix}_info__details`}>
                        <Skeleton.Input
                            active={isActive}
                            className="common-title"
                        />
                        <div className={`${classPrefix}_info__list`}>
                            <Skeleton.Input active={isActive} size="small" />
                            <Skeleton.Input active={isActive} size="small" />
                            <Skeleton.Input active={isActive} size="small" />
                        </div>
                    </div>
                </div>
                <div className={`${classPrefix}_actions__wrapper`}>
                    <Skeleton.Input active={isActive} />
                </div>
            </div>
        </SkeletonLayout>
    );
};

export default ProductSearchCardSkeleton;
