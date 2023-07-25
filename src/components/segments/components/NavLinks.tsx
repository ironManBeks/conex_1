import React, { FC } from "react";
import cn from "classnames";

import NavLinkItem from "./NavLinkItem";

import {
    PATH_BUILDER_PAGE,
    PATH_CONTACTS_US_PAGE,
    PATH_HOME_PAGE,
    PATH_MY_ACCOUNT_PAGE,
} from "@consts/pathsConsts";
import { TNavTypes } from "./types";
import ImgWrapper from "@components/globalComponents/ImgWrapper";

const NavLinks: FC<TNavTypes> = ({ wrapperClassPrefix }) => {
    const classPrefix = `nav-links`;

    return (
        <div
            className={cn(
                `${wrapperClassPrefix}_${classPrefix}__wrapper`,
                `${classPrefix}_wrapper`,
            )}
        >
            <NavLinkItem
                href={PATH_HOME_PAGE}
                title="Home"
                classPrefix={classPrefix}
            />
            <NavLinkItem
                href={PATH_MY_ACCOUNT_PAGE}
                title="My Account"
                classPrefix={classPrefix}
            />
            <NavLinkItem
                href={PATH_CONTACTS_US_PAGE}
                title="Contact us"
                classPrefix={classPrefix}
            />
            <NavLinkItem
                href={PATH_BUILDER_PAGE}
                title={
                    <>
                        <ImgWrapper
                            src="/images/emoji/hammer-and-wrench.webp"
                            alt="Hammer"
                            width="20"
                            height="20"
                            isTypeWebp={true}
                        />
                        <span>Door Builder</span>
                        <ImgWrapper
                            src="/images/emoji/hammer-and-wrench.webp"
                            alt="Hammer"
                            width="20"
                            height="20"
                            isTypeWebp={true}
                        />
                    </>
                }
                className="_builder"
                classPrefix={classPrefix}
            />
        </div>
    );
};

export default NavLinks;
