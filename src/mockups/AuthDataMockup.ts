import { TAuthPaymentCard, TUserData } from "@store/auth/types";

export const UserDataMockup: TUserData = {
    name: "John",
    surname: "Wick",
    email: "john.wick1@gmail.com",
    phone: "18881234567",
    country: "Australia",
    city: "Townsville",
    address: "98 Shirley Street PIMPAMA QLD 4209",
    index: "481001",
};

export const UserCardsDataMockup: TAuthPaymentCard[] = [
    {
        id: "id1",
        cvv: "333",
        cardNumber: "371449635398431",
        expMonth: "10",
        expYear: "28",
    },
    {
        id: "id2",
        cvv: "123",
        cardNumber: "36259600000004",
        expMonth: "1",
        expYear: "27",
    },
    {
        id: "id3",
        cvv: "6456",
        cardNumber: "4005519200000004",
        expMonth: "3",
        expYear: "29",
    },
    {
        id: "id4",
        cvv: "234",
        cardNumber: "1111222233334444",
        expMonth: "3",
        expYear: "29",
    },
];
