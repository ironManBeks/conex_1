import { FC } from "react";

import { TFormFieldRadio } from "@components/form/types";
import { Radio } from "antd";

const FormFieldRadio: FC<TFormFieldRadio> = (props) => {
    const { name, label, ...rest } = props;

    return (
        <Radio {...rest} name={name}>
            {label}
        </Radio>
    );
};

export default FormFieldRadio;
