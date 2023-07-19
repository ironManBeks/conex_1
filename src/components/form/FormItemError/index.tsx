import { FC } from "react";

import { TFormItemError } from "./types";

const FormItemError: FC<TFormItemError> = ({ errorMessage }) => {
    return errorMessage ? <span>{errorMessage}</span> : <></>;
};

export default FormItemError;
