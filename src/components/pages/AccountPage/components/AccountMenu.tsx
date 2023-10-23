import { FC } from "react";
import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

import {
    IconCard,
    IconList,
    IconLogout,
    IconMapPoint,
} from "@components/Icons";
import Logout from "@components/globalComponents/Logout";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { PATH_HOME_PAGE, PATH_MY_ACCOUNT_PAGE } from "@consts/pathsConsts";
import { EAccountTabsPaths, TAccountMenuItem } from "../types";
import { AccountTabKey } from "../consts";

const AccountMenu: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const router = useRouter();
    const tabValue = router.query[AccountTabKey];

    return (
        <div className={`${pageClassPrefix}_menu__wrapper`}>
            <AccountMenuItem
                title="Account"
                icon={<IconMapPoint />}
                tabName={EAccountTabsPaths.account}
                isActive={
                    tabValue === EAccountTabsPaths.account ||
                    (!tabValue && router.pathname === PATH_MY_ACCOUNT_PAGE)
                }
                pageClassPrefix={pageClassPrefix}
            />
            <AccountMenuItem
                title="Orders"
                icon={<IconList />}
                tabName={EAccountTabsPaths.orders}
                isActive={tabValue === EAccountTabsPaths.orders}
                pageClassPrefix={pageClassPrefix}
            />
            <AccountMenuItem
                title="Payment methods"
                icon={<IconCard />}
                tabName={EAccountTabsPaths.paymentMethods}
                isActive={tabValue === EAccountTabsPaths.paymentMethods}
                pageClassPrefix={pageClassPrefix}
            />
            <Logout
                pageLink={PATH_HOME_PAGE}
                component={
                    <AccountMenuItem
                        title="Logout"
                        icon={<IconLogout />}
                        tabName={null}
                        pageClassPrefix={pageClassPrefix}
                    />
                }
            />
        </div>
    );
};

export default AccountMenu;

const AccountMenuItem: FC<TAccountMenuItem> = ({
    title,
    tabName,
    icon,
    pageClassPrefix,
    className,
    isActive,
    onClick,
}) => {
    const classPrefix = `${pageClassPrefix}_menu__item`;

    const content = (
        <>
            {icon && icon}
            {title}
        </>
    );

    return (
        <div
            className={cn(`${classPrefix} _wrapper`, className, {
                _active: isActive,
            })}
        >
            {tabName ? (
                <Link
                    href={{
                        pathname: PATH_MY_ACCOUNT_PAGE,
                        query: { [AccountTabKey]: tabName },
                    }}
                >
                    {content}
                </Link>
            ) : (
                <a onClick={onClick}>{content}</a>
            )}
        </div>
    );
};
