import { H2 } from "@components/Text";
import Breadcrumb from "@components/globalComponents/Breadcrumb";
import { TStore } from "@globalTypes/storeTypes";
import { inject, observer } from "mobx-react";
import { FC, ReactNode } from "react";
import { tags } from "./FiltersMockUp";
import Tag from "@components/Tag";

import LeftSide from "./FiltersSide";

interface InteriorDoorsLayoutProps extends TStore {
    pageClassPrefix: string;
}

const InteriorDoorsLayout: FC<
    {
        leftSideContent?: ReactNode;
        rightSideContent?: ReactNode;
        title?: ReactNode;
    } & InteriorDoorsLayoutProps
> = inject("store")(
    observer(({ pageClassPrefix }) => {
        return (
            <div>
                <Breadcrumb />
                <H2>
                    Interior doors
                    <span className={`${pageClassPrefix}_header-sub-text`}>
                        91 goods
                    </span>
                </H2>
                <div className={`${pageClassPrefix}_filter-tags`}>
                    {tags.map((key) => (
                        <Tag size="small" isActive>
                            {key}
                        </Tag>
                    ))}
                </div>
                <div className={`${pageClassPrefix}_content`}>
                    <div className={`${pageClassPrefix}_left-side`}>
                        <LeftSide pageClassPrefix={pageClassPrefix} />
                    </div>
                    <div className={`${pageClassPrefix}_right-side`}>
                        <div>Right side</div>
                    </div>
                </div>
            </div>
        );
    }),
);

export default InteriorDoorsLayout;
