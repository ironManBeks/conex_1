import React, { FC } from "react";
import AppleLogin from "react-apple-login";
import { AUTH_BUTTON_CLASSNAME } from "../consts";

const LoginWithApple: FC = () => {
    return (
        <div className={`${AUTH_BUTTON_CLASSNAME}`}>
            <AppleLogin
                clientId={"com.react.apple.login"}
                redirectURI={"https://redirectUrl.com"}
                responseType={"code"}
                responseMode={"query"}
                usePopup={false}
                designProp={{
                    height: 40,
                    width: 300,
                    color: "black",
                    border: false,
                    type: "sign-in",
                    border_radius: 15,
                    scale: 1,
                    locale: "en_US",
                }}
            />
        </div>
    );
};

export default LoginWithApple;
