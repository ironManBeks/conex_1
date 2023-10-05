import { FC } from "react";
import { Skeleton } from "antd";
import dynamic from "next/dynamic";

import SkeletonLayout from "./SkeletonLayout";

import { mediaBreakpoints } from "@common/theme/mediaBreakpointsTheme";
import { TSkeleton } from "./types";

const MediaQuery = dynamic(() => import("react-responsive"), { ssr: false });
import { useMediaQuery } from "react-responsive";

const ProductSearchCardSkeleton: FC<TSkeleton> = ({ className }) => {
    const isActive = true;
    const classPrefix = "product-search-card";

    const isBigTablet = useMediaQuery({
        minWidth: mediaBreakpoints.mdMedia,
        maxWidth: mediaBreakpoints.lgMediaEnd,
    });

    return (
        <SkeletonLayout className={className} classPrefix={classPrefix}>
            <div className={`${classPrefix}_inner-wrapper`}>
                <div className={`${classPrefix}_image__wrapper`}>
                    <Skeleton.Input active={isActive} />
                </div>
                <div className={`${classPrefix}_details__wrapper`}>
                    <Skeleton.Input active={isActive} className="title" />
                    <MediaQuery minWidth={mediaBreakpoints.smMediaEnd}>
                        <div className={`${classPrefix} list`}>
                            <Skeleton.Input active={isActive} size="small" />
                            <Skeleton.Input
                                active={isActive}
                                size="small"
                                style={{ width: "80%" }}
                            />
                            {!isBigTablet && (
                                <Skeleton.Input
                                    active={isActive}
                                    size="small"
                                    style={{ width: "60%" }}
                                />
                            )}
                        </div>
                    </MediaQuery>
                </div>
                <div className={`${classPrefix}_actions__wrapper`}>
                    <Skeleton.Input
                        active={isActive}
                        size="small"
                        style={{ width: "50%" }}
                    />
                    <Skeleton.Input
                        active={isActive}
                        style={{ maxWidth: "150px" }}
                        size="large"
                    />
                </div>
            </div>
        </SkeletonLayout>
    );
};

export default ProductSearchCardSkeleton;
