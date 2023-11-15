import type { NextApiRequest, NextApiResponse } from "next";

import { randomUUID } from "crypto";
import { CheckoutAPI, Client, Config } from "@adyen/api-library";

const config = new Config({
    apiKey: process.env.ADYEN_API_KEY,
    environment: "TEST",
});

const client = new Client({ config });
const checkout = new CheckoutAPI(client);

const merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT ?? "";

export type SessionData = {
    id: string;
    sessionData: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SessionData>,
) {
    // Using Adyen SDK to create a session
    const response = await checkout.sessions({
        amount: { currency: "EUR", value: 10000 }, // value is 100€ in minor units
        countryCode: "NL",
        merchantAccount,
        reference: randomUUID(), // Merchant reference
        returnUrl: "https://conex-1.vercel.app/my-account/orders",
    });

    // Returning the session data to the caller
    res.status(200).json({
        id: response.id,
        sessionData: response.sessionData ?? "",
    });
}
