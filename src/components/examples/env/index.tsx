import { FC } from "react";

export const EnvExample: FC = () => {
    return (
        <div>
            <div>NEXT_PUBLIC_ENV_VARIABLE</div>
            <div>{process.env.NEXT_PUBLIC_ENV_VARIABLE}</div>
            <br />
            <hr />
            <hr />
            <div>NEXT_PUBLIC_ENV_DEV_API</div>
            <div>123: {process.env.NEXT_PUBLIC_ENV_DEV_API}</div>
            <hr />
            <hr />
            <br />
            <div>NEXT_PUBLIC_ENV_LOCAL_VARIABLE</div>
            <div>{process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}</div>
            <br />
            <hr />
            <hr />
            <br />
            <div>NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE</div>
            <div>{process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE}</div>
            <br />
            <hr />
            <hr />
            <br />
            <div>NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE</div>
            <div>
                {process.env.NEXT_PUBLIC_PRODUCTION_ENV_VARIABLE ?? "undefined"}
            </div>
        </div>
    );
};
