export const BASE_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/register`;
export const USER = `${BASE_URL}/auth/user`;
export const LOGOUT = `${BASE_URL}/auth/logout`;
export const CREATEORDER = `${BASE_URL}/auth/addorder`;

export const CATEGORIES = `${BASE_URL}/menu`;

export const SINGLE_PRODUCT = `${BASE_URL}/product`;
export const PRODUCTS = `${BASE_URL}/products`;


import { BsCashStack } from "react-icons/bs";
// import { CgPaypal } from "react-icons/cg";
export const PAYMENTMETHOD = [
    {
        title: "Pay in cash",
        value: "HandCash",
        icon: <BsCashStack size={24} color="darkgoldenrod" />
    },
    // {
    //     title: "upi",
    //     value: "UPI",
    //     icon: <CgPaypal size={24} color="dodgerblue" />
    // }
]

export const HEADERLINKS = [
    {
        "title": "Home",
        "icon": "fa-home",
        "path": "/"
    },{
        "title": "Menu",
        "icon": "fa-th-large",
        "path": "/menu"
    },{
        "title": "About",
        "icon": "fa-user",
        "path": "/about"
    }
]

export const FOOTER = {
    "email":"demo@gmail.com","phoneNumber":"1234123",
    "desc":"Food is life. Life is food.",
    "openingHours":{"day":"Everyday","hour":"08.00 Am - 18.00 Pm"},
    "socialMedia":[
        {"icon":"fa fa-facebook","link":"https://www.facebook.com"},
        {"icon":"fa fa-instagram","link":"https://instagram.com"},
        {"icon":"fa fa-linkedin","link":"https://linkedin.com"}
    ],
    "rights": "© 2022 All Rights Reserved"
}