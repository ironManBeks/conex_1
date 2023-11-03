import { FC } from "react";
import cn from "classnames";
import Link from "next/link";

import {
    IconFacebook,
    IconInstagram,
    IconYoutube,
    LogoMain,
} from "@components/Icons";
import { P } from "@components/Text";

import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import {
    BRAND_MAIL,
    BRAND_PHONE,
    BRAND_SOCIAL_FACEBOOK,
    BRAND_SOCIAL_INSTAGRAM,
    BRAND_SOCIAL_YOUTUBE,
} from "@consts/brandConsts";

const FooterContacts: FC<{ wrapperClassPrefix: string }> = ({
    wrapperClassPrefix,
}) => {
    const classPrefix = `${wrapperClassPrefix}_contacts`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={cn(`${classPrefix}__logo`)}>
                <Link href={PATH_HOME_PAGE}>
                    <LogoMain />
                </Link>
            </div>
            <div className={cn(`${classPrefix}__info`)}>
                <P>
                    <a
                        href={`tel:${BRAND_PHONE}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {BRAND_PHONE}
                    </a>
                </P>
                <P>
                    <a
                        href={`mailto:${BRAND_MAIL}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {BRAND_MAIL}
                    </a>
                </P>
                <P>Mon-Fri 9am-5pm PST</P>
            </div>
            <div className={`${classPrefix}__social`}>
                <a
                    href={BRAND_SOCIAL_FACEBOOK}
                    target="_blank"
                    rel="noreferrer"
                >
                    <IconFacebook />
                </a>
                <a href={BRAND_SOCIAL_YOUTUBE} target="_blank" rel="noreferrer">
                    <IconYoutube />
                </a>
                <a
                    href={BRAND_SOCIAL_INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                >
                    <IconInstagram />
                </a>
            </div>
            <P className={`${classPrefix}__copyright`}>
                © 2023 Conexwest. All rights reserved.
            </P>
        </div>
    );
};

export default FooterContacts;
