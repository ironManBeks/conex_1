import { Resolver } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { yupPhoneRequired } from "@consts/validationConsts";
//
// export enum ECustomQuoteFieldsNames {
//     name = "name",
//     phone = "phone",
//     address = "address",
//     additionalDetails = "additionalDetails",
// }
//
// export type TCustomQuoteForm = {
//     [ECustomQuoteFieldsNames.name]: string;
//     [ECustomQuoteFieldsNames.phone]: string;
//     [ECustomQuoteFieldsNames.address]: string;
//     [ECustomQuoteFieldsNames.additionalDetails]: string;
// };
//
// export const customQuoteDefaultValues: TCustomQuoteForm = {
//     [ECustomQuoteFieldsNames.name]: "",
//     [ECustomQuoteFieldsNames.phone]: "",
//     [ECustomQuoteFieldsNames.address]: "",
//     [ECustomQuoteFieldsNames.additionalDetails]: "",
// };
//
// export const customQuoteFormResolver = (): Resolver<TCustomQuoteForm> => {
//     const requiredText = "This field is required";
//
//     return yupResolver(
//         yup.object().shape({
//             [ECustomQuoteFieldsNames.name]: yup.string().required(requiredText),
//             [ECustomQuoteFieldsNames.phone]: yupPhoneRequired(),
//             [ECustomQuoteFieldsNames.address]: yup
//                 .string()
//                 .required(requiredText),
//             [ECustomQuoteFieldsNames.additionalDetails]: yup
//                 .string()
//                 .required(requiredText),
//         }),
//     );
// };
