import { FC } from "react";
import { TSectionTypes } from "@globalTypes/sectionTypes";

const ContactUsMap: FC<TSectionTypes> = ({ pageClassPrefix }) => {
    const classPrefix = `${pageClassPrefix}_map`;
    return (
        <div className={`${classPrefix}__wrapper`}>
            <iframe
                width="100%"
                height="540"
                className="gmap_iframe"
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            />
        </div>
    );
};

export default ContactUsMap;
