import { FC } from "react";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { H5, P } from "@components/Text";

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
                            href="mailto:info@conexwest.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            info@conexwest.com
                        </a>
                    </P>
                </div>
                <div className={`${classPrefix}__item`}>
                    <H5>Billing & Existing Orders</H5>
                    <P>
                        <a
                            href="tel:(855) 878-5233 x 3"
                            target="_blank"
                            rel="noreferrer"
                        >
                            (855) 878-5233 x 3
                        </a>
                    </P>
                    <P>
                        <a
                            href="mailto:info@conexwest.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            info@conexwest.com
                        </a>
                    </P>
                    <P>Mon-Fri 9am-5pm PST</P>
                </div>
                <div className={`${classPrefix}__item`}>
                    <H5>Dispatch</H5>
                    <P>
                        <a
                            href="tel:(855) 878-5233 x 6"
                            target="_blank"
                            rel="noreferrer"
                        >
                            (855) 878-5233 x 6
                        </a>
                    </P>
                    <P>
                        <a
                            href="mailto:info@conexwest.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            info@conexwest.com
                        </a>
                    </P>
                    <P>Mon-Sat 7am-6pm PST</P>
                </div>
            </div>
        </div>
    );
};

export default ContactUsContacts;
