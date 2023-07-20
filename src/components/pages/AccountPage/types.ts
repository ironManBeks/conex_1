export type TAccountForm = {
    wrapperClassPrefix: string;
};

export type TAccountPaymentItem = {
    name: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
};

export type TAccountOrderItem = {
    id: string;
    orderNumber: string;
    orderPlaced: string;
    orderProcessed: string;
    manufacturing: string;
    shipped: string;
    deliveryWillCompleted: string;
    address: string;
    status: string;
};
