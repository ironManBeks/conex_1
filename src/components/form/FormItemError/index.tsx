import { FC } from "react";

import { TFormItemError } from "./types";

const FormItemError: FC<TFormItemError> = ({ errorMessage }) => {
    return errorMessage ? <span>{errorMessage.toString()}</span> : null;
};

export default FormItemError;
