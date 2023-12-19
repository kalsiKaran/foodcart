export const BASE_URL = process.env.NEXT_PUBLIC_DEV_API_URL;

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