import { FC } from "react";
import { TSectionTypes } from "@globalTypes/sectionTypes";
import { H2, P } from "@components/Text";

const ContactUsHead: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_head`;

    return (
        <div className={`${classPrefix}__wrapper`}>
            <H2 className={`${classPrefix}__title`}>Get in touch</H2>
            <P className={`${classPrefix}__description`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                laoreet velit at tortor tristique sagittis. Cras consequat justo
                ut enim posuere vestibulum.{" "}
            </P>
        </div>
    );
};

export default ContactUsHead;
