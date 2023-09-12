import { FC } from "react";
import cn from "classnames";

import FormFieldInput from "@components/form/formFields/FormFieldInput";
import { IconMapPoint } from "@components/Icons";
import { P } from "@components/Text";

import { isFunction } from "lodash";
import { TAddressSelection } from "./types";

const AddressSelection: FC<TAddressSelection> = ({
    className,
    onValueChange,
    label,
    errorMessage,
    name,
}) => {
    const classPrefix = "address-selection";
    // const [addressValue, setAddressValue] = useState<string>();

    const handeValueChange = (value: string) => {
        if (isFunction(onValueChange)) {
            onValueChange(value);
        }
    };

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <FormFieldInput
                name={name ?? "address"}
                label={label}
                placeholder="Address"
                errorMessage={errorMessage}
                icon={<IconMapPoint color="#8D8D8D" />}
                iconPosition="left"
                onChange={(e) => {
                    const value = e.target.value;
                    handeValueChange(value);
                }}
            />
            <div className={`${classPrefix}_map`}>
                <P>Select location manually</P>
                <iframe
                    width="100%"
                    height="200"
                    className="gmap_iframe"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=University of Oxford&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                />
            </div>
        </div>
    );
};

export default AddressSelection;
