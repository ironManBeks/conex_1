import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import {
    IconCard,
    IconLogout,
    IconMapPoint,
    IconUser,
} from "@components/Icons";
import Logout from "@components/globalComponents/Logout";

import {
    PATH_HOME_PAGE,
    PATH_MY_ACCOUNT_FORM_PAGE,
    PATH_MY_ACCOUNT_ORDERS_PAGE,
    PATH_MY_ACCOUNT_PAYMENT_PAGE,
} from "@consts/pathsConsts";
import { ACCOUNT_CLASSPREFIX } from "@components/pages/account/consts";
import { TAccountMenuItem } from "../types";

const AccountMenu = () => {
    return (
        <div className={`${ACCOUNT_CLASSPREFIX}_menu__wrapper`}>
            <AccountMenuItem
                title="Account"
                icon={<IconUser />}
                href={PATH_MY_ACCOUNT_FORM_PAGE}
            />
            <AccountMenuItem
                title="Orders"
                icon={<IconMapPoint />}
                href={PATH_MY_ACCOUNT_ORDERS_PAGE}
            />
            <AccountMenuItem
                title="Payment methods"
                icon={<IconCard />}
                href={PATH_MY_ACCOUNT_PAYMENT_PAGE}
            />
            <Logout
                pageLink={PATH_HOME_PAGE}
                component={
                    <AccountMenuItem title="Logout" icon={<IconLogout />} />
                }
            />
        </div>
    );
};

export default AccountMenu;

const AccountMenuItem: FC<TAccountMenuItem> = ({
    title,
    href,
    icon,
    className,
    onClick,
}) => {
    const classPrefix = `${ACCOUNT_CLASSPREFIX}_menu__item`;
    const router = useRouter();

    const content = (
        <>
            {icon && icon}
            {title}
        </>
    );

    return (
        <div
            className={cn(`${classPrefix} _wrapper`, className, {
                _active: router.pathname === href,
            })}
        >
            {href ? (
                <Link href={href}>{content}</Link>
            ) : (
                <a onClick={onClick}>{content}</a>
            )}
        </div>
    );
};
