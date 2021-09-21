import { IAppConfig } from "@app/interfaces";

export const Daiichi: IAppConfig = {
    providerId: 0,
    theme: {
        // body
        "--theme-font-family": "'Roboto', sans-serif",
        "--theme-font-primary-color": "#000000",
        "--theme-font-secondary-color": "#ED0225",
        "--theme-font-inactive-color": "#AAAAAA",
        "--theme-border-color": "#DBDBDB",

        // background
        "--theme-primary-background-color": "#ffffff",
        "--theme-secondary-background-color": "#FAFAFA",

        // errors and warnings
        "--theme-error-background-color": "#ED0225",
        "--theme-error-foreground-color": "#FAFAFA",

        //buttons
        "--theme-button-border-radius": "5px",
        "--theme-button-primary-background-color": "#ED0225",
        "--theme-button-primary-foreground-color": "#ffffff",
        "--theme-button-secondary-background-color": "#EFEFEF",
        "--theme-button-secondary-foreground-color": "#000000",
        "--theme-button-primary-inactive-background-color": "#DBDBDB",
        "--theme-button-primary-inactive-foreground-color": "#EFEFEF",
        "--theme-button-secondary-inactive-background-color": "#FAFAFA",
        "--theme-button-secondary-inactive-foreground-color": "#EFEFEF",
    },
    logoUrl: "https://app.qa.my-doc.com/dai-ichi/assets/images/logo_vn_01.svg",
    menuItems: [
        { "text": "Home", "routerLink": "/home", "icon": ["fas", "home"], "display": { "public": true, "private": true } },
        { "text": "Dashboard", "routerLink": "/dashboard", "icon": ["fas", "home"], "display": { "public": true, "private": true } },
        { "text": "Waiting Room", "routerLink": "/waiting-room", "icon": ["fas", "calendar-alt"], "display": { "public": true, "private": true } },
        { "text": "Profile", "routerLink": "/profile", "icon": ["fas", "user"], "display": { "public": true, "private": true } }
    ],
    sections: [
        {
            component: "ConsultNowComponent",
            config: {
                imgSource: "https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                title: "Welcome to Dai-ichi e-Health Virtual Consultation!",
                body: "Speak to an experienced GP within minutes",
                subText: "Operational Hours: 0800H - 2200H, including weekend and holidays",
                buttonText: "SPEAK WITH A DOCTOR NOW",
                command: ["/provider", 0, "journey", "start"]
            }
        },
        { component: "SymptomsSectionComponent", "config": {} },
        { component: "OnetwothreeSectionComponent", "config": {} },
        {
            component: "NeedAssistanceSectionComponent",
            config: {
                content: "<p>Need any assistance? Call us at</p><p><b>Dai-ichi Life Vietnam<br /> (028) 38100888</b><br /> 08: 00 - 17: 30, Mon - Fri and 08: 00 - 12: 00, Sat </p><p><b>MyDoc <br /> 0707150628</b><br /> 8: 00 to 22: 00, incl.weekend & holidays </p>"
            }
        },
        {
            component: "BannerSectionComponent",
            config: {}
        }
    ]
}
