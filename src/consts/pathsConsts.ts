export const PATH_HOME_PAGE = "/";
export const PATH_CONTACTS_US_PAGE = "/contact-us";
export const PATH_MY_ACCOUNT_PAGE = "/my-account";
export const PATH_MY_ACCOUNT_PAYMENT_PAGE = `${PATH_MY_ACCOUNT_PAGE}/payment`;
export const PATH_MY_ACCOUNT_ORDERS_PAGE = `${PATH_MY_ACCOUNT_PAGE}/orders`;
export const PATH_MY_ACCOUNT_FORM_PAGE = `${PATH_MY_ACCOUNT_PAGE}/account`;
export const toSingleOrderPageId = (id: string) =>
    `${PATH_MY_ACCOUNT_ORDERS_PAGE}/${id}`;

export const PATH_BUILDER_PAGE = "/builder";
export const PATH_SEARCH_PAGE = "/search";
export const PATH_CART_PAGE = "/cart";
export const PATH_CUSTOM_QUOTE_PAGE = "/custom-quote";
export const PATH_CHECKOUT_PAGE = "/checkout";
export const PATH_LOGIN = "/auth/login";
export const PATH_POLICY_PAGE = "/policy";
export const PATH_TERMS_PAGE = "/terms";
export const PATH_CATALOG_PAGE = "/catalog";
export const toSingleProductPageId = (id: string) =>
    `${PATH_CATALOG_PAGE}/${id}`;
