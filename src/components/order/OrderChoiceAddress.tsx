import { FC } from "react";
import cn from "classnames";

import FormFieldInput from "@components/form/formFields/FormFieldInput";
import { IconPoint } from "@components/Icons";
import { P } from "@components/Text";

import { TOrderChoiceAddress } from "./types";

const OrderChoiceAddress: FC<TOrderChoiceAddress> = ({ className }) => {
    const classPrefix = "order-choice-address";

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <FormFieldInput
                name="address"
                placeholder="Address"
                errorMessage={undefined}
                icon={<IconPoint color="#8D8D8D" />}
                iconPosition="left"
            />
            <div className={`${classPrefix}_map`}>
                <P>Select location manually</P>
                <iframe
                    width="100%"
                    height="150"
                    className="gmap_iframe"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                />
            </div>
        </div>
    );
};

export default OrderChoiceAddress;
