import { FC } from "react";
import cn from "classnames";

import { TSectionTypes } from "@globalTypes/sectionTypes";

const AccountSectionWrapper: FC<TSectionTypes & { className?: string }> = ({
    pageClassPrefix,
    className,
    children,
}) => {
    return (
        <div className={cn(`${pageClassPrefix}_section-wrapper`, className)}>
            {children}
        </div>
    );
};

export default AccountSectionWrapper;
