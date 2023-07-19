import { FC } from "react";
import { Radio } from "antd";

import { TFormFieldRadio } from "../types";

const FormFieldRadio: FC<TFormFieldRadio> = (props) => {
    const { name, options, ...rest } = props;

    // return <Radio.Group {...rest} name={name} options={options} />;
    return <div>123</div>;
};

export default FormFieldRadio;
