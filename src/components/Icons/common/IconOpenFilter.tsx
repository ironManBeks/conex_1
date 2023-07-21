import { FC } from "react";
import cn from "classnames";

import {
    DEFAULT_ICON_CLASSNAME,
    DEFAULT_ICON_COLOR,
} from "@components/Icons/consts";

import { IIcon } from "../types";

const IconOpenFilter: FC<IIcon> = ({ color, className, width, height }) => {
    return (
        <svg
            width={width || "47"}
            height={height || "41"}
            fill="none"
            className={cn(DEFAULT_ICON_CLASSNAME, className)}
            viewBox="0 0 47 41"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_595_2849)">
                <path
                    d="M41.6045 17.3607C41.2408 17.3702 40.8952 17.5195 40.6414 17.7769C40.3876 18.0343 40.2456 18.3794 40.2458 18.7387V30.5605C40.2363 31.2789 39.943 31.9653 39.4285 32.4733C38.9141 32.9813 38.219 33.2709 37.4915 33.2803H9.50847C8.78096 33.2709 8.08592 32.9813 7.57145 32.4733C7.05698 31.9653 6.76375 31.2789 6.75424 30.5605V8.40371C6.76389 7.68869 7.05833 7.00619 7.5738 6.50396C8.08928 6.00173 8.78432 5.72017 9.50847 5.72023H23.9774C24.3475 5.72023 24.7024 5.57505 24.9642 5.31662C25.2259 5.0582 25.3729 4.7077 25.3729 4.34223C25.3729 4.16294 25.3366 3.98545 25.2661 3.82025C25.1955 3.65505 25.0921 3.5055 24.962 3.38042C24.8319 3.25534 24.6778 3.15728 24.5087 3.09202C24.3395 3.02677 24.1589 2.99564 23.9774 3.00049H9.50847C8.05388 3.00046 6.65831 3.56856 5.62632 4.58083C4.59433 5.5931 4.0097 6.96736 4 8.40371V30.5605C4.00962 32.0002 4.59307 33.3783 5.62403 34.3963C6.65499 35.4144 8.05051 35.9905 9.50847 36H37.4915C38.9495 35.9905 40.345 35.4144 41.376 34.3963C42.4069 33.3783 42.9904 32.0002 43 30.5605V18.7387C43 18.3732 42.853 18.0227 42.5913 17.7643C42.3296 17.5059 41.9746 17.3607 41.6045 17.3607Z"
                    fill={color || DEFAULT_ICON_COLOR}
                />
            </g>
            <g filter="url(#filter1_d_595_2849)">
                <path
                    d="M30.3343 5.61233H37.3409L21.4857 18.6024C21.2724 18.7813 21.1193 19.0204 21.0469 19.2878C20.9745 19.5553 20.9862 19.8382 21.0804 20.0989C21.1746 20.3595 21.3469 20.5855 21.5743 20.7465C21.8016 20.9076 22.0731 20.996 22.3525 21C22.6704 20.9954 22.9768 20.8815 23.2193 20.6779L39.2912 7.43738V13.0199C39.3004 13.3682 39.4441 13.6997 39.6928 13.9461C39.9414 14.1925 40.276 14.3349 40.6276 14.3439C40.9916 14.3439 41.3406 14.2007 41.598 13.9456C41.8554 13.6906 42 13.3447 42 12.9841V4.32406C42 3.9729 41.8592 3.63612 41.6086 3.38781C41.358 3.1395 41.0181 3 40.6637 3H30.3704C30.0492 3.05215 29.7571 3.21574 29.5464 3.46156C29.3356 3.70737 29.2199 4.01941 29.2199 4.34195C29.2199 4.66449 29.3356 4.97652 29.5464 5.22234C29.7571 5.46816 30.0492 5.63175 30.3704 5.6839L30.3343 5.61233Z"
                    fill={color || DEFAULT_ICON_COLOR}
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_595_2849"
                    x="0"
                    y="0"
                    width="47"
                    height="41"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.980392 0 0 0 0 0.733333 0 0 0 0 0.117647 0 0 0 0.36 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_595_2849"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_595_2849"
                        result="shape"
                    />
                </filter>
                <filter
                    id="filter1_d_595_2849"
                    x="17"
                    y="0"
                    width="29"
                    height="26"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.980392 0 0 0 0 0.733333 0 0 0 0 0.117647 0 0 0 0.36 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_595_2849"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_595_2849"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
};

export default IconOpenFilter;
