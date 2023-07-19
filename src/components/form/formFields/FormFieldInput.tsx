import { FC } from "react";
import { Input } from "antd";

import { TFormFieldInput } from "../types";

const FormFieldInput: FC<TFormFieldInput> = (props) => {
    const { name, ...rest } = props;

    return (
        <Input
            {...rest}
            name={name}
            onChange={(e) => {
                const value = e.target.value;
                console.log("Search", value);
            }}
        />
    );
};

export default FormFieldInput;
