import { FC, PropsWithChildren } from "react";
import { AUTH_FORM_CLASSNAME_PREFIX } from "@components/globalComponents/AuthForm/consts";

const AuthActions: FC<PropsWithChildren> = ({ children }) => {
    return children ? (
        <div className={`${AUTH_FORM_CLASSNAME_PREFIX}_actions__wrapper`}>
            {children}
        </div>
    ) : null;
};

export default AuthActions;
