import { FC, useCallback, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cn from "classnames";
import { isFunction } from "lodash";

import { IconCopy } from "@components/Icons";
import Tooltip from "./Tooltip";

import { TCopyText } from "./types";

const CopyText: FC<TCopyText> = ({ className, text, onCopy: onCopyText }) => {
    const [copied, setCopied] = useState(false);

    const onCopy = useCallback((text: string, result: boolean) => {
        setCopied(true);
        if (isFunction(onCopyText)) {
            onCopyText(text, result);
        }
    }, []);

    return text ? (
        <CopyToClipboard text={text} onCopy={onCopy}>
            <Tooltip
                title={copied ? "Copied" : "Copy"}
                onOpenChange={(visible) => {
                    if (!visible) {
                        setTimeout(() => setCopied(false), 300);
                    }
                }}
            >
                <span
                    className={cn("common-copy-text", className)}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <IconCopy />
                </span>
            </Tooltip>
        </CopyToClipboard>
    ) : null;
};

export default CopyText;
