import { FC, memo, useEffect, useState } from "react";
import cn from "classnames";
import { Breadcrumb as AtnBreadcrumb } from "antd";

import { IconArrowSingle } from "@components/Icons";
import IconHome from "@components/Icons/common/IconHome";

import { EArrowDirection } from "@components/Icons/types";
import { useRouter } from "next/router";
import { firstLetterToUpperCase } from "@helpers/textHelpers";
import { PATH_HOME_PAGE } from "@consts/pathsConsts";
import Link from "next/link";
import { TBreadcrumbProps } from "@components/globalComponents/types";

const useBreadcrumbPath = () => {
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState<
        { name: string; path: string }[] | null
    >(null);

    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split("/");
            linkPath.shift();

            const pathArray = linkPath.map((path, i) => {
                return {
                    name: firstLetterToUpperCase(path).replace(
                        /[^a-zA-Z0-9 ]/g,
                        " ",
                    ),
                    path: "/" + linkPath.slice(0, i + 1).join("/"),
                };
            });

            setBreadcrumbs(pathArray);
        }
    }, [router]);

    return breadcrumbs;
};

const Breadcrumb: FC<TBreadcrumbProps> = ({ rootClassName, ...rest }) => {
    const classPrefix = "breadcrumb";
    const breadcrumb = useBreadcrumbPath();

    const paths = breadcrumb?.length
        ? breadcrumb?.map((item) => ({
              href: item.path,
              title: item.name,
          }))
        : [];

    return (
        <AtnBreadcrumb
            items={[{ href: PATH_HOME_PAGE, title: <IconHome /> }, ...paths]}
            {...rest}
            rootClassName={cn(`${classPrefix}_wrapper`, rootClassName)}
            separator={
                <IconArrowSingle
                    width={16}
                    height={16}
                    direction={EArrowDirection.right}
                />
            }
            itemRender={(route, params, routes) => {
                const last = routes.indexOf(route) === routes.length - 1;
                return !last && route.href ? (
                    <Link href={route.href}>{route.title}</Link>
                ) : (
                    <span>{route.title}</span>
                );
            }}
        />
    );
};

export default memo(Breadcrumb);
