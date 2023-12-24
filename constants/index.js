export const BASE_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

export const LOGIN = `${BASE_URL}/auth/login`;
export const REGISTER = `${BASE_URL}/auth/register`;
export const USER = `${BASE_URL}/auth/user`;
export const LOGOUT = `${BASE_URL}/auth/logout`;

export const CATEGORIES = `${BASE_URL}/menu`;

export const SINGLE_PRODUCT = `${BASE_URL}/product`;
export const PRODUCTS = `${BASE_URL}/products`;


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