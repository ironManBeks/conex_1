import { FC, PropsWithChildren } from "react";
import cn from "classnames";

import { ACCOUNT_CLASSPREFIX } from "../consts";

const AccountSectionWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
    className,
    children,
}) => {
    return (
        <div
            className={cn(`${ACCOUNT_CLASSPREFIX}_section-wrapper`, className)}
        >
            {children}
        </div>
    );
};

export default AccountSectionWrapper;
