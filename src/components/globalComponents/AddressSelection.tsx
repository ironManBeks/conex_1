import { FC } from "react";
import cn from "classnames";
import { isFunction } from "lodash";

import { IconMapPoint } from "@components/Icons";
import FieldAutoComplete from "@components/form/formControllers/FieldAutoComplete";

import { TAddressSelection } from "./types";

const AddressSelection: FC<TAddressSelection> = ({
    className,
    onValueChange,
    errorMessage,
    isFloatingLabel,
    name,
}) => {
    const classPrefix = "address-selection";
    // const [addressValue, setAddressValue] = useState<string>();

    const handeValueChange = (value: string) => {
        if (isFunction(onValueChange)) {
            onValueChange(value);
        }
    };

    const handleSearch = (value: string) => {
        console.log("handleSearch", value);
    };

    return (
        <div className={cn(`${classPrefix}_wrapper`, className)}>
            <FieldAutoComplete
                name={name ?? "address"}
                fieldPlaceholder="Address"
                errorMessage={errorMessage}
                icon={<IconMapPoint opacity="0.36" />}
                onChange={(e) => {
                    const value = e.target.value;
                    handeValueChange(value);
                }}
                onSelect={(value) => {
                    handleSearch(value);
                }}
                onAddonButtonClick={(value) => {
                    handleSearch(value);
                }}
                isFloatingLabel={isFloatingLabel}
                fieldLabel="Address1"
            />
            <div className={`${classPrefix}_map`}>
                {/*<P>Select location manually</P>*/}
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
