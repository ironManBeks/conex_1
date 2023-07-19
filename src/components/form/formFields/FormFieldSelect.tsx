import { FC } from "react";
import { Select } from "antd";

import { TFormFieldSelect } from "../types";

const FormFieldSelect: FC<TFormFieldSelect> = (props) => {
    const { name, options, ...rest } = props;
    return (
        <Select
            {...rest}
            options={options}
            onChange={(value, option) => {
                console.log("Select", value);
                console.log("option", option);
            }}
        />
    );
};

export default FormFieldSelect;
