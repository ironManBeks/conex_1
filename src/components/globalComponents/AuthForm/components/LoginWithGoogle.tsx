import React, { FC } from "react";
import { GoogleLogin } from "@react-oauth/google";

import { AUTH_BUTTON_CLASSNAME } from "../consts";

const LoginWithGoogle: FC = () => {
    return (
        <div className={`${AUTH_BUTTON_CLASSNAME}`}>
            <GoogleLogin
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
            />
        </div>
    );
};

export default LoginWithGoogle;
