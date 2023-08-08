import { TAuthData } from "@store/stores/auth/types";

export const AuthDataMockup: TAuthData = {
    name: "John Wick",
    email: "john.wick1@gmail.com",
    phone: "18881234567",
    cards: [
        {
            id: "id1",
            name: "John Wick",
            cardNumber: "371449635398431",
            expMonth: "10",
            expYear: "28",
        },
        {
            id: "id2",
            name: "John Wick 2",
            cardNumber: "36259600000004",
            expMonth: "1",
            expYear: "27",
        },
        {
            id: "id3",
            name: "John Wick 3",
            cardNumber: "4005519200000004",
            expMonth: "3",
            expYear: "29",
        },
        {
            id: "id4",
            name: "John Wick 4 end",
            cardNumber: "1111222233334444",
            expMonth: "3",
            expYear: "29",
        },
    ],
};
