import { FC } from "react";

import { H5, P } from "@components/Text";

import { TSectionTypes } from "@globalTypes/sectionTypes";
import { BRAND_MAIL, BRAND_PHONE } from "@consts/brandConsts";

const ContactUsContacts: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_contacts`;
    return (
        <div className={`${classPrefix}__wrapper`}>
            <div className={`${classPrefix}__list`}>
                <div className={`${classPrefix}__item`}>
                    <H5>Headquarters</H5>
                    <P>95 D'Arcy Pkwy, Lathrop, CA 95330</P>
                    <P>
                        <a
                            href={`mailto:${BRAND_MAIL}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {BRAND_MAIL}
                        </a>
                    </P>
                </div>
                <div className={`${classPrefix}__item`}>
                    <H5>Billing & Existing Orders</H5>
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
                <div className={`${classPrefix}__item`}>
                    <H5>Dispatch</H5>
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
                    <P>Mon-Sat 7am-6pm PST</P>
                </div>
            </div>
        </div>
    );
};

export default ContactUsContacts;
