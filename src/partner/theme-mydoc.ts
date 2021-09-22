import { IAppConfig } from "@app/interfaces";

export const MyDoc: IAppConfig = {
    providerId: 13,
    theme: {
        // body
        "--theme-font-family": "'Roboto', sans-serif",
        "--theme-font-primary-color": "#0E194E",
        "--theme-font-secondary-color": "#828FB7",
        "--theme-font-inactive-color": "#C7D2E1",
        "--theme-border-color": "#DBDBDB",

        // background
        "--theme-primary-background-color": "#ffffff",
        "--theme-secondary-background-color": "#FAFAFA",

        // errors and warnings
        "--theme-error-background-color": "#ED0225",
        "--theme-error-foreground-color": "#FAFAFA",

        //buttons
        "--theme-button-border-radius": "5px",
        "--theme-button-primary-background-color": "#4F85F1",
        "--theme-button-primary-foreground-color": "#ffffff",
        "--theme-button-secondary-background-color": "rgb(239, 239, 239)",
        "--theme-button-secondary-foreground-color": "#000000",
        "--theme-button-primary-inactive-background-color": "#DBDBDB",
        "--theme-button-primary-inactive-foreground-color": "#EFEFEF",
        "--theme-button-secondary-inactive-background-color": "#FAFAFA",
        "--theme-button-secondary-inactive-foreground-color": "#EFEFEF",
    },
    logoUrl: "https://my-doc.com/wp-content/uploads/2019/12/logo-mydoc-1.png",
    menuItems: [
        { "text": "Home", "routerLink": "/home", "icon": ["fas", "home"], "display": { "public": true, "private": true } },
        { "text": "MyDoc Tour", "routerLink": "/public/tour", "icon": ["fas", "route"], "display": { "public": true, "private": false } },
        { "text": "Explore", "routerLink": "/explore", "icon": ["fas", "globe-asia"], "display": { "public": true, "private": true } },
        { "text": "Care Network", "routerLink": "/care-network", "icon": ["fas", "heart"], "display": { "public": true, "private": true } },
        { "text": "Appointment", "routerLink": "/waiting-room", "icon": ["fas", "calendar-alt"], "display": { "public": false, "private": true } },
        { "text": "Feeds", "routerLink": "/feeds", "icon": ["fas", "newspaper"], "display": { "public": true, "private": true } },
        { "text": "Settings", "routerLink": "/profile", "icon": ["fas", "user"], "display": { "public": false, "private": true } }
    ],
    header: { component: "HeaderComponent", "config": {} },
    footer: { component: "FooterComponent", "config": {} },
    sections: [
        {
            component: "ConsultNowComponent",
            config: {
                imgSource: "https://app.qa.my-doc.com/dai-ichi/assets/images/Banner_happy_family.png",
                title: "Welcome to MyDoc Virtual Consultation!",
                body: "Speak to an experienced GP within minutes",
                subText: "Operational Hours: 0800H - 2200H, including weekend and holidays",
                buttonText: "SPEAK WITH A DOCTOR NOW",
                command: ["/provider", 13, "journey", "start"]
            }
        },
        { component: "SymptomsSectionComponent", "config": {} },
        { component: "OnetwothreeSectionComponent", "config": {} },
        {
            component: "NeedAssistanceSectionComponent",
            config: {
                content: "<p>Need any assistance? Call us at</p><p><b>MyDoc Pte Ltd<br /> (028) 38100888</b><br /> 08: 00 - 17: 30, Mon - Fri and 08: 00 - 12: 00, Sat </p><p><b>MyDoc <br /> 0707150628</b><br /> 8: 00 to 22: 00, incl.weekend & holidays </p>"
            }
        },
        {
            component: "BannerSectionComponent",
            config: {}
        }
    ]
}
