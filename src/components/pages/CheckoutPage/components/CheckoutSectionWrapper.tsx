import { FC, PropsWithChildren, ReactNode } from "react";
import cn from "classnames";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { H3 } from "@components/Text";

const CheckoutSectionWrapper: FC<
    PropsWithChildren<TSectionTypes & { className?: string; title?: ReactNode }>
> = ({ pageClassPrefix, className, title, children }) => {
    return (
        <div className={cn(`${pageClassPrefix}_section__wrapper`, className)}>
            {title && <H3>{title}</H3>}
            {children}
        </div>
    );
};

export default CheckoutSectionWrapper;
