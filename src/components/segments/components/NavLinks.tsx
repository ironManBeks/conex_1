import React, { FC } from "react";
import cn from "classnames";

import NavLinkItem from "./NavLinkItem";
import { IconBurger } from "@components/Icons";

import { PATH_BUILDER_PAGE, PATH_CONTACTS_US_PAGE } from "@consts/pathsConsts";
import { TNavTypes } from "./types";

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
                href={PATH_BUILDER_PAGE}
                title={
                    <>
                        <IconBurger />
                        Door Builder
                    </>
                }
                classPrefix={classPrefix}
            />
            <NavLinkItem
                href={PATH_CONTACTS_US_PAGE}
                title="Contact us"
                classPrefix={classPrefix}
            />
        </div>
    );
};

export default NavLinks;
