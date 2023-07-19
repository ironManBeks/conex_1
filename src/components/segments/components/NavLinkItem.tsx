import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import { TNavLinkItem } from "./types";

const NavLinkItem: FC<TNavLinkItem> = ({
    href,
    title,
    className,
    classPrefix,
}) => {
    const router = useRouter();

    return (
        <div
            className={cn(`${classPrefix}_item__wrapper`, className, {
                _active: router.pathname === href,
            })}
        >
            <Link href={href}>
                <a>{title}</a>
            </Link>
        </div>
    );
};

export default NavLinkItem;
