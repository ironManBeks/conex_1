import { FC, PropsWithChildren, ReactNode } from "react";
import cn from "classnames";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { H3 } from "@components/Text";
import Spin from "@components/globalComponents/Spin";

const CheckoutSectionWrapper: FC<
    PropsWithChildren<
        TSectionTypes & {
            className?: string;
            title?: ReactNode;
            fetching?: boolean;
        }
    >
> = ({ pageClassPrefix, className, title, fetching, children }) => {
    return (
        <div className={cn(`${pageClassPrefix}_section__wrapper`, className)}>
            {title && <H3>{title}</H3>}
            {fetching ? <Spin size="large" /> : children}
        </div>
    );
};

export default CheckoutSectionWrapper;
