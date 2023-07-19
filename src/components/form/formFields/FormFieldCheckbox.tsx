import { FC } from "react";
import { Checkbox } from "antd";

import { TFormFieldCheckbox } from "../types";

const FormFieldCheckbox: FC<TFormFieldCheckbox> = (props) => {
    const { name, label, ...rest } = props;

    return (
        <Checkbox {...rest} name={name}>
            {label}
        </Checkbox>
    );
};

export default FormFieldCheckbox;
